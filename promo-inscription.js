/* -------- AFFICHAGE DU CODE DE PROMOTION À L'INSCRIPTION -------- */
document.addEventListener('DOMContentLoaded', function() {
    updatePromoCode();
});

function startCouponTimer(couponName) {
  console.log("Déclenchement de startCouponTimer", new Date());
  let timerFinished = localStorage.getItem('timer_finished');
  let startTime = localStorage.getItem('coupon_start_time');
  let currentTime = new Date().getTime();
  
  if (timerFinished) return;
  
  if (!startTime) {
    startTime = currentTime;
    localStorage.setItem('coupon_start_time', startTime);
  }
  
  let elapsedTime = currentTime - startTime;
  let remainingTime = 8 * 60 * 60 * 1000 - elapsedTime;

  if (remainingTime > 0 && couponName) {
    document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
      promoPopinElement.style.display = 'block';
    });
  }

  function updateTimer() {
    elapsedTime = new Date().getTime() - startTime;
    remainingTime = 8 * 60 * 60 * 1000 - elapsedTime;

    if (remainingTime >= 0 && couponName) {
      let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      document.querySelectorAll('[data-co-offer="promo-timer"]').forEach(function(timerDisplay) {
        timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
      });
    } else {
      console.log("Le timer est à 0 ou aucun coupon_name valide, masquage des éléments promo-code-wrapper", new Date());
      clearInterval(timerInterval);
      localStorage.setItem('timer_finished', 'true');
      document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
        promoPopinElement.style.display = 'none';
      });
    }
  }

  let timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function updatePromoCode() {
  console.log("Déclenchement de updatePromoCode", new Date());
  let memberData = localStorage.getItem('_ms-mem');
  let couponName = null;
  
  if (memberData) {
    try {
      let memberObj = JSON.parse(memberData);
      
      if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
        console.log("Coupon trouvé, mise à jour des éléments promo-code", new Date());
        couponName = memberObj.metaData.coupon_name;
        let promoElements = document.querySelectorAll('[data-co-offer="promo-code"]');
        promoElements.forEach(function(element) {
          element.textContent = couponName;
        });
        
        if (!localStorage.getItem('timer_finished')) {
          startCouponTimer(couponName);
        }
      } else {
        console.log("Aucun coupon applicable trouvé", new Date());
      }
    } catch (e) {
      console.error("Erreur lors du parsing des données membres", e);
    }
  } else {
    console.log("Aucune donnée membre trouvée dans localStorage", new Date());
  }
}
