import {
  FaEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaPhone,
  FaInstagram,
} from "react-icons/fa6";

import useTranslation from "../../locales/useTranslation";
import "./Contact.css";

const contactIcons = [
  FaEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaPhone,
  FaInstagram,
];

const contactTypes = [
  "email",
  "linkedin",
  "github",
  "whatsapp",
  "phone",
  "instagram",
];

function Contact() {
  const t = useTranslation();

  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        <div className="contact-header">
          <div className="contact-label">
            <span />
            <p>{t.contact.label}</p>
          </div>

          <h2>{t.contact.title}</h2>

          <p className="contact-description">
            {t.contact.description}
          </p>
        </div>

        <div className="contact-grid">
          {t.contact.items.map((item, index) => {
            const Icon = contactIcons[index];

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`contact-card contact-${contactTypes[index]}`}
              >
                <div className="contact-card-icon">
                  <Icon />
                </div>

                <div className="contact-card-info">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <span className="contact-card-arrow">
                  ↗
                </span>
              </a>
            );
          })}
        </div>

        <footer className="contact-footer">
          <span>© 2026 Ezzat Sadek</span>

          <span>
            {t.contact.footer}
          </span>
        </footer>

      </div>
    </section>
  );
}

export default Contact;