/*-- DÉBUT : Drip Content paiement en plusieurs fois --*/

window.addEventListener('load', function() {
  function calculateDaysLeft(startDate, daysToAdd) {
    var futureDate = new Date(startDate.getTime());
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    var daysLeft = Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
    console.log(`Days left for add ${daysToAdd} days: ${daysLeft}`);
    return daysLeft;
  }

  function checkMemberPlan() {
    var userData = JSON.parse(localStorage.getItem('_ms-mem'));
    console.log('User data:', userData);
    var allItemsActive = true; // Variable pour suivre si tous les éléments sont actifs

    if (userData && userData.metaData && userData.metaData.start_date_wf_wpdv && userData.planConnections) {
      var validPlanIds = ["pln_formation-webflow-page-de-vente-3-fois--ul110zw2"]; // Remplacez avec vos plans IDs en tableau si plusieurs
      console.log('Valid plan IDs:', validPlanIds);
      
      var hasRequiredPlan = userData.planConnections.some(function(plan) {
        var isPlanActive = validPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
        console.log(`Plan ${plan.planId} is active: ${isPlanActive}`);
        return isPlanActive;
      });

      console.log(`Has required plan: ${hasRequiredPlan}`);
      if (hasRequiredPlan) {
        var startDate = new Date(userData.metaData.start_date_wf_wpdv);
        console.log(`Start date: ${startDate}`);
        var daysForLevel2 = 30; // Remplacez par le nombre de jours après lesquels le niveau 2 est disponible
        var daysForLevel3 = 60; // Remplacez par le nombre de jours après lesquels le niveau 3 est disponible

        var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
        var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);

        document.querySelectorAll('.course_lesson-item').forEach(function(item, index) {
          var paidId = parseInt(item.getAttribute('data-paid-id'), 10);
          console.log(`Item ${index}, paidId: ${paidId}`);

          var daysLeft = paidId === 2 ? timeLeftForLevel2 : timeLeftForLevel3;
          console.log(`Days left for paidId ${paidId}: ${daysLeft}`);

          var courseTimeLeftElement = item.querySelector('#courseTimeLeft');
          if (courseTimeLeftElement) {
            courseTimeLeftElement.textContent = daysLeft + " jours";
            console.log(`Updated #courseTimeLeft for item ${index} to: ${daysLeft} jours`);
          }

          var lessonMask = item.querySelector('.course_lesson-mask-wpdv');

          if (paidId > 1 && daysLeft > 0) {
            allItemsActive = false; // Indiquer qu'il y a au moins un élément inactif
            item.style.opacity = '0.5'; // Griser l'item
            if (lessonMask) {
              lessonMask.style.display = 'block';
              console.log(`Displayed lesson mask for item ${index}`);
            }
          } else {
            item.style.opacity = '1'; // Restaurer l'opacité normale
            if (lessonMask) {
              lessonMask.style.display = 'none';
              console.log(`Hid lesson mask for item ${index}`);
            }
          }
        });

        // Masquer l'élément 'courseNavigationWpdv' si tous les éléments ne sont pas actifs
        var courseNavigation = document.getElementById('courseNavigationWpdv');
        if (!allItemsActive && courseNavigation) {
          courseNavigation.style.display = 'none';
          console.log('courseNavigationWpdv is hidden');
        } else if (courseNavigation) {
          courseNavigation.style.display = 'block';
          console.log('courseNavigationWpdv is shown');
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
