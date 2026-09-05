import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleLanguage,
  toggleTheme,
  toggleMobileMenu,
  closeMobileMenu,
} from "../../features/app/appSlice";

import useTranslation from "../../locales/useTranslation";

import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();

  const t = useTranslation();

  const { language, theme, mobileMenuOpen } = useSelector((state) => state.app);

  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    document.documentElement.setAttribute("dir", isArabic ? "rtl" : "ltr");

    document.documentElement.setAttribute("lang", isArabic ? "ar" : "en");
  }, [theme, isArabic]);

  const handleLanguageToggle = () => {
    dispatch(toggleLanguage());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMenuToggle = () => {
    dispatch(toggleMobileMenu());
  };

  const handleLinkClick = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <header className="navbar">
      <a href="#home" className="navbar-logo" onClick={handleLinkClick}>
        E.
      </a>

      <nav className={`navbar-links ${mobileMenuOpen ? "is-open" : ""}`}>
        <a href="#home" onClick={handleLinkClick}>
          {t.navbar.home}
        </a>

        <a href="#about" onClick={handleLinkClick}>
          {t.navbar.about}
        </a>

        <a href="#skills" onClick={handleLinkClick}>
          {t.navbar.skills}
        </a>

        <a href="#journey" onClick={handleLinkClick}>
          {t.navbar.journey}
        </a>

        <a href="#services" onClick={handleLinkClick}>
          {t.navbar.services}
        </a>

        <a href="#projects" onClick={handleLinkClick}>
          {t.navbar.projects}
        </a>
        <a href="#contact" onClick={handleLinkClick}>
          {t.navbar.contact}
        </a>
      </nav>

      <div className="navbar-controls">
        <button
          type="button"
          onClick={handleLanguageToggle}
          aria-label="Change language"
        >
          {language}
        </button>

        <button
          type="button"
          onClick={handleThemeToggle}
          aria-label="Change theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>

        <button
          type="button"
          className="navbar-menu"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
