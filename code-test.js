/*---  DÉBUT : DÉVEROUILLAGE FORMATION EN FONCTION DU PLAN DANS LA NAVIGATION ----*/
async function updateTabLinksAndHideElementsForSpecificPlans() {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;
    console.log("Member data:", member); // Afficher les données du membre

    if (member && Array.isArray(member.planConnections)) {
         console.log("User Plan IDs:", userPlanIds); // Afficher les IDs de plan de l'utilisateur
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
                dataHideButton: 'wpdvHideButton',
                contentValue: 'wfpdv',
                redirectUrl: '/app/formations/webflow-page-de-vente'
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
                dataHideButton: 'wecoHideButton',
                contentValue: 'wfeco',
                redirectUrl: '/app/formations/webflow-e-commerce'
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
                dataHideButton: 'wtheorieHideButton',
                contentValue: 'wftheorie',
                redirectUrl: '/app/mini-formations/webflow-theorie'
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
                dataHideButton: 'udeslyShopifyHideButton',
                contentValue: 'wfshopi',
                redirectUrl: '/app/mini-formations/udesly-webflow-shopify'
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
                dataHideButton: 'cookiesHideButton',
                contentValue: 'wfcookies',
                redirectUrl: '/app/mini-formations/webflow-cookie-consent-by-finsweet'
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
                dataHideButton: 'clientFirstHideButton',
                contentValue: 'wfclientfirst',
                redirectUrl: '/app/mini-formations/webflow-client-first'
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
                dataHideButton: 'figDebutantHideButton',
                contentValue: 'figdeb',
                redirectUrl: '/app/formations/figma-debutant'
            },
            {
                planId: [
                    "pln_webflow-le-pack-ezhb0291",
                    "pln_webflow-le-pack-3-fois--sshd024y"
                ],
                dataHideButton: 'packWebflowHideButton',
                contentValue: 'wfpack',
                redirectUrl: '/app/packs/formations-principales-webflow'
            },
            {
                planId: [
                    "pln_le-mini-pack-webflow-2kje0tkt",
                    "pln_le-mini-pack-webflow-3-fois--lsj50wev"
                ],
                dataHideButton: 'minipackWebflowHideButton',
                contentValue: 'wfminipack',
                redirectUrl: '/app/packs/mini-pack-webflow'
            },
            {
                planId: [
                    "pln_le-mega-pack-webflow-2ljs0t3b",
                    "pln_le-mega-pack-webflow-3-fois--tnkm02zj"
                ],
                dataHideButton: 'megapackWebflowHideButton',
                contentValue: 'wfmegapack',
                redirectUrl: '/app/packs/mega-pack-webflow'
            },
             {
                planId: [
                    "pln_webflow-cr-er-un-portfolio-g5a4042f" 
                ],
                dataTabLink: 'wfportfolioNiv1Tabs',
                dataLockIcon: 'wfportfolioNiv1LockIcn',
                newHref: '/modules-formation-thematique/webflow-creer-son-portfolio',
                contentValue: 'wfportfolio',
                redirectUrl: '/app/formations-thematiques/webflow-creer-son-portfolio'
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
                contentValue: 'wfplus',
                redirectUrl: '/app/webflow-plus'
                
            }
        ];
        

        let hasSpecificPlan = false;
        let redirectUrls = []; // Collection des URLs de redirection pour les configurations non satisfaites

        document.querySelectorAll('[data-co-protected]').forEach(protectedElement => {
            const protectionValue = protectedElement.getAttribute('data-co-protected');
            console.log("Checking protection for:", protectionValue); // Vérifier la protection pour la valeur
            let protectionMet = false;

            plansConfig.forEach(planConfig => {
                const hasPlan = Array.isArray(planConfig.planId) ?
                    planConfig.planId.some(planId => userPlanIds.includes(planId)) :
                    userPlanIds.includes(planConfig.planId);

                if (protectionValue === planConfig.contentValue && hasPlan) {
                    applyDOMChanges(protectedElement, planConfig);
                    protectionMet = true;
                    hasSpecificPlan = true;
                } else if (protectionValue === planConfig.contentValue) {
                    // Cette vérification assure qu'on ajoute l'URL de redirection seulement si elle correspond à l'élément protégé rencontré
                    redirectUrls[protectionValue] = planConfig.redirectUrl;
                }
            });

            // Si aucun plan correspondant n'est trouvé pour cet élément protégé, marquer pour une redirection possible
            if (!protectionMet && redirectUrls[protectionValue]) {
                console.log("Redirecting to:", redirectUrls[protectionValue]); // Rediriger vers l'URL
                window.location.href = redirectUrls[protectionValue];
                return;
            }
        });

        // Définir l'attribut personnalisé pour sélectionner les éléments
        const attributeSelector = '[data-co-member="!customer"]';

        // Si l'utilisateur a un plan spécifié, afficher les éléments avec l'attribut personnalisé
        if (hasSpecificPlan) {
            document.querySelectorAll(attributeSelector).forEach(elementToShow => {
                elementToShow.style.display = 'block';
            });
        }
    }
}

function applyDOMChanges(protectedElement, planConfig) {
    // L'utilisateur a le plan, effectuer les modifications nécessaires sur les éléments du DOM
    if (planConfig.dataTabLink) {
        document.querySelectorAll(`[data-tab-link="${planConfig.dataTabLink}"]`).forEach(element => {
            console.log("Updating href for:", element); // Mettre à jour href pour l'élément
            element.href = planConfig.newHref;
        });
    }

    if (planConfig.dataLockIcon) {
        document.querySelectorAll(`[data-lock-icon="${planConfig.dataLockIcon}"]`).forEach(element => {
            console.log("Hiding lock icon for:", element); // Masquer l'icône de verrouillage pour l'élément
            element.style.display = 'none';
        });
    }

    if (planConfig.dataStartButton) {
        document.querySelectorAll(`[data-start-button="${planConfig.dataStartButton}"]`).forEach(button => {
            button.href = planConfig.newHref;
            button.textContent = 'Démarrer';
        });
    }

    if (planConfig.dataHideButton) {
        document.querySelectorAll(`[data-hide-button="${planConfig.dataHideButton}"]`).forEach(element => {
            element.style.display = 'none';
        });
    }
}
// Attacher la fonction au chargement du contenu DOM
document.addEventListener("DOMContentLoaded", () => {
    updateTabLinksAndHideElementsForSpecificPlans();
});



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


document.addEventListener('DOMContentLoaded', function() {
    updatePromoCode();
    checkAndStartSecondTimer();
});

function updatePromoCode() {
    let memberData = localStorage.getItem('_ms-mem');
    let couponName = null;

    if (memberData) {
        let memberObj = JSON.parse(memberData);
        if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
            couponName = memberObj.metaData.coupon_name;
            updatePromoElements(couponName);
            if (!localStorage.getItem('timer_finished')) {
                startCouponTimer(couponName, true);
            }
        }
    }
}

function updatePromoElements(couponName) {
    document.querySelectorAll('[data-co-offer="promo-code"]').forEach(function(element) {
        element.textContent = couponName;
    });
    document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
        promoPopinElement.style.display = 'block';
    });
}

function startCouponTimer(couponName, isFirstTimer) {
    if (isFirstTimer) {
        let endTime = new Date().getTime() + 8 * 60 * 60 * 1000;
        updateTimer(endTime, couponName);
    }
    setSecondTimerStart(couponName);
}

function setSecondTimerStart(couponName) {
    let currentTime = new Date();
    let targetTime = new Date(currentTime.getTime());
    targetTime.setDate(targetTime.getDate() + 2);
    targetTime.setHours(16, 0, 0, 0); // Changé de 12h à 16h
    localStorage.setItem('second_timer_start', targetTime.getTime());
    localStorage.setItem('second_timer_coupon', couponName);
}

function checkAndStartSecondTimer() {
    let secondTimerStart = localStorage.getItem('second_timer_start');
    let couponName = localStorage.getItem('second_timer_coupon');

    if (!secondTimerStart || !couponName) return;

    let startTime = parseInt(secondTimerStart, 10);
    let currentTime = new Date().getTime();
    let scheduledEndTime = startTime + 8 * 60 * 60 * 1000;

    if (currentTime >= startTime && currentTime < scheduledEndTime) {
        updateTimer(scheduledEndTime, couponName);
        updatePromoElements(couponName);
    }
}

function updateTimer(endTime, couponName) {
    clearInterval(window.timerInterval);
    window.timerInterval = setInterval(function() {
        let currentTime = new Date().getTime();
        let remainingTime = endTime - currentTime;

        if (remainingTime >= 0) {
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            document.querySelectorAll('[data-co-offer="promo-timer"]').forEach(function(timerDisplay) {
                timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
            });
        } else {
            clearInterval(window.timerInterval);
            localStorage.setItem('timer_finished', 'true');
            document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
                promoPopinElement.style.display = 'none';
            });
        }
    }, 1000);
}


// ----- FONCTION POUR ENREGISTRER L'ID AFFILIÉ DANS LES COOKIES DU VISITEUR ------//
(function() {
    // Fonction pour obtenir la valeur d'un paramètre spécifique dans l'URL
    function getQueryParam(name) {
        let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
           return null;
        } else {
           return decodeURIComponent(results[1]) || 0;
        }
    }

    // Fonction pour retirer les accents d'une chaîne de caractères
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Fonction pour stocker un cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    // Récupération de l'identifiant affilié depuis l'URL
    let affiliateId = getQueryParam('ref');

    // Vérification et nettoyage de l'identifiant affilié
    if (affiliateId) {
        affiliateId = removeAccents(affiliateId);

        // Stockage de l'identifiant affilié dans les cookies pour 30 jours
        setCookie('aff_ref', affiliateId, 90);
    }
})();


// ----- FONCTION POUR RÉCUPÉRER L'IDENTIFIANT AFFILIÉ DANS LES COOKIES ET AJOUTER L'ID AUX URLS SUR LA PAGE ------//
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
            return null; // Retourne null si le cookie n'est pas trouvé
        }

        function removeAccents(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        let affiliateId = getCookie('aff_ref');
        console.log("Affiliate ID: ", affiliateId); // Pour débogage

        if (affiliateId) {
            affiliateId = removeAccents(affiliateId); // Nettoyage de l'identifiant
            let links = document.querySelectorAll('a'); // Sélection de tous les liens dans le document

            links.forEach(function(link) {
                if (link.hostname.endsWith('order.coriace.co')) {
                    let originalHref = link.href;
                    console.log("Original Href: ", originalHref); // Pour débogage

                    // Ajout de l'identifiant affilié à l'URL
                    link.href += link.href.indexOf('?') > -1 ? '&ref=' + encodeURIComponent(affiliateId) : '?ref=' + encodeURIComponent(affiliateId);
                    console.log("Modified Href: ", link.href); // Pour débogage
                }
            });
        }
    });
})();

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



/* --- REDIRECTION DES MEMBRES NON-CONNECTÉ EN CAS D'ACHAT DE LA FORMATION POUR CRÉER LEUR COMPTE DANS UN PREMIER TEMPS ---*/
async function redirectToLoginIfNotMember(event) {
  // Empêche l'action par défaut (pour les liens, cela empêche la navigation)
  event.preventDefault();

  const response = await window.$memberstackDom.getCurrentMember();
  const member = response.data;

  // Si l'utilisateur est connecté, exécutez l'action par défaut (suivre le lien, cliquer sur le bouton, etc.)
  if (member) {
    // Si c'est un lien, suivez l'URL du href
    if (event.target.tagName.toLowerCase() === 'a') {
      window.location.href = event.target.href;
    } else {
      // Pour un bouton, vous pouvez ajouter ici une logique supplémentaire si nécessaire
    }
  } else {
    // Si l'utilisateur n'est pas connecté, préparez et redirigez-le vers la page de connexion avec l'URL actuelle en tant que paramètre de retour
    const currentUrl = window.location.href;
    const encodedCurrentUrl = encodeURIComponent(currentUrl);
    window.location.href = `https://app.coriace.co/app/inscription/etape-1-inscription-coriace?returnUrl=${encodedCurrentUrl}`;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const protectedElements = document.querySelectorAll('a[data-protected="true"], button[data-protected="true"]');

  protectedElements.forEach(element => {
    element.addEventListener('click', redirectToLoginIfNotMember);
  });
});

/*---  SI MEMBRE PAS CONNECTÉ SUR UNE PAGE SPÉCIFIQUE REDIRECTION PAGE DE CONNEXION ----*/

document.addEventListener('DOMContentLoaded', function () {
  var protectedContent = document.querySelector('[data-ms-content="protected"]');

  // Vérifiez si l'utilisateur est sur une page protégée et si la clé '_ms-mem' est absente du localStorage
  if (protectedContent && !localStorage.getItem('_ms-mem')) {
    // Si la clé n'est pas présente, redirige l'utilisateur vers la page de connexion
    window.location.href = '/app/connexion';
  }
});

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
