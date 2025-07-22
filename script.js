// Al cargar la página, restaurar los ramos aprobados desde localStorage
window.addEventListener('DOMContentLoaded', () => {
  const aprobados = JSON.parse(localStorage.getItem('ramos_aprobados') || '[]');
  aprobados.forEach(id => {
    const ramo = document.getElementById(id);
    if (ramo) {
      ramo.classList.add('aprobado');
      const unlocks = JSON.parse(ramo.dataset.unlock || "[]");
      unlocks.forEach(siguienteId => {
        const siguiente = document.getElementById(siguienteId);
        if (siguiente) {
          siguiente.classList.remove('bloqueado');
        }
      });
    }
  });
});

// Evento para aprobar y desbloquear ramos
document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;
    if (ramo.classList.contains('aprobado')) return;

    ramo.classList.add('aprobado');

    // Guardar en localStorage
    let aprobados = JSON.parse(localStorage.getItem('ramos_aprobados') || '[]');
    if (!aprobados.includes(ramo.id)) {
      aprobados.push(ramo.id);
      localStorage.setItem('ramos_aprobados', JSON.stringify(aprobados));
    }

    // Desbloquear siguientes
    const desbloquear = JSON.parse(ramo.dataset.unlock || "[]");
    desbloquear.forEach(id => {
      const siguiente = document.getElementById(id);
      if (siguiente) {
        siguiente.classList.remove('bloqueado');
      }
    });
  });
});
