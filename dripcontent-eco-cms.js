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
      var ecomPlanIds = [
        "pln_formation-webflow-e-commerce-cms-3-fois--y110qun",
        "pln_formation-webflow-e-commerce-cms-kb40awg"
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
        "pln_formation-webflow-e-commerce-cms-kb40awg",
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
      var hasEcomPlan = userData.planConnections.some(plan => plan.planId === "pln_formation-webflow-e-commerce-cms-3-fois--y110qun" && plan.status === "ACTIVE");
      var hasPackPlan = userData.planConnections.some(plan => plan.planId === "pln_webflow-le-pack-3-fois--sshd024y" && plan.status === "ACTIVE");
      var hasMegaPackPlan = userData.planConnections.some(plan => plan.planId === "pln_le-mega-pack-webflow-3-fois--tnkm02zj" && plan.status === "ACTIVE");

      var startDate;
      if (hasEcomPlan) {
        startDate = new Date(userData.metaData.start_date_wf_eco);
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
      var courseTimeLeftCard1 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard1"]');
      var courseTimeLeftCard2 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard2"]');
      var courseTimeLeftCard3 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard3"]');
      var courseTimeLeftPrice = document.querySelectorAll('[data-drip-content="courseTimeLeftPrice"]');
      var courseTimeLeftButton = document.querySelectorAll('[data-drip-content="courseTimeLeftButton"]');
      var courseTimeName1 = document.querySelectorAll('[data-drip-content="courseTimeName1"]');
      var courseTimeName2 = document.querySelectorAll('[data-drip-content="courseTimeName2"]');
      var echeancePayment2 = document.querySelectorAll('[data-drip-content="echeancePayment2"]');
      var echeancePayment3 = document.querySelectorAll('[data-drip-content="echeancePayment3"]');
      
     // Masquage initial pour tous les utilisateurs ayant un wpdvPlan, packPlan, ou megaPackPlan
      if (hasMegaPackPlan) {
        if (daysSinceStart >= daysForLevel2) {
              courseTimeLeftCard1.forEach(card => card.style.display = 'none');
              courseTimeLeftCard2.forEach(card => card.style.display = 'none');
              courseTimeLeftCard3.forEach(card => card.style.display = 'none');
          }
      } else if (hasPackPlan) {
         if (daysSinceStart >= daysForLevel2) {
              courseTimeLeftCard1.forEach(card => card.style.display = 'none');
              courseTimeLeftCard2.forEach(card => card.style.display = 'none');
          }
          if (daysSinceStart >= daysForLevel3) {
              courseTimeLeftCard3.forEach(card => card.style.display = 'none');
          }
      } else if (hasEcomPlan) {
          // Pour ecomPlan, masquer la première carte immédiatement et les autres progressivement
          courseTimeLeftCard1.forEach(card => card.style.display = 'none');
          
          // Condition pour le masquage progressif, basée sur le temps depuis la date de début
          if (daysSinceStart >= daysForLevel2) {
              courseTimeLeftCard2.forEach(card => card.style.display = 'none');
          }
          if (daysSinceStart >= daysForLevel3) {
              courseTimeLeftCard3.forEach(card => card.style.display = 'none');
          }
      }

      // Fonction pour mettre à jour le contenu en fonction du plan
      var updateContent = function(priceText, buttonText, buttonHref, name1Text, name2Text, paymentTime2, paymentTime3) {
        courseTimeLeftPrice.forEach(function(price) {
          price.textContent = priceText;
        });
        courseTimeLeftButton.forEach(function(button) {
          button.href = buttonHref;
        });
        courseTimeName1.forEach(function(name) {
          name.textContent = name1Text;
        });
        courseTimeName2.forEach(function(name) {
          name.textContent = name2Text;
        });
        echeancePayment2.forEach(function(name) {
          name.textContent = paymentTime2;
        });
        echeancePayment3.forEach(function(name) {
          name.textContent = paymentTime3;
        });
      };

      
      if (daysSinceStart >= daysForLevel2) {
        // Masquer les cartes pour le niveau 2
        courseTimeLeftCard2.forEach(function(card) {
          card.style.display = 'none';
        });
      
        if (hasEcomPlan) {
          updateContent("60€", "Commande E-commerce CMS 60€", "https://order.coriace.co/formation/commande-webflow-ecommerce-cms-60/etape/commande-webflow-ecommerce-cms-60/", "Produit Phy.", "CMS", "2ème échéance", "3ème échéance");
        }
        if (hasPackPlan) {
          updateContent("84€", "Commande Pack Webflow 84€", "https://order.coriace.co/formation/commande-pack-webflow-84/etape/commande-pack-webflow-84/", "Wf E-co.", "Wf CMS", "2ème échéance", "3ème échéance");
        }
        if (hasMegaPackPlan) {
          updateContent("116€", "Commande Mega Pack Webflow 116€", "https://order.coriace.co/formation/commande-mega-pack-webflow-116/etape/commande-mega-pack-webflow-116/", "Partie 2", "Partie 3", "2ème échéance", "2ème échéance");
        }
      } else {
        // Utilisation de la fonction updateContent avec des valeurs spécifiques pour le cas où daysSinceStart < daysForLevel2
        if (hasEcomPlan) {
          updateContent("120€", "Commande Webflow E-commerce CMS 120€", "https://order.coriace.co/formation/commande-webflow-ecommerce-cms-120/etape/commande-webflow-ecommerce-cms-120/", "Produit Phy.", "CMS", "2ème échéance", "3ème échéance");
        }
        if (hasPackPlan) {
          updateContent("168€", "Commande Pack Webflow 168€", "https://order.coriace.co/formation/commande-pack-webflow-168/etape/commande-pack-webflow-168/", "Wf E-co.", "Wf CMS", "2ème échéance", "3ème échéance");
        }
        if (hasMegaPackPlan) {
          updateContent("232€", "Commande Mega Pack Webflow 232€", "https://order.coriace.co/formation/commande-mega-pack-webflow-232/etape/commande-mega-pack-webflow-232/", "Partie 2", "Partie 3", "2ème échéance", "2ème échéance");
        }
      }
      
      if (daysSinceStart >= daysForLevel3) {
        courseTimeLeftCard3.forEach(function(card) {
          card.style.display = 'none';
        });
      }
      
      if (hasSpecialPlan) {
        courseTimeLeftCard2.forEach(function(card) {
          card.style.display = 'none';
        });
        courseTimeLeftCard3.forEach(function(card) {
          card.style.display = 'none';
        });
        courseTimeLeftCard1.forEach(function(card) {
          card.style.display = 'none';
        });
      }
      document.querySelectorAll('.course_lesson-item').forEach(function(item) {
        var paidId;
        if (hasEcomPlan) {
          paidId = parseInt(item.getAttribute('data-paid-id'), 10);
        } else if (hasPackPlan) {
          paidId = parseInt(item.getAttribute('data-pack-paid-id'), 10);
        } else if (hasMegaPackPlan) {
          paidId = parseInt(item.getAttribute('data-megapack-paid-id'), 10);
        }
        var lessonMask = item.querySelector('.course_lesson-mask');

        if (paidId > accessLevel) {
          item.style.opacity = '0.5';
          if (lessonMask) lessonMask.style.display = 'block';
        } else {
          item.style.opacity = '1';
          if (lessonMask) lessonMask.style.display = 'none';
        }
      });

      // Afficher les éléments lorsque l'utilisateur a un plan spécial
      if (hasSpecialPlan) {
        document.querySelectorAll('.course_lesson-item').forEach(function(item) {
          item.style.opacity = '1';
          var lessonMask = item.querySelector('.course_lesson-mask');
          if (lessonMask) lessonMask.style.display = 'none';
        });
      }

      var courseNavigation = document.getElementById('courseNavigation');
      var allItemsActive = accessLevel >= 3 || hasSpecialPlan;
      if (!allItemsActive && courseNavigation) courseNavigation.style.display = 'none';
      else if (courseNavigation) courseNavigation.style.display = 'flex';
    } else {
      console.log("Les informations du membre ne sont pas disponibles dans le localStorage ou la date de début est manquante.");
    }
  }

  checkMemberPlan();
});

/*-- FIN : Drip Content paiement en plusieurs fois combiné --*/
