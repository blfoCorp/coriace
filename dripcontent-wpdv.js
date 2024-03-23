/*-- DÉBUT : Drip Content paiement en plusieurs fois combiné --*/

window.addEventListener('load', function() {
  function calculateDaysLeft(startDate, daysToAdd) {
    if (!startDate) {
      console.error('La date de début est undefined.');
      return 0; // Ou toute autre valeur par défaut que vous voulez retourner dans ce cas.
    }
  
    var futureDate = new Date(startDate.getTime());
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
  }

  function checkMemberPlan() {
    var userData = JSON.parse(localStorage.getItem('_ms-mem'));
    console.log('User data:', userData);

    if (userData && userData.metaData && userData.planConnections) {
      var wpdvPlanIds = [
        "pln_formation-webflow-page-de-vente-3-fois--ul110zw2",
        "pln_coriace-formation-webflow-page-de-vente-6b4m0150"
      ];
      var packPlanIds = [
        "pln_webflow-le-pack-3-fois--sshd024y",
        "pln_webflow-le-pack-ezhb0291"
      ];
      var megaPackPlanIds = [
        "pln_le-mega-pack-webflow-3-fois--tnkm02zj",
        "pln_le-mega-pack-webflow-2ljs0t3b"
      ];
      var specialPlanIds = [
        "pln_coriace-formation-webflow-page-de-vente-6b4m0150",
        "pln_webflow-le-pack-ezhb0291",
        "pln_le-mega-pack-webflow-2ljs0t3b",
        "pln_formation-simple-trimestriel-7rj80985",
        "pln_formation-simple-semestriel-tnh604fc",
        "pln_formation-simple-annuel-gyh704ly",
        "pln_formation-accompagn-e-trimestriel-fih804b7",
        "pln_formation-accompagn-e-semestriel-7ij9096p",
        "pln_formation-accompagn-e-annuel-b6ha045g",
        "pln_formation-et-assistance-trimestriel-plja09y7",
        "pln_formation-et-assistance-semestriel-vohd04oh",
        "pln_formation-et-assistance-annuel-wkhe043e"
      ];
      var hasSpecialPlan = userData.planConnections.some(plan => specialPlanIds.includes(plan.planId) && plan.status === "ACTIVE");
      var hasWpdvPlan = userData.planConnections.some(plan => plan.planId === "pln_formation-webflow-page-de-vente-3-fois--ul110zw2" && plan.status === "ACTIVE");
      var hasPackPlan = userData.planConnections.some(plan => plan.planId === "pln_webflow-le-pack-3-fois--sshd024y" && plan.status === "ACTIVE");
      var hasMegaPackPlan = userData.planConnections.some(plan => plan.planId === "pln_le-mega-pack-webflow-3-fois--tnkm02zj" && plan.status === "ACTIVE");

      var startDate;
      if (hasWpdvPlan) {
        startDate = new Date(userData.metaData.start_date_wf_wpdv);
      } else if (hasPackPlan) {
        startDate = new Date(userData.metaData.start_date_wf_pack);
      } else if (hasMegaPackPlan) {
        startDate = new Date(userData.metaData.start_date_wf_megapack);
      }
      var daysForLevel2 = 30;
      var daysForLevel3 = 60;
      var daysSinceStart = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));

      var accessLevel = 1;
      if (daysSinceStart >= daysForLevel2) { accessLevel = 2; }
      if (daysSinceStart >= daysForLevel3) { accessLevel = 3; }

     // Calcul du temps restant pour chaque niveau
      var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
      var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);
      
      // Mise à jour du temps restant pour les niveaux 2 et 3
      document.querySelectorAll('[data-drip-content="courseTimeLeft2"]').forEach(function(span) {
        span.textContent = timeLeftForLevel2.toString();
      });
      document.querySelectorAll('[data-drip-content="courseTimeLeft3"]').forEach(function(span) {
        span.textContent = timeLeftForLevel3.toString();
      });
      
      // Sélection des éléments pour les cartes, prix, boutons et noms des cours
      var courseTimeLeftCard2 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard2"]');
      var courseTimeLeftCard3 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard3"]');
      var courseTimeLeftPrice = document.querySelectorAll('[data-drip-content="courseTimeLeftPrice"]');
      var courseTimeLeftButton = document.querySelectorAll('[data-drip-content="courseTimeLeftButton"]');
      var courseTimeName1 = document.querySelectorAll('[data-drip-content="courseTimeName1"]');
      var courseTimeName2 = document.querySelectorAll('[data-drip-content="courseTimeName2"]');
      
      if (daysSinceStart >= daysForLevel2) {
        // Masquer les cartes pour le niveau 2 si applicable
        courseTimeLeftCard2.forEach(function(card) {
          card.style.display = 'none';
        });
      
        // Mise à jour des informations basées sur le plan de l'utilisateur
        if (hasWpdvPlan) {
          courseTimeLeftPrice.forEach(function(price) {
          price.textContent = "60€";
          });
          courseTimeLeftButton.forEach(function(button) {
            button.href = "https://order.coriace.co/formation/commande-webflow-page-de-vente-60/etape/commande-webflow-page-de-vente-60/";
          });
          courseTimeName1.forEach(function(name) {
            name.textContent = "Niveau 2";
          });
          courseTimeName2.forEach(function(name) {
            name.textContent = "Niveau 3";
          });
        } else if (hasPackPlan) {
          courseTimeLeftPrice.forEach(function(price) {
            price.textContent = "84€";
          });
          courseTimeLeftButton.forEach(function(button) {
            button.href = "https://order.coriace.co/formation/commande-pack-webflow-84/etape/commande-pack-webflow-84/";
          });
          courseTimeName1.forEach(function(name) {
            name.textContent = "Wf E-co.";
          });
          courseTimeName2.forEach(function(name) {
            name.textContent = "Wf CMS.";
          });
        } else if (hasMegaPackPlan) {
          courseTimeLeftPrice.forEach(function(price) {
            price.textContent = "116€";
          });
          courseTimeLeftButton.forEach(function(button) {
            button.href = "https://order.coriace.co/formation/commande-mega-pack-webflow-116/etape/commande-mega-pack-webflow-116/";
          });
          courseTimeName1.forEach(function(name) {
            name.textContent = "Partie 2";
          });
          courseTimeName2.forEach(function(name) {
            name.textContent = "Partie 3";
          });
        }
      } else {
          // Si l'utilisateur a le plan Wpdv mais n'est pas encore au niveau 2
          if (hasWpdvPlan) {
            courseTimeLeftPrice.forEach(function(price) {
              price.textContent = "120€";
            });
            courseTimeLeftButton.forEach(function(button) {
              button.href = "https://order.coriace.co/formation/commande-webflow-page-de-vente-120/etape/commande-webflow-page-de-vente-120/";
            });
            courseTimeName1.forEach(function(name) {
              name.textContent = "Niveau 2";
            });
            courseTimeName2.forEach(function(name) {
              name.textContent = "Niveau 3";
            });
          }
          // Si l'utilisateur a le plan Pack
          if (hasPackPlan) {
            courseTimeLeftPrice.forEach(function(price) {
              price.textContent = "168€";
            });
            courseTimeLeftButton.forEach(function(button) {
              button.href = "https://order.coriace.co/formation/commande-pack-webflow-168/etape/commande-pack-webflow-168/";
            });
            courseTimeName1.forEach(function(name) {
              name.textContent = "Wf E-co.";
            });
            courseTimeName2.forEach(function(name) {
              name.textContent = "Wf CMS";
            });
          }
          // Si l'utilisateur a le plan MegaPack
          if (hasMegaPackPlan) {
            courseTimeLeftPrice.forEach(function(price) {
              price.textContent = "232€";
            });
            courseTimeLeftButton.forEach(function(button) {
              button.href = "https://order.coriace.co/formation/commande-mega-pack-webflow-232/etape/commande-mega-pack-webflow-232/";
            });
            courseTimeName1.forEach(function(name) {
              name.textContent = "Partie 2";
            });
            courseTimeName2.forEach(function(name) {
              name.textContent = "Partie 3";
            });
          }
        }

       if (hasSpecialPlan) {
          courseTimeLeftCard2.forEach(function(card) {
            card.style.display = 'none';
          });
          courseTimeLeftCard3.forEach(function(card) {
            card.style.display = 'none';
          });
        }
      document.querySelectorAll('.course_lesson-item').forEach(function(item) {
        var paidId;
        if (hasWpdvPlan) {
          paidId = parseInt(item.getAttribute('data-paid-id'), 10);
        } else if (hasPackPlan) {
          paidId = parseInt(item.getAttribute('data-pack-paid-id'), 10);
        } else if (hasMegaPackPlan) {
          paidId = parseInt(item.getAttribute('data-megapack-paid-id'), 10);
        }
        var lessonMask = item.querySelector('.course_lesson-mask');

        if (hasSpecialPlan) {
          item.style.opacity = '1';
          if (lessonMask) lessonMask.style.display = 'none';
        } else {
          if (paidId > accessLevel) {
            item.style.opacity = '0.5';
            if (lessonMask) lessonMask.style.display = 'block';
          } else {
            item.style.opacity = '1';
            if (lessonMask) lessonMask.style.display = 'none';
          }
        }
      });

      var courseNavigation = document.getElementById('courseNavigation');
      var allItemsActive = accessLevel >= 3 || hasSpecialPlan;
      if (!allItemsActive && courseNavigation) courseNavigation.style.display = 'none';
      else if (courseNavigation) courseNavigation.style.display = 'flex';
    }
  }

  // Appel de la fonction pour vérifier le plan d'adhésion
  checkMemberPlan();
});

/*-- FIN : Drip Content paiement en plusieurs fois combiné --*/
