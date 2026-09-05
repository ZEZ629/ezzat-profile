import { useEffect, useRef, useState } from "react";
import useTranslation from "../../locales/useTranslation";
import Avatar from "./Avatar";
import "./About.css";

function About() {
  const t = useTranslation();

  const [activeStep, setActiveStep] = useState(0);

  const stepsRef = useRef([]);

  /* =========================
     SCROLL OBSERVER
  ========================= */

  useEffect(() => {
    const observers = [];

    stepsRef.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        {
          threshold: 0.6,
        }
      );

      observer.observe(element);

      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  /* =========================
     ABOUT STEPS
  ========================= */

  const steps = t.about.steps;

  return (
    <section className="about" id="about">
      {/* =========================
          BACKGROUND GRID
      ========================= */}

      <div className="about-grid" />

      {/* =========================
          STICKY CENTER 3D
      ========================= */}

      <div className="about-sticky">
        <div className="about-avatar">
          <Avatar activeStep={activeStep} />
        </div>
      </div>

      {/* =========================
          SCROLL CONTENT
      ========================= */}

      <div className="about-scroll">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(element) => {
              stepsRef.current[index] = element;
            }}
            className={`about-step ${
              activeStep === index ? "active" : ""
            }`}
          >
            <div
              className={`about-card ${
                step.side === "right"
                  ? "about-card-right"
                  : "about-card-left"
              }`}
            >
              <p className="about-label">
                {step.label}
              </p>

              <h2>{step.title}</h2>

              <p className="about-description">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* =========================
          PROGRESS
      ========================= */}

      <div className="about-progress">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`about-progress-item ${
              activeStep === index
                ? "active"
                : ""
            }`}
          >
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            {index < steps.length - 1 && (
              <div className="about-progress-line" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;