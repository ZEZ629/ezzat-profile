import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaCode,
  FaDesktop,
  FaServer,
  FaNetworkWired,
  FaShieldHalved,
  FaPuzzlePiece,
} from "react-icons/fa6";

import useTranslation from "../../locales/useTranslation";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = [
  FaCode,
  FaDesktop,
  FaServer,
  FaNetworkWired,
  FaShieldHalved,
  FaPuzzlePiece,
];

function Services() {
  const t = useTranslation();

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const currentRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const cards = Array.from(
      track.querySelectorAll(".service-card")
    );

    if (cards.length < 2) return;

    const ctx = gsap.context(() => {
      /*
       * =====================================================
       * MOBILE
       * =====================================================
       */

      if (window.innerWidth <= 600) {
        gsap.set(track, {
          clearProps: "transform",
        });

        if (currentRef.current) {
          currentRef.current.textContent = "01";
        }

        if (progressRef.current) {
          progressRef.current.style.transform =
            "scaleX(0)";
        }

        return;
      }

      /*
       * =====================================================
       * REAL CARD POSITIONS
       * =====================================================
       */

      const getCardCenter = (card) => {
        return (
          card.offsetLeft +
          card.offsetWidth / 2
        );
      };

      /*
       * =====================================================
       * START POSITION
       * =====================================================
       *
       * 01 يكون في منتصف الشاشة.
       */

      const getStartX = () => {
        const firstCard = cards[0];

        const viewportCenter =
          window.innerWidth / 2;

        const firstCardCenter =
          getCardCenter(firstCard);

        return (
          viewportCenter -
          firstCardCenter
        );
      };

      /*
       * =====================================================
       * END POSITION
       * =====================================================
       *
       * 06 يكون في منتصف الشاشة.
       */

      const getEndX = () => {
        const lastCard =
          cards[cards.length - 1];

        const viewportCenter =
          window.innerWidth / 2;

        const lastCardCenter =
          getCardCenter(lastCard);

        return (
          viewportCenter -
          lastCardCenter
        );
      };

      /*
       * =====================================================
       * INDICATOR
       * =====================================================
       */

      const updateIndicator = (progress) => {
        const safeProgress = Math.max(
          0,
          Math.min(1, progress)
        );

        const lastIndex =
          cards.length - 1;

        let currentIndex = Math.floor(
          safeProgress * cards.length
        );

        if (safeProgress >= 0.999) {
          currentIndex = lastIndex;
        }

        currentIndex = Math.max(
          0,
          Math.min(
            lastIndex,
            currentIndex
          )
        );

        if (currentRef.current) {
          currentRef.current.textContent =
            String(
              currentIndex + 1
            ).padStart(2, "0");
        }

        if (progressRef.current) {
          progressRef.current.style.transform =
            `scaleX(${safeProgress})`;
        }
      };

      /*
       * =====================================================
       * INITIAL POSITION
       * =====================================================
       */

      gsap.set(track, {
        x: getStartX(),
      });

      /*
       * =====================================================
       * HORIZONTAL SCROLL
       * =====================================================
       */

      gsap.to(track, {
        x: () => getEndX(),

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",

          /*
           * لازم تتوافق مع نهاية الـ sticky.
           */
          end: "bottom bottom",

          scrub: 0.8,

          invalidateOnRefresh: true,

          /*
           * Snap disabled
           * علشان نضمن الوصول إلى 06.
           */
          snap: false,

          onUpdate: (self) => {
            updateIndicator(
              self.progress
            );
          },

          onRefresh: (self) => {
            updateIndicator(
              self.progress
            );
          },
        },
      });
    }, section);

    /*
     * =====================================================
     * RESIZE + LOAD
     * =====================================================
     */

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "load",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "load",
        handleResize
      );

      ctx.revert();
    };
  }, [t.services.items.length]);

  return (
    <section
      ref={sectionRef}
      className="services"
      id="services"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="services-grid" />

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="services-header">
        <div className="services-label">
          <i />
          <span>
            {t.services.label}
          </span>
        </div>

        <h2>
          {t.services.title}
        </h2>

        <p>
          {t.services.description}
        </p>
      </div>

      {/* ===================================================
          STICKY AREA
      =================================================== */}

      <div className="services-sticky">
        <div
          ref={trackRef}
          className="services-track"
        >
          {t.services.items.map(
            (service, index) => {
              const Icon =
                serviceIcons[index];

              return (
                <article
                  key={service.number}
                  className="service-card"
                >
                  {/* Number */}

                  <span className="service-number">
                    {service.number}
                  </span>

                  {/* Visual */}

                  <div className="service-card-visual">
                    <Icon />
                  </div>

                  {/* Content */}

                  <div className="service-card-content">
                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}

                  <div className="service-card-arrow">
                    <span>→</span>
                  </div>

                  {/* Index */}

                  <span className="service-card-index">
                    {service.number}
                  </span>
                </article>
              );
            }
          )}
        </div>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div className="services-scroll-indicator">
          <span
            ref={currentRef}
            className="services-current"
          >
            01
          </span>

          <div className="services-progress">
            <span
              ref={progressRef}
            />
          </div>

          <span className="services-total">
            {String(
              t.services.items.length
            ).padStart(2, "0")}
          </span>

          <div className="services-scroll-label">
            <span>
              {t.services.scrollHint}
            </span>

            <i>→</i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;