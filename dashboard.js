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


// ----- FONCTION PERMETTANT D'AFFICHER LES ASSISTANCES PERSONNALISÉ AU MEMBRE CONCERNÉ ------//
document.addEventListener('DOMContentLoaded', function() {
  var memberstackData = localStorage.getItem('_ms-mem');
  if (memberstackData) {
    try {
      var memberData = JSON.parse(memberstackData);
      var memberId = memberData && memberData.id;

      if (memberId) {
        var assistanceItems = document.querySelectorAll('.dash_assistance-video-item');
        
        assistanceItems.forEach(function(item) {
          var itemMemberId = item.getAttribute('data-member-id');
          
          if (itemMemberId !== memberId) {
            item.style.display = 'none';
          }
        });
      }
    } catch (e) {
      console.error("Erreur lors de la parsing des données Memberstack: ", e);
    }
  }
});

// ----- FONCTION POUR SAUVEGARDER L'IDENTIFIANT AFFILIÉ DANS LES COOKIES ------//
(function() {
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    let affiliateId = getCookie('aff_ref');

    if (affiliateId) {
        document.body.addEventListener('click', function(e) {
            let target = e.target.closest('a');

            if (target && target.hostname.endsWith('order.coriace.co')) {
                e.preventDefault();
                let newHref = target.href;
                
                newHref += newHref.indexOf('?') > -1 ? '&ref=' + encodeURIComponent(affiliateId) : '?ref=' + encodeURIComponent(affiliateId);

                window.location.href = newHref;
            }
        }, false);
    }
})();



// ----- FONCTION POUR AFFICHER LES DERNIÈRES LEÇONS DANS LE DASHBOARD ------//

// Fonction pour décoder du HTML
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// Fonction pour convertir des secondes en minutes et secondes formatées
function secondsToMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} min`;
}

// Fonction pour nettoyer le JSON récupéré
function cleanJson(json) {
  while (json.data) {
    json = json.data;
  }
  return json;
}

// URL de l'image par défaut
const defaultImage = 'https://uploads-ssl.webflow.com/65745e7679d91e4fdbc7cca7/65ae31e81732875dfe6e36ea_Popin%20Background%20Installments%20Payments-min.png';

// Fonction asynchrone pour charger les 3 dernières leçons
async function loadLastThreeLessons() {
  const member = await window.$memberstackDom.getCurrentMember();

  if (member) {
    let memberJson = await window.$memberstackDom.getMemberJSON();
    let cleanedJson = cleanJson(memberJson);

    if (cleanedJson && cleanedJson.lessons && Object.keys(cleanedJson.lessons).length > 0) {
      const sortedLessons = Object.entries(cleanedJson.lessons).sort(([,a], [,b]) => new Date(b.timestamp) - new Date(a.timestamp));
      const lastThreeLessons = sortedLessons.slice(0, 3);

      lastThreeLessons.forEach(([id, lesson], index) => {
        const card = document.getElementById(`card${index + 1}`);
        if (!card) return; // S'assurer que la carte existe avant de continuer

        const img = card.querySelector('.dash_last-lesson-thumbnail');
        const name = card.querySelector('.dash_last-lesson-name');
        const time = card.querySelector('.dash_last-lesson-time');
        const link = card.querySelector('#dashLastLessonLink'); // Assurez-vous que cette classe correspond à votre HTML
        const tracker = card.querySelector('.dash_last-lesson-progress-tracker');

        // Utilisez l'image de la leçon si disponible, sinon utilisez l'image par défaut
        img.src = lesson.image || defaultImage;
        img.alt = lesson.name ? "Miniature de la leçon" : "Image par défaut";

        name.textContent = lesson.name ? htmlDecode(lesson.name) : "Aucune leçon visionnée";

        if (link && lesson.url) {
          link.href = lesson.url;
        } else if (link) {
          link.href = "#"; // Ou un autre lien par défaut
          link.style.pointerEvents = "none"; // Désactive le lien si aucune leçon n'est disponible
        }

        if (tracker && lesson.time && lesson.totalTime) {
          const progressPercentage = (lesson.time / lesson.totalTime) * 100;
          tracker.style.width = `${progressPercentage}%`;
        } else if (tracker) {
          tracker.style.width = "0%"; // Réinitialise la barre de progression si aucune leçon n'est disponible
        }

        if (time && lesson.time && lesson.totalTime) {
          const elapsedTimeFormatted = secondsToMinutes(lesson.time);
          const totalTimeFormatted = secondsToMinutes(lesson.totalTime);
          time.textContent = `${elapsedTimeFormatted} sur ${totalTimeFormatted}`;
        } else if (time) {
          time.textContent = ""; // Réinitialise le texte du temps si aucune leçon n'est disponible
        }
      });
    } else {
      // Configuration des cartes avec l'image par défaut si aucune leçon n'est disponible
      for (let index = 1; index <= 3; index++) {
        const card = document.getElementById(`card${index}`);
        if (!card) continue;

        const img = card.querySelector('.dash_last-lesson-thumbnail');
        const name = card.querySelector('.dash_last-lesson-name');
        const time = card.querySelector('.dash_last-lesson-time');
        const link = card.querySelector('#dashLastLessonLink');
        const tracker = card.querySelector('.dash_last-lesson-progress-tracker');

        img.src = defaultImage;
        img.alt = "Image par défaut";
        name.textContent = "Aucune leçon visionnée";
        if (link) {
          link.href = "#";
          link.style.pointerEvents = "none";
        }
        if (tracker) tracker.style.width = "0%";
        if (time) time.textContent = "";
      }
    }
  }
}

// Chargez les 3 dernières leçons une fois que le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", function() {
  loadLastThreeLessons();
});
