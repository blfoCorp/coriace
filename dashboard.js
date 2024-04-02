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


// ----- CODE POUR AFFICHER LE NOMBRE TOTAL DE LEÇONS VISIONNÉES ------//
document.addEventListener('DOMContentLoaded', updateVideoCountDisplay);

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

// ----- FONCTION POUR AFFICHER UNE CITATION ALÉATOIRE CHAQUE JOUR ------//
const citations = [
    "Seuls les plus coriaces osent braver les tempêtes pour atteindre le rivage de leurs rêves. N'abandonne jamais.",
    "Le chemin du succès est semé d'obstacles, mais c'est notre esprit coriace qui nous propulse vers l'avant.",
    "Rappelle-toi que les moments les plus coriaces forgent les caractères les plus résilients. Poursuis ta quête avec courage.",
    "Dans la danse avec les défis, c'est l'âme coriace qui mène la valse vers la victoire.",
    "Fais de ta volonté coriace ton plus fidèle allié dans la réalisation de tes projets les plus audacieux.",
    "L'adversité révèle les esprits coriaces ; sois celui qui, face aux tempêtes, bâtit des ponts vers ses rêves.",
    "Un cœur coriace est un trésor inestimable ; il transforme chaque obstacle en marchepied vers les étoiles.",
    "Soyez coriace dans votre quête de succès ; les fleurs les plus rares poussent dans les terrains les plus arides.",
    "L'histoire se souvient des plus coriaces, de ceux qui ont transformé les déserts en oasis de réussite.",
    "Le monde appartient aux coriaces, à ceux qui croient en leurs rêves même quand le vent souffle en contre.",
    "Être entrepreneur, c'est être coriace avec un sourire d'acier. Même quand ton café est froid, ton pitch doit rester chaud.",
    "La vie d'entrepreneur ? Un marathon en chaussettes sur un tapis de legos. Coriace, mais quelle aventure !",
    "Un entrepreneur coriace sait que derrière chaque 'non', se cache un 'oui' qui s'est perdu. Continue de chercher !",
    "La recette de l'entrepreneur coriace ? Une cuillère de ténacité, un zeste de folie et une pincée d'humour pour assaisonner les échecs.",
    "Si la route de l'entrepreneuriat était douce, tout le monde serait coriace. Célébrons donc nos épines, elles nous rendent uniques.",
    "Dans le grand livre de l'entrepreneuriat, les plus belles histoires sont celles des coriaces qui ont appris à danser sous la pluie.",
    "Rappelle-toi, un bon entrepreneur est coriace. Il mange des problèmes au petit déjeuner et des solutions au dîner.",
    "L'entrepreneuriat, c'est l'art d'être assez coriace pour dire 'au revoir' au confort et 'bonjour' à l'aventure de ta vie.",
    "Chaque jour est une toile blanche ; sois coriace, peins-la avec les couleurs de ton âme.",
    "La vie est coriace, mais toi aussi. Rappelle-toi que chaque pas, même le plus petit, est un progrès.",
    "Dans la forge de la vie quotidienne, c'est notre détermination coriace qui nous sculpte en chefs-d'œuvre.",
    "Sois coriace dans ta quête de croissance personnelle ; chaque difficulté est une leçon déguisée en défi.",
    "Face aux tempêtes de la vie, montre-toi plus coriace que les vagues ; apprends à danser sous la pluie.",
    "Cultive une volonté coriace ; elle te portera à travers les jours gris jusqu'aux matins dorés de succès.",
    "La vie ne te donne pas toujours ce que tu veux, mais si tu es coriace, elle finit par te révéler ce dont tu as besoin.",
    "Sois coriace, pas juste pour tenir bon dans la tempête, mais pour pouvoir te redresser plus fort après qu'elle passe.",
    "Un esprit coriace trouve de la lumière même dans les ombres les plus sombres. Illumine ta vie avec persévérance.",
    "La vie est un puzzle parfois coriace, mais chaque pièce a sa place. Patience et persévérance assembleront le tableau.",
    "Au travail, sois coriace face aux défis ; chaque obstacle surmonté est un tremplin vers ton succès.",
    "Les tâches les plus coriaces polissent les compétences les plus précieuses. Embrasse-les comme des opportunités de briller.",
    "Un esprit coriace transforme les défis du travail en escaliers vers les sommets de l'accomplissement.",
    "Face à un projet coriace, rappelle-toi : la persévérance est la clé qui ouvre les portes de l'innovation et de la réussite.",
    "Le travail peut être coriace, mais ton esprit l'est encore plus. Ne sous-estime jamais ta capacité à surmonter.",
    "Dans l'arène du travail, les plus coriaces ne sont pas ceux qui ne tombent jamais, mais ceux qui se relèvent à chaque fois.",
    "Les jours au travail sont parfois coriaces, mais chaque défi est une étincelle qui allume la flamme de la créativité.",
    "Soyez coriace dans votre engagement ; les graines de l'effort germent dans les sols les plus durs.",
    "Un objectif coriace demande une détermination encore plus coriace. Équipe-toi de patience et poursuis ta route.",
    "Le secret pour avancer est de commencer, et pour continuer, d'être coriace. Le travail acharné mène invariablement au succès."
];

const degradeFonds = [
    'linear-gradient(135deg, #6934ff, #ff6673)',
    'linear-gradient(135deg, #007991, #78ffd6)', // Bleu turquoise vibrant
    'linear-gradient(135deg, #ff5f6d, #ffc371)', // Rouge doux à jaune soleil
    'linear-gradient(135deg, #696eff, #f8acff)',
    'linear-gradient(135deg, #7c00ff, #cc25e4, #ff6673)', 
    'linear-gradient(135deg, #34073d, #ef745c)', 
    'linear-gradient(135deg, #125f96, #00ffc2)', 
];


function genererIndexAleatoire(max) {
    const aujourdHui = new Date();
    const graine = aujourdHui.getFullYear() * 10000 + (aujourdHui.getMonth() + 1) * 100 + aujourdHui.getDate();
    let hash = graine;
    hash = ((hash << 5) - hash) + graine;
    hash = hash & hash; // Convertir en 32bit integer
    return Math.abs(hash) % max;
}

function afficherCitationEtAppliquerFond() {
    const indexCitation = genererIndexAleatoire(citations.length);
    document.getElementById('citationDuJour').innerText = citations[indexCitation];
    
    const indexFond = genererIndexAleatoire(degradeFonds.length);
    document.getElementById('quoteBlock').style.backgroundImage = degradeFonds[indexFond];
}

afficherCitationEtAppliquerFond();
