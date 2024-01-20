/*-- DÉBUT : Drip Content paiement en plusieurs fois --*/

window.addEventListener('load', function() {
  function checkMemberPlan() {
    // Récupérer les données du membre depuis le localStorage
    var userData = JSON.parse(localStorage.getItem('_ms-mem'));

    // Vérifier si les données du membre, la date de début et les informations de plan sont disponibles
    if (userData && userData.metaData && userData.metaData.start_date && userData.planConnections) {
      console.log("Informations du membre récupérées depuis le localStorage :", userData);

      // Liste des IDs de plan qui déclenchent le drip content
      var validPlanIds = ["VotrePlanId1", "VotrePlanId2", "VotrePlanId3"]; // Remplacez ces valeurs par les IDs réels de vos plans

      // Vérifier si l'utilisateur a un des plans actifs spécifiques
      var hasRequiredPlan = userData.planConnections.some(function(plan) {
        return validPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
      });

      if (hasRequiredPlan) {
        // Convertir la date de début en UTC
        var startDate = new Date(userData.metaData.start_date);
        var startDateUTC = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds());
        console.log("Date de début UTC récupérée :", new Date(startDateUTC));

        // Convertir la date actuelle en UTC
        var now = new Date();
        var nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        console.log("Date actuelle UTC :", new Date(nowUTC));
        
        // Calculer la différence en jours
        var daysSinceStart = Math.floor((nowUTC - startDateUTC) / (1000 * 60 * 60 * 24));
        console.log(`Jours depuis le début : ${daysSinceStart}`);

        // Sélectionner tous les éléments '.course_lesson-item'
        document.querySelectorAll('.course_lesson-item').forEach(function(item) {
          var paidId = parseInt(item.getAttribute('data-paid-id'), 10);
          console.log(`Traitement de l'élément, data-paid-id : ${paidId}`);

          // Déterminer le niveau d'accès en fonction des jours écoulés
          var accessLevel = 1; // Accès immédiat pour data-paid-id = 1
          if (daysSinceStart >= 30) { // Remplacer par 30 pour des jours réels
            accessLevel = 2; // Accès après 1 jour pour data-paid-id = 2
          }
          if (daysSinceStart >= 60) { // Remplacer par 60 pour des jours réels
            accessLevel = 3; // Accès après 2 jours pour data-paid-id = 3
          }

          // Vérifier le niveau d'accès et désactiver les liens si nécessaire
          if (paidId > accessLevel) {
            console.log(`Élément avec data-paid-id ${paidId} bloqué (Niveau d'accès requis : ${accessLevel})`);
            item.querySelectorAll('.course_lesson-link').forEach(function(link) {
              link.style.pointerEvents = 'none';
              link.style.color = 'grey'; // Change l'apparence pour indiquer que le lien est désactivé
              console.log(`Lien désactivé dans l'élément avec data-paid-id ${paidId}`);
            });
          } else {
            console.log(`Élément avec data-paid-id ${paidId} est accessible`);
            // Optionnel : Changez l'apparence des éléments accessibles ici si nécessaire
          }
        });
      } else {
        console.log("L'utilisateur n'est pas sur un des plans requis pour ce contenu.");
      }
    } else {
      console.log("Les informations du membre ne sont pas disponibles dans le localStorage ou la date de début est manquante.");
    }
  }

  // Appeler la fonction pour vérifier le plan du membre
  checkMemberPlan();
});

/*-- FIN : Drip Content paiement en plusieurs fois --*/
