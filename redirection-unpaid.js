/*---  DÉBUT : REDIRECTION ET BLOCAGE EN CAS D'ÉCHEC DE PAIEMENT ----*/

async function checkMembershipAndRedirect() {
  const exclusionPage = "/app/actualisation-coordonnees-bancaires"; // Chemin de la page à exclure
  const currentPagePath = window.location.pathname;

  if (currentPagePath !== exclusionPage) {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;

    if (member && Array.isArray(member.planConnections)) {
      const planId = "pln_payment-failed-q73t0e22";
      const redirectUrl = "https://app.coriace.co" + exclusionPage;

      const hasFailedPaymentPlan = member.planConnections.some(plan => plan.planId === planId);

      if (hasFailedPaymentPlan) {
        window.location.href = redirectUrl;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", checkMembershipAndRedirect);

/*---  FIN : REDIRECTION ET BLOCAGE EN CAS D'ÉCHEC DE PAIEMENT ----*/
