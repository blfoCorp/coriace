/*-- DÉBUT : Drip Content paiement en plusieurs fois --*/

window.addEventListener('load', function() {
  function calculateDaysLeft(startDate, daysToAdd) {
    var futureDate = new Date(startDate.getTime());
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
  }

  function checkMemberPlan() {
    var userData = JSON.parse(localStorage.getItem('_ms-mem'));
    console.log('User data:', userData);
    var allItemsActive = true; // Variable pour suivre si tous les éléments sont actifs

    if (userData && userData.metaData && userData.metaData.start_date_wf_eco && userData.planConnections) {
      var validPlanIds = ["pln_formation-webflow-e-commerce-cms-3-fois--y110qun"]; // Remplacez avec vos plans IDs en tableau si plusieurs
      
      var hasRequiredPlan = userData.planConnections.some(function(plan) {
        return validPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
      });

      if (hasRequiredPlan) {
        var startDate = new Date(userData.metaData.start_date_wf_eco);
        var daysForLevel2 = 30; // Nombre de jours après lesquels le niveau 2 est disponible
        var daysForLevel3 = 60; // Nombre de jours après lesquels le niveau 3 est disponible
        var now = new Date();
        var daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        
        var accessLevel = 1; // Définir le niveau d'accès initial
        if (daysSinceStart >= daysForLevel2) { accessLevel = 2; }
        if (daysSinceStart >= daysForLevel3) { accessLevel = 3; }

        // Mettre à jour les éléments span avec le temps restant pour les niveaux 2 et 3
        var timeLeftSpanLevel2 = document.getElementById('courseTimeLeft2'); // ID pour le niveau 2
        var timeLeftSpanLevel3 = document.getElementById('courseTimeLeft3'); // ID pour le niveau 3
        var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
        var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);

        if (timeLeftSpanLevel2) timeLeftSpanLevel2.textContent = timeLeftForLevel2 + " jours";
        if (timeLeftSpanLevel3) timeLeftSpanLevel3.textContent = timeLeftForLevel3 + " jours";

        document.querySelectorAll('.course_lesson-item').forEach(function(item) {
          var paidId = parseInt(item.getAttribute('data-paid-id'), 10);
          var lessonMask = item.querySelector('.course_lesson-mask-wpdv');

          if (paidId > accessLevel) {
            allItemsActive = false; // Indiquer qu'il y a au moins un élément inactif
            item.style.opacity = '0.5'; // Griser l'item
            if (lessonMask) {
              lessonMask.style.display = 'block'; // Afficher le masque
            }
          } else {
            item.style.opacity = '1'; // Restaurer l'opacité normale
            if (lessonMask) {
              lessonMask.style.display = 'none'; // Masquer le masque
            }
          }
        });

        var courseNavigation = document.getElementById('courseNavigationEco');
        if (!allItemsActive && courseNavigation) {
          courseNavigation.style.display = 'none';
        } else if (courseNavigation) {
          courseNavigation.style.display = 'flex';
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
