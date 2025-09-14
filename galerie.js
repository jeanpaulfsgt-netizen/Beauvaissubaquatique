// === Header & burger ===
fetch("header.html")
  .then(r => r.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    if(hamburger){
      hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
    }
  });

// === Onglets ===
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

// === Charger les images automatiquement depuis PHP ou JSON ===
const fetchImages = async () => {
  let data;
  try {
    // Si serveur PHP
    const response = await fetch("get-images.php");
    data = await response.json();
  } catch (err) {
    // Sinon fallback JSON statique
    const response = await fetch("images/images.json");
    data = await response.json();
  }

  Object.keys(data).forEach(dossier => {
    const container = document.getElementById(dossier).querySelector(".carousel-images");
    data[dossier].forEach(filename => {
      const img = document.createElement("img");
      img.src = `images/${dossier}/${filename}`;
      container.appendChild(img);
    });
  });

  initCarousels();
}

// === Initialiser les carrousels (manuel + auto) ===
function initCarousels() {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const imagesDiv = carousel.querySelector(".carousel-images");
    const images = imagesDiv.querySelectorAll("img");
    if(images.length === 0) return; // éviter erreur si pas d'image
    let index = 0;

    const showSlide = i => imagesDiv.style.transform = `translateX(${-i*100}%)`;

    // Flèches manuelles
    carousel.querySelector(".next").addEventListener("click", () => {
      index = (index+1)%images.length;
      showSlide(index);
    });
    carousel.querySelector(".prev").addEventListener("click", () => {
      index = (index-1+images.length)%images.length;
      showSlide(index);
    });

    // Diaporama automatique
    setInterval(() => {
      index = (index+1)%images.length;
      showSlide(index);
    }, 5000);
  });
}

// Lancer le chargement
fetchImages();
