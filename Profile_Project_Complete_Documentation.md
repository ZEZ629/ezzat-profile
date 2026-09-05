# Profile Portfolio — Complete Project Documentation

## 1. فكرة المشروع

هذا المشروع عبارة عن Portfolio شخصي تفاعلي لمطور برمجيات، مبني باستخدام React + Vite، ويجمع بين عرض المهارات والخبرة والمشاريع ووسائل التواصل في تجربة بصرية تفاعلية.

الهدف ليس مجرد صفحة CV تقليدية، بل موقع يعرض شخصية المطور وطريقة تفكيره، مع دعم:
- العربية والإنجليزية.
- RTL / LTR.
- Dark / Light Theme.
- Animations والتفاعل مع التمرير.
- أقسام مستقلة قابلة للتطوير.

---

## 2. التقنيات المستخدمة

### Frontend
- React
- Vite
- JavaScript / JSX
- CSS

### State Management
- Redux Toolkit
- React Redux

### Animation / Interaction
- GSAP
- ScrollTrigger
- Lenis
- Three.js
- React Three Fiber
- drei
- Matter.js

### Icons
- react-icons

---

## 3. ترتيب الموقع الحالي

```text
Navbar
  ↓
Hero
  ↓
About
  ↓
Skills
  ↓
Journey
  ↓
Services
  ↓
Projects
  ↓
Contact
```

قسم Certificates مستبعد من التصميم الحالي.

---

# 4. Project Structure

```text
my-profile/
│
├── public/
│   ├── draco/
│   │   ├── draco_decoder.js
│   │   └── draco_decoder.wasm
│   │
│   ├── models/
│   │   ├── char_enviorment.hdr
│   │   ├── character.enc
│   │   ├── character.glb
│   │   └── encrypt.cjs
│   │
│   └── projects/
│       ├── nexa-dashboard.jpg
│       ├── secure-auth.jpg
│       ├── network-flow.jpg
│       ├── taskora.jpg
│       └── devconnect.jpg
│
├── src/
│   ├── app/
│   │   └── store.js
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Journey/
│   │   ├── Services/
│   │   ├── Projects/
│   │   └── Contact/
│   │
│   ├── features/
│   │   └── app/
│   │       └── appSlice.js
│   │
│   ├── locales/
│   │   ├── ar.js
│   │   ├── en.js
│   │   ├── index.js
│   │   └── useTranslation.js
│   │
│   ├── styles/
│   │   ├── variables.css
│   │   └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

# 5. public/

مجلد `public` يحتوي الملفات التي يحتاج الموقع للوصول إليها مباشرة.

## public/draco/

```text
draco_decoder.js
draco_decoder.wasm
```

هذه الملفات مرتبطة بـ Draco compression وتساعد في تحميل نماذج 3D المضغوطة.

## public/models/

### character.glb
نموذج الشخصية ثلاثي الأبعاد المستخدم في جزء الـ About.

### char_enviorment.hdr
ملف HDRI يستخدم لإضاءة بيئة المشهد ثلاثي الأبعاد.

### character.enc
نسخة محمية/مشفرة من ملف الشخصية حسب آلية الحماية الموجودة بالمشروع.

### encrypt.cjs
سكريبت مرتبط بعملية تشفير ملف الشخصية.

## public/projects/

يحتوي صور المشاريع:

```text
nexa-dashboard.jpg
secure-auth.jpg
network-flow.jpg
taskora.jpg
devconnect.jpg
```

كل صورة مرتبطة بالمشروع المقابل لها في ترتيب البيانات.

---

# 6. src/main.jsx

هذا هو Entry Point للتطبيق.

مسؤول عن:
1. إنشاء React Root.
2. تشغيل `App`.
3. توفير Redux Store لكل Components.
4. تحميل الـ global CSS.

الشكل الأساسي:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store";
import "./styles/variables.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

`Provider` يجعل Redux متاحًا داخل كل التطبيق.

---

# 7. src/App.jsx

هذا الملف مسؤول عن تركيب Sections بالترتيب.

```jsx
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Journey from "./components/Journey/Journey";
import Services from "./components/Services/Services";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
```

المبدأ هنا أن `App.jsx` لا يحتوي تفاصيل التصميم؛ هو فقط يحدد مكونات الموقع وترتيبها.

---

# 8. Redux

## src/app/store.js

ينشئ Redux Store:

```js
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
```

يوجد حاليًا State رئيسي باسم:

```text
app
```

---

# 9. src/features/app/appSlice.js

هذا الملف يحتوي الـ Global State.

الحالة الحالية:

```js
const initialState = {
  theme: "dark",
  language: "en",
  mobileMenuOpen: false,
};
```

## theme

القيم:

```text
dark
light
```

Actions:

```text
toggleTheme
setTheme
```

## language

القيم:

```text
en
ar
```

Actions:

```text
toggleLanguage
setLanguage
```

## mobileMenuOpen

يتحكم في Mobile Navbar.

Actions:

```text
toggleMobileMenu
openMobileMenu
closeMobileMenu
```

---

# 10. Localization

الموقع يدعم:

```text
English
Arabic
```

النصوص منفصلة عن Components.

هذا يجعل نفس Component يعمل باللغتين.

---

# 11. src/locales/en.js

يحتوي جميع النصوص الإنجليزية.

الأقسام:

```text
navbar
hero
about
journey
services
projects
contact
```

مثلًا:

```js
t.contact.title
```

يرجع عنوان Contact باللغة الإنجليزية.

---

# 12. src/locales/ar.js

يحتوي نفس البيانات باللغة العربية.

بالإضافة إلى النصوص المناسبة للـ RTL.

---

# 13. src/locales/index.js

يربط اللغتين:

```js
import ar from "./ar";
import en from "./en";

const translations = {
  ar,
  en,
};

export default translations;
```

فيصبح لدينا:

```js
translations.ar
translations.en
```

---

# 14. src/locales/useTranslation.js

هذا Custom Hook.

يقرأ اللغة من Redux:

```js
const language = useSelector(
  (state) => state.app.language
);
```

ثم يغير:

```text
document.documentElement.lang
document.documentElement.dir
```

عند العربية:

```text
lang="ar"
dir="rtl"
```

عند الإنجليزية:

```text
lang="en"
dir="ltr"
```

ثم يرجع بيانات اللغة:

```js
return translations[language];
```

وبالتالي داخل أي Component:

```js
const t = useTranslation();
```

ثم:

```jsx
t.hero.title
t.about.title
t.projects.title
t.contact.title
```

---

# 15. Navbar

المجلد:

```text
src/components/Navbar/
```

مسؤول عن:
- Logo / Name.
- Navigation.
- Theme Toggle.
- Language Toggle.
- Mobile Menu.
- التنقل بين Sections.

ويعتمد على Redux وLocalization.

---

# 16. Hero

المجلد:

```text
src/components/Hero/
```

Hero هو أول Section.

الفكرة البصرية:
- صورة/شخصية معلقة بحبل.
- Swing Animation.
- تفاعل مع Mouse / Touch / Scroll.
- Typography كبيرة.
- Intro.
- Tech identity.
- CTA Buttons.

النص الرئيسي:

```text
I Build What Users See
And What Makes It Work.
```

والهوية:

```text
Full-Stack Developer
×
Network Engineering
×
Cybersecurity
```

---

# 17. About

المجلد:

```text
src/components/About/
```

الفكرة ليست مجرد تعريف تقليدي.

القسم يشرح طريقة التفكير والخلفية التقنية.

المحاور:

```text
More than just code.
I Think Behind the Screen.
I Connect Different Layers.
Always Learning.
Think Beyond the Screen.
```

القسم مرتبط بفكرة الـ 3D Avatar والتفاعل أثناء التمرير.

---

# 18. Skills

المجلد:

```text
src/components/Skills/
```

قسم Skills مصمم بشكل Interactive وليس قائمة نصية فقط.

المجالات الأساسية:

```text
Frontend
Backend
Networking
Cybersecurity
Systems
Cisco-related skills
HCIA Datacom
HCIA-Security V4.0
```

ويعتمد التصميم على Boxes / Physics / Interaction.

---

# 19. Journey

المجلد:

```text
src/components/Journey/
```

يعرض مراحل الرحلة:

## 2023 — The Beginning
بداية البرمجة وتعلم الأساسيات.

## 2024 — Engineering & Growth
الالتحاق بهندسة الاتصالات والاستمرار في البرمجة.

## 2025 — Expanding My Technical World
استكشاف:
- Networking
- Infrastructure
- Cybersecurity

## 2025 — Building for the Web
التركيز على Frontend والواجهات التفاعلية.

## 2026 — Going Full-Stack
التوسع إلى Backend باستخدام Node.js.

## Today — Connecting the Pieces
ربط:

```text
Full-Stack Development
×
Networking
×
Cybersecurity
```

---

# 20. Services

المجلد:

```text
src/components/Services/
```

الخدمات الحالية:

```text
01 Full-Stack Web Development
02 Frontend Development
03 Backend Development
04 Network Solutions
05 Network Security
06 Technical Problem Solving
```

القسم يوضح المجالات التي يمكن تقديم قيمة فيها.

---

# 21. Projects

المجلد:

```text
src/components/Projects/
├── Projects.jsx
└── Projects.css
```

يوجد حاليًا 5 مشاريع:

```text
01 Nexa Dashboard
02 SecureAuth
03 NetworkFlow
04 Taskora
05 DevConnect
```

## Nexa Dashboard
Full-Stack Dashboard.

## SecureAuth
Authentication & Security.

## NetworkFlow
Network Monitoring.

## Taskora
Productivity Web App.

## DevConnect
Developer Platform.

أسماء المشاريع الحالية Placeholder/Temporary وليست بالضرورة المشاريع النهائية الفعلية.

---

# 22. Projects Layout

المطلوب كان عدم استخدام Horizontal Scroll.

تم تنفيذ Stack Effect باستخدام:

```css
position: sticky;
```

الفكرة:

```text
Project 1
    ↓
Project 2 rises above it
    ↓
Project 3 rises above Project 2
    ↓
Project 4
    ↓
Project 5
```

كل مشروع يبقى كـ Layer أسفل المشروع التالي.

على Mobile يتم إلغاء Sticky وتحويل المشاريع إلى قائمة رأسية طبيعية.

---

# 23. GSAP في Projects

يتم استخدام:

```text
GSAP
ScrollTrigger
```

لعمل حركة للصور أثناء Scroll.

الصورة تبدأ تقريبًا:

```js
scale: 1.08
```

ثم تتحرك إلى:

```js
scale: 1
```

وهذا يعطي تأثير Zoom / Reveal.

---

# 24. Contact

المجلد:

```text
src/components/Contact/
├── Contact.jsx
└── Contact.css
```

Contact لا يحتوي Form أو Inputs.

بدل ذلك يوجد 6 Cards قابلة للضغط.

الترتيب الحالي:

```text
01 Email
02 LinkedIn
03 GitHub
04 WhatsApp
05 Phone
06 Instagram
```

---

# 25. Contact.jsx

الأيقونات:

```js
FaEnvelope
FaLinkedinIn
FaGithub
FaWhatsapp
FaPhone
FaInstagram
```

وترتيبها مطابق للـ `items`.

يوجد أيضًا:

```js
contactTypes
```

لتحديد نوع كل Card:

```text
email
linkedin
github
whatsapp
phone
instagram
```

ويتم إنشاء class مثل:

```jsx
contact-card contact-email
contact-card contact-linkedin
contact-card contact-github
contact-card contact-whatsapp
contact-card contact-phone
contact-card contact-instagram
```

---

# 26. Contact Brand Colors

كل Card له لون خاص عند Hover:

```text
Email     → #ea4335
LinkedIn  → #0a66c2
GitHub    → #f0f0f0
WhatsApp  → #25d366
Phone     → #34a853
Instagram → #e1306c
```

عند الوقوف على Card لا يتغير لون الأيقونة فقط.

يتفاعل:

```text
Icon
Border
Top Line
Label
Arrow
Glow
Background
```

---

# 27. Contact Animations

الكروت تدخل تدريجيًا باستخدام:

```css
@keyframes contactCardIn
```

كل Card لها Delay مختلف.

أيضًا:
- Header يظهر بحركة.
- Description تظهر بعده.
- الخط بجانب Contact يتحرك.
- Icon تكبر وتدور عند Hover.
- Arrow يتحرك.
- Border يأخذ لون Brand.
- Glow يظهر بلون الوسيلة.

يوجد أيضًا:

```css
@media (prefers-reduced-motion: reduce)
```

لتقليل الحركة للمستخدمين الذين يفضلون ذلك.

---

# 28. Contact Data

البيانات موجودة في `en.js` و `ar.js`.

مثال:

```js
{
  id: "email",
  label: "Email",
  value: "zezo84594171@email.com",
  url: "mailto:zezo84594171@email.com",
}
```

WhatsApp يستخدم رقم الهاتف:

```text
https://wa.me/201156069025
```

وليس username.

---

# 29. styles/variables.css

يحتوي المتغيرات العامة مثل:

```css
--color-black
--color-white
--color-primary
```

الهدف هو توحيد الألوان والقيم الأساسية بدل تكرارها داخل كل Component.

---

# 30. styles/global.css

يحتوي القواعد العامة للموقع، مثل:
- Reset.
- Box sizing.
- Body.
- Typography.
- Links.
- القواعد العامة للصفحة.

هذا يمنع تكرار الـ Global CSS داخل كل Section.

---

# 31. Dark / Light Theme

Redux يحتفظ بالـ Theme:

```text
dark
```

أو:

```text
light
```

عند التغيير تستخدم Components selectors مثل:

```css
[data-theme="light"]
```

وبالتالي كل Section يستطيع تغيير شكله حسب الـ Theme.

---

# 32. RTL / LTR

عند العربية:

```text
dir="rtl"
```

عند الإنجليزية:

```text
dir="ltr"
```

لذلك يوجد في CSS قواعد مثل:

```css
[dir="rtl"]
```

لتعديل:
- الاتجاه.
- النص.
- المحاذاة.
- Position.
- Arrow.
- Layout.

---

# 33. Responsive Design

الموقع يدعم:

```text
Desktop
Tablet
Mobile
```

باستخدام Media Queries مثل:

```css
@media (max-width: 900px)
```

و:

```css
@media (max-width: 600px)
```

في Sections التي تعتمد على تفاعل ثقيل، يتم تغيير التجربة على Mobile بدل إجبار الهاتف على نفس Layout الخاص بالـ Desktop.

---

# 34. Architecture

المشروع مبني على فصل المسؤوليات:

```text
App
 ↓
Sections
 ↓
Component + CSS
 ↓
Redux / Localization / Animation
```

كل Section مستقل.

مثال:

```text
Projects/
├── Projects.jsx
└── Projects.css
```

و:

```text
Contact/
├── Contact.jsx
└── Contact.css
```

---

# 35. فصل البيانات عن الـ UI

النصوص والبيانات القابلة للتغيير موجودة في:

```text
src/locales/
```

بينما UI موجود في:

```text
src/components/
```

مثال:

```jsx
<h2>{t.contact.title}</h2>
```

بدل:

```jsx
<h2>Let's Connect</h2>
```

وهذا يسمح بتغيير اللغة بدون إنشاء Component جديد.

---

# 36. تدفق اللغة

```text
Navbar / User
      ↓
Redux
      ↓
language = en / ar
      ↓
useTranslation()
      ↓
translations[language]
      ↓
Components
```

وعند العربية:

```text
language = ar
      ↓
dir = rtl
      ↓
Arabic UI
```

---

# 37. تدفق Theme

```text
User clicks Theme
      ↓
Redux Action
      ↓
theme changes
      ↓
UI reads theme
      ↓
[data-theme="light"]
or
dark styles
```

---

# 38. أهم الملفات لفهم المشروع

لو تريد فهم المشروع من الصفر، ابدأ بهذا الترتيب:

```text
1. src/main.jsx
2. src/App.jsx
3. src/app/store.js
4. src/features/app/appSlice.js
5. src/locales/useTranslation.js
6. src/locales/index.js
7. src/locales/en.js
8. src/locales/ar.js
9. src/components/Navbar/
10. src/components/Hero/
11. src/components/About/
12. src/components/Skills/
13. src/components/Journey/
14. src/components/Services/
15. src/components/Projects/
16. src/components/Contact/
17. src/styles/
```

---

# 39. حالة المشروع الحالية

```text
Navbar        ✓
Hero          ✓
About         ✓
Skills        ✓
Journey       ✓
Services      ✓
Projects      ✓
Contact       ✓

Redux         ✓
Localization  ✓
Dark / Light  ✓
RTL / LTR     ✓
Responsive    ✓
Animations    ✓
```

---

# 40. قواعد مهمة في المشروع

## Projects
أسماء المشاريع الحالية مؤقتة ويمكن تغييرها لاحقًا.

## Contact
بيانات التواصل يتم تعديلها من ملفات Localization.

## EMH
تم استبعاده من قائمة المشاريع الحالية.

## Certificates
تم استبعاد قسم Certificates من ترتيب الموقع الحالي.

---

# 41. طريقة التطوير الصحيحة

أي تعديل يفضل أن يذهب إلى مكانه الصحيح:

```text
النصوص
↓
locales

Global State
↓
Redux

UI
↓
.jsx

Design
↓
.css

Animations
↓
GSAP / CSS

Images / Models
↓
public
```

هذا يمنع خلط المسؤوليات ويحافظ على قابلية المشروع للتوسع.

---

# 42. الخلاصة

Portfolio هو مشروع React تفاعلي يجمع:

```text
React
+
Vite
+
Redux
+
Localization
+
GSAP
+
Three.js
+
Responsive CSS
```

والمفهوم الأساسي للموقع هو:

```text
Build
Connect
Secure
```

أي:

```text
Development
×
Networking
×
Cybersecurity
```

وهذا المفهوم يربط:

```text
Hero
  ↓
About
  ↓
Skills
  ↓
Journey
  ↓
Services
  ↓
Projects
  ↓
Contact
```
