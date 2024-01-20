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

    if (userData && userData.metaData && userData.metaData.start_date_wf_wpdv && userData.planConnections) {
      var validPlanIds = ["pln_formation-webflow-page-de-vente-3-fois--ul110zw2"]; // Remplacez avec vos plans IDs en tableau si plusieurs
      
      var hasRequiredPlan = userData.planConnections.some(function(plan) {
        return validPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
      });

      console.log(`Has required plan: ${hasRequiredPlan}`);
      if (hasRequiredPlan) {
        var startDate = new Date(userData.metaData.start_date_wf_wpdv);
        console.log(`Start date from metadata: ${startDate}`);
        
        var daysForLevel2 = 30; // Nombre de jours après lesquels le niveau 2 est disponible
        var daysForLevel3 = 60; // Nombre de jours après lesquels le niveau 3 est disponible
        var now = new Date();
        var daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        console.log(`Days since start: ${daysSinceStart}`);
        
        var accessLevel = 1; // Définir le niveau d'accès initial
        if (daysSinceStart >= daysForLevel2) { accessLevel = 2; } // Mise à jour de l'accès pour le niveau 2
        if (daysSinceStart >= daysForLevel3) { accessLevel = 3; } // Mise à jour de l'accès pour le niveau 3

        document.querySelectorAll('.course_lesson-item').forEach(function(item, index) {
          var paidId = parseInt(item.getAttribute('data-paid-id'), 10);
          var lessonMask = item.querySelector('.course_lesson-mask-wpdv');

          // Calcul du temps restant pour les niveaux 2 et 3
          var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2 - daysSinceStart);
          var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3 - daysSinceStart);
          var daysLeft = (paidId === 2) ? timeLeftForLevel2 : (paidId === 3) ? timeLeftForLevel3 : 0;

          if (paidId === 2 || paidId === 3) {
            var courseTimeLeftElement = item.querySelector('#courseTimeLeft');
            if (courseTimeLeftElement) {
              courseTimeLeftElement.textContent = daysLeft + " jours";
              console.log(`Updated #courseTimeLeft for item ${index} to: ${daysLeft} jours`);
            }
          }

          if (paidId > accessLevel) {
            allItemsActive = false; // Il y a au moins un élément inactif
            item.style.opacity = '0.5'; // Griser l'item
            if (lessonMask) {
              lessonMask.style.display = 'block'; // Afficher le masque
              console.log(`Displayed lesson mask for item ${index}`);
            }
          } else {
            item.style.opacity = '1'; // Restaurer l'opacité normale
            if (lessonMask) {
              lessonMask.style.display = 'none'; // Masquer le masque
              console.log(`Hid lesson mask for item ${index}`);
            }
          }
        });

        var courseNavigation = document.getElementById('courseNavigationWpdv');
        if (!allItemsActive && courseNavigation) {
          courseNavigation.style.display = 'none';
          console.log('courseNavigationWpdv is hidden because not all items are active.');
        } else if (courseNavigation) {
          courseNavigation.style.display = 'block';
          console.log('courseNavigationWpdv is shown because all items are active.');
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
