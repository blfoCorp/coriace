document.addEventListener('DOMContentLoaded', function() {
  function updateCountdown() {
    // Définissez la date cible du compte à rebours.
    var countDownDate = new Date("April 15, 2024 20:00:00").getTime();
  
    // Obtenez tous les éléments qui ont l'attribut personnalisé 'data-co-member="preSellTimer"'.
    var countdownElements = document.querySelectorAll('[data-co-member="preSellTimer"]');
  
    // Mettez à jour le compte à rebours toutes les secondes.
    var x = setInterval(function() {
  
      // Obtenez la date et l'heure actuelles.
      var now = new Date().getTime();
  
      // Trouvez la distance entre maintenant et la date de compte à rebours.
      var distance = countDownDate - now;
  
      // Calculs de temps pour les jours, heures, minutes et secondes.
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Affichez le résultat dans chaque élément avec l'attribut 'data-co-member="preSellTimer"'.
      countdownElements.forEach(function(element) {
        element.innerHTML = days + "j " + hours + "h "
        + minutes + "m " + seconds + "s ";
      });
  
      // Si le compte à rebours est terminé, écrivez un texte dans chaque élément.
      if (distance < 0) {
        clearInterval(x);
        countdownElements.forEach(function(element) {
          element.innerHTML = "Expiré !";
        });
      }
    }, 1000);
  }
  
  // Initialiser le compte à rebours.
  updateCountdown();
}
