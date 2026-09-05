import { useEffect, useRef } from "react";
import gsap from "gsap";

import useTranslation from "../../locales/useTranslation";

import profileImage from "../../assets/profile.jpg";

import "./Hero.css";

function Hero() {
  const t = useTranslation();

  const swingRef = useRef(null);
  const boundaryRef = useRef(null);

  useEffect(() => {
    const swing = swingRef.current;
    const boundary = boundaryRef.current;

    if (!swing || !boundary) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;
    let currentRotation = 0;

    let targetX = 0;
    let targetY = 0;
    let targetRotation = 0;

    const handleMouseMove = (event) => {
      const rect = boundary.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;

      const centerY = rect.top + rect.height / 2;

      mouseX = (event.clientX - centerX) / (rect.width / 2);

      mouseY = (event.clientY - centerY) / (rect.height / 2);

      mouseX = Math.max(-1, Math.min(1, mouseX));

      mouseY = Math.max(-1, Math.min(1, mouseY));
    };

    window.addEventListener("mousemove", handleMouseMove);

    gsap.fromTo(
      swing,
      {
        y: -350,
        rotation: -12,
        opacity: 0,
      },
      {
        y: 0,
        rotation: 4,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
      },
    );

    const updateSwing = () => {
      const time = performance.now() * 0.001;

      const idleSwing = Math.sin(time * 1.2) * 3;

      const idleX = Math.sin(time * 0.8) * 5;

      const mouseInfluenceX = -mouseX * 28;

      const mouseInfluenceY = -mouseY * 12;

      const mouseInfluenceRotation = -mouseX * 6;

      targetX = idleX + mouseInfluenceX;

      targetY = mouseInfluenceY;

      targetRotation = idleSwing + mouseInfluenceRotation;

      const maxX = 28;
      const maxY = 12;
      const maxRotation = 10;

      targetX = Math.max(-maxX, Math.min(maxX, targetX));

      targetY = Math.max(-maxY, Math.min(maxY, targetY));

      targetRotation = Math.max(
        -maxRotation,
        Math.min(maxRotation, targetRotation),
      );

      currentX += (targetX - currentX) * 0.045;

      currentY += (targetY - currentY) * 0.045;

      currentRotation += (targetRotation - currentRotation) * 0.045;

      gsap.set(swing, {
        x: currentX,
        y: currentY,
        rotation: currentRotation,
      });
    };

    gsap.ticker.add(updateSwing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      gsap.ticker.remove(updateSwing);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-grid" />

      <div className="hero-content">
        <p className="hero-status">{t.hero.status}</p>

        <h1>
          {t.hero.title}

          <span>{t.hero.subtitle}</span>

          <small className="hero-role">{t.hero.role}</small>
        </h1>

        <p className="hero-description">{t.hero.description}</p>

        <p className="hero-tagline">{t.hero.tagline}</p>

        <div className="hero-tech">
          <span>React</span>
          <span>JavaScript</span>
          <span>Node.js</span>
          <span>Networking</span>
          <span>Cybersecurity</span>
        </div>

        <div className="hero-actions">
          <a href="#projects">{t.hero.projectsButton}</a>

          <a href="#contact">{t.hero.contactButton}</a>
        </div>
      </div>

      <div className="hero-photo-area">
        <div className="photo-boundary" ref={boundaryRef}>
          <div className="swing-group" ref={swingRef}>
            <div className="rope">
              <span />
              <span />
              <span />
            </div>

            <div className="photo-wrapper">
              <div className="photo-card">
                <img src={profileImage} alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
