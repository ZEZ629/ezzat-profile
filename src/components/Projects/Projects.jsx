import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useTranslation from "../../locales/useTranslation";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
  `${import.meta.env.BASE_URL}projects/nexa-dashboard.jpg`,
  `${import.meta.env.BASE_URL}projects/secure-auth.jpg`,
  `${import.meta.env.BASE_URL}projects/network-flow.jpg`,
  `${import.meta.env.BASE_URL}projects/taskora.jpg`,
  `${import.meta.env.BASE_URL}projects/devconnect.jpg`,
];

function Projects() {
  const t = useTranslation();

  const sectionRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const projects = projectRefs.current.filter(Boolean);

      projects.forEach((project) => {
        const image = project.querySelector(".project-image img");

        if (!image) return;

        if (window.innerWidth <= 600) {
          gsap.set(image, {
            scale: 1,
          });

          return;
        }

        gsap.fromTo(
          image,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            ease: "none",

            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <div className="projects-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="projects-header">
          <div className="projects-label">
            <span />
            <p>{t.projects.label}</p>
          </div>

          <div className="projects-heading">
            <h2>{t.projects.title}</h2>

            <p>{t.projects.description}</p>
          </div>
        </header>

        {/* =================================================
            PROJECT STACK
        ================================================= */}

        <div className="projects-stack">
          {t.projects.items.map((project, index) => (
            <article
              key={project.number}
              ref={(element) => {
                projectRefs.current[index] = element;
              }}
              className="project"
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="project-card">
                {/* IMAGE */}

                <div className="project-image">
                  <img
                    src={projectImages[index]}
                    alt={project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  <div className="project-image-overlay" />

                  <span className="project-number">{project.number}</span>
                </div>

                {/* CONTENT */}

                <div className="project-content">
                  <div className="project-main-info">
                    <span className="project-category">{project.category}</span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>
                  </div>

                  <div className="project-side-info">
                    <div className="project-technologies">
                      {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{t.projects.liveDemo}</span>

                        <i>↗</i>
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{t.projects.sourceCode}</span>

                        <i>↗</i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="projects-bottom">
          <span>{String(t.projects.items.length).padStart(2, "0")}</span>

          <p>{t.projects.scrollHint}</p>
        </div>
      </div>
    </section>
  );
}

export default Projects;
