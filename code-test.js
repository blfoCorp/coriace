document.addEventListener('DOMContentLoaded', function() {
    updatePromoCode();
    checkAndStartSecondTimer();
});

function updatePromoCode() {
    let memberData = localStorage.getItem('_ms-mem');
    let couponName = null;

    if (memberData) {
        let memberObj = JSON.parse(memberData);
        if (memberObj && memberObj.metaData && memberObj.metaData.coupon_name) {
            couponName = memberObj.metaData.coupon_name;
            updatePromoElements(couponName);
            if (!localStorage.getItem('timer_finished')) {
                startCouponTimer(couponName, true);
            }
        }
    }
}

function updatePromoElements(couponName) {
    document.querySelectorAll('[data-co-offer="promo-code"]').forEach(function(element) {
        element.textContent = couponName;
    });
    document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
        promoPopinElement.style.display = 'block';
    });
}

function startCouponTimer(couponName, isFirstTimer) {
    if (isFirstTimer) {
        let endTime = new Date().getTime() + 8 * 60 * 60 * 1000;
        updateTimer(endTime, couponName);
    }
    setSecondTimerStart(couponName);
}

function setSecondTimerStart(couponName) {
    let currentTime = new Date();
    let targetTime = new Date(currentTime.getTime());
    targetTime.setDate(targetTime.getDate() + 2);
    targetTime.setHours(16, 0, 0, 0); // Changé de 12h à 16h
    localStorage.setItem('second_timer_start', targetTime.getTime());
    localStorage.setItem('second_timer_coupon', couponName);
}

function checkAndStartSecondTimer() {
    let secondTimerStart = localStorage.getItem('second_timer_start');
    let couponName = localStorage.getItem('second_timer_coupon');

    if (!secondTimerStart || !couponName) return;

    let startTime = parseInt(secondTimerStart, 10);
    let currentTime = new Date().getTime();
    let scheduledEndTime = startTime + 8 * 60 * 60 * 1000;

    if (currentTime >= startTime && currentTime < scheduledEndTime) {
        updateTimer(scheduledEndTime, couponName);
        updatePromoElements(couponName);
    }
}

function updateTimer(endTime, couponName) {
    clearInterval(window.timerInterval);
    window.timerInterval = setInterval(function() {
        let currentTime = new Date().getTime();
        let remainingTime = endTime - currentTime;

        if (remainingTime >= 0) {
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            document.querySelectorAll('[data-co-offer="promo-timer"]').forEach(function(timerDisplay) {
                timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
            });
        } else {
            clearInterval(window.timerInterval);
            localStorage.setItem('timer_finished', 'true');
            document.querySelectorAll('[data-co-offer="promo-code-wrapper"]').forEach(function(promoPopinElement) {
                promoPopinElement.style.display = 'none';
            });
        }
    }, 1000);
}
