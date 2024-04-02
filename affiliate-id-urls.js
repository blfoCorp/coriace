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
