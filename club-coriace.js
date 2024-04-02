/*---  DÉBUT : ÉTAT DU LABEL MEMBRE CLUB CORIACE DANS LA NAVIGATION ----*/
document.addEventListener('DOMContentLoaded', function() {
    // Vérifie si le plan spécifié existe et est actif
    function hasActivePlan(planConnections, targetPlanId) {
        return planConnections.some(function(plan) {
            return plan.planId === targetPlanId && plan.active;
        });
    }

    // Change le texte de tous les éléments correspondants
    function setTextToElements(selector, text) {
        document.querySelectorAll(selector).forEach(function(element) {
            element.textContent = text;
        });
    }

    // Ajoute une classe à tous les éléments correspondants
    function addClassToElements(selector, className) {
        document.querySelectorAll(selector).forEach(function(element) {
            element.classList.add(className);
        });
    }

    // Lit les données de l'utilisateur depuis localStorage
    var memberDataString = localStorage.getItem('_ms-mem');
    if (memberDataString) {
        var memberData = JSON.parse(memberDataString);
        var planId = "pln_club-coriace-qwxe0arq";
        var hasPlan = hasActivePlan(memberData.planConnections, planId);

        if (hasPlan) {
            setTextToElements('.vertical-nav_member-label-text', 'Membre du Club');
        } else {
            setTextToElements('.vertical-nav_member-label-text', 'non Membre du Club');
            addClassToElements('.vertical-nav_club-member-label', 'is-inactive');
        }
    }
});
