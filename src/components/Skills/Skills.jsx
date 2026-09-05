import { useEffect, useRef } from "react";
import Matter from "matter-js";

import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiTailwindcss,
  SiGsap,
  SiRedux,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiGit,
  SiGithub,
  SiLinux,
  SiOwasp,
  SiFigma,
  SiMeta,
} from "react-icons/si";

import {
  FaCss3Alt,
  FaNetworkWired,
  FaCode,
  FaShieldHalved,
  FaLock,
  FaKey,
  FaRoute,
  FaArrowsLeftRightToLine,
  FaServer,
} from "react-icons/fa6";

import useTranslation from "../../locales/useTranslation";
import "./Skills.css";

const skills = [
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "HTML",
    icon: SiHtml5,
    color: "#E34F26",
  },
  {
    name: "CSS",
    icon: FaCss3Alt,
    color: "#1572B6",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
  },
  {
    name: "GSAP",
    icon: SiGsap,
    color: "#88CE02",
  },
  {
    name: "Redux",
    icon: SiRedux,
    color: "#764ABC",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#68A063",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#FFFFFF",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "#FFCA28",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
  },
  {
    name: "SQL",
    icon: FaServer,
    color: "#4DA6FF",
  },
  {
    name: "REST API",
    icon: FaCode,
    color: "#4DA6FF",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "#FFFFFF",
  },
  {
    name: "Linux",
    icon: SiLinux,
    color: "#FFFFFF",
  },
  {
    name: "Networking",
    icon: FaNetworkWired,
    color: "#00D9FF",
  },
  {
    name: "TCP/IP",
    icon: FaNetworkWired,
    color: "#00BFFF",
  },
  {
    name: "Routing",
    icon: FaRoute,
    color: "#4DA6FF",
  },
  {
    name: "Switching",
    icon: FaArrowsLeftRightToLine,
    color: "#00E5C3",
  },
  {
    name: "HCIA Datacom",
    icon: FaNetworkWired,
    color: "#FF5C35",
  },
  {
    name: "HCIA-Security V4.0",
    icon: FaShieldHalved,
    color: "#FF3D81",
  },
  {
    name: "OWASP",
    icon: SiOwasp,
    color: "#8B5CF6",
  },
  {
    name: "Web Security",
    icon: FaShieldHalved,
    color: "#6366F1",
  },
  {
    name: "Authentication",
    icon: FaKey,
    color: "#818CF8",
  },
  {
    name: "Encryption",
    icon: FaLock,
    color: "#38BDF8",
  },
  {
    name: "Figma",
    icon: SiFigma,
    color: "#F24E1E",
  },
  {
    name: "Meta Ads",
    icon: SiMeta,
    color: "#1877F2",
  },
];

function Skills() {
  const sceneRef = useRef(null);
  const pillRefs = useRef([]);

  const t = useTranslation();

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const {
      Engine,
      Runner,
      Bodies,
      Body,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const engine = Engine.create();

    engine.gravity.x = 0;
    engine.gravity.y = 0;

    const world = engine.world;

    const bodies = [];

    /* =========================
       PILL SIZE
    ========================= */

    const getPillSize = (skill) => {
      const baseWidth = skill.name.length * 8.5 + 72;

      return {
        width: Math.max(125, Math.min(baseWidth, 230)),

        height: skill.name.length > 17 ? 62 : 52,
      };
    };

    /* =========================
       CREATE BODY
    ========================= */

    const createSkillBody = (skill, index) => {
      const { width, height } = getPillSize(skill);

      const centerX = scene.clientWidth / 2;

      const centerY = scene.clientHeight / 2;

      const angle = (((index * 31) % 28) - 14) * (Math.PI / 180);

      const radiusX = scene.clientWidth * 0.34;

      const radiusY = scene.clientHeight * 0.32;

      const x = centerX + Math.cos(index * 1.45) * radiusX;

      const y = centerY + Math.sin(index * 1.17) * radiusY;

      const body = Bodies.rectangle(
        Math.max(
          width / 2 + 10,
          Math.min(x, scene.clientWidth - width / 2 - 10),
        ),

        Math.max(
          height / 2 + 10,
          Math.min(y, scene.clientHeight - height / 2 - 10),
        ),

        width,
        height,
        {
          chamfer: {
            radius: height / 2,
          },

          restitution: 0.88,
          friction: 0.04,
          frictionAir: 0.035,
          density: 0.001,

          angle,

          label: skill.name,
        },
      );

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.7,

        y: (Math.random() - 0.5) * 0.7,
      });

      bodies.push(body);
    };

    skills.forEach(createSkillBody);

    /* =========================
       WALLS
    ========================= */

    const wallSize = 120;

    const createWalls = () => {
      const width = scene.clientWidth;

      const height = scene.clientHeight;

      return [
        Bodies.rectangle(width / 2, -wallSize / 2, width, wallSize, {
          isStatic: true,
        }),

        Bodies.rectangle(width / 2, height + wallSize / 2, width, wallSize, {
          isStatic: true,
        }),

        Bodies.rectangle(-wallSize / 2, height / 2, wallSize, height, {
          isStatic: true,
        }),

        Bodies.rectangle(width + wallSize / 2, height / 2, wallSize, height, {
          isStatic: true,
        }),
      ];
    };

    let walls = createWalls();

    Composite.add(world, [...bodies, ...walls]);

    /* =========================
       MOUSE
    ========================= */

    const mouse = Mouse.create(scene);

    /*
     * Matter.js can attach wheel
     * listeners to the mouse element.
     *
     * Remove them so the browser /
     * Lenis keeps full control of
     * page scrolling.
     */

    const mouseWheelHandler = mouse.mousewheel;

    if (mouseWheelHandler) {
      scene.removeEventListener("wheel", mouseWheelHandler);

      scene.removeEventListener("mousewheel", mouseWheelHandler);
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,

      constraint: {
        stiffness: 0.12,
        damping: 0.08,

        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    /* =========================
       MOUSE IMPACT
    ========================= */

    const mouseRadius = 190;
    const mouseForce = 0.045;

    const handleBeforeUpdate = () => {
      const mousePosition = mouse.position;

      bodies.forEach((body) => {
        const dx = body.position.x - mousePosition.x;

        const dy = body.position.y - mousePosition.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= 0 || distance > mouseRadius) {
          return;
        }

        const normalizedX = dx / distance;

        const normalizedY = dy / distance;

        const strength = ((mouseRadius - distance) / mouseRadius) * mouseForce;

        Body.applyForce(body, body.position, {
          x: normalizedX * strength,

          y: normalizedY * strength,
        });
      });
    };

    Events.on(engine, "beforeUpdate", handleBeforeUpdate);

    /* =========================
       LIMIT SPEED
    ========================= */

    const handleAfterUpdate = () => {
      bodies.forEach((body) => {
        const maxVelocity = 5;

        const velocityX = Math.max(
          -maxVelocity,
          Math.min(maxVelocity, body.velocity.x),
        );

        const velocityY = Math.max(
          -maxVelocity,
          Math.min(maxVelocity, body.velocity.y),
        );

        Body.setVelocity(body, {
          x: velocityX,
          y: velocityY,
        });
      });
    };

    Events.on(engine, "afterUpdate", handleAfterUpdate);

    /* =========================
       RENDER
    ========================= */

    const render = () => {
      bodies.forEach((body, index) => {
        const element = pillRefs.current[index];

        if (!element) return;

        const width = element.offsetWidth;

        const height = element.offsetHeight;

        element.style.transform = `
            translate3d(
              ${body.position.x - width / 2}px,
              ${body.position.y - height / 2}px,
              0
            )
            rotate(${body.angle}rad)
          `;
      });
    };

    Events.on(engine, "afterUpdate", render);

    /* =========================
       RESIZE
    ========================= */

    const handleResize = () => {
      const width = scene.clientWidth;

      const height = scene.clientHeight;

      Composite.remove(world, walls);

      walls = createWalls();

      Composite.add(world, walls);

      bodies.forEach((body) => {
        const halfWidth = body.bounds.max.x - body.position.x;

        const halfHeight = body.bounds.max.y - body.position.y;

        Body.setPosition(body, {
          x: Math.max(
            halfWidth + 10,
            Math.min(width - halfWidth - 10, body.position.x),
          ),

          y: Math.max(
            halfHeight + 10,
            Math.min(height - halfHeight - 10, body.position.y),
          ),
        });
      });
    };

    window.addEventListener("resize", handleResize);

    /* =========================
       START
    ========================= */

    const runner = Runner.create();

    Runner.run(runner, engine);

    render();

    /* =========================
       CLEANUP
    ========================= */

    return () => {
      window.removeEventListener("resize", handleResize);

      Runner.stop(runner);

      Events.off(engine, "beforeUpdate", handleBeforeUpdate);

      Events.off(engine, "afterUpdate", handleAfterUpdate);

      Events.off(engine, "afterUpdate", render);

      Composite.clear(world, false);

      Engine.clear(engine);
    };
  }, []);

  /* =========================
     UI
  ========================= */

  return (
    <section className="skills" id="skills">
      <div className="skills-grid" />

      <div className="skills-header">
        <div className="skills-label">
          <span>{t.skills.label}</span>

          <i />
        </div>

        <h2>
          {t.skills.title}

          <span>{t.skills.titleAccent}</span>
        </h2>

        <p>
          {t.skills.description}

          <br />

          {t.skills.descriptionSecond}
        </p>
      </div>

      <div className="skills-physics">
        <div className="skills-scene" ref={sceneRef}>
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                ref={(element) => {
                  pillRefs.current[index] = element;
                }}
                className="skill-pill"
                style={{
                  "--skill-color": skill.color,
                }}
              >
                <div className="skill-icon">
                  <Icon />
                </div>

                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="skills-hint">{t.skills.hint}</div>
    </section>
  );
}

export default Skills;
