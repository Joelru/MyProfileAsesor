/**
 * JUAN JOEL NAVARRO VARGAS — MENTOR & SOFTWARE DEVELOPER LANDING PAGE
 * Interactive Animations, Code Showcase, WhatsApp Simulator & Persistent Reviews System
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initNavbar();
  initTypewriter();
  initScrollReveal();
  initCardSpotlight();
  initHeroTilt();
  initCanvasBackground();
  initCodeShowcase();
  initPricingSimulator();
  initReviewsSystem();

  // Set current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. THEME TOGGLE (Soft Light Mode Default + Sleek Dark Mode)
   ========================================================================== */
function initTheme() {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("joel_mentor_theme") || "light";

  htmlEl.setAttribute("data-theme", savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("joel_mentor_theme", next);
    });
  }
}

/* ==========================================================================
   2. NAVBAR & MOBILE MENU + ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinksContainer = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link on scroll
    let currentSection = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 130;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute("id");
      }
    });

    if (currentSection) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
      });
    }
  });

  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navLinksContainer.classList.contains("open") &&
        !navLinksContainer.contains(e.target) &&
        !mobileBtn.contains(e.target)
      ) {
        navLinksContainer.classList.remove("open");
      }
    });
  }
}

/* ==========================================================================
   3. SCROLL REVEAL (Staggered Cascade) + TYPEWRITER + CARD SPOTLIGHT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typewriterText");
  if (!el) return;

  const phrases = [
    "Especialista Certificado en Programación Orientada a Objetos (POO)",
    "Tutorías de Java, Kotlin, Android Studio & Python desde Cero",
    "Arquitecturas de Software Limpias: Patrones MVC y MVP",
    "Asesoría 1 a 1 en IntelliJ IDEA, NetBeans, Android Studio y VS Code"
  ];

  let phraseIdx = 0;
  let charIdx = phrases[0].length;
  let isDeleting = false;

  function tick() {
    const currentPhrase = phrases[phraseIdx];

    if (!isDeleting) {
      charIdx++;
      el.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx >= currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, 2400);
        return;
      }
      setTimeout(tick, 38);
    } else {
      charIdx--;
      el.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 320);
        return;
      }
      setTimeout(tick, 20);
    }
  }

  setTimeout(() => {
    isDeleting = true;
    tick();
  }, 2600);
}

function initCardSpotlight() {
  const cards = document.querySelectorAll(
    ".stat-card, .bento-card, .tech-card, .project-card, .pricing-card, .review-card"
  );

  cards.forEach((card) => {
    if (card.dataset.spotlightBound) return;
    card.dataset.spotlightBound = "true";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-scale");

  // Add subtle stagger delay to sibling cards in grids
  const grids = document.querySelectorAll(
    ".stats-grid, .tech-cards-grid, .projects-grid, .pricing-layout, .about-bento-grid"
  );
  grids.forEach((grid) => {
    const children = grid.querySelectorAll(".reveal-up, .reveal-scale");
    children.forEach((child, idx) => {
      child.style.setProperty("--reveal-delay", `${idx * 95}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. 3D PERSPECTIVE TILT EFFECT ON HERO PROFILE CARD
   ========================================================================== */
function initHeroTilt() {
  const card = document.getElementById("tiltCard");
  if (!card || window.matchMedia("(max-width: 900px)").matches) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

/* ==========================================================================
   5. INTERACTIVE PARTICLE / NODE NETWORK BACKGROUND CANVAS
   ========================================================================== */
function initCanvasBackground() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particleCount = Math.min(48, Math.floor((width * height) / 28000));
  const particles = [];
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 2 + 1.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const dotColor = isDark ? "rgba(45, 212, 191, 0.42)" : "rgba(13, 148, 136, 0.32)";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 145) {
          const alpha = (1 - dist / 145) * (isDark ? 0.16 : 0.12);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isDark
            ? `rgba(45, 212, 191, ${alpha})`
            : `rgba(13, 148, 136, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Subtle mouse connection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   6. INTERACTIVE CODE SHOWCASE (Java POO, Kotlin Android, Python, MVC/MVP)
   ========================================================================== */
function initCodeShowcase() {
  const snippets = {
    java: {
      filename: "SistemaAcademicoPOO.java — IntelliJ IDEA / NetBeans",
      badge: "Java & POO Certificado",
      note: "Dominarás Encapsulamiento, Herencia, Polimorfismo, Clases Abstractas, Interfaces y Colecciones.",
      code: `<span class="cmt">// Ejemplo de Herencia y Polimorfismo explicado paso a paso en tutoría</span>
<span class="kw">public abstract class</span> <span class="cls">PersonaUniversitaria</span> {
    <span class="kw">private</span> String nombre;
    <span class="kw">protected</span> String codigo;

    <span class="kw">public</span> <span class="cls">PersonaUniversitaria</span>(String nombre, String codigo) {
        <span class="kw">this</span>.nombre = nombre;
        <span class="kw">this</span>.codigo = codigo;
    }

    <span class="kw">public abstract double</span> <span class="cls">calcularPromedioFinal</span>();
}

<span class="kw">public class</span> <span class="cls">EstudianteIngenieria</span> <span class="kw">extends</span> <span class="cls">PersonaUniversitaria</span> {
    <span class="kw">private double</span> notaProyectoPOO;

    <span class="kw">public</span> <span class="cls">EstudianteIngenieria</span>(String nombre, String codigo, <span class="kw">double</span> nota) {
        <span class="kw">super</span>(nombre, codigo);
        <span class="kw">this</span>.notaProyectoPOO = nota;
    }

    <span class="cls">@Override</span>
    <span class="kw">public double</span> <span class="cls">calcularPromedioFinal</span>() {
        <span class="kw">return this</span>.notaProyectoPOO * <span class="num">1.0</span>; <span class="cmt">// ¡5.0 asegurado con práctica real!</span>
    }
}`
    },
    kotlin: {
      filename: "MainActivity.kt — Android Studio (Apps Móviles & General)",
      badge: "Kotlin Mobile & Desktop",
      note: "Aprenderás tanto desarrollo de Apps Móviles en Android Studio como programas normales en Kotlin.",
      code: `<span class="cmt">// Desarrollo de Apps Móviles Android y programación moderna en Kotlin</span>
<span class="kw">data class</span> <span class="cls">ProyectoAndroid</span>(
    <span class="kw">val</span> titulo: String,
    <span class="kw">val</span> arquitectura: String = <span class="str">"MVP / MVVM"</span>,
    <span class="kw">val</span> completado: Boolean = <span class="kw">true</span>
)

<span class="kw">class</span> <span class="cls">TutoriaKotlinController</span> {
    <span class="kw">fun</span> <span class="cls">iniciarAprendizaje</span>(estudiante: String): String {
        <span class="kw">val</span> temario = listOf(<span class="str">"POO en Kotlin"</span>, <span class="str">"UI Android"</span>, <span class="str">"Consumo APIs REST"</span>)
        <span class="kw">return</span> <span class="str">"Hola \$estudiante, dominaremos: \${temario.joinToString()}"</span>
    }
}`
    },
    python: {
      filename: "analisis_y_poo.py — VS Code (Lógica, POO & Ciencia de Datos)",
      badge: "Python & IA / Datos",
      note: "Ideal para empezar a programar desde cero absoluto, estructuras de datos, POO y bases de IA.",
      code: `<span class="cmt"># Programación desde cero, POO en Python y bases de Ciencia de Datos</span>
<span class="kw">class</span> <span class="cls">AsesoriaPython</span>:
    <span class="kw">def</span> <span class="cls">__init__</span>(self, estudiante: str, nivel: str = <span class="str">"Desde Cero"</span>):
        self.estudiante = estudiante
        self.nivel = nivel
        self.temas_dominados = []

    <span class="kw">def</span> <span class="cls">agregar_tema</span>(self, tema: str) -> <span class="kw">None</span>:
        self.temas_dominados.append(tema)
        print(<span class="str">f"✔ {self.estudiante} ha dominado: {tema}"</span>)

sesion = <span class="cls">AsesoriaPython</span>(<span class="str">"Estudiante"</span>, <span class="str">"Universitario"</span>)
sesion.agregar_tema(<span class="str">"Lógica, Listas, Diccionarios y POO en Python"</span>)`
    },
    mvc: {
      filename: "ProductoPresenter.java — Arquitectura Limpia MVC y MVP",
      badge: "Arquitectura MVC / MVP",
      note: "Estructuramos tus proyectos semestrales separando Modelo, Vista y Controlador/Presentador.",
      code: `<span class="cmt">// Patrón Modelo-Vista-Presentador (MVP) & MVC para proyectos universitarios</span>
<span class="kw">public class</span> <span class="cls">ProyectoPresenter</span> {
    <span class="kw">private final</span> <span class="cls">IProyectoVista</span> vista;
    <span class="kw">private final</span> <span class="cls">ProyectoRepositorio</span> modelo;

    <span class="kw">public</span> <span class="cls">ProyectoPresenter</span>(<span class="cls">IProyectoVista</span> vista, <span class="cls">ProyectoRepositorio</span> modelo) {
        <span class="kw">this</span>.vista = vista;
        <span class="kw">this</span>.modelo = modelo;
    }

    <span class="kw">public void</span> <span class="cls">guardarEntrega</span>(String nombreProyecto) {
        <span class="kw">if</span> (nombreProyecto.isEmpty()) {
            vista.mostrarAlerta(<span class="str">"El nombre es obligatorio"</span>);
            <span class="kw">return</span>;
        }
        modelo.persistir(nombreProyecto);
        vista.mostrarExito(<span class="str">"Proyecto MVC/MVP guardado correctamente"</span>);
    }
}`
    }
  };

  const tabs = document.querySelectorAll(".code-tab");
  const filenameEl = document.getElementById("ideFilename");
  const badgeEl = document.getElementById("ideBadge");
  const codeEl = document.getElementById("ideCodeContent");
  const noteEl = document.getElementById("ideLearningNote");

  function renderSnippet(key) {
    const item = snippets[key];
    if (!item || !codeEl) return;
    filenameEl.textContent = item.filename;
    badgeEl.textContent = item.badge;
    codeEl.innerHTML = `<code>${item.code}</code>`;
    noteEl.innerHTML = `<i data-lucide="lightbulb"></i> ${item.note}`;
    if (window.lucide) window.lucide.createIcons();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderSnippet(tab.getAttribute("data-lang"));
    });
  });

  renderSnippet("java");
}

/* ==========================================================================
   7. PRICING SIMULATOR & WHATSAPP MESSAGE BUILDER (+57 320 943 0835)
   ========================================================================== */
function initPricingSimulator() {
  const PRICE_PER_HOUR = 20000;
  const WHATSAPP_NUMBER = "573209430835";

  const modalitySelect = document.getElementById("simModality");
  const hoursInput = document.getElementById("simHours");
  const hoursGroup = document.getElementById("simHoursGroup");
  const decBtn = document.getElementById("decHours");
  const incBtn = document.getElementById("incHours");
  const langSelect = document.getElementById("simLang");
  const ideSelect = document.getElementById("simIde");
  const totalDisplay = document.getElementById("simTotalValue");
  const sendBtn = document.getElementById("simSendWhatsapp");

  if (!modalitySelect || !hoursInput || !totalDisplay || !sendBtn) return;

  function formatCOP(value) {
    return "$" + value.toLocaleString("es-CO") + " COP";
  }

  function updateCalculation() {
    const modality = modalitySelect.value;
    const hours = parseInt(hoursInput.value, 10) || 1;

    if (modality === "proyecto") {
      hoursGroup.style.opacity = "0.45";
      hoursGroup.style.pointerEvents = "none";
      totalDisplay.innerHTML = `Precio Variable en COP <small>(Cotizar según alcance)</small>`;
    } else {
      hoursGroup.style.opacity = "1";
      hoursGroup.style.pointerEvents = "auto";
      const total = hours * PRICE_PER_HOUR;
      const label = hours === 1 ? "1 hora" : `${hours} horas`;
      totalDisplay.innerHTML = `${formatCOP(total)} <small>(${label})</small>`;
    }
  }

  decBtn.addEventListener("click", () => {
    const current = parseInt(hoursInput.value, 10) || 1;
    if (current > 1) {
      hoursInput.value = current - 1;
      updateCalculation();
    }
  });

  incBtn.addEventListener("click", () => {
    const current = parseInt(hoursInput.value, 10) || 1;
    if (current < 20) {
      hoursInput.value = current + 1;
      updateCalculation();
    }
  });

  modalitySelect.addEventListener("change", updateCalculation);

  sendBtn.addEventListener("click", () => {
    const modality = modalitySelect.value;
    const hours = parseInt(hoursInput.value, 10) || 1;
    const lang = langSelect.value;
    const ide = ideSelect.value;

    let message = "";
    if (modality === "proyecto") {
      message = `Hola Joel, vi tu página web y quiero cotizar la asesoría/realización de un *Proyecto de Programación*.\n\n• *Lenguaje/Arquitectura:* ${lang}\n• *Entorno (IDE):* ${ide}\n\n¿Me podrías indicar cómo manejamos el precio según los requerimientos?`;
    } else if (modality === "cero") {
      const total = formatCOP(hours * PRICE_PER_HOUR);
      message = `Hola Joel, quiero agendar tutorías para *Aprender a Programar desde Cero*.\n\n• *Duración inicial:* ${hours} hora(s) (${total})\n• *Lenguaje de interés:* ${lang}\n• *IDE preferido:* ${ide}\n\n¿Qué horarios tienes disponibles?`;
    } else {
      const total = formatCOP(hours * PRICE_PER_HOUR);
      message = `Hola Joel, quiero agendar una *Tutoría Personalizada por Hora*.\n\n• *Horas solicitadas:* ${hours} hora(s) (${total})\n• *Tema / Lenguaje:* ${lang}\n• *IDE de trabajo:* ${ide}\n\n¿Qué disponibilidad tienes esta semana?`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  updateCalculation();
}

/* ==========================================================================
   8. PERSISTENT REVIEWS SYSTEM (Firebase Realtime Database + Local Backup)
   ========================================================================== */
const STORAGE_KEY = "joel_navarro_reviews_v1";

/**
 * CONFIGURACIÓN DE FIREBASE REALTIME DATABASE CONECTADA EN VIVO
 */
const CLOUD_DB_CONFIG = {
  FIREBASE_DB_URL: "https://tutorias-joel-default-rtdb.firebaseio.com",
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: ""
};

const INITIAL_SEED_REVIEWS = [
  {
    id: "seed-1",
    name: "Valentina Gómez Restrepo",
    university: "Universidad Nacional de Colombia",
    category: "uni",
    stars: 5,
    comment:
      "Excelente profesor. Tenía muchísimas dudas con polimorfismo, clases abstractas e interfaces en Java para mi parcial de POO y en dos horas en IntelliJ me quedó todo súper claro. Saqué 4.8 en la entrega.",
    date: "18 de octubre de 2026"
  },
  {
    id: "seed-2",
    name: "Sebastián Morales Díaz",
    university: "Universidad Distrital Francisco José de Caldas",
    category: "uni",
    stars: 5,
    comment:
      "Joel me asesoró con un proyecto semestral en Java usando patrón MVC en NetBeans. Explica con mucha paciencia por qué va cada clase y cómo sustentarle al profesor sin memorizar sino entendiendo.",
    date: "11 de octubre de 2026"
  },
  {
    id: "seed-3",
    name: "Andrés Felipe Rojas",
    university: "SENA (Técnico / Tecnólogo ADSO)",
    category: "ind",
    stars: 5,
    comment:
      "Estaba empezando desde cero y me costaba entender la lógica y las clases en POO. Con las tutorías personalizadas de Joel avancé rapidísimo tanto en Java como en Python. 100% recomendado.",
    date: "29 de septiembre de 2026"
  },
  {
    id: "seed-4",
    name: "Camila Andrea Castro",
    university: "Politécnico Grancolombiano",
    category: "uni",
    stars: 5,
    comment:
      "Necesitaba desarrollar una aplicación móvil en Android Studio con Kotlin y arquitectura MVP. Joel domina muchísimo el tema, me guió paso a paso y el proyecto funcionó perfecto.",
    date: "19 de septiembre de 2026"
  },
  {
    id: "seed-5",
    name: "Mateo Hernández Pineda",
    university: "Universidad Industrial de Santander (UIS)",
    category: "uni",
    stars: 5,
    comment:
      "Muy buena metodología. Se adapta al IDE que uno esté usando en la universidad y va directo al grano con ejemplos prácticos. El precio de $20.000 COP la hora vale totalmente la pena.",
    date: "08 de septiembre de 2026"
  },
  {
    id: "seed-6",
    name: "Laura Sofía Vargas",
    university: "Universidad Nacional Abierta y a Distancia (UNAD)",
    category: "uni",
    stars: 5,
    comment:
      "Tomé varias horas de asesoría para estructuras de datos y POO. Es súper cumplido, explica de forma amigable y te deja el código súper ordenado y comentado para estudiar después.",
    date: "27 de agosto de 2026"
  },
  {
    id: "seed-7",
    name: "Daniel Alejandro Ortiz",
    university: "Independiente / Autodidacta",
    category: "ind",
    stars: 5,
    comment:
      "Quería aprender a programar por mi cuenta en Python y Kotlin sin estar en una universidad. Joel me armó una ruta desde cero en VS Code y Android Studio y hoy ya hago mis propios programas.",
    date: "14 de agosto de 2026"
  },
  {
    id: "seed-8",
    name: "Juliana Mendoza Serrano",
    university: "Universidad del Norte (Uninorte)",
    category: "uni",
    stars: 4,
    comment:
      "Me ayudó a entender herencia y manejo de archivos en Java antes de mi examen final. Tiene muchísimo conocimiento como desarrollador y eso se nota cuando explica.",
    date: "03 de agosto de 2026"
  }
];

function formatSpanishDate(dateObj) {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day} de ${month} de ${year}`;
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function fetchCloudReviews() {
  const { FIREBASE_DB_URL, SUPABASE_URL, SUPABASE_ANON_KEY } = CLOUD_DB_CONFIG;

  // 1. Firebase Realtime Database
  if (FIREBASE_DB_URL && FIREBASE_DB_URL.trim() !== "") {
    const cleanUrl = FIREBASE_DB_URL.trim().replace(/\/$/, "");
    const res = await fetch(`${cleanUrl}/reviews.json`);
    if (!res.ok) throw new Error("Error al leer de Firebase");
    const data = await res.json();
    if (!data) return [];
    return Object.entries(data)
      .map(([key, val]) => ({ id: key, ...val }))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }

  // 2. Supabase REST API
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    const cleanUrl = SUPABASE_URL.trim().replace(/\/$/, "");
    const res = await fetch(`${cleanUrl}/rest/v1/reviews?select=*&order=timestamp.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY.trim(),
        Authorization: `Bearer ${SUPABASE_ANON_KEY.trim()}`
      }
    });
    if (!res.ok) throw new Error("Error al leer de Supabase");
    return await res.json();
  }

  return null;
}

async function saveCloudReview(reviewObj) {
  const { FIREBASE_DB_URL, SUPABASE_URL, SUPABASE_ANON_KEY } = CLOUD_DB_CONFIG;

  // 1. Firebase Realtime Database
  if (FIREBASE_DB_URL && FIREBASE_DB_URL.trim() !== "") {
    const cleanUrl = FIREBASE_DB_URL.trim().replace(/\/$/, "");
    const res = await fetch(`${cleanUrl}/reviews.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewObj)
    });
    if (!res.ok) throw new Error("No se pudo guardar en Firebase");
    return true;
  }

  // 2. Supabase REST API
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    const cleanUrl = SUPABASE_URL.trim().replace(/\/$/, "");
    const res = await fetch(`${cleanUrl}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY.trim(),
        Authorization: `Bearer ${SUPABASE_ANON_KEY.trim()}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        name: reviewObj.name,
        university: reviewObj.university,
        category: reviewObj.category,
        stars: reviewObj.stars,
        comment: reviewObj.comment,
        date: reviewObj.date,
        timestamp: reviewObj.timestamp
      })
    });
    if (!res.ok) throw new Error("No se pudo guardar en Supabase");
    return true;
  }

  return false;
}

function mergeWithSeedReviews(cloudOrLocalList) {
  const seenIds = new Set();
  const merged = [];

  cloudOrLocalList.forEach((r) => {
    const key = r.id || `${r.name}-${r.comment}`;
    if (!seenIds.has(key)) {
      seenIds.add(key);
      merged.push(r);
    }
  });

  INITIAL_SEED_REVIEWS.forEach((seed) => {
    if (!seenIds.has(seed.id)) {
      seenIds.add(seed.id);
      merged.push(seed);
    }
  });

  return merged;
}

function initReviewsSystem() {
  // Load or initialize reviews in localStorage
  let reviews = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      reviews = JSON.parse(raw);
    } else {
      reviews = [...INITIAL_SEED_REVIEWS];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }
  } catch (e) {
    reviews = [...INITIAL_SEED_REVIEWS];
  }

  // DOM Elements
  const reviewsGrid = document.getElementById("reviewsGrid");
  const avgRatingNumber = document.getElementById("avgRatingNumber");
  const avgRatingStars = document.getElementById("avgRatingStars");
  const totalReviewsCount = document.getElementById("totalReviewsCount");
  const navReviewCount = document.getElementById("navReviewCount");
  const heroRatingStat = document.getElementById("heroRatingStat");
  const ratingBarsContainer = document.getElementById("ratingBarsContainer");
  const currentDatePreview = document.getElementById("currentDatePreview");

  // Form Elements
  const form = document.getElementById("reviewForm");
  const nameInput = document.getElementById("reviewerName");
  const uniSelect = document.getElementById("reviewerUniversity");
  const customUniGroup = document.getElementById("customUniGroup");
  const customUniInput = document.getElementById("customUniversityInput");
  const starsHidden = document.getElementById("reviewerStars");
  const starButtons = document.querySelectorAll(".star-btn");
  const starFeedbackText = document.getElementById("starFeedbackText");
  const commentInput = document.getElementById("reviewerComment");
  const charCounter = document.getElementById("charCounter");
  const successBanner = document.getElementById("reviewSuccessBanner");

  // Error spans
  const nameError = document.getElementById("nameError");
  const uniError = document.getElementById("uniError");
  const customUniError = document.getElementById("customUniError");
  const starsError = document.getElementById("starsError");
  const commentError = document.getElementById("commentError");

  // Filter & Search
  const filterPills = document.querySelectorAll(".filter-pill");
  const searchInput = document.getElementById("reviewSearchInput");
  let activeFilter = "all";
  let searchQuery = "";

  if (currentDatePreview) {
    currentDatePreview.textContent = formatSpanishDate(new Date());
  }

  // Star rating descriptions
  const starLabels = {
    5: "5 Estrellas — ¡Excelente tutoría!",
    4: "4 Estrellas — Muy buena experiencia",
    3: "3 Estrellas — Buena asesoría",
    2: "2 Estrellas — Regular",
    1: "1 Estrella — Necesita mejorar"
  };

  function updateStarsUI(val) {
    starButtons.forEach((btn) => {
      const btnVal = parseInt(btn.getAttribute("data-value"), 10);
      btn.classList.toggle("active", btnVal <= val);
    });
    if (starFeedbackText) {
      starFeedbackText.textContent = starLabels[val] || "";
    }
  }

  starButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = parseInt(btn.getAttribute("data-value"), 10);
      starsHidden.value = String(val);
      updateStarsUI(val);
      starsError.textContent = "";
    });
  });

  // Show/hide Custom University field
  if (uniSelect) {
    uniSelect.addEventListener("change", () => {
      uniError.textContent = "";
      uniSelect.classList.remove("input-error");
      if (uniSelect.value === "Otra Universidad") {
        customUniGroup.classList.remove("hidden-group");
        customUniInput.focus();
      } else {
        customUniGroup.classList.add("hidden-group");
        customUniInput.value = "";
        customUniError.textContent = "";
      }
    });
  }

  // Character counter
  if (commentInput && charCounter) {
    commentInput.addEventListener("input", () => {
      const len = commentInput.value.length;
      charCounter.textContent = `${len} / 450`;
      if (len >= 12) {
        commentError.textContent = "";
        commentInput.classList.remove("input-error");
      }
    });
  }

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim().length >= 3) {
        nameError.textContent = "";
        nameInput.classList.remove("input-error");
      }
    });
  }

  // Render Dashboard Summary & Bars
  function renderSummary() {
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + Number(r.stars || 5), 0);
    const avg = total > 0 ? (sum / total).toFixed(1) : "5.0";

    if (avgRatingNumber) avgRatingNumber.textContent = avg;
    if (totalReviewsCount) totalReviewsCount.textContent = String(total);
    if (navReviewCount) navReviewCount.textContent = String(total);
    if (heroRatingStat) heroRatingStat.textContent = `${avg} ★`;

    if (avgRatingStars) {
      const rounded = Math.round(Number(avg));
      avgRatingStars.textContent = "★".repeat(rounded) + "☆".repeat(5 - rounded);
    }

    if (ratingBarsContainer) {
      const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      reviews.forEach((r) => {
        const s = Math.min(5, Math.max(1, Number(r.stars) || 5));
        counts[s]++;
      });

      ratingBarsContainer.innerHTML = [5, 4, 3, 2, 1]
        .map((star) => {
          const count = counts[star];
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return `
            <div class="rating-bar-row">
              <span class="rating-bar-label">${star} ★</span>
              <div class="rating-bar-track">
                <div class="rating-bar-fill" style="width: ${pct}%"></div>
              </div>
              <span class="rating-bar-count">${count}</span>
            </div>
          `;
        })
        .join("");
    }
  }

  // Render Reviews Cards
  function renderReviewsList() {
    if (!reviewsGrid) return;

    const filtered = reviews.filter((r) => {
      if (activeFilter === "5" && Number(r.stars) !== 5) return false;
      if (activeFilter === "uni" && r.category !== "uni") return false;
      if (activeFilter === "ind" && r.category !== "ind") return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchUni = r.university.toLowerCase().includes(q);
        const matchComment = r.comment.toLowerCase().includes(q);
        return matchName || matchUni || matchComment;
      }
      return true;
    });

    if (filtered.length === 0) {
      reviewsGrid.innerHTML = `
        <div class="bento-card" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <h4>No se encontraron reseñas con ese filtro</h4>
          <p style="color: var(--text-secondary); margin-top: 6px;">Intenta cambiar la búsqueda o selecciona "Todas las reseñas".</p>
        </div>
      `;
      return;
    }

    reviewsGrid.innerHTML = filtered
      .map((r) => {
        const starsNum = Math.min(5, Math.max(1, Number(r.stars) || 5));
        const starsStr = "★".repeat(starsNum) + "☆".repeat(5 - starsNum);
        const initials = escapeHTML(getInitials(r.name));
        const safeName = escapeHTML(r.name);
        const safeUni = escapeHTML(r.university);
        const safeComment = escapeHTML(r.comment);
        const safeDate = escapeHTML(r.date);

        return `
          <article class="review-card">
            <div class="review-card-top">
              <div class="reviewer-profile">
                <div class="reviewer-avatar">${initials}</div>
                <div class="reviewer-meta">
                  <h4>${safeName}</h4>
                  <span class="reviewer-uni">
                    <i data-lucide="graduation-cap" style="width:13px;height:13px;"></i>
                    ${safeUni}
                  </span>
                </div>
              </div>
              <div class="review-stars-badge" aria-label="${starsNum} de 5 estrellas">${starsStr}</div>
            </div>
            <p class="review-comment">"${safeComment}"</p>
            <div class="review-card-footer">
              <span>${safeDate}</span>
              <span class="review-verified">✓ Reseña Guardada</span>
            </div>
          </article>
        `;
      })
      .join("");

    if (window.lucide) window.lucide.createIcons();
    initCardSpotlight();
  }

  // Filter Pills & Search Listeners
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeFilter = pill.getAttribute("data-filter");
      renderReviewsList();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value;
      renderReviewsList();
    });
  }

  // Form Submission & Validation
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Clear previous errors
      nameError.textContent = "";
      uniError.textContent = "";
      customUniError.textContent = "";
      starsError.textContent = "";
      commentError.textContent = "";
      nameInput.classList.remove("input-error");
      uniSelect.classList.remove("input-error");
      customUniInput.classList.remove("input-error");
      commentInput.classList.remove("input-error");

      let isValid = true;

      // 1. Validate Name
      const rawName = nameInput.value.trim();
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]{3,60}$/;
      if (!rawName) {
        nameError.textContent = "Por favor ingresa tu nombre.";
        nameInput.classList.add("input-error");
        isValid = false;
      } else if (!nameRegex.test(rawName)) {
        nameError.textContent = "Ingresa un nombre válido (mínimo 3 letras, sin números).";
        nameInput.classList.add("input-error");
        isValid = false;
      }

      // 2. Validate University / Modalidad
      let finalUniversity = uniSelect.value.trim();
      let category = "uni";

      if (!finalUniversity) {
        uniError.textContent = "Selecciona tu universidad, técnico o si eres independiente.";
        uniSelect.classList.add("input-error");
        isValid = false;
      } else if (finalUniversity === "Otra Universidad") {
        const customVal = customUniInput.value.trim();
        if (customVal.length < 3) {
          customUniError.textContent = "Escribe el nombre de tu universidad o institución.";
          customUniInput.classList.add("input-error");
          isValid = false;
        } else {
          finalUniversity = customVal;
        }
      }

      if (
        finalUniversity.includes("Independiente") ||
        finalUniversity.includes("SENA") ||
        finalUniversity.includes("Técnico")
      ) {
        category = "ind";
      }

      // 3. Validate Stars
      const starsVal = parseInt(starsHidden.value, 10);
      if (isNaN(starsVal) || starsVal < 1 || starsVal > 5) {
        starsError.textContent = "Selecciona una calificación entre 1 y 5 estrellas.";
        isValid = false;
      }

      // 4. Validate Comment
      const rawComment = commentInput.value.trim();
      if (!rawComment) {
        commentError.textContent = "Por favor escribe un breve comentario sobre la tutoría.";
        commentInput.classList.add("input-error");
        isValid = false;
      } else if (rawComment.length < 12) {
        commentError.textContent = "El comentario debe tener al menos 12 caracteres.";
        commentInput.classList.add("input-error");
        isValid = false;
      }

      if (!isValid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Guardando reseña...</span>`;
      }

      // Build and persist new review
      const newReview = {
        id: "rev-" + Date.now(),
        name: rawName,
        university: finalUniversity,
        category,
        stars: starsVal,
        comment: rawComment,
        date: formatSpanishDate(new Date()),
        timestamp: Date.now()
      };

      try {
        await saveCloudReview(newReview);
      } catch (cloudErr) {
        console.warn("Guardado en modo local (respaldo):", cloudErr);
      }

      reviews.unshift(newReview);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
      } catch (err) {
        console.warn("No se pudo guardar en localStorage:", err);
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        if (window.lucide) window.lucide.createIcons();
      }

      // Reset form
      form.reset();
      starsHidden.value = "5";
      updateStarsUI(5);
      customUniGroup.classList.add("hidden-group");
      charCounter.textContent = "0 / 450";

      // Reset filter to "all" so user sees their review immediately
      activeFilter = "all";
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      filterPills.forEach((p) => p.classList.toggle("active", p.getAttribute("data-filter") === "all"));

      renderSummary();
      renderReviewsList();

      // Show confirmation banner
      if (successBanner) {
        successBanner.hidden = false;
        setTimeout(() => {
          successBanner.hidden = true;
        }, 5500);
      }
    });
  }

  renderSummary();
  renderReviewsList();

  // Sync with Cloud DB (Firebase or Supabase) if configured
  fetchCloudReviews()
    .then((cloudList) => {
      if (Array.isArray(cloudList)) {
        reviews = mergeWithSeedReviews(cloudList);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
        } catch (err) {}
        renderSummary();
        renderReviewsList();
      }
    })
    .catch((err) => {
      console.warn("Usando reseñas locales:", err);
    });
}
