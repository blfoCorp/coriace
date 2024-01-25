async function checkMembershipAndRedirect() {
  const exclusionPage = "/app/actualisation-coordonnees-bancaires"; // Chemin de la page à exclure
  const currentPagePath = window.location.pathname;

  if (currentPagePath !== exclusionPage) {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;

    if (member && Array.isArray(member.planConnections)) {
      const planId = "pln_payment-failed-q73t0e22";
      const redirectUrl = "https://coriace-plateforme-v3.webflow.io" + exclusionPage;

      const hasFailedPaymentPlan = member.planConnections.some(plan => plan.planId === planId);

      if (hasFailedPaymentPlan) {
        window.location.href = redirectUrl;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", checkMembershipAndRedirect);

/*---  FIN : REDIRECTION ET BLOCAGE EN CAS D'ÉCHEC DE PAIEMENT ----*/

/*---  DÉBUT : BLOCAGE CLIC DROIT ----*/

// Bloquer le clic droit
/*document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  alert("Curieux de connaître ce qui se cache derrière notre espace membre ? Découvre tout cela dans nos formations avancées 😉");
});

// Bloquer les raccourcis clavier
document.addEventListener('keydown', function (event) {
  // Bloquer les raccourcis courants pour accéder au panneau de développement
  const isF12 = event.keyCode === 123;
  const macShortcutJ = event.metaKey && event.altKey && event.keyCode === 74; // Cmd + Option + J
  const winLinuxShortcutJ = event.ctrlKey && event.shiftKey && event.keyCode === 74; // Ctrl + Shift + J
  const chromeShortcut = event.ctrlKey && event.shiftKey && event.keyCode === 73; // Ctrl + Shift + I
  const macShortcutC = event.metaKey && event.altKey && event.keyCode === 67; // Cmd + Option + C
  const winLinuxShortcutC = event.ctrlKey && event.altKey && event.keyCode === 67; // Ctrl + Alt + C
  const macNewShortcutC = event.metaKey && event.shiftKey && event.keyCode === 67; // Cmd + Shift + C
  const winLinuxNewShortcutC = event.ctrlKey && event.shiftKey && event.keyCode === 67; // Ctrl + Shift + C
  const macNewShortcutJ = event.metaKey && event.shiftKey && event.keyCode === 74; // Cmd + Shift + J
  const winLinuxNewShortcutJ = event.ctrlKey && event.shiftKey && event.keyCode === 74; // Ctrl + Shift + J

  if (isF12 || macShortcutJ || winLinuxShortcutJ || chromeShortcut || macShortcutC || winLinuxShortcutC || macNewShortcutC || winLinuxNewShortcutC || macNewShortcutJ || winLinuxNewShortcutJ) {
    event.preventDefault();
    alert("Curieux de connaître ce qui se cache derrière notre espace membre ? Découvre tout cela dans nos formations avancées 😉");
  }
});*/

/*---  FIN : BLOCAGE CLIC DROIT ----*/

/*---  DÉBUT : AFFICHAGE CRÉDIT TOTAL DANS LA NAVIGATION DU MEMBRE ----*/

document.addEventListener('DOMContentLoaded', function() {
  // Récupérer les données du membre depuis le Local Storage
  const memberData = JSON.parse(localStorage.getItem('_ms-mem')); // Remplacez 'memberDataKey' par la clé réelle

  // Initialiser la somme
  let totalCredits = 0;

  // Itérer sur les champs et additionner ceux qui commencent par "credit-" ou "super-assistance-"
  Object.keys(memberData.customFields).forEach(key => {
    if (key.startsWith('credit-') || key.startsWith('super-assistance-')) {
      totalCredits += parseFloat(memberData.customFields[key]) || 0; // Utilise parseFloat si les crédits peuvent être des décimales
    }
  });

  // Afficher la somme dans l'élément span (remplacer 'spanId' par l'id réel de votre élément span)
  document.getElementById('creditTotal').textContent = totalCredits.toString();
});

/*---  FIN : AFFICHAGE CRÉDIT TOTAL DANS LA NAVIGATION DU MEMBRE ----*/
/*---  DÉBUT : DÉVEROUILLAGE FORMATION EN FONCTION DU PLAN DANS LA NAVIGATION ----*/
console.log('Le script full page est chargé');
async function updateTabLinksAndHideElementsForSpecificPlans() {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;

    if (member && Array.isArray(member.planConnections)) {
        console.log('Membre connecté:', member);
        // ID des plans spécifiques et leurs configurations correspondantes
        const plansConfig = [
            {
                planId: ["pln_coriace-formation-webflow-page-de-vente-6b4m0150", "pln_formation-webflow-page-de-vente-3-fois--ul110zw2", "pln_webflow-le-pack-ezhb0291", "pln_webflow-le-pack-3-fois--sshd024y", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#wpdvTabs',
                newHref: '/app/formation-membre/webflow-page-de-vente',
                lockIconId: '#wpdvLockIcn'
            },
            {
                planId: ["pln_formation-webflow-e-commerce-cms-kb40awg", "pln_formation-webflow-e-commerce-cms-3-fois--y110qun", "pln_webflow-le-pack-ezhb0291", "pln_webflow-le-pack-3-fois--sshd024y", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#wecoTabs',
                newHref: '/app/formation-membre/webflow-ecommerce',
                lockIconId: '#wecoLockIcn'
            },
            {
                planId: "pln_coriace-formation-webflow-cms-9a4w0cs2",
                tabLinkId: '#wcmsTabs',
                newHref: '/app/formation-membre/webflow-cms',
                lockIconId: '#wcmsLockIcn'
            },
            {
                planId: ["pln_coriace-webflow-th-orie-kb500c0t", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#wtheorieTabs',
                newHref: '/app/formation-membre/webflow-theorie',
                lockIconId: '#wtheorieLockIcn'
            },
            {
                planId: ["pln_coriace-udesly-webflow-vers-shopify-tf510c18", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#udeslyShopiTabs',
                newHref: '/app/formation-membre/udesly-webflow-vers-shopify',
                lockIconId: '#udeslyShopiLockIcn'
            },
            {
                planId: ["pln_coriace-webflow-cookies-2t4s03hj", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#cookiesTabs',
                newHref: '/app/formation-membre/webflow-cookies-consent',
                lockIconId: '#cookiesLockIcn'
            },
             {
                planId: ["pln_coriace-client-first-d-butant-tv510vvg", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#clientFirstTabs',
                newHref: '/app/formation-membre/webflow-client-first',
                lockIconId: '#clientFirstLockIcn'
            }
        ];

        plansConfig.forEach(planConfig => {
            let hasPlan = false;

            if (Array.isArray(planConfig.planId)) {
                hasPlan = planConfig.planId.some(id => 
                    member.planConnections.some(plan => plan.planId === id)
                );
            } else {
                hasPlan = member.planConnections.some(plan => plan.planId === planConfig.planId);
            }

            if (hasPlan) {
                console.log('Plan trouvé:', planConfig.planId);

                const tabLink = document.querySelector(planConfig.tabLinkId);
                const lockIcon = document.querySelector(planConfig.lockIconId);
                if (tabLink) {
                    console.log('Mise à jour du lien:', planConfig.newHref);
                    tabLink.href = planConfig.newHref;
                }
                if (lockIcon) {
                    console.log('Masquer l\'icône de verrouillage');
                    lockIcon.style.display = 'none';
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log('La page est chargée. Exécution de la fonction.');
    updateTabLinksAndHideElementsForSpecificPlans();
});

/*---  DÉBUT : REDIRECTION ET BLOCAGE EN CAS D'ÉCHEC DE PAIEMENT ----*/

