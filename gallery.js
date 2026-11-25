const artworks = [
  {
    title: "Golden Thoughts",
    style: "Paintings",
    image: "images/painting1.jpg",
  },
  { title: "Dreams", style: "Paintings", image: "images/painting4.jpg" },
  { title: "Golden", style: "Paintings", image: "images/painting5.jpg" },
  {
    title: "Whispers of Colour",
    style: "Paintings",
    image: "images/painting2.jpg",
  },
  {
    title: "The Quiet Landscape",
    style: "Paintings",
    image: "images/painting3.jpg",
  },
  { title: "Nature", style: "Paintings", image: "images/painting6.jpg" },

  {
    title: "Lines of Imagination",
    style: "Drawings",
    image: "images/drawing1.jpg",
  },
  { title: "Light", style: "Drawings", image: "images/drawing3.jpg" },
  { title: "Pets", style: "Drawings", image: "images/drawing6.jpg" },
  { title: "Deep Inside", style: "Drawings", image: "images/drawing4.jpg" },
  { title: "Realistic", style: "Drawings", image: "images/drawing5.jpg" },
  { title: "The Human Form", style: "Drawings", image: "images/drawing2.jpg" },

  {
    title: "Fragments of Colour",
    style: "Mosaic",
    image: "images/mosaic1.jpg",
  },
  { title: "Buildings", style: "Mosaic", image: "images/mosaic6.jpg" },
  { title: "Mythical creatures", style: "Mosaic", image: "images/mosaic3.jpg" },
  { title: "Roses", style: "Mosaic", image: "images/mosaic4.jpg" },
  { title: "Pieces of a Story", style: "Mosaic", image: "images/mosaic2.jpg" },
  { title: "Horse", style: "Mosaic", image: "images/mosaic5.jpg" },

  {
    title: "The Silent Figure",
    style: "Sculpture",
    image: "images/sculpt1.jpg",
  },
  { title: "Ballet", style: "Sculpture", image: "images/sculpt3.jpg" },
  { title: "Birds", style: "Sculpture", image: "images/sculpt6.jpg" },
  { title: "Ancient Times", style: "Sculpture", image: "images/sculpt4.jpg" },
  { title: "Grace", style: "Sculpture", image: "images/sculpt5.jpg" },
  {
    title: "Form and Movement",
    style: "Sculpture",
    image: "images/sculpt2.jpg",
  },

  { title: "A New Perspective", style: "Modern Art", image: "images/art4.jpg" },
  { title: "Abstract Art", style: "Modern Art", image: "images/art6.jpg" },
  {
    title: "Beyond the Ordinary",
    style: "Modern Art",
    image: "images/art5.jpg",
  },
  { title: "Colour in Motion", style: "Modern Art", image: "images/art3.jpg" },
  {
    title: "Different Perspectives",
    style: "Modern Art",
    image: "images/art2.jpg",
  },
  { title: "Uniqueness", style: "Modern Art", image: "images/art1.jpg" },
];

const CARD_SHAPES = ["tall", "wide", "circle", "arch", "rounded", "soft"];

function loadSelectedStyles() {
  try {
    const raw = localStorage.getItem("selectedStyles");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((s) => String(s).trim()).filter(Boolean);
    }
    return typeof parsed === "string" && parsed.trim() ? [parsed.trim()] : [];
  } catch {
    return [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.warn("Gallery container (#gallery) was not found on this page.");
    return;
  }

  const selectedStylesText = document.getElementById("selectedStyles");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxStyle = document.getElementById("lightboxStyle");
  const closeLightbox = document.getElementById("closeLightbox");

  const selectedStyles = loadSelectedStyles();

  if (selectedStylesText) {
    selectedStylesText.textContent =
      selectedStyles.length === 0
        ? "Showing a collection of different art styles."
        : "Your styles: " + selectedStyles.join(" • ");
  }

  function getGalleryArt() {
    if (selectedStyles.length === 0) {
      return artworks;
    }
    return artworks.filter((artwork) => selectedStyles.includes(artwork.style));
  }

  function openLightbox(artwork) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = artwork.image;
    lightboxImage.alt = `${artwork.title} - ${artwork.style}`;
    if (lightboxTitle) lightboxTitle.textContent = artwork.title;
    if (lightboxStyle) lightboxStyle.textContent = artwork.style;
    lightbox.classList.remove("hidden");
  }

  function closeGalleryImage() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
  }

  function displayGallery() {
    gallery.innerHTML = "";
    const chosenArt = getGalleryArt();

    if (chosenArt.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "No artworks match the selected styles.";
      gallery.appendChild(emptyMsg);
      return;
    }

    chosenArt.forEach((artwork, index) => {
      const card = document.createElement("div");
      card.classList.add("art-card", CARD_SHAPES[index % CARD_SHAPES.length]);
      card.setAttribute("tabindex", "0");

      const image = document.createElement("img");
      image.src = artwork.image;
      image.alt = `${artwork.title} - ${artwork.style}`;
      image.loading = "lazy";
      image.addEventListener("error", () => {
        image.alt = `Image not found: ${artwork.image}`;
        card.classList.add("image-missing");
      });

      const information = document.createElement("div");
      information.classList.add("art-info");

      const title = document.createElement("h3");
      title.textContent = artwork.title;

      const style = document.createElement("p");
      style.textContent = artwork.style;

      information.appendChild(title);
      information.appendChild(style);

      card.appendChild(image);
      card.appendChild(information);

      card.addEventListener("dblclick", () => openLightbox(artwork));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(artwork);
        }
      });

      gallery.appendChild(card);
    });
  }

  if (closeLightbox) {
    closeLightbox.addEventListener("click", closeGalleryImage);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGalleryImage();
    }
  });

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeGalleryImage();
      }
    });
  }

  displayGallery();
});
