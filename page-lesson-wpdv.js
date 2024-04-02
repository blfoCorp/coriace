// --- ENREGISTREMENT DE LA TABS ACTIVE POUR LA FORMATION WEBFLOW PAGE DE VENTE --- //

document.addEventListener("DOMContentLoaded", function() {
  // Ajoute un écouteur d'événements à chaque bouton d'onglet
  document.querySelectorAll(".lesson-mod_level").forEach(button => {
    button.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab-id");
      // Sauvegarde l'ID de l'onglet actif dans le localStorage
      localStorage.setItem("activeTab", tabId);
      // Affiche le contenu de l'onglet actif et met à jour l'état visuel des boutons
      showTabContent(tabId);
      setActiveTabButton(this); // Marque visuellement cet onglet comme actif
    });
  });

  // Tente de restaurer l'onglet actif lors du rechargement de la page
  const activeTabId = localStorage.getItem("activeTab");
  const activeTabButton = activeTabId ? document.querySelector(`.lesson-mod_level[data-tab-id="${activeTabId}"]`) : null;
  if (activeTabButton) {
    showTabContent(activeTabId);
    setActiveTabButton(activeTabButton); // Restaure visuellement l'onglet actif
  } else {
    // Logique pour afficher un onglet par défaut si aucun onglet actif n'est enregistré
    const defaultTabId = "defaultTabId"; // Remplacez cela par votre propre ID d'onglet par défaut
    showTabContent(defaultTabId);
    const defaultTabButton = document.querySelector(`.lesson-mod_level[data-tab-id="${defaultTabId}"]`);
    if(defaultTabButton) {
      setActiveTabButton(defaultTabButton);
    }
  }
});

// Fonction pour afficher le contenu de l'onglet spécifié et masquer les autres
function showTabContent(tabId) {
  document.querySelectorAll(".lesson-mod_tabs-panel").forEach(panel => {
    panel.style.display = panel.getAttribute("data-tab-id") === tabId ? "block" : "none";
  });
}

// Met à jour visuellement l'onglet actif en utilisant une classe CSS 'active'
function setActiveTabButton(activeButton) {
  // Enlève la classe 'active' de tous les boutons d'onglet
  document.querySelectorAll(".lesson-mod_level").forEach(button => {
    button.classList.remove("w--current");
  });
  // Ajoute la classe 'active' au bouton actuellement sélectionné
  activeButton.classList.add("w--current");
}
