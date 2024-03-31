
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


    function openSubmenu(submenuId) {
        gsap.to(menu, {duration: 0.5, x: '-30%', ease: "power4.out"});
        gsap.to(submenuId, {duration: 0.5, x: '0%', ease: "power4.out", onComplete: () => {
            document.querySelector(submenuId).classList.add('is-open');
        }});
    }

    function closeSubmenu(submenuId) {
        gsap.to(menu, {duration: 0.5, x: '0%', ease: "power4.out"});
        gsap.to(submenuId, {duration: 0.5, x: '100%', ease: "power4.out", onComplete: () => {
            document.querySelector(submenuId).classList.remove('is-open');
        }});
    }

    function openMenu() {
        gsap.to('#menu', {duration: 0.5, x: '0%', ease: "power4.out", opacity: 1, onComplete: () => {
            menu.classList.add('is-open');
        }});
    }

    function closeMenu() {
        submenus.forEach(submenu => {
            if (submenu.classList.contains('is-open')) {
                closeSubmenu('#' + submenu.id);
            }
        });
        gsap.to('#menu', {duration: 0.5, x: '100%', opacity: 0, ease: "power4.out", onComplete: () => {
            menu.classList.remove('is-open');
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


document.addEventListener('DOMContentLoaded', function () {
  var protectedContent = document.querySelector('[data-ms-content="protected"]');

  // Vérifiez si l'utilisateur est sur une page protégée et si la clé '_ms-mem' est absente du localStorage
  if (protectedContent && !localStorage.getItem('_ms-mem')) {
    // Si la clé n'est pas présente, redirige l'utilisateur vers la page de connexion
    window.location.href = '/app/connexion';
  }
});

/* -------- AFFICHAGE DU CODE DE PROMOTION À L'INSCRIPTION -------- */
document.addEventListener('DOMContentLoaded', function() {
    updatePromoCode();
});

function startCouponTimer(couponName) {
  console.log("Déclenchement de startCouponTimer", new Date());
  let timerFinished = localStorage.getItem('timer_finished');
  let startTime = localStorage.getItem('coupon_start_time');
  let currentTime = new Date().getTime();
  
  if (timerFinished) return;
  
  if (!startTime) {
    startTime = currentTime;
    localStorage.setItem('coupon_start_time', startTime);
  }
  
  let elapsedTime = currentTime - startTime;
  let remainingTime = 8 * 60 * 60 * 1000 - elapsedTime;

  if (remainingTime > 0 && couponName) {
    document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
      promoPopinElement.style.display = 'block';
    });
  }

  function updateTimer() {
    elapsedTime = new Date().getTime() - startTime;
    remainingTime = 8 * 60 * 60 * 1000 - elapsedTime;

    if (remainingTime >= 0 && couponName) {
      let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      document.querySelectorAll('[data-co-offer="promo-timer"]').forEach(function(timerDisplay) {
        timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
      });
    } else {
      console.log("Le timer est à 0 ou aucun coupon_name valide, masquage des éléments promo-code-wrapper", new Date());
      clearInterval(timerInterval);
      localStorage.setItem('timer_finished', 'true');
      document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
        promoPopinElement.style.display = 'none';
      });
    }
  }

  let timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function updatePromoCode() {
  console.log("Déclenchement de updatePromoCode", new Date());
  let memberData = localStorage.getItem('_ms-mem');
  let couponName = null;
  
  if (memberData) {
    try {
      let memberObj = JSON.parse(memberData);
      
      if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
        console.log("Coupon trouvé, mise à jour des éléments promo-code", new Date());
        couponName = memberObj.metaData.coupon_name;
        let promoElements = document.querySelectorAll('[data-co-offer="promo-code"]');
        promoElements.forEach(function(element) {
          element.textContent = couponName;
        });
        
        if (!localStorage.getItem('timer_finished')) {
          startCouponTimer(couponName);
        }
      } else {
        console.log("Aucun coupon applicable trouvé", new Date());
      }
    } catch (e) {
      console.error("Erreur lors du parsing des données membres", e);
    }
  } else {
    console.log("Aucune donnée membre trouvée dans localStorage", new Date());
  }
}
