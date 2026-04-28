const storageKeys = {
    name: "feedback-name",
    email: "feedback-email",
    message: "feedback-message"
};

const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const saveDraftButton = document.getElementById("save-draft");

function loadDraft() {
    nameInput.value = localStorage.getItem(storageKeys.name) || "";
    emailInput.value = localStorage.getItem(storageKeys.email) || "";
    messageInput.value = localStorage.getItem(storageKeys.message) || "";
}

function saveDraft() {
    localStorage.setItem(storageKeys.name, nameInput.value);
    localStorage.setItem(storageKeys.email, emailInput.value);
    localStorage.setItem(storageKeys.message, messageInput.value);
}

function clearErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";
}

function validateForm() {
    clearErrors();
    let isValid = true;

    if (!nameInput.value.trim()) {
        document.getElementById("name-error").textContent = "Name is required.";
        isValid = false;
    }

    const emailValue = emailInput.value.trim();
    if (!emailValue) {
        document.getElementById("email-error").textContent = "E-mail is required.";
        isValid = false;
    } else if (!/^.+@.+$/.test(emailValue)) {
        document.getElementById("email-error").textContent = "E-mail must be in x@y format.";
        isValid = false;
    }

    if (!messageInput.value.trim()) {
        document.getElementById("message-error").textContent = "Feedback is required.";
        isValid = false;
    }

    return isValid;
}

saveDraftButton.addEventListener("click", () => {
    saveDraft();
});

form.addEventListener("submit", (event) => {
    if (!validateForm()) {
        event.preventDefault();
        return;
    }

    localStorage.removeItem(storageKeys.name);
    localStorage.removeItem(storageKeys.email);
    localStorage.removeItem(storageKeys.message);
});

loadDraft();
