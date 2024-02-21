/*-- DÉBUT : Progression de chaque formation en fonction de la durée des vidéos dans Vimeo --*/
console.log('Le script GitHub est chargé.');
const formations = {
   "formation-fig-initiation": [
    "847579423", "887619549", "847579363", "847579508", "847579467",
    "847579556", "847579578", "847579752", "847579672", "847580262",
    "847580183", "847579618", "847580083"
    ],
   "formation-wf-initiation": [
    "882485897", "882486068", "882485668"
    ],
  "formation-wpdv": 
    [
    "765638967", "765646490", "765678273", "765470935", "765470788",
    "765470896", "765470977", "765471109", "766184062", "766091899",
    "765763265", "766041987", "766042083", "766112481", "766126896",
    "766160777", "766209367", "766401822", "766415983", "766820691",
    "767546647", "767356323", "766917021", "767370912", "750409127",
    "750389231", "750438397", "767549325", "750055187", "767555384",
    "750490744", "750650739", "749989811", "750702905", "750722015",
    "750712119", "750861130", "752030487", "750693671", "767561737",
    "766136898", "766137054", "766137288", "766424154", "766936324",
    "766962714", "766942955", "766948561", "766953064", "766979364",
    "767012030", "767006696", "767002487", "766991921", "765470705",
    "765470724", "765471021", "765470935", "765470788", "765470896",
    "765470977"
  ],
   "formation-eco-cms": [
    "860654157", "860653079", "860653477", "860654378", "860654293",
    "860654043", "860654474", "860654218", "860653881", "860653950",
    "860655082", "860654743", "860881645", "860654534", "860653338",
    "860654972", "860655147", "860653247", "860653575", "786649183",
    "786649758", "786649268", "786654338", "786649642", "786649969",
    "786650088", "786651213", "786650273", "786650485", "786654131",
    "786653178", "786654004", "786653449", "786655131", "786654944",
    "786654757", "786655208", "786655481", "786655336", "786655251",
    "786655711", "786656780", "786657230", "786656937", "786657046",
    "786657176", "786657473", "786657674", "786661428", "786657743",
    "786658075", "786658268", "786662594", "786661680", "786661730",
    "786661968", "786662012", "786662412", "787173135", "787172116",
    "787171878", "787173009", "787172245", "787172866", "787173211",
    "787173269", "787173299", "787173367", "787173742", "787173563",
    "787173507", "787173914", "827656182", "787174135", "787174043",
    "827937456", "827656020", "827681050", "827656571", "827656776",
    "827656668", "827679308", "827680250", "827657456", "827657605",
    "827657533", "827657372", "827680524", "827680592", "827681902",
    "827680752", "827962862", "827682351", "827681174", "827681455",
    "827681635", "827681707", "827682803", "827681781", "827684276",
    "827682517", "827684766", "827680882", "827685022", "827683048",
    "827683131", "827684446", "827684532", "827685516", "827686405",
    "827685630", "827686175", "827687612", "827687746", "827688053",
    "827688740", "827688220", "827689184", "827689364", "827689455"
  ],
   "formation-udesly-shopify": [
    "835020542", "835021386", "835000545", "835016701", "835000315", "835000205",
    "835021036", "835002929", "835015426", "835000386", "835002771", "835018410", 
    "835018796", "835018036", "835015981","835017322"
  ],
   "formation-client-first": [
    "786648816", "786648669", "786648950", "786649030", "786648899",
    "786648732", "786649146", "786649100"
  ],
   "formation-cookies": [
    "828293530", "828292786", "828294615", "828294117", "786648899",
    "786648732", "786649146", "786649100"
  ]
 };

const accessToken = 'c09f39f239fbdaf13857dd8f537d713d'; // Remplacez par votre vrai token d'accès

function cleanJson(json) {
  while (json.data) {
    json = json.data;
  }
  return json;
}

async function fetchVimeoVideoDuration(videoId, accessToken) {
  const url = `https://api.vimeo.com/videos/${videoId}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.duration;
  } catch (error) {
    console.error("Erreur lors de la récupération de la durée de la vidéo : ", error);
    return 0;
  }
}

async function calculateAndSaveTotalFormationDuration(formationVideos, formationName, accessToken) {
  let totalDuration = 0;

  for (const videoId of formationVideos) {
    const videoDuration = await fetchVimeoVideoDuration(videoId, accessToken);
    totalDuration += videoDuration;
  }

  // Sauvegarder la durée totale de la formation
  localStorage.setItem(`totalDuration-${formationName}`, totalDuration.toString());
}

async function updateProgressBars() {
  const member = await window.$memberstackDom.getCurrentMember();
  if (member) {
    let memberJson = await window.$memberstackDom.getMemberJSON();
    let cleanedJson = cleanJson(memberJson);

    for (const [formationName, videoIds] of Object.entries(formations)) {
      // Vérifier si la durée totale de la formation a déjà été sauvegardée
      if (!localStorage.getItem(`totalDuration-${formationName}`)) {
        await calculateAndSaveTotalFormationDuration(videoIds, formationName, accessToken);
      }

      // Calculer la progression en utilisant la durée totale sauvegardée
      const totalDuration = parseInt(localStorage.getItem(`totalDuration-${formationName}`), 10);
      let totalProgress = 0;

      for (const videoId of videoIds) {
        if (cleanedJson.lessons && cleanedJson.lessons[videoId]) {
          totalProgress += cleanedJson.lessons[videoId].time;
        }
      }

      const progress = totalDuration > 0 ? (totalProgress / totalDuration) * 100 : 0;
      const formationProgressElement = document.querySelector(`#progress-${formationName}`);
      if (formationProgressElement) {
        formationProgressElement.style.width = `${progress}%`;
      }
    }
    console.log('Progress bars updated.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateProgressBars();
});

/*-- FIN : Progression de chaque formation en fonction de la durée des vidéos dans Vimeo --*/
