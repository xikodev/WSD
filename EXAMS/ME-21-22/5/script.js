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
    // Restore any previously saved draft when the page is opened again.
    nameInput.value = localStorage.getItem(storageKeys.name) || "";
    emailInput.value = localStorage.getItem(storageKeys.email) || "";
    messageInput.value = localStorage.getItem(storageKeys.message) || "";
}

function saveDraft() {
    // Save each field separately so the draft can be recovered later.
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
        // The task only requires checking the simple x@y shape.
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

    // A successful submit should no longer keep the old draft in storage.
    localStorage.removeItem(storageKeys.name);
    localStorage.removeItem(storageKeys.email);
    localStorage.removeItem(storageKeys.message);
});

loadDraft();
