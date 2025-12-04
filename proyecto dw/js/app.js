document.addEventListener("DOMContentLoaded", () => {
  // Toggle menú móvil
  const btn = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Filtro de cursos (página Cursos)
  const grid = document.getElementById("gridCursos");
  const botones = document.querySelectorAll(".filtro-curso");
  if (grid && botones.length) {
    botones.forEach(b => {
      b.addEventListener("click", () => {
        const filtro = b.dataset.filter; // 'all' | 'online' | 'presencial' | 'taller' | 'empresas'
        const cards = grid.querySelectorAll(".card");
        cards.forEach(card => {
          const kind = card.getAttribute("data-kind") || "";
          const match = (filtro === "all") || (kind === filtro);
          card.style.display = match ? "" : "none";
        });
      });
    });
  }
});


// Scroll to top
const toTop = document.getElementById('toTop');
const toggleToTop = () => {
  if (window.scrollY > 480) {
    toTop.style.display = 'block';
  } else {
    toTop.style.display = 'none';
  }
};
window.addEventListener('scroll', toggleToTop);
toggleToTop();

toTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);


document.addEventListener('click', e => {
  if (!e.target.matches('.accordion-btn')) return;
  const item = e.target.closest('.accordion-item');
  const open = item.classList.toggle('open');
  e.target.setAttribute('aria-expanded', open ? 'true' : 'false');
  // opcional: cerrar otros
  item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
    if(i!==item){ i.classList.remove('open'); i.querySelector('.accordion-btn').setAttribute('aria-expanded','false'); }
  });
});



  // Datos de profesores
(function () {
  const teacherProfiles = {
    francesca: {
      name: "Francesca Izurieta",
      role: "Ilustración digital",
      bio: "<p>Francesca es ilustradora con 8 años de experiencia en editorial y publicidad. Enseña técnicas digitales y conceptualización de personajes.</p>",
      email: "francesca@santagrafica.com",
      insta: "https://instagram.com/francesca"
    },
    osvaldo: {
      name: "Osvaldo Sequeira",
      role: "Dibujo y pintura",
      bio: "<p>Osvaldo trabaja en pintura contemporánea y tutorías de figura humana. Enfatiza fundamentos y procesos tradicionales.</p>",
      email: "osvaldo@santagrafica.com",
      insta: "https://instagram.com/osvaldo"
    },
    roberto: {
      name: "Roberto Guillén",
      role: "Animación",
      bio: "<p>Roberto es animador 2D/3D con experiencia en series y videojuegos; su enfoque es el timing y el storytelling visual.</p>",
      email: "roberto@santagrafica.com",
      insta: "https://instagram.com/roberto"
    },
    maria: {
      name: "María López",
      role: "Acuarela",
      bio: "<p>María enseña técnicas de acuarela aplicadas a ilustración y paisajismo, mezclando color y composiciones contemporáneas.</p>",
      email: "maria@santagrafica.com",
      insta: "https://instagram.com/maria"
    },
    carlos: {
      name: "Carlos Méndez",
      role: "Modelado 3D",
      bio: "<p>Carlos es especialista en modelado y texturizado para producción 3D y visualización arquitectónica.</p>",
      email: "carlos@santagrafica.com",
      insta: "https://instagram.com/carlos"
    },
    ana: {
      name: "Ana Rodríguez",
      role: "Tipografía",
      bio: "<p>Ana diseña sistemas tipográficos y enseña teoría, legibilidad y práctica de lettering para proyectos reales.</p>",
      email: "ana@santagrafica.com",
      insta: "https://instagram.com/ana"
    }
  };

  function openProfileModal(profile) {
    // Fallback si Swal no está disponible
    if (typeof Swal === "undefined") {
      const text = `${profile.name}\n${profile.role}\n\n${profile.bio.replace(/<[^>]+>/g, "")}\n\nContacto: ${profile.email}`;
      alert(text);
      return;
    }

    const html = `
      <div style="text-align:left; max-width:560px; margin:0 auto;">
        <div style="font-weight:700; margin-bottom:8px;">${profile.role}</div>
        ${profile.bio}
        <p style="margin-top:10px; font-size:.95rem;">
          <strong>Contacto:</strong><br/>
          <a href="mailto:${profile.email}" style="color:var(--morado)">${profile.email}</a>
          ${profile.insta ? `<br/><a href="${profile.insta}" target="_blank" rel="noopener noreferrer" style="color:var(--morado)">Instagram</a>` : ''}
        </p>
      </div>
    `;

    Swal.fire({
      title: `<strong>${profile.name}</strong>`,
      html,
      icon: "info",
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: "var(--verde)",
      width: 640,
      background: "#fff"
    });
  }

  // Delegated click handler
  function handleClick(e) {
    const btn = e.target.closest(".view-profile");
    if (!btn) return;
    e.preventDefault();

    const key = btn.dataset.teacher;
    if (!key) return;
    const profile = teacherProfiles[key];
    if (!profile) return;

    openProfileModal(profile);
  }

  // Attach listener once DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.addEventListener("click", handleClick);
    });
  } else {
    document.addEventListener("click", handleClick);
  }

  // Helper debug function (usa desde la consola: __openTeacherProfile('francesca'))
  window.__openTeacherProfile = function (key) {
    const p = teacherProfiles[key];
    if (!p) return console.warn("No profile:", key);
    openProfileModal(p);
  };
})();


///// botones filtro de pagina de cursos

const botonesFiltro = document.querySelectorAll('.filtro-curso');

botonesFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    botonesFiltro.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});



// Inscripciones -> SweetAlert + WhatsApp
(function(){
  const WHATSAPP_PHONE = "50670797960"; //
  const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_PHONE}`;

  function getInscribeButtons() {
    const byClass = Array.from(document.querySelectorAll(".inscribirme"));
    if (byClass.length) return byClass;
    return Array.from(document.querySelectorAll("a.btn, button.btn"))
      .filter(el => (el.textContent || "").trim().toLowerCase() === "inscribirme");
  }

  function openInscripcionSwal(courseName) {
    const prefilled = encodeURIComponent(
      `Hola, quiero consultar disponibilidad e inscribirme en: ${courseName}`
    );

    // Contenido html 
    const html = `
      <p style="text-align:left; margin:0 0 8px;">
        Antes de inscribirte por favor <strong>consulta disponibilidad</strong> por WhatsApp.
      </p>
      <p style="text-align:left; margin:0 0 12px; color:var(--muted); font-size:0.95rem;">
        Un asesor te confirmará fechas, vacantes y pasos para el pago.
      </p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
        <a id="swal-wa-link" href="${WHATSAPP_BASE}?text=${prefilled}" target="_blank" rel="noopener noreferrer"
           style="display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:10px; text-decoration:none; background:#25D366; color:#fff; font-weight:700;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 3.5C18.9 2 16.9 1 15 1 9 1 4.5 5.5 4.5 11 4.5 12.6 5 14.1 5.9 15.4L3 21l5.9-2.2C10.1 19.2 12.5 19.9 15 19.9 20 19.9 23.9 15.4 23.9 10.5 23.9 8.4 23 6.4 21.5 4.9L20.5 3.5Z" fill="white"/>
          </svg>
          WhatsApp
        </a>
        <a id="swal-contact-link" href="./contacto.html" style="display:inline-block; padding:8px 12px; border-radius:10px; text-decoration:none; background:transparent; border:1px solid var(--border); color:var(--texto); font-weight:700;">
          Coordinar con asesor
        </a>
      </div>
    `;

    Swal.fire({
      icon: 'info',
      title: `Inscribirme — ${courseName}`,
      html,
      showConfirmButton: false,
      showCloseButton: true,
      width: 600,
      didOpen: () => {
        const wa = document.getElementById("swal-wa-link");
        wa?.focus();
      }
    });
  }

  function onClick(e) {
    const btn = e.target.closest(".inscribirme") || (e.target.matches(".btn") && (e.target.textContent||"").trim().toLowerCase() === "inscribirme" ? e.target : null);
    if (!btn) return;
    e.preventDefault();

    const course = btn.dataset.course || btn.getAttribute("data-course") || "este curso";
    openInscripcionSwal(course);
  }

  document.addEventListener("click", onClick);
})();

////// formulario de contacto

document.getElementById("formContacto").addEventListener("submit", function(event){
  event.preventDefault();

  emailjs.sendForm("service_pyvx6c5", "template_ldupgya", this)
  .then(function() {
    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: 'Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarnos!',
      confirmButtonColor: '#3085d6'
    });
    document.getElementById("formContacto").reset();
  }, function(error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al enviar',
      text: 'Ocurrió un problema al enviar el mensaje. Intenta de nuevo.',
      confirmButtonColor: '#d33'
    });
    console.error('Error:', error);
  });
});



// =========================================
//   SWEET ALERT — ARTÍCULO 1
// =========================================
function leerArticulo1() {
  Swal.fire({
    title: 'Introducción a la Ilustración Digital',
    html:`
    <div style="text-align:left; max-height:400px; overflow-y:auto; padding-right:12px;">

      <h2 style="font-size:22px; margin-bottom:12px;">El Proceso Creativo: Cómo Nace una Ilustración</h2>

      <p>
        Detrás de cada ilustración terminada existe un proceso creativo lleno de decisiones, exploración
        y técnica. En Santa Gráfica, este proceso se trabaja paso a paso para que cada estudiante pueda
        desarrollar su estilo y dominar la narrativa visual.
      </p>

      <p>
        <strong>1. Observación y referencia</strong><br>
        Antes de dibujar, analizamos referencias, estudiamos formas, colores y estilos para entender qué queremos comunicar.
      </p>

      <p>
        <strong>2. Bocetaje inicial</strong><br>
        Aquí nacen las ideas. Son bocetos rápidos que capturan composición, intención y energía.
      </p>

      <p>
        <strong>3. Refinamiento del dibujo</strong><br>
        Se definen proporciones, anatomía, perspectiva y elementos principales. El boceto se vuelve estructura.
      </p>

      <p>
        <strong>4. Color y atmósfera</strong><br>
        El color comunica emoción. Elegimos paletas que refuercen la historia y trabajamos luces, sombras y texturas.
      </p>

      <p>
        <strong>5. Detalles finales</strong><br>
        Ajustes, bordes, luces y toques finales que dan vida y personalidad a la ilustración.
      </p>

      <p>
        El proceso creativo no es lineal; cada artista lo vive distinto. Lo importante es encontrar un método que permita expresar tu visión.
      </p>

    </div>
    `,
    width: "800px",
    showCloseButton: true,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "var(--morado)",
  });
}

// =========================================
//   SWEET ALERT — ARTÍCULO 2
// =========================================
function leerArticulo2() {
  Swal.fire({
    title: 'Cómo Elegir Materiales de Acuarela',
    html: `
    <div style="text-align:left; max-height:400px; overflow-y:auto; padding-right:12px;">

      <h2 style="font-size:22px; margin-bottom:12px;">5 Técnicas de Acuarela para Principiantes</h2>

      <p>
        La acuarela combina pigmento, agua y papel para crear efectos únicos. Estas son algunas de las
        técnicas esenciales que enseñamos en Santa Gráfica.
      </p>

      <p>
        <strong>1. Húmedo sobre húmedo</strong><br>
        Aplicar pintura sobre papel mojado crea mezclas naturales, bordes suaves y atmósferas fluidas.
      </p>

      <p>
        <strong>2. Húmedo sobre seco</strong><br>
        Ideal para detalles y trazos definidos, porque mantiene el control total del pigmento.
      </p>

      <p>
        <strong>3. Degradados</strong><br>
        Transiciones suaves del tono intenso al claro. Son clave para fondos, luces y volúmenes.
      </p>

      <p>
        <strong>4. Efectos con sal</strong><br>
        Al espolvorear sal sobre pintura húmeda se generan texturas cristalizadas y patrones naturales.
      </p>

      <p>
        <strong>5. Levantado de color</strong><br>
        Usando un pincel húmedo limpio, se remueve pigmento para crear luces o corregir errores.
      </p>

      <p>
        Con práctica constante, estas técnicas te permitirán crear flores, paisajes, retratos y obras más complejas.
      </p>

    </div>
    `,
    width: "800px",
    showCloseButton: true,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "var(--morado)",
  });
}



// =========================================
//   SWEET ALERT — ARTÍCULO 3
// =========================================
function leerArticulo3() {
  Swal.fire({
    title: 'Técnicas para Mejorar tu Dibujo Anatómico',
    html: `
      <div style="text-align:left; max-height:400px; overflow-y:auto; padding-right:12px;">

        <h2 style="font-size:22px; margin-bottom:12px;">Cómo Elegir la Mejor Paleta de Colores para tu Proyecto</h2>

        <p>
          La paleta de colores define la personalidad de un diseño. Comunica emociones y dirige la mirada,
          por lo que es una de las primeras decisiones importantes en cualquier proyecto visual.
        </p>

        <p>
          <strong>1. Define el objetivo visual</strong><br>
          ¿El proyecto debe emocionar, inspirar, vender o relajar? Cada intención requiere colores específicos.
        </p>

        <p>
          <strong>2. Usa armonías confiables</strong><br>
          Paletas análogas, complementarias, triádicas o monocromáticas siempre funcionan bien según el contexto.
        </p>

        <p>
          <strong>3. Genera contraste</strong><br>
          Un buen contraste destaca elementos clave y evita que el diseño se vea plano o sin jerarquía.
        </p>

        <p>
          <strong>4. Psicología del color</strong><br>
          El azul calma, el rojo energiza, el morado inspira creatividad, el verde transmite frescura.
        </p>

        <p>
          <strong>5. Itera y ajusta</strong><br>
          No existe una paleta perfecta al primer intento. Lo normal es probar, comparar y ajustar hasta lograr armonía visual.
        </p>

        <p>
          Con una paleta bien definida, cualquier proyecto puede elevar su impacto visual y volverse memorable.
        </p>

      </div>
      `,
    width: "800px",
    showCloseButton: true,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "var(--morado)",
  });
}

