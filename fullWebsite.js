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




// Fonction pour mettre à jour le code promo ou masquer l'élément si non trouvé
function updatePromoCode() {
  // Récupérer la valeur JSON stockée dans le localStorage
  var memberData = localStorage.getItem('_ms-mem');
  
  if (memberData) {
    // Parser la donnée JSON pour la transformer en objet JavaScript
    try {
      var memberObj = JSON.parse(memberData);
      
      // Sélectionner l'élément de promo code et les éléments de promo popin
      var promoElements = document.querySelectorAll('.promo-popin_code');
      var promoPopinElement = document.querySelector('.promo-code_popin');
      
      // Vérifier si l'objet 'metaData' et la clé 'coupon_name' existent
      if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
        // Mettre à jour le contenu de chaque élément avec la valeur de 'coupon_name'
        promoElements.forEach(function(element) {
          element.textContent = memberObj.metaData.coupon_name;
        });
      } else {
        // Si 'coupon_name' n'est pas trouvé, masquer l'élément 'promo-code_popin'
        if (promoPopinElement) {
          promoPopinElement.style.display = 'none';
        }
        console.error('La clé "coupon_name" est introuvable dans les données "metaData" du membre.');
      }
    } catch (e) {
      console.error('Erreur lors de l\'analyse des données du membre:', e);
    }
  } else {
    console.error('Aucune donnée membre trouvée dans le localStorage.');
  }
}

// Attacher la fonction updatePromoCode à l'événement onload de la fenêtre
window.onload = updatePromoCode;
