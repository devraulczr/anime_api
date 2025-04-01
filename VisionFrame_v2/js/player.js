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
        if (data["success"] === true) {
            console.log("User logged in.");
        } else {
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

async function markAsWatched(epId) {
    const response = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=markEpisodeWatched&id=${epId}`);
    const data = await response.json();
    console.log(data);
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    let episodeId = urlParams.get("id");

    if (!episodeId) {
        document.getElementById("episode-title").innerText = "Episode ID not found.";
        return;
    }
    let ep_num = 0;
    let currentEpisodeId = parseInt(episodeId);
    let totalEpisodes = 0;
    let animeId = null;

    function loadAnime(anime_id) {
        fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=anime&id=${anime_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API response error');
                }
                return response.json();
            })
            .then(data => {
                if (!data || !data.title) {
                    throw new Error("Incomplete information");
                }
                document.getElementById("anime-title").innerText = data.title || "Episode not found";
            })
    }

    function loadEpisode(id) {
        fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=episode&id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API response error');
                }
                return response.json();
            })
            .then(data => {
                if (!data || !data.video_url) {
                    throw new Error("Incomplete episode information.");
                }
                ep_num = data["ep_num"];
                animeId = data["anime_id"];

                let watched = JSON.parse(localStorage.getItem("watchedEpisodes")) || [];
                episodeId = String(data.id);
                markAsWatched(episodeId);

                loadAnime(animeId);

                document.getElementById("episode-title").innerText = data.title || "Episode not found";
                
                const videoContainer = document.getElementById("video-container");
                const video = document.createElement("iframe");
                video.src = data.video_url;
                video.width = "640";
                video.height = "360";
                video.controls = true;
                video.allowFullscreen = true;
                videoContainer.innerHTML = '';
                videoContainer.appendChild(video);

                getTotalEpisodes();
            })
            .catch(error => {
                console.error("Error loading episode:", error);
                document.getElementById("error-msg").style.display = "block";
            });
    }

    function getTotalEpisodes() {
        totalEpisodes = 0;
        if (!animeId) return;
        fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=episodes&id=${animeId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error getting episode list');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.episodes)) {
                    data.episodes.forEach(() => {
                        totalEpisodes += 1;
                    });
                } else {
                    console.error("Error: 'episodes' key is not an array or is malformed.");
                }
            })
            .catch(error => {
                console.error("Error getting total episodes:", error);
            });
    }

    function updateNavigation() {
        if (currentEpisodeId <= 1) {
            document.getElementById("previous-link").style.display = "none";
        } else {
            document.getElementById("previous-link").style.display = "inline";
        }

        if (currentEpisodeId >= totalEpisodes) {
            document.getElementById("next-link").style.display = "none";
        } else {
            document.getElementById("next-link").style.display = "inline";
        }
    }

    loadEpisode(currentEpisodeId);  // Load the initial episode
    verifyLogin();
    verifyUser();

    // Navigation to the previous episode
    document.getElementById("previous-link").addEventListener("click", function(event) {
        event.preventDefault();
        if (currentEpisodeId > 1) {
            currentEpisodeId--;
            loadEpisode(currentEpisodeId);
        }
    });

    // Navigation to the next episode
    document.getElementById("next-link").addEventListener("click", function(event) {
        event.preventDefault();
        if (ep_num < totalEpisodes) {
            currentEpisodeId++;
            loadEpisode(currentEpisodeId);
        } else {
            alert("You have reached the last episode.");
        }
    });

    // Navigate to the episode list
    document.getElementById("episodes-link").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "http://26.207.242.213/visionframe_v2/pages/anime.html?id=" + animeId;
    });
});