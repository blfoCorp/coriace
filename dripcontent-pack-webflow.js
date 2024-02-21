/*-- DÉBUT : Drip Content paiement en plusieurs fois combiné --*/

window.addEventListener('load', function() {
  function calculateDaysLeft(startDate, daysToAdd) {
  if (!startDate) {
    console.error('La date de début est undefined.');
    return 0; // Ou toute autre valeur par défaut que vous voulez retourner dans ce cas.
  }

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
      var hasMiniPackPlan = userData.planConnections.some(plan => plan.planId === "pln_le-mini-pack-webflow-3-fois--lsj50wev" && plan.status === "ACTIVE");
      var hasMegaPackPlan = userData.planConnections.some(plan => plan.planId === "pln_le-mega-pack-webflow-3-fois--tnkm02zj" && plan.status === "ACTIVE");

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
      var courseTimeName1 = document.getElementById('courseTimeName1');
      var courseTimeName2 = document.getElementById('courseTimeName2');

      if (daysSinceStart >= daysForLevel2) {
        if (courseTimeLeftCard2) courseTimeLeftCard2.style.display = 'none';
        
        // Définir le prix et l'URL du bouton pour le plan mini-pack
        if (hasMiniPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "52€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/formation/commande-mini-pack-webflow-52/etape/commande-mini-pack-webflow-52/";
          if (courseTimeName1) courseTimeName1.textContent = "Mini Pack 1";
          if (courseTimeName2) courseTimeName2.textContent = "Mini Pack 2";
        }
        // Définir le prix et l'URL du bouton pour le pack plan
        if (hasMegaPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "116€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/formation/commande-mega-pack-webflow-116/etape/commande-mega-pack-webflow-116/";
          if (courseTimeName1) courseTimeName1.textContent = "Mega Pack 1";
          if (courseTimeName2) courseTimeName2.textContent = "Mega Pack 2";
        }
      } else {
        // Définir le prix et l'URL du bouton pour le plan mini-pack
        if (hasMiniPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "104€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/formation/commande-mini-pack-webflow-104/etape/commande-mini-pack-webflow-104/";
          if (courseTimeName1) courseTimeName1.textContent = "Mini Pack 1";
          if (courseTimeName2) courseTimeName2.textContent = "Mini Pack 2";
        }
        // Définir le prix et l'URL du bouton pour le pack plan
        if (hasMegaPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "232€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/formation/commande-mega-pack-webflow-232/etape/commande-mega-pack-webflow-232/";
          if (courseTimeName1) courseTimeName1.textContent = "Mega Pack 1";
          if (courseTimeName2) courseTimeName2.textContent = "Mega Pack 2";
        }
      }

      document.querySelectorAll('.course_lesson-item').forEach(function(item) {
        var paidId = parseInt(hasMiniPackPlan ? item.getAttribute('data-minipack-paid-id') : item.getAttribute('data-megapack-paid-id'), 10);
        var lessonMask = item.querySelector('.course_lesson-mask');

        if (paidId > accessLevel || hasSpecialPlan) {
          item.style.opacity = '1';
          if (lessonMask) lessonMask.style.display = 'none';
        } else {
          item.style.opacity = '0.5';
          if (lessonMask) lessonMask.style.display = 'block';
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
