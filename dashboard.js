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

        name.textContent = lesson.name ? htmlDecode(lesson.name) : "Visionnez votre première leçon !";

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
        name.textContent = "Visionnez votre première leçon !";
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

// ----- FONCTION POUR AFFICHER UNE CITATION ALÉATOIRE CHAQUE JOUR ------//
const citations = [
    "Le no-code est la démocratisation du développement ; il donne une voix à ceux qui n'ont jamais osé coder.",
    "Dans l'ère du no-code, la seule erreur de syntaxe est de penser qu'on en a besoin pour créer quelque chose de grand.",
    "Le no-code n'élimine pas les développeurs, il les multiplie.",
    "Adopter le no-code, c'est comme apprendre une nouvelle langue sans mots : soudain, ce sont les idées qui parlent",
    "Le no-code transforme les barrières techniques en tremplins créatifs.",
    "Si le code est poésie, alors le no-code est un slam : accessible, expressif, et sans règles strictes.",
    "Avec le no-code, chaque utilisateur est un artiste et chaque application, une œuvre d'art.",
    "Le no-code ne simplifie pas seulement le développement ; il invite à repenser ce qui est possible.",
    "Être no-code, c'est croire que la meilleure ligne de code est celle qu'on n'a pas à écrire.",
    "Le no-code est le vent qui gonfle les voiles de l'innovation, permettant à chaque idée de naviguer librement sur les océans du digital.",
    "Je peux pas, j'ai no-code."
];


function genererIndexAleatoire() {
    const aujourdHui = new Date();
    const graine = aujourdHui.getFullYear() * 10000 + (aujourdHui.getMonth() + 1) * 100 + aujourdHui.getDate();
    const rng = new Math.seedrandom(graine); // Utilisation de seedrandom pour générer un nombre aléatoire basé sur une graine
    return Math.floor(rng() * citations.length);
}

// Fonction pour afficher la citation
function afficherCitation() {
    const index = genererIndexAleatoire();
    document.getElementById('citationDuJour').innerText = citations[index];
}

// ----- CODE POUR AFFICHER LE NOMBRE TOTAL DE LEÇONS VISIONNÉES ------//
document.addEventListener('DOMContentLoaded', afficherCitation);

// Fonction pour compter les vidéos visionnées et mettre à jour l'affichage
async function updateVideoCountDisplay() {
  const totalVideos = 458; // Le nombre total de vidéos
  const member = await window.$memberstackDom.getCurrentMember();
  
  if (member) {
    let memberJson = await window.$memberstackDom.getMemberJSON();
    let cleanedJson = cleanJson(memberJson);

    let videosWatched = 0; // Compteur pour les vidéos visionnées
    if (cleanedJson && cleanedJson.lessons) {
      Object.values(cleanedJson.lessons).forEach(lesson => {
        if (lesson.time && lesson.time > 0) {
          videosWatched++; // Incrémenter le compteur si la vidéo a été visionnée
        }
      });
    }

    // Afficher le compte de vidéos visionnées
    const videosWatchedDisplay = document.querySelector('#videosWatchedDisplay'); // Supposer qu'il y a un élément avec cet ID
    if (videosWatchedDisplay) {
      videosWatchedDisplay.textContent = `${videosWatched}`;
    }
  }
}

// Appeler cette fonction pour mettre à jour l'affichage quand nécessaire
updateVideoCountDisplay();


// ----- CODE POUR AFFICHER LE TOTAL DE CRÉDIT WEBFLOW ET FIGMA ------//
document.addEventListener('DOMContentLoaded', function() {

  const memberData = JSON.parse(localStorage.getItem('_ms-mem')); // Assurez-vous que la clé est correcte

  let totalCreditsWebflow = 0;
  let totalCreditsFigma = 0;

  if (memberData && memberData.customFields) {

    // Calcul pour les crédits Webflow
    let superAssistanceWebflow = memberData.customFields['super-assistance-webflow'];
    if (superAssistanceWebflow && superAssistanceWebflow !== 'video') {
      totalCreditsWebflow += parseFloat(superAssistanceWebflow) || 0;
    }
    if (memberData.customFields['credit-assistance-webflow']) {
      totalCreditsWebflow += parseFloat(memberData.customFields['credit-assistance-webflow']) || 0;
    }

    // Calcul pour les crédits Figma
    let superAssistanceFigma = memberData.customFields['super-assistance-figma'];
    if (superAssistanceFigma && superAssistanceFigma !== 'video') {
      totalCreditsFigma += parseFloat(superAssistanceFigma) || 0;
    }
    if (memberData.customFields['credit-assistance-figma']) {
      totalCreditsFigma += parseFloat(memberData.customFields['credit-assistance-figma']) || 0;
    }

    // Afficher les crédits totaux pour Webflow et Figma
    updateTotalCreditsDisplay('creditWebflowTotal', totalCreditsWebflow);
    updateTotalCreditsDisplay('creditFigmaTotal', totalCreditsFigma);
  } else {
    console.log('Aucune donnée customFields trouvée ou membreData est nul.');
  }
});

function updateTotalCreditsDisplay(elementId, credits) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = credits.toString();
  }
}
