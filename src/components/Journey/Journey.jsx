import { useEffect, useRef, useState } from "react";
import useTranslation from "../../locales/useTranslation";
import "./Journey.css";

function Journey() {
  const t = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

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
          threshold: 0.55,
        },
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

  const steps = t.journey.steps;

  return (
    <section className="journey" id="journey">
      <div className="journey-grid" />

      {/* =========================
          HEADER
      ========================= */}

      <div className="journey-header">
        <p className="journey-label">
          {t.journey.label}
        </p>

        <h2>
          {t.journey.title}
        </h2>

        <p className="journey-intro">
          {t.journey.description}
        </p>
      </div>

      {/* =========================
          TIMELINE
      ========================= */}

      <div className="journey-timeline">
        <div className="journey-line">
          <div
            className="journey-line-progress"
            style={{
              height: `${
                (activeStep / (steps.length - 1)) * 100
              }%`,
            }}
          />
        </div>

        {steps.map((step, index) => (
          <div
            key={`${step.year}-${index}`}
            ref={(element) => {
              stepsRef.current[index] = element;
            }}
            className={`journey-step ${
              activeStep === index ? "active" : ""
            } ${
              index % 2 === 0
                ? "journey-step-right"
                : "journey-step-left"
            }`}
          >
            {/* =========================
                DOT
            ========================= */}

            <div className="journey-dot">
              <span />
            </div>

            {/* =========================
                YEAR
            ========================= */}

            <div className="journey-year">
              {step.year}
            </div>

            {/* =========================
                CARD
            ========================= */}

            <article className="journey-card">
              <p className="journey-card-label">
                {step.label}
              </p>

              <h3>
                {step.title}
              </h3>

              <p className="journey-card-description">
                {step.description}
              </p>

              <span className="journey-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          </div>
        ))}
      </div>

      {/* =========================
          PROGRESS
      ========================= */}

      <div className="journey-progress">
        <span>
          {String(activeStep + 1).padStart(2, "0")}
        </span>

        <div className="journey-progress-divider" />

        <span>
          {String(steps.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default Journey;