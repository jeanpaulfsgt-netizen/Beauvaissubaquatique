fetch("images/images.json")
  .then(r => r.json())
  .then(data => {
    const galeries = data; // ton JSON n'a pas de clé "galeries"
    const tabsContainer = document.querySelector(".tabs");
    const mainContainer = document.querySelector("main");

    Object.keys(galeries).forEach((nom, i) => {
      // === Créer onglet ===
      const btn = document.createElement("button");
      btn.className = "tab-button";
      if(i===0) btn.classList.add("active");
      btn.dataset.gallery = nom.replace(/\s+/g,'-');
      btn.textContent = nom;
      tabsContainer.appendChild(btn);

      // === Créer container carrousel ===
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";
      if(i===0) carouselContainer.classList.add("active");
      carouselContainer.id = nom.replace(/\s+/g,'-');

      const carousel = document.createElement("div");
      carousel.className = "carousel";

      const prev = document.createElement("button");
      prev.className = "prev";
      prev.innerHTML = "&#10094;";
      const next = document.createElement("button");
      next.className = "next";
      next.innerHTML = "&#10095;";

      const imagesDiv = document.createElement("div");
      imagesDiv.className = "carousel-images";

      // === Ajouter les images avec le chemin complet ===
      galeries[nom].forEach(f => {
        const img = document.createElement("img");
        img.src = `images/${nom}/${f}`; // nom du dossier + nom du fichier
        imagesDiv.appendChild(img);
      });

      carousel.appendChild(prev);
      carousel.appendChild(imagesDiv);
      carousel.appendChild(next);
      carouselContainer.appendChild(carousel);
      mainContainer.appendChild(carouselContainer);
    });

    // === Gestion des clics sur les onglets ===
    const tabButtons = document.querySelectorAll(".tab-button");
    const carousels = document.querySelectorAll(".carousel-container");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        carousels.forEach(c => c.classList.remove("active"));
        document.getElementById(btn.dataset.gallery).classList.add("active");
      });
    });

    // === Initialiser les carrousels ===
    initCarousels();
  });
