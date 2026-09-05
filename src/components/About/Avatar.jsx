import { Suspense, useEffect, useRef } from "react";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Environment,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================
   CHARACTER
========================= */

function Character({ activeStep = 0 }) {
  const groupRef = useRef(null);
  const headRef = useRef(null);

  const mixerRef = useRef(null);
  const actionsRef = useRef({});

  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  /* =========================
     STEP HEAD TARGET
  ========================= */

  const stepTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const { camera } = useThree();

  const { scene, animations } =
    useGLTF("/models/character.glb");

  /* =========================
     CAMERA POSITION
  ========================= */

  useEffect(() => {
    if (!scene) return;

    camera.position.set(
      0,
      6.2,
      30
    );

    camera.lookAt(
      0,
      5.2,
      0
    );

    camera.updateProjectionMatrix();
  }, [scene, camera]);

  /* =========================
     STEP / SCROLL TARGET
  ========================= */

  useEffect(() => {
    const rotations = [
      {
        x: 0,
        y: 0.22,
      },

      {
        x: -0.04,
        y: -0.28,
      },

      {
        x: 0.04,
        y: 0.18,
      },
    ];

    const target =
      rotations[activeStep] ||
      rotations[0];

    stepTargetRef.current = target;
  }, [activeStep]);

  /* =========================
     CHARACTER SETUP
  ========================= */

  useEffect(() => {
    if (!scene) return;

    headRef.current =
      scene.getObjectByName("spine.006") ||
      scene.getObjectByName("spine006") ||
      null;

    const footR =
      scene.getObjectByName("footR");

    const footL =
      scene.getObjectByName("footL");

    if (footR) {
      footR.position.y = 3.36;
    }

    if (footL) {
      footL.position.y = 3.36;
    }
  }, [scene]);

  /* =========================
     ANIMATIONS
  ========================= */

  useEffect(() => {
    if (
      !scene ||
      !animations ||
      !animations.length
    ) {
      return;
    }

    const mixer =
      new THREE.AnimationMixer(scene);

    mixerRef.current = mixer;

    animations.forEach((clip) => {
      actionsRef.current[clip.name] =
        mixer.clipAction(clip);
    });

    const intro =
      actionsRef.current.introAnimation;

    const typing =
      actionsRef.current.typing;

    if (intro) {
      intro.reset();

      intro.setLoop(
        THREE.LoopOnce,
        1
      );

      intro.clampWhenFinished = true;

      intro.play();

      const handleFinished = (event) => {
        if (event.action !== intro) {
          return;
        }

        if (typing) {
          typing.reset();

          typing.setLoop(
            THREE.LoopRepeat,
            Infinity
          );

          typing.fadeIn(0.5);

          typing.play();
        }
      };

      mixer.addEventListener(
        "finished",
        handleFinished
      );

      return () => {
        mixer.removeEventListener(
          "finished",
          handleFinished
        );

        mixer.stopAllAction();
        mixer.uncacheRoot(scene);
      };
    }

    if (typing) {
      typing.reset();

      typing.setLoop(
        THREE.LoopRepeat,
        Infinity
      );

      typing.play();
    }

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [scene, animations]);

  /* =========================
     MOUSE
  ========================= */

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      mouseRef.current.y =
        -(event.clientY /
          window.innerHeight) *
          2 +
        1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  /* =========================
     FRAME
  ========================= */

  useFrame((state, delta) => {
    /* =========================
       ANIMATION
    ========================= */

    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    const mouseX =
      mouseRef.current.x;

    const mouseY =
      mouseRef.current.y;

    /* =========================
       HEAD
    ========================= */

    if (headRef.current) {
      const targetY =
        stepTargetRef.current.y +
        mouseX * 0.18;

      const targetX =
        stepTargetRef.current.x -
        mouseY * 0.10;

      headRef.current.rotation.y =
        THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          targetY,
          0.06
        );

      headRef.current.rotation.x =
        THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          targetX,
          0.06
        );
    }

    /* =========================
       BODY
    ========================= */

    if (groupRef.current) {
      const time =
        state.clock.elapsedTime;

      const targetRotation =
        mouseX * 0.05 +
        Math.sin(time * 0.8) *
          0.01;

      groupRef.current.rotation.y =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation,
          0.04
        );
    }
  });

  /* =========================
     MODEL
  ========================= */

  return (
    <group
      ref={groupRef}
      position={[0, -2.2, 0]}
      scale={0.85}
    >
      <primitive object={scene} />
    </group>
  );
}

/* =========================
   AVATAR
========================= */

function Avatar({ activeStep = 0 }) {
  return (
    <div className="avatar-canvas">
      <Canvas
        camera={{
          position: [0, 6.2, 30],
          fov: 32,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
      >
        {/* =========================
            LIGHTING
        ========================= */}

        <ambientLight
          intensity={0.15}
        />

        <directionalLight
          position={[
            -0.47,
            -0.32,
            -1,
          ]}
          intensity={1}
        />

        {/* =========================
            ENVIRONMENT
        ========================= */}

        <Suspense fallback={null}>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.64}
          />

          <Character
            activeStep={activeStep}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* =========================
   PRELOAD
========================= */

useGLTF.preload(
  "/models/character.glb"
);

export default Avatar;