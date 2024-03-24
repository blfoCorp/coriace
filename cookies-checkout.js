// ----- FONCTION POUR SAUVEGARDER LES DONNÉES UTILISATEURS DANS LES COOKIES ------//
window.addEventListener('load', function() {
    function setUserInfoCookies() {
        var userData = JSON.parse(localStorage.getItem('_ms-mem'));
        if (userData && userData.id && userData.auth && userData.auth.email && userData.customFields) {
            const memberId = userData.id;
            const memberEmail = userData.auth.email; 
            const memberName = userData.customFields['last-name'];
            const memberFirstName = userData.customFields['first-name'];
            const domain = 'coriace.co'; 
            const expirationDays = 365;
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
            const expires = "expires=" + expirationDate.toUTCString();

            // Modification pour assurer la transmission sécurisée aux sous-domaines
            document.cookie = "_ms_member_id=" + encodeURIComponent(memberId) + ";" + expires + ";path=/;domain=" + domain + ";SameSite=None;Secure";
            document.cookie = "_ms_member_email=" + encodeURIComponent(memberEmail) + ";" + expires + ";path=/;domain=" + domain + ";SameSite=None;Secure";
            document.cookie = "_ms_member_name=" + encodeURIComponent(memberName) + ";" + expires + ";path=/;domain=" + domain + ";SameSite=None;Secure";
            document.cookie = "_ms_member_firstname=" + encodeURIComponent(memberFirstName) + ";" + expires + ";path=/;domain=" + domain + ";SameSite=None;Secure";
        }
    }
    
    setUserInfoCookies();
});
