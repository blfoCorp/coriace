/* --- REDIRECTION DES MEMBRES NON-CONNECTÉ EN CAS D'ACHAT DE LA FORMATION POUR CRÉER LEUR COMPTE DANS UN PREMIER TEMPS ---*/
async function redirectToLoginIfNotMember(event) {
  // Empêche l'action par défaut (pour les liens, cela empêche la navigation)
  event.preventDefault();

  const response = await window.$memberstackDom.getCurrentMember();
  const member = response.data;

  // Si l'utilisateur est connecté, exécutez l'action par défaut (suivre le lien, cliquer sur le bouton, etc.)
  if (member) {
    // Si c'est un lien, suivez l'URL du href
    if (event.target.tagName.toLowerCase() === 'a') {
      window.location.href = event.target.href;
    } else {
      // Pour un bouton, vous pouvez ajouter ici une logique supplémentaire si nécessaire
    }
  } else {
    // Si l'utilisateur n'est pas connecté, préparez et redirigez-le vers la page de connexion avec l'URL actuelle en tant que paramètre de retour
    const currentUrl = window.location.href;
    const encodedCurrentUrl = encodeURIComponent(currentUrl);
    window.location.href = `https://app.coriace.co/app/inscription/etape-1-inscription-coriace?returnUrl=${encodedCurrentUrl}`;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const protectedElements = document.querySelectorAll('a[data-protected="true"], button[data-protected="true"]');

  protectedElements.forEach(element => {
    element.addEventListener('click', redirectToLoginIfNotMember);
  });
});
