/*---  SI MEMBRE PAS CONNECTÉ SUR UNE PAGE SPÉCIFIQUE REDIRECTION PAGE DE CONNEXION ----*/

document.addEventListener('DOMContentLoaded', function () {
  var protectedContent = document.querySelector('[data-ms-content="protected"]');

  // Vérifiez si l'utilisateur est sur une page protégée et si la clé '_ms-mem' est absente du localStorage
  if (protectedContent && !localStorage.getItem('_ms-mem')) {
    // Si la clé n'est pas présente, redirige l'utilisateur vers la page de connexion
    window.location.href = '/app/connexion';
  }
});
