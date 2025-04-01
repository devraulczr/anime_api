let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async function() {
    const response = await fetch("http://26.207.242.213/visionframe_v2/api/api.php?endpoint=logout");
    const data = await response.json();
    if (data["success"] === true) {
        window.location.href = "https://26.207.242.213/visionframe_v2/public/index.html";
    }
});

async function verifyLogin() {
    try {
        const response = await fetch("http://26.207.242.213/visionframe_v2/api/api.php?endpoint=verifyLogin");
        const data = await response.json();

        if (!data.success) {
            window.location.href = "http://26.207.242.213/visionframe_v2/public/index.html";
        }
    } catch (error) {
        console.error("Error verifying login");
    }
}

async function markAsWatched(epId) {
    const response = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=markEpisodeWatched&id=${epId}`);
    const data = await response.json();
    console.log(data);
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

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get("id");
    
    if (!animeId) {                
        document.getElementById("episode-list").innerHTML = "<p>Anime ID not found.</p>";
        return;
    }

    try {
        const addView = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=view&id=${animeId}`);
        const animeResponse = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=anime&id=${animeId}`);
        const animeData = await animeResponse.json();
        document.getElementById("animeTitle").textContent = animeData.title;
        document.getElementById("animeCover").src = animeData.image || 'default-cover.jpg';

        const episodesResponse = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=episodes&id=${animeId}`);
        const episodesData = await episodesResponse.json();

        if (!episodesData.episodes || episodesData.episodes.length === 0) {
            document.getElementById("episode-list").innerHTML = "<p>No episodes found.</p>";
            return;
        }

        const seasons = {};

        episodesData.episodes.forEach(episode => {
            if (!seasons[episode.season]) {
                seasons[episode.season] = [];
            }
            seasons[episode.season].push(episode);
        });

        const episodeList = document.getElementById("episode-list");

        for (let season in seasons) {
            let seasonContainer = document.createElement("div");
            seasonContainer.classList.add("season-container");

            let seasonTitle = document.createElement("h3");
            seasonTitle.textContent = `Season ${season}`;

            let episodeGrid = document.createElement("div");
            episodeGrid.classList.add("episode-grid");

            seasons[season].forEach(episode => {
                let button = document.createElement("button");
                button.textContent = episode.title;
                button.setAttribute("data-id", episode.id);
                button.onclick = () => playEpisode(episode.id, animeId);
                episodeGrid.appendChild(button);
            });

            seasonContainer.appendChild(seasonTitle);
            seasonContainer.appendChild(episodeGrid);
            episodeList.appendChild(seasonContainer);
        }

        markWatchedEpisodes(animeId);
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

function playEpisode(episodeId, animeId) {
    if (episodeId) {
        // Ensure the ID is treated as a string
        episodeId = String(episodeId);
        let episode_id = parseInt(episodeId);
        markAsWatched(episodeId);
        markWatchedEpisodes(animeId);
        window.location.href = `player.html?id=${episode_id}`;
    } else {
        alert("Episode not found.");
    }
}

async function markWatchedEpisodes(animeId) {
    // Make a request to the backend to fetch watched episodes for the specific anime
    const response = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=watchedEpisodes&anime_id=${animeId}`);

    // Check if the response was successful
    if (response.ok) {
        const data = await response.json();
    
        // Create an array containing the IDs of watched episodes
        const watchedIds = data.map(item => item.episode_id);
    
        // Check if the response contains data of watched episodes
        if (watchedIds.length > 0) {
            document.querySelectorAll(".episode-grid button").forEach(button => {
                let episodeId = button.getAttribute("data-id");
            
                // Check if the episode is in the list of watched episodes
                if (watchedIds.includes(parseInt(episodeId))) {
                    button.classList.add("watched");
                } else {
                    button.classList.remove("watched");
                }
            });
        } else {
            console.log("No watched episodes found.");
        }
    } else {
        console.error("Error fetching watched episodes.");
    }
}

verifyLogin();
verifyUser();