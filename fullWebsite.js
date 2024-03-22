
/* -------- GESTION DU MENU BURGER EN MOBILE -------- */
// Vérifie si la largeur de la fenêtre est inférieure à 991px
function isMobile() {
    return window.innerWidth < 991;
}

// Variable pour contrôler l'initialisation du menu
let isMenuSetup = false;

// Les fonctions et les gestionnaires d'événements seront définis à l'intérieur de cette fonction
function setupMenu() {
    // Empêche la réinitialisation des gestionnaires d'événements
    if (isMenuSetup) return;
    isMenuSetup = true;

    const menu = document.getElementById('menu');
    const submenus = document.querySelectorAll('.mm_submenu');

    console.log('Menu principal et sous-menus sélectionnés:', menu, submenus);

    function openSubmenu(submenuId) {
        console.log(`Ouverture du sous-menu ${submenuId}`);
        gsap.to(menu, {duration: 0.5, x: '-30%', ease: "power4.out"});
        gsap.to(submenuId, {duration: 0.5, x: '0%', ease: "power4.out", onComplete: () => {
            document.querySelector(submenuId).classList.add('is-open');
            console.log(`${submenuId} est maintenant ouvert.`);
        }});
    }

    function closeSubmenu(submenuId) {
        console.log(`Tentative de fermeture du sous-menu ${submenuId}`);
        gsap.to(menu, {duration: 0.5, x: '0%', ease: "power4.out"});
        gsap.to(submenuId, {duration: 0.5, x: '100%', ease: "power4.out", onComplete: () => {
            document.querySelector(submenuId).classList.remove('is-open');
            console.log(`${submenuId} est maintenant fermé.`);
        }});
    }

    function openMenu() {
        console.log('Ouverture du menu principal');
        gsap.to('#menu', {duration: 0.5, x: '0%', ease: "power4.out", opacity: 1, onComplete: () => {
            menu.classList.add('is-open');
            console.log('Le menu principal est maintenant ouvert.');
        }});
    }

    function closeMenu() {
        console.log('Fermeture du menu principal et de tous les sous-menus ouverts');
        submenus.forEach(submenu => {
            if (submenu.classList.contains('is-open')) {
                closeSubmenu('#' + submenu.id);
            }
        });
        gsap.to('#menu', {duration: 0.5, x: '100%', opacity: 0, ease: "power4.out", onComplete: () => {
            menu.classList.remove('is-open');
            console.log('Le menu principal est maintenant fermé.');
        }});
    }

    if (isMobile()) {
        document.getElementById('link1').addEventListener('click', function() {
            openSubmenu('#submenu1');
        });

        document.getElementById('link2').addEventListener('click', function() {
            openSubmenu('#submenu2');
        });

        submenus.forEach(submenu => {
            const backButton = submenu.querySelector('.mm_submenu-back-btn');
            if (backButton) {
                backButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    closeSubmenu('#' + submenu.id);
                });
            }
        });

        document.getElementById('close-menu').addEventListener('click', function() {
            if (menu.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
}

// Exécutez la configuration lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', setupMenu);

// Réajustez si la fenêtre est redimensionnée
window.addEventListener('resize', function() {
    // Réinitialise isMenuSetup à false si on passe de mobile à desktop et inversement
    if (!isMobile() || isMenuSetup) {
        isMenuSetup = false;
    }
    setupMenu();
});


/* -------- AFFICHAGE DU CODE DE PROMOTION À L'INSCRIPTION -------- */
// Fonction pour démarrer un timer de 24 heures
function startCouponTimer() {
  // Récupérer ou initialiser la date et l'heure de début du timer
  var startTime = localStorage.getItem('coupon_start_time');
  if (!startTime) {
    startTime = new Date().getTime();
    localStorage.setItem('coupon_start_time', startTime);
  }
  
  // Fonction pour mettre à jour le timer
  function updateTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var remainingTime = 24 * 60 * 60 * 1000 - elapsedTime; // 24 heures en millisecondes

    if (remainingTime >= 0) {
      // Calculer heures, minutes, secondes
      var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      
      // Afficher le timer
      var timerDisplay = document.querySelector('.promo-timer');
      if (timerDisplay) {
        timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
      }
    } else {
      // Le timer a expiré
      clearInterval(timerInterval);
      localStorage.removeItem('coupon_start_time');
      // Masquer l'élément .promo-code_popin si nécessaire
      var promoPopinElement = document.querySelector('.promo-code_wrapper');
      if (promoPopinElement) {
        promoPopinElement.style.display = 'none';
      }
    }
  }

  // Mettre à jour le timer toutes les secondes
  var timerInterval = setInterval(updateTimer, 1000);
  // Initialiser l'affichage du timer
  updateTimer();
}

// Fonction pour mettre à jour le code promo et afficher l'élément si nécessaire
function updatePromoCode() {
  var memberData = localStorage.getItem('_ms-mem');
  
  if (memberData) {
    try {
      var memberObj = JSON.parse(memberData);
      
      if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
        var promoElements = document.querySelectorAll('.promo-popin_code');
        var promoPopinElement = document.querySelector('.promo-code_wrapper');
        
        promoElements.forEach(function(element) {
          element.textContent = memberObj.metaData.coupon_name;
        });

        // Si 'coupon_name' est présent, afficher l'élément et démarrer le timer
        if (promoPopinElement) {
          promoPopinElement.style.display = 'flex';
          promoPopinElement.style.flexDirection = 'column';
          startCouponTimer();
        }
      } else {
        console.error('La clé "coupon_name" est introuvable dans les données "metaData" du membre.');
      }
    } catch (e) {
      console.error('Erreur lors de l\'analyse des données du membre:', e);
    }
  }
}

window.onload = updatePromoCode;

/* -------- DÉTECTION DES VISITES LIEN AFFILIÉ + ENVOIE DES DONNÉES DANS MAKE -------- */
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('ref');
    if (affiliateId) {
        // Obtenez la date et l'heure actuelles en ISO 8601
        const visitDate = new Date().toISOString();
        
        // L'URL de votre Webhook Make
        const webhookUrl = 'https://hook.eu1.make.com/7kq7nssrvgwcwkfwyxbw31wjj55kgj2d';
        
        // Préparez les données à envoyer au Webhook
        const data = {
            affiliate_id: affiliateId,
            url: document.location.href,
            referrer: document.referrer,
            visit_date: visitDate // Ajout de la date et l'heure de la visite
        };

        // Envoyez les données au Webhook Make
        fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Données envoyées au Webhook :', responseData);
        })
        .catch(error => {
            console.error('Erreur lors de l’envoi des données au Webhook :', error);
        });
    }
});


/*---  DÉBUT : DÉVEROUILLAGE FORMATION EN FONCTION DU PLAN DANS LA NAVIGATION ----*/
async function updateTabLinksAndHideElementsForSpecificPlans() {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;

    if (member && Array.isArray(member.planConnections)) {
        console.log('Membre connecté:', member);
        // ID des plans spécifiques et leurs configurations correspondantes
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
                newHref: '/app/formation-membre/webflow-client-first',
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
        

        plansConfig.forEach(planConfig => {
            let hasPlan = Array.isArray(planConfig.planId) && planConfig.planId.some(id => 
                member.planConnections.some(plan => plan.planId === id)
            );

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
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateTabLinksAndHideElementsForSpecificPlans();
});
