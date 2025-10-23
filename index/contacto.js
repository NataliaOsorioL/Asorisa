document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !asunto || !mensaje) {
      alert("⚠️ Por favor completa todos los campos antes de enviar.");
      return;
    }

    // valida correo 
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(correo)) {
      alert("📧 Ingresa un correo electrónico válido.");
      return;
    }

    alert("✅ ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    form.reset();
  });
});
