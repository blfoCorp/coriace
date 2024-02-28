<script>
// Vérifie si la largeur de la fenêtre est inférieure à 991px
function isMobile() {
    return window.innerWidth < 991;
}

// Les fonctions et les gestionnaires d'événements seront définis à l'intérieur de cette fonction
function setupMenu() {
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
    if (isMobile()) {
        setupMenu();
    }
});
</script>
