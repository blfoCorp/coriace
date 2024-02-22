/*-- DÉBUT : Drip Content pour la formation Figma --*/

window.addEventListener('load', function() {
    function calculateDaysLeft(startDate, daysToAdd) {
      if (!startDate) {
        console.error('La date de début est undefined.');
        return 0;
      }
    
      var futureDate = new Date(startDate.getTime());
      futureDate.setDate(futureDate.getDate() + daysToAdd);
      return Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
    }
  
    function checkMemberPlan() {
      var userData = JSON.parse(localStorage.getItem('_ms-mem'));
      console.log('User data:', userData);
  
      var figmaBeginnerPlanId = "pln_coriace-figma-d-butant-3t560v1t";
      var figmaAZBeginnerPlanId = "pln_figma-a-z-d-butant-3-fois--m019l0i64";
  
      var hasFigmaBeginnerPlan = userData && userData.planConnections && userData.planConnections.some(plan => plan.planId === figmaBeginnerPlanId && plan.status === "ACTIVE");
      var hasFigmaAZBeginnerPlan = userData && userData.planConnections && userData.planConnections.some(plan => plan.planId === figmaAZBeginnerPlanId && plan.status === "ACTIVE");
  
      var startDate = hasFigmaAZBeginnerPlan ? new Date(userData.metaData.start_date_fig_debutant) : null;
      var daysForLevel2 = 30;
      var daysForLevel3 = 60;
  
      var daysSinceStart = startDate ? Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24)) : 0;
  
      var accessLevel = 1;
      if (daysSinceStart >= daysForLevel2) { accessLevel = 2; }
      if (daysSinceStart >= daysForLevel3) { accessLevel = 3; }
  
      var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
      var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);
  
      document.getElementById('courseTimeLeft2').textContent = timeLeftForLevel2.toString();
      document.getElementById('courseTimeLeft3').textContent = timeLeftForLevel3.toString();
  
      // Gestion des informations et du contenu accessible selon le niveau
      var courseTimeLeftPrice = document.getElementById('courseTimeLeftPrice');
      var courseTimeLeftButton = document.getElementById('courseTimeLeftButton');
      var courseTimeName1 = document.getElementById('courseTimeName1');
      var courseTimeName2 = document.getElementById('courseTimeName2');
  
      if (daysSinceStart >= daysForLevel2) {
        // Ici, vous ajustez les informations en fonction des niveaux d'accès
        // Par exemple, changer le prix et l'URL pour le niveau 2
        if (hasFigmaAZBeginnerPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "Prix spécial Niveau 2";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.example.com/figma-niveau-2";
          if (courseTimeName1) courseTimeName1.textContent = "Figma Débutant";
          if (courseTimeName2) courseTimeName2.textContent = "Figma Avancé";
        }
      } else {
        // Paramètres par défaut pour le niveau 1
        if (hasFigmaAZBeginnerPlan) {
          if (courseTimeLeftPrice) courseTimeLeftPrice.textContent = "Prix standard Niveau 1";
          if (courseTimeLeftButton) courseTimeLeftButton.href = "https://order.example.com/figma-niveau-1";
          if (courseTimeName1) courseTimeName1.textContent = "Figma Débutant";
          if (courseTimeName2) courseTimeName2.textContent = "Préparez-vous pour le niveau 2!";
        }
      }
  
      document.querySelectorAll('.course_lesson-item').forEach(function(item) {
        var paidId = parseInt(item.getAttribute('data-paid-id'), 10);
        var lessonMask = item.querySelector('.course_lesson-mask');
  
        if (hasFigmaBeginnerPlan || (hasFigmaAZBeginnerPlan && paidId <= accessLevel)) {
          item.style.opacity = '1';
          if (lessonMask) lessonMask.style.display = 'none';
        } else {
          item.style.opacity = '0.5';
          if (lessonMask) lessonMask.style.display = 'block';
        }
      });
  
      var courseNavigation = document.getElementById('courseNavigation');
      var allItemsActive = accessLevel >= 3 || hasFigmaBeginnerPlan;
      if (!allItemsActive && courseNavigation) courseNavigation.style.display = 'none';
      else if (courseNavigation) courseNavigation.style.display = 'flex';
    
    }
  
    // Appel de la fonction pour vérifier le plan d'adhésion
    checkMemberPlan();
  });
  
  /*-- FIN : Drip Content pour la formation Figma --*/
