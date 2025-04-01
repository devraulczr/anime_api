let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async function() {
    const response = await fetch("http://26.207.242.213/visionframe_v2/api/api.php?endpoint=logout");
    const data = await response.json();
    if (data["success"] === true) {
        window.location.href = "http://26.207.242.213/visionframe_v2/public/index.html";
    }
});

async function verifyLogin() {
    try {
        const response = await fetch("http://26.207.242.213/visionframe_v2/api/api.php?endpoint=verifyLogin");
        const data = await response.json();
        if (!data.success) {
            alert("Session expired. Redirecting to login...");
            window.location.href = "http://26.207.242.213/visionframe_v2/public/index.html";
        }
    } catch (error) {
        console.error("Error verifying login:", error);
    }
}

async function verifyUser() {
    try {
        const response = await fetch("http://26.207.242.213/visionframe_v2/api/api.php?endpoint=verifyUser");
        const data = await response.json();

        if (!data.success) {
            window.location.href = "http://26.207.242.213/visionframe_v2/pages/user.html";
        }
    } catch (error) {
        console.error("Error verifying user");
    }
}

// Function to load animes based on the selected category
async function loadAnimes(category = '') {
    try {
        let url = "http://26.207.242.213/visionframe_v2/api/api.php?endpoint=animes";
        if (category) {
            url += `&cat=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const animeContainer = document.getElementById("animeContainer");
        animeContainer.innerHTML = "";

        if (data.animes.length === 0) {
            animeContainer.innerHTML = "<p>No anime found.</p>";
            return;
        }

        data.animes.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-card");
            animeCard.innerHTML = `
            <a href="anime.html?id=${anime.id}">
                <img src="${anime.image}" alt="${anime.title}" class="anime-image">
            </a>
            <div class="info">${anime.title}</div>
            `;
            animeContainer.appendChild(animeCard);
        });

    } catch (error) {
        console.error("Error loading animes:", error);
        document.getElementById("animeContainer").innerHTML = "<p>Error loading animes.</p>";
    }
}

// Function to load the top 4 animes with the most views
async function loadTopAnimes() {
    try {
        const response = await fetch("http://26.207.242.213/visionframe_v2/api/api.php?endpoint=animes");
        const data = await response.json();

        const topAnimes = data.animes.sort((a, b) => b.views - a.views).slice(0, 4);

        const sliderContainer = document.getElementById("sliderContainer");
        sliderContainer.innerHTML = "";

        topAnimes.forEach(anime => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            slide.innerHTML = `
                <a href="anime.html?id=${anime.id}">
                    <img src="${anime.image}" alt="${anime.title}">
                </a>
            `;
            sliderContainer.appendChild(slide);
        });

    } catch (error) {
        console.error("Error loading the most viewed animes:", error);
    }
}

let slideIndex = 0;
function moveSlide(step) {
    const slides = document.querySelectorAll(".slide");
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    const newTransformValue = -slideIndex * 100;
    document.querySelector(".slides").style.transform = `translateX(${newTransformValue}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
    loadAnimes();
    loadTopAnimes();  // Load the top 4 animes with the most views

    verifyLogin();
    verifyUser();

    document.getElementById('categoryDropdown').addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        loadAnimes(selectedCategory);
    });
});