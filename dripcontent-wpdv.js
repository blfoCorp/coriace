/*-- DÉBUT : Drip Content paiement en plusieurs fois --*/

window.addEventListener('load', function() {
  function calculateDaysLeft(startDate, daysToAdd) {
    var futureDate = new Date(startDate.getTime());
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
  }

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
        var daysForLevel2 = 30; // Remplacez par le nombre de jours après lesquels le niveau 2 est disponible
        var daysForLevel3 = 60; // Remplacez par le nombre de jours après lesquels le niveau 3 est disponible

        var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
        var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);

        document.querySelectorAll('.course_lesson-item').forEach(function(item) {
          var paidId = parseInt(item.getAttribute('data-paid-id'), 10);
          var lessonMask = item.querySelector('.course_lesson-mask-wpdv');

          var daysLeft = paidId === 2 ? timeLeftForLevel2 : timeLeftForLevel3;
          var courseTimeLeftElement = item.querySelector('#courseTimeLeft');
          if (courseTimeLeftElement) {
            courseTimeLeftElement.textContent = daysLeft + " jours";
          }

          if (paidId > accessLevel) {
            allItemsActive = false; // Indiquer qu'il y a au moins un élément inactif
            item.style.opacity = '0.5'; // Griser l'item
            if (lessonMask) {
              lessonMask.style.display = 'block';
            }
          } else {
            item.style.opacity = '1'; // Restaurer l'opacité normale
            if (lessonMask) {
              lessonMask.style.display = 'none';
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
