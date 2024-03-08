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




function startCouponTimer() {
  // Récupérer la date et l'heure de début du compteur ou les définir si non présentes
  var startTime = localStorage.getItem('coupon_start_time');
  if (!startTime) {
    startTime = new Date().getTime();
    localStorage.setItem('coupon_start_time', startTime);
  }
  
  // Fonction pour mettre à jour le compteur
  function updateTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var remainingTime = 24*60*60*1000 - elapsedTime; // 24 heures en millisecondes

    if (remainingTime >= 0) {
      // Calculer heures, minutes, secondes
      var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      
      // Afficher le compteur
      var timerDisplay = document.querySelector('.promo-timer');
      if (timerDisplay) {
        timerDisplay.textContent = hours + 'h ' + minutes + 'm ' + seconds + 's ';
      }
    } else {
      // Si le compteur a atteint 0, effacer l'intervalle et le startTime du localStorage
      clearInterval(timerInterval);
      localStorage.removeItem('coupon_start_time');
      // Masquer l'élément timer si nécessaire ou effectuer d'autres actions
    }
  }

  // Mettre à jour le compteur toutes les secondes
  var timerInterval = setInterval(updateTimer, 1000);
  
  // Appeler immédiatement updateTimer pour initialiser l'affichage
  updateTimer();
}

// Modifier la fonction updatePromoCode pour inclure le démarrage du timer
function updatePromoCode() {
  var memberData = localStorage.getItem('_ms-mem');
  
  if (memberData) {
    try {
      var memberObj = JSON.parse(memberData);
      if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
        // ... mise à jour de promo-popin_code comme avant ...
        // Démarrer le timer lorsque 'coupon_name' est présent
        startCouponTimer();
      } else {
        console.error('La clé "coupon_name" est introuvable dans les données "metaData" du membre.');
      }
    } catch (e) {
      console.error('Erreur lors de l\'analyse des données du membre:', e);
    }
  }
}

window.onload = updatePromoCode;

