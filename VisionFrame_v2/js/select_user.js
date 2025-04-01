let users = document.getElementById("users");
let accountId = null;

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const accountRequest = await fetch('http://26.207.242.213/visionframe_v2/api/api.php?endpoint=account');
        const data = await accountRequest.json();
        accountId = data["id"]; 
        
        if (accountId) {
            listUsers(accountId);
        }
    } catch (error) {
        console.log("Error loading account data:", error);
    }

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

    async function listUsers(accountId) {
        try {
            const response = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=users&account_id=${accountId}`);
            const data = await response.json();
    
            if (Array.isArray(data)) {
                data.forEach(user => {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user");
    
                    const link = document.createElement("a");
                    link.setAttribute("href", "#");
                    link.setAttribute("data-user-id", user.id); // Correctly assigning the user ID
    
                    // Adding the user content inside the link
                    link.innerHTML = `
                        <img src="${user.photo}" alt="${user.name}">
                        <label>${user.name}</label>
                    `;

                    userDiv.appendChild(link);
                    users.appendChild(userDiv);

                    link.addEventListener("click", async (event) => {
                        event.preventDefault();
                        const userId = event.target.closest("a").getAttribute("data-user-id");
                        await loginUser(userId);
                    });
                    
                });
                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                const link = document.createElement("a");
                link.setAttribute("href", "#");
                link.setAttribute("data-user-id", ""); // Correctly assigning the user ID

                // Adding the user content inside the link
                link.innerHTML = `
                    <img src="../src/photos/plus.png" alt="plus">
                    <label>Add</label>
                `;
                userDiv.appendChild(link);
                users.appendChild(userDiv);
                link.addEventListener("click", async (event) => {
                    event.preventDefault();
                    const userId = event.target.closest("a").getAttribute("data-user-id");
                    await loginUser(userId);
                });
            } else {
                console.error("The data structure is not the expected array.");
            }
        } catch (error) {
            console.error("Error listing users:", error);
        }
    }
    
    async function loginUser(userId) {
        try {
            const response = await fetch(`http://26.207.242.213/visionframe_v2/api/api.php?endpoint=loginUser&user_id=${userId}`);
            const data = await response.json();
            if (data["success"] == true) {
                window.location.href = "http://26.207.242.213/visionframe_v2/pages/index.html";
            }
        } catch (error) {
            console.error("Error logging in user:", error);
        }
    }

    verifyLogin();
});