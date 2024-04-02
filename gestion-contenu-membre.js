/*---  DÉBUT : DÉVEROUILLAGE FORMATION EN FONCTION DU PLAN ----*/
async function updateTabLinksAndHideElementsForSpecificPlans() {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;

    if (member && Array.isArray(member.planConnections)) {
        // Extraire les IDs de plan du membre
        const userPlanIds = member.planConnections.map(connection => connection.planId);
        
        // Configuration des plans (c'est un tableau d'objets)
        const plansConfig = [
            {
                planId: [
                    "pln_coriace-formation-webflow-page-de-vente-6b4m0150",
                    "pln_formation-webflow-page-de-vente-3-fois--ul110zw2",
                    "pln_webflow-le-pack-ezhb0291",
                    "pln_webflow-le-pack-3-fois--sshd024y",
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataTabLink: 'wpdvTabs',
                newHref: '/app/formation-membre/webflow-page-de-vente',
                dataLockIcon: 'wpdvLockIcn',
                dataStartButton: 'wpdvStartButton',
                dataHideButton: 'wpdvHideButton'
            },
            {
                planId: [
                    "pln_formation-webflow-e-commerce-cms-kb40awg",
                    "pln_formation-webflow-e-commerce-cms-3-fois--y110qun",
                    "pln_webflow-le-pack-ezhb0291",
                    "pln_webflow-le-pack-3-fois--sshd024y",
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataTabLink: 'wecoTabs',
                newHref: '/app/formation-membre/webflow-ecommerce',
                dataLockIcon: 'wecoLockIcn',
                dataStartButton: 'wecoStartButton',
                dataHideButton: 'wecoHideButton'
            },
            {
                planId: "pln_coriace-formation-webflow-cms-9a4w0cs2",
                dataTabLink: 'wcmsTabs',
                newHref: '/app/formation-membre/webflow-cms',
                dataLockIcon: 'wcmsLockIcn',
                dataStartButton: 'wcmsStartButton',
                dataHideButton: 'wcmsHideButton'
            },
            {
                planId: [
                    "pln_coriace-webflow-th-orie-kb500c0t",
                    "pln_le-mini-pack-webflow-3-fois--lsj50wev",
                    "pln_le-mini-pack-webflow-2kje0tkt",
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataTabLink: 'wtheorieTabs',
                newHref: '/modules-mini-formations-webflow/webflow-theorie',
                dataLockIcon: 'wtheorieLockIcn',
                dataStartButton: 'wtheorieStartButton',
                dataHideButton: 'wtheorieHideButton'
            },
            {
                planId: [
                    "pln_coriace-udesly-webflow-vers-shopify-tf510c18",
                    "pln_le-mini-pack-webflow-3-fois--lsj50wev",
                    "pln_le-mini-pack-webflow-2kje0tkt",
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataTabLink: 'udeslyShopiTabs',
                newHref: '/modules-mini-formations-webflow/udesly-webfow-vers-shopify',
                dataLockIcon: 'udeslyShopiLockIcn',
                dataStartButton: 'udeslyShopifyStartButton',
                dataHideButton: 'udeslyShopifyHideButton'
            },
            {
                planId: [
                    "pln_coriace-webflow-cookies-2t4s03hj",
                    "pln_le-mini-pack-webflow-3-fois--lsj50wev",
                    "pln_le-mini-pack-webflow-2kje0tkt",
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataTabLink: 'cookiesTabs',
                newHref: '/modules-mini-formations-webflow/les-cookies',
                dataLockIcon: 'cookiesLockIcn',
                dataStartButton: 'cookiesStartButton',
                dataHideButton: 'cookiesHideButton'
            },
            {
                planId: [
                    "pln_coriace-client-first-d-butant-tv510vvg",
                    "pln_le-mini-pack-webflow-3-fois--lsj50wev",
                    "pln_le-mini-pack-webflow-2kje0tkt",
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataTabLink: 'clientFirstTabs',
                newHref: '/modules-mini-formations-webflow/client-first',
                dataLockIcon: 'clientFirstLockIcn',
                dataStartButton: 'clientFirstStartButton',
                dataHideButton: 'clientFirstHideButton'
            },
            {
                planId: [
                    "pln_coriace-figma-d-butant-3t560v1t",
                    "pln_figma-a-z-d-butant-3-fois--m019l0i64"
                ],
                dataTabLink: 'figDebutantTabs',
                newHref: '/app/formation-membre/figma-debutant',
                dataLockIcon: 'figDebutantLockIcn',
                dataStartButton: 'figDebutantStartButton',
                dataHideButton: 'figDebutantHideButton'
            },
            {
                planId: [
                    "pln_webflow-le-pack-ezhb0291",
                    "pln_webflow-le-pack-3-fois--sshd024y"
                ],
                dataHideButton: 'packWebflowHideButton'
            },
            {
                planId: [
                    "pln_le-mini-pack-webflow-2kje0tkt",
                    "pln_le-mini-pack-webflow-3-fois--lsj50wev"
                ],
                dataHideButton: 'minipackWebflowHideButton'
            },
            {
                planId: [
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj"
                ],
                dataHideButton: 'megapackWebflowHideButton'
            },
             {
                planId: [
                    "pln_webflow-cr-er-un-portfolio-g5a4042f" 
                ],
                dataTabLink: 'wfportfolioNiv1Tabs',
                dataLockIcon: 'wfportfolioNiv1LockIcn',
                newHref: '/modules-formation-thematique/webflow-creer-son-portfolio'
            },
            {
                planId: [
                    "pln_coriace-webflow-plus-cb540c14",
                    "pln_webflow-plus-semestriel--84gw090e",
                    "pln_webflow-plus-annuel--uffp04jd",
                    "pln_formation-simple-trimestriel-7rj80985",
                    "pln_formation-simple-semestriel-tnh604fc",
                    "pln_formation-simple-annuel-gyh704ly",
                    "pln_formation-accompagn-e-trimestriel-fih804b7",
                    "pln_formation-accompagn-e-semestriel-7ij9096p",
                    "pln_formation-accompagn-e-annuel-b6ha045g",
                    "pln_formation-et-assistance-trimestriel-plja09y7",
                    "pln_formation-et-assistance-semestriel-vohd04oh",
                    "pln_formation-et-assistance-annuel-wkhe043e"
                ],
                dataLockIcon: 'wfPlusLockIcn',
                dataStartButton: 'wfPlusStartButton',
                dataHideButton: 'wfPlusHideButton',
                newHref: '/app/webflow-plus',
                dataTabLink: 'wPlusLink',
                
                
            }
        ];
        

        // Définir l'attribut personnalisé pour sélectionner les éléments
        const attributeSelector = '[data-co-member="!customer"]';
        
        // Initialiser le drapeau indiquant si l'utilisateur a un plan spécifique
        let hasSpecificPlan = false;
        
        // Parcourir chaque configuration de plan
        plansConfig.forEach(planConfig => {
            // Vérifier si l'utilisateur a un des plans spécifiés
            const hasPlan = Array.isArray(planConfig.planId) ?
                planConfig.planId.some(planId => userPlanIds.includes(planId)) :
                userPlanIds.includes(planConfig.planId);
            
            // Si l'utilisateur a le plan, effectuer les modifications nécessaires sur les éléments du DOM
            if (hasPlan) {
                document.querySelectorAll(`[data-tab-link="${planConfig.dataTabLink}"]`).forEach(element => {
                    element.href = planConfig.newHref;
                });
        
                document.querySelectorAll(`[data-lock-icon="${planConfig.dataLockIcon}"]`).forEach(element => {
                    element.style.display = 'none';
                });
        
                document.querySelectorAll(`[data-start-button="${planConfig.dataStartButton}"]`).forEach(button => {
                    button.href = planConfig.newHref; 
                    button.textContent = 'Démarrer';
                });
        
                document.querySelectorAll(`[data-hide-button="${planConfig.dataHideButton}"]`).forEach(element => {
                    element.style.display = 'none';
                });
                // Indiquer qu'un élément spécifique doit être affiché
                hasSpecificPlan = true;
            }
        });
        
        // Si l'utilisateur a un plan spécifié, afficher les éléments avec l'attribut personnalisé
        if (hasSpecificPlan) {
            // Utiliser querySelectorAll et forEach pour appliquer le style à tous les éléments correspondants
            document.querySelectorAll(attributeSelector).forEach(elementToShow => {
                elementToShow.style.display = 'none'; // Supposant que vous voulez les rendre visibles. Utilisez 'none' pour masquer.
            });
        }
    }
}

// Attacher la fonction au chargement du contenu DOM
document.addEventListener("DOMContentLoaded", () => {
    updateTabLinksAndHideElementsForSpecificPlans();
});
