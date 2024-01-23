/*-- DÉBUT : Drip Content paiement en plusieurs fois combiné --*/

window.addEventListener('load', function() {
  function calculateDaysLeft(startDate, daysToAdd) {
    var futureDate = new Date(startDate.getTime());
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
  }

  function checkMemberPlan() {
    var userData = JSON.parse(localStorage.getItem('_ms-mem'));
    console.log('User data:', userData);

    if (userData && userData.metaData && userData.planConnections) {
      var miniPackPlanIds = [
        "pln_le-mini-pack-webflow-3-fois--lsj50wev",
        "pln_le-mini-pack-webflow-2kje0tkt"
      ];
      var megaPackPlanIds = [
        "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
        "pln_le-mega-pack-webflow-2ljs0t3b"
      ];
      var hasSpecialPlan = userData.planConnections.some(plan => {
      return plan.planId === "pln_le-mini-pack-webflow-2kje0tkt" && plan.status === "ACTIVE";
      }) || userData.planConnections.some(plan => {
      return plan.planId === "pln_le-mega-pack-webflow-2ljs0t3b" && plan.status === "ACTIVE";
      });
      var hasMiniPackPlan = miniPackPlanIds.includes(userData.planConnections[0].planId) && userData.planConnections[0].status === "ACTIVE";
      var hasMegaPackPlan = megaPackPlanIds.includes(userData.planConnections[0].planId) && userData.planConnections[0].status === "ACTIVE";

      var startDate = hasMiniPackPlan ? new Date(userData.metaData.start_date_wf_minipack) : new Date(userData.metaData.start_date_wf_megapack);
      var daysForLevel2 = 30;
      var daysForLevel3 = 60;
      var daysSinceStart = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));

      var accessLevel = 1;
      if (daysSinceStart >= daysForLevel2) { accessLevel = 2; }
      if (daysSinceStart >= daysForLevel3) { accessLevel = 3; }

      var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
      var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);
      var timeLeftSpanLevel2 = document.getElementById('courseTimeLeft2');
      var timeLeftSpanLevel3 = document.getElementById('courseTimeLeft3');
      var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
      var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);

      if (timeLeftSpanLevel2) timeLeftSpanLevel2.textContent = timeLeftForLevel2.toString();
      if (timeLeftSpanLevel3) timeLeftSpanLevel3.textContent = timeLeftForLevel3.toString();

      var courseTimeLeftCard2 = document.getElementById('courseTimeLeftCard2');
      var courseTimeLeftPrice = document.getElementById('courseTimeLeftPrice');
      var courseTimeLeftButton = document.getElementById('courseTimeLeftButton');

      if (daysSinceStart >= daysForLevel2) {
        if (courseTimeLeftCard2) courseTimeLeftCard2.style.display = 'none';
        
        // Définir le prix et l'URL du bouton pour le plan e-commerce
        if (hasMiniPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "129€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/129";
        }
        // Définir le prix et l'URL du bouton pour le pack plan
        if (hasMegaPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "180€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://coriace.co/60";
        }
      } else {
        // Définir le prix et l'URL du bouton pour le plan e-commerce
        if (hasMiniPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "299€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/299";
        }
        // Définir le prix et l'URL du bouton pour le pack plan
        if (hasMegaPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "360€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://coriace.co/120";
        }
      }

      document.querySelectorAll('.course_lesson-item').forEach(function(item) {
        var paidId = parseInt(hasMiniPackPlan ? item.getAttribute('data-paid-id') : item.getAttribute('data-pack-paid-id'), 10);
        var lessonMask = item.querySelector('.course_lesson-mask');

        if (paidId > accessLevel) {
          item.style.opacity = '0.5';
          if (lessonMask) lessonMask.style.display = 'block';
        } else {
          item.style.opacity = '1';
          if (lessonMask) lessonMask.style.display = 'none';
        }
      });

      var courseNavigation = document.getElementById('courseNavigation');
      var allItemsActive = accessLevel >= 3 || hasSpecialPlan;
      if (!allItemsActive && courseNavigation) courseNavigation.style.display = 'none';
      else if (courseNavigation) courseNavigation.style.display = 'flex';
    } else {
      console.log("Les informations du membre ne sont pas disponibles dans le localStorage ou la date de début est manquante.");
    }
  }

  checkMemberPlan();
});

/*-- FIN : Drip Content paiement en plusieurs fois combiné --*/
