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
