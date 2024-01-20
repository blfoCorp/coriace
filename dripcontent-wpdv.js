/*-- DÉBUT : Drip Content paiement en plusieurs fois --*/

window.addEventListener('load', function() {
  function checkMemberPlan() {
    var userData = JSON.parse(localStorage.getItem('_ms-mem'));
    var allItemsActive = true; // Variable pour suivre si tous les éléments sont actifs

    if (userData && userData.metaData && userData.metaData.start_date_wf_wpdv && userData.planConnections) {
      var validPlanIds = ["pln_formation-webflow-page-de-vente-3-fois--ul110zw2"]; // Remplacez avec vos plans IDs en tableau si plusieurs
      
      var hasRequiredPlan = userData.planConnections.some(function(plan) {
        return validPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
      });

      if (hasRequiredPlan) {
        var startDate = new Date(userData.metaData.start_date_wf_wpdv);
        var startDateUTC = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds());
        
        var now = new Date();
        var nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        
        var daysSinceStart = Math.floor((nowUTC - startDateUTC) / (1000 * 60 * 60 * 24));

        document.querySelectorAll('.course_lesson-item').forEach(function(item) {
          var paidId = parseInt(item.getAttribute('data-paid-id'), 10);

          var accessLevel = 1; // Exemple de logique, ajustez en fonction de votre logique d'accès
          if (daysSinceStart >= 30) { accessLevel = 2; }
          if (daysSinceStart >= 60) { accessLevel = 3; }

          // Sélectionnez l'élément masque spécifique à cet item
          var lessonMask = item.querySelector('#lessonMaskWpdv');

          if (paidId > accessLevel) {
            allItemsActive = false; // Indiquer qu'il y a au moins un élément inactif
            
            // Vérifiez si l'élément masque existe et l'afficher
            if (lessonMask) {
              lessonMask.style.display = 'block'; // Afficher l'élément masque
            }
            
          } else {
            // Masquer l'élément masque s'il est visible
            if (lessonMask) {
              lessonMask.style.display = 'none'; // Assurez-vous que l'élément masque est masqué si l'item est actif
            }
          }
        });

        // Masquer l'élément 'courseNavigationWpdv' si tous les éléments ne sont pas actifs
        if (!allItemsActive) {
          var courseNavigation = document.getElementById('courseNavigationWpdv');
          if (courseNavigation) {
            courseNavigation.style.display = 'none';
          }
        }
      } else {
        console.log("L'utilisateur n'est pas sur un des plans requis pour ce contenu.");
      }
    } else {
      console.log("Les informations du membre ne sont pas disponibles dans le localStorage ou la date de début est manquante.");
    }
  }

  checkMemberPlan();
});

/*-- FIN : Drip Content paiement en plusieurs fois --*/
