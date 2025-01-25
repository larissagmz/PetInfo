const passwordInput = document.getElementById("register-password");
const strengthSegments = document.querySelectorAll(".strength-div");
const passwordMessage = document.getElementById("password-message");

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);

    updateStrengthBar(strength);
});

export function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength += 1;

    if (/[A-Z]/.test(password)) strength += 1;

    if (/[a-z]/.test(password)) strength += 1;

    if (/\d/.test(password)) strength += 1;

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    return strength;
}

function updateStrengthBar(strength) {
    strengthSegments.forEach((segment, index) => {
        segment.style.backgroundColor = "#ddd";

        updatePasswordMessage(strength);
        if (index < strength) {
            if (strength <= 2) {
                segment.style.backgroundColor = "red";
            } else if (strength <= 3) {
                segment.style.backgroundColor = "yellow";
            } else {
                segment.style.backgroundColor = "green";
            }
        }
    });
}

function updatePasswordMessage(strength) {
    if (strength == 0) {
        passwordMessage.textContent = "";
    } else if (strength <= 2) {
        passwordMessage.textContent = "Senha fraca";
        passwordMessage.style.color = "red";
    } else if (strength <= 3) {
        passwordMessage.textContent = "Senha média";
        passwordMessage.style.color = "yellow";
    } else {
        passwordMessage.textContent = "Senha forte";
        passwordMessage.style.color = "green";
    }
}
