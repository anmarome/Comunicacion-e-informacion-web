///FORM DEL BLOG
document.addEventListener("DOMContentLoaded", function () {
  const formBlog = document.getElementById("formBlog");

  if (!formBlog) {
    console.error("❌ No se encontró el formulario con id='formBlog'");
    return;
  }

  formBlog.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_pyvx6c5", "template_u58sfio", this)
      .then(function () {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Tu mensaje ha sido enviado correctamente. ¡Gracias por escribir en el blog!',
          confirmButtonColor: '#3085d6'
        });

        formBlog.reset();
      }, function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: 'Ocurrió un problema al enviar el mensaje. Intenta de nuevo.',
          confirmButtonColor: '#d33'
        });
        console.error('Error:', error);
      });
  });
});
