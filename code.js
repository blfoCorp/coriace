console.log('Le script GitHub est chargé.');
const formations = {
  "formation1": [
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
   "formation2": [
    "786649268", "786649183"
  ]
 };

 const accessToken = 'c09f39f239fbdaf13857dd8f537d713d';

function cleanJson(json) {
  while (json.data) {
    json = json.data;
  }
  return json;
}

async function fetchVimeoVideoDuration(videoId, videoDurationsCache, formationName) {

  if (videoDurationsCache[videoId]) {
    console.log(`Duration for video ID ${videoId} found in cache`);
    return videoDurationsCache[videoId];
  }

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

    videoDurationsCache[videoId] = data.duration;
    localStorage.setItem(`videoDurations-${formationName}`, JSON.stringify(videoDurationsCache));
    return data.duration;
  } catch (error) {
    return 0;
  }
}

async function calculateFormationProgress(memberJson, formationVideos, formationName) {
  let totalProgress = 0;
  let totalTime = 0;

  const videoDurationsCache = JSON.parse(localStorage.getItem(`videoDurations-${formationName}`)) || {};

  for (const videoId of formationVideos) {
    if (memberJson.lessons && memberJson.lessons[videoId]) {
      totalProgress += memberJson.lessons[videoId].time;
    }
    totalTime += await fetchVimeoVideoDuration(videoId, videoDurationsCache, formationName);
  }

  console.log(`Total time for formation: ${totalTime}, Total progress: ${totalProgress}`);
  return totalTime > 0 ? (totalProgress / totalTime) * 100 : 0;
}

console.log('Déclenchement de updateProgressBars');
document.addEventListener('updateProgressBars', async function() {
  console.log('Updating progress bars...');
  const member = await window.$memberstackDom.getCurrentMember();
  if (member) {
    let memberJson = await window.$memberstackDom.getMemberJSON();
    let cleanedJson = cleanJson(memberJson);

    for (const [formationName, videoIds] of Object.entries(formations)) {
      const progress = await calculateFormationProgress(cleanedJson, videoIds, formationName);
      const formationProgressElement = document.querySelector(`#progress-${formationName}`);
      if (formationProgressElement) {
        formationProgressElement.style.width = `${progress}%`;
      }
    }
  }
  console.log('Progress bars updated.');
});

document.dispatchEvent(new Event('updateProgressBars'));

