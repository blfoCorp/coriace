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
      var ecomPlanIds = [
        "pln_formation-webflow-e-commerce-cms-3-fois--y110qun",
        "pln_formation-webflow-e-commerce-cms-kb40awg"
      ];
      var packPlanIds = [
        "pln_webflow-le-pack-3-fois--sshd024y",
        "pln_webflow-le-pack-ezhb0291"
      ];
      var megaPackPlanIds = [
        "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
        "pln_le-mega-pack-webflow-2ljs0t3b"
      ];
      var hasSpecialPlan = userData.planConnections.some(plan => {
      return plan.planId === "pln_formation-webflow-e-commerce-cms-kb40awg" && plan.status === "ACTIVE";
      }) || userData.planConnections.some(plan => {
      return plan.planId === "pln_webflow-le-pack-ezhb0291" && plan.status === "ACTIVE";
      }) || userData.planConnections.some(plan => {
      return plan.planId === "pln_le-mega-pack-webflow-2ljs0t3b" && plan.status === "ACTIVE";
      });
      var hasEcomPlan = userData.planConnections.some(plan => plan.planId === "pln_formation-webflow-e-commerce-cms-3-fois--y110qun" && plan.status === "ACTIVE");
      var hasPackPlan = userData.planConnections.some(plan => plan.planId === "pln_webflow-le-pack-3-fois--sshd024y" && plan.status === "ACTIVE");
      var hasMegaPackPlan = userData.planConnections.some(plan => plan.planId === "pln_le-mega-pack-webflow-3-fois--tnkm02zj" && plan.status === "ACTIVE");

      var startDate = hasEcomPlan ? new Date(userData.metaData.start_date_wf_eco) : new Date(userData.metaData.start_date_wf_pack);
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
        
        // Définir le prix et l'URL du bouton pour le plan e-commerce
        if (hasEcomPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "60€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/formation/commande-webflow-ecommerce-cms-60/etape/commande-webflow-ecommerce-cms-60/";
          if (courseTimeName1) courseTimeName1.textContent = "Niveau 1";
          if (courseTimeName2) courseTimeName2.textContent = "Niveau 2";
        }
        // Définir le prix et l'URL du bouton pour le pack plan
        if (hasPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "180€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://coriace.co/60";
          if (courseTimeName1) courseTimeName1.textContent = "Wf E-co.";
          if (courseTimeName2) courseTimeName2.textContent = "Wf CMS";
        }
      } else {
        // Définir le prix et l'URL du bouton pour le plan e-commerce
        if (hasEcomPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "120€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.coriace.co/formation/commande-webflow-ecommerce-cms-120/etape/commande-webflow-ecommerce-cms-120/";
          if (courseTimeName1) courseTimeName1.textContent = "Niveau 1";
          if (courseTimeName2) courseTimeName2.textContent = "Niveau 2";
        }
        // Définir le prix et l'URL du bouton pour le pack plan
        if (hasPackPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "360€";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://coriace.co/120";
          if (courseTimeName1) courseTimeName1.textContent = "Wf E-co.";
          if (courseTimeName2) courseTimeName2.textContent = "Wf CMS";
        }
      }

      document.querySelectorAll('.course_lesson-item').forEach(function(item) {
        var paidId = parseInt(hasEcomPlan ? item.getAttribute('data-paid-id') : item.getAttribute('data-pack-paid-id'), 10);
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
