const storageKey = "cookie-consent-choice";
const cookieConsent = document.getElementById("cookie-consent");
const acceptButton = document.getElementById("accept-btn");
const rejectButton = document.getElementById("reject-btn");

function saveChoice(choice) {
    localStorage.setItem(storageKey, choice);
    cookieConsent.classList.add("hidden");
}

// The popup is shown only if the user has not chosen an option before.
if (!localStorage.getItem(storageKey)) {
    cookieConsent.classList.remove("hidden");
}

acceptButton.addEventListener("click", () => {
    saveChoice("accept");
});

rejectButton.addEventListener("click", () => {
    saveChoice("reject");
});
