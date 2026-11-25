const artworks = [
  // PAINTINGS
  {
    title: "Golden Thoughts",
    style: "Paintings",
    image: "images/painting1.jpg",
  },
  {
    title: "Dreams",
    style: "Paintings",
    image: "images/painting4.jpg",
  },
  {
    title: "Golden",
    style: "Paintings",
    image: "images/painting5.jpg",
  },
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
  {
    title: "Nature",
    style: "Paintings",
    image: "images/painting6.jpg",
  },

  // DRAWINGS
  {
    title: "Lines of Imagination",
    style: "Drawings",
    image: "images/drawing1.jpg",
  },
  {
    title: "Light",
    style: "Drawings",
    image: "images/drawing3.jpg",
  },
  {
    title: "Pets",
    style: "Drawings",
    image: "images/drawing6.jpg",
  },
  {
    title: "Deep Inside",
    style: "Drawings",
    image: "images/drawing4.jpg",
  },
  {
    title: "Realistic",
    style: "Drawings",
    image: "images/drawing5.jpg",
  },
  {
    title: "The Human Form",
    style: "Drawings",
    image: "images/drawing2.jpg",
  },

  // MOSAIC
  {
    title: "Fragments of Colour",
    style: "Mosaic",
    image: "images/mosaic1.jpg",
  },
  {
    title: "Buildings",
    style: "Mosaic",
    image: "images/mosaic6.jpg",
  },
  {
    title: "Mythical Creatures",
    style: "Mosaic",
    image: "images/mosaic3.jpg",
  },
  {
    title: "Roses",
    style: "Mosaic",
    image: "images/mosaic4.jpg",
  },
  {
    title: "Pieces of a Story",
    style: "Mosaic",
    image: "images/mosaic2.jpg",
  },
  {
    title: "Horse",
    style: "Mosaic",
    image: "images/mosaic5.jpg",
  },

  // SCULPTURE
  {
    title: "The Silent Figure",
    style: "Sculpture",
    image: "images/sculpt1.jpg",
  },
  {
    title: "Ballet",
    style: "Sculpture",
    image: "images/sculpt3.jpg",
  },
  {
    title: "Birds",
    style: "Sculpture",
    image: "images/sculpt6.jpg",
  },
  {
    title: "Ancient Times",
    style: "Sculpture",
    image: "images/sculpt4.jpg",
  },
  {
    title: "Grace",
    style: "Sculpture",
    image: "images/sculpt5.jpg",
  },
  {
    title: "Form and Movement",
    style: "Sculpture",
    image: "images/sculpt2.jpg",
  },

  // MODERN ART
  {
    title: "A New Perspective",
    style: "Modern Art",
    image: "images/art4.jpg",
  },
  {
    title: "Abstract Art",
    style: "Modern Art",
    image: "images/art6.jpg",
  },
  {
    title: "Beyond the Ordinary",
    style: "Modern Art",
    image: "images/art5.jpg",
  },
  {
    title: "Colour in Motion",
    style: "Modern Art",
    image: "images/art3.jpg",
  },
  {
    title: "Different Perspectives",
    style: "Modern Art",
    image: "images/art2.jpg",
  },
  {
    title: "Uniqueness",
    style: "Modern Art",
    image: "images/art1.jpg",
  },
];

// ==========================================
// 2. CONNECT TO HTML
// ==========================================

const gallery = document.getElementById("gallery");

const selectedStylesText = document.getElementById("selectedStyles");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxStyle = document.getElementById("lightboxStyle");

const closeLightbox = document.getElementById("closeLightbox");

// Check that the gallery exists

if (!gallery) {
  console.error("The gallery container was not found.");
}

// ==========================================
// 3. LOAD SAVED ART PREFERENCES
// ==========================================

let selectedStyles = [];

try {
  selectedStyles = JSON.parse(localStorage.getItem("selectedStyles")) || [];
} catch (error) {
  console.error("Could not load saved art preferences.");
}

// Display the selected styles

if (selectedStylesText) {
  if (selectedStyles.length === 0) {
    selectedStylesText.textContent =
      "Showing a collection of different art styles.";
  } else {
    selectedStylesText.textContent =
      "Your styles: " + selectedStyles.join(" • ");
  }
}

// ==========================================
// 4. FILTER THE ARTWORKS
// ==========================================

function getGalleryArt() {
  // Show every artwork if no preferences were selected

  if (selectedStyles.length === 0) {
    return artworks;
  }

  // Show only the styles selected on the Homepage

  return artworks.filter(function (artwork) {
    return selectedStyles.includes(artwork.style);
  });
}

// ==========================================
// 5. DISPLAY THE GALLERY
// ==========================================

function displayGallery() {
  if (!gallery) {
    return;
  }

  // Clear the gallery before displaying artwork

  gallery.innerHTML = "";

  const chosenArt = getGalleryArt();

  if (chosenArt.length === 0) {
    gallery.textContent = "No artworks found. Please choose another art style.";

    return;
  }

  // Create each artwork card

  chosenArt.forEach(function (artwork, index) {
    const card = document.createElement("div");

    card.classList.add("art-card");

    // Give each artwork its own shape

    if (index % 6 === 0) {
      card.classList.add("tall");
    } else if (index % 6 === 1) {
      card.classList.add("wide");
    } else if (index % 6 === 2) {
      card.classList.add("circle");
    } else if (index % 6 === 3) {
      card.classList.add("arch");
    } else if (index % 6 === 4) {
      card.classList.add("rounded");
    } else {
      card.classList.add("soft");
    }

    // Create the image

    const image = document.createElement("img");

    image.src = artwork.image;

    image.alt = artwork.title + " - " + artwork.style;

    image.loading = "lazy";

    // Show an error if the image cannot be found

    image.onerror = function () {
      console.error("Could not load image: " + artwork.image);

      card.classList.add("image-error");

      image.alt = "Image unavailable: " + artwork.title;
    };

    // Create the information section

    const information = document.createElement("div");

    information.classList.add("art-info");

    // Create the artwork title

    const title = document.createElement("h3");

    title.textContent = artwork.title;

    // Create the artwork style

    const style = document.createElement("p");

    style.textContent = artwork.style;

    // Put the information together

    information.appendChild(title);

    information.appendChild(style);

    // Add the image and information to the card

    card.appendChild(image);

    card.appendChild(information);

    // Open the larger image when double-clicked

    card.addEventListener("dblclick", function () {
      openLightbox(artwork);
    });

    // Allow keyboard users to open an artwork

    card.setAttribute("tabindex", "0");

    card.setAttribute("role", "button");

    card.setAttribute("aria-label", "Open " + artwork.title);

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        openLightbox(artwork);
      }
    });

    // Add the completed card to the gallery

    gallery.appendChild(card);
  });
}

// ==========================================
// 6. OPEN THE LARGER ARTWORK
// ==========================================

function openLightbox(artwork) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = artwork.image;

  lightboxImage.alt = artwork.title + " - " + artwork.style;

  lightboxTitle.textContent = artwork.title;

  lightboxStyle.textContent = artwork.style;

  lightbox.classList.remove("hidden");

  if (closeLightbox) {
    closeLightbox.focus();
  }
}

// ==========================================
// 7. CLOSE THE LARGER ARTWORK
// ==========================================

function closeGalleryImage() {
  if (lightbox) {
    lightbox.classList.add("hidden");
  }
}

// Close using the X button

if (closeLightbox) {
  closeLightbox.addEventListener("click", closeGalleryImage);
}

// Close using the Escape key

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeGalleryImage();
  }
});

// Close when clicking outside the artwork

if (lightbox) {
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeGalleryImage();
    }
  });
}

displayGallery();
