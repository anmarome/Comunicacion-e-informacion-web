document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  if (navToggle && menu){
    navToggle.addEventListener("click", () => menu.classList.toggle("open"));
  }

/*   // Placeholder formulario
  const mini = document.getElementById("miniFooterForm");
  mini?.addEventListener("submit", e => { e.preventDefault(); alert("Mensaje enviado (footer)"); mini.reset(); });

  const contact = document.getElementById("formContacto");
  contact?.addEventListener("submit", e => { e.preventDefault(); alert("Mensaje enviado"); contact.reset(); }); */
});
