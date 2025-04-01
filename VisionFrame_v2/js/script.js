document.addEventListener("DOMContentLoaded", function () {
    const newUserBtn = document.querySelector(".new-user-btn");
    const existingUserBtn = document.querySelector(".existing-user-btn");
    const registerDiv = document.querySelector(".register");
    const loginDiv = document.querySelector(".login");

    function changeForm(targetForm) {
        const currentForm = document.querySelector(".form-container .active");

        if (currentForm !== targetForm) {
            currentForm.classList.remove("active");
            currentForm.style.animation = "slideOutDown 0.5s forwards";
            
            targetForm.classList.add("active");
            targetForm.style.animation = "slideInUp 0.5s forwards";
        }
    }

    newUserBtn.addEventListener("click", function () {
        changeForm(registerDiv);
    });

    existingUserBtn.addEventListener("click", function () {
        changeForm(loginDiv);
    });
});