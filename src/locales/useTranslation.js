import { useEffect } from "react";
import { useSelector } from "react-redux";
import translations from "./index";

function useTranslation() {
  const language = useSelector(
    (state) => state.app.language
  );

  useEffect(() => {
    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return translations[language];
}

export default useTranslation;