import { registerRequest } from "./request.js";
import { calculatePasswordStrength } from "./strengthPassword.js";

const handleUserRegistration = () => {
    const form = document.querySelector(".main__form-register");
    const userName = document.querySelector("#register-user");
    const email = document.querySelector("#register-email");
    const img = document.querySelector("#register-avatar");
    const password = document.querySelector("#register-password");
    const buttonSubmit = document.querySelector(
        ".form-register__button-register"
    );

    function enableSubmitButton() {
        buttonSubmit.disabled = false;
        buttonSubmit.style.cursor = "pointer";
    }

    userName.addEventListener("input", enableSubmitButton);
    email.addEventListener("input", enableSubmitButton);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = {
            username: userName.value,
            email: email.value,
            password: password.value,
            avatar: img.value,
        };
        const strength = calculatePasswordStrength(password.value);

        if (strength >= 3) {
            try {
                await registerRequest(user);

                handleToastNotification(
                    "../assets/register/img/Group 17.svg",
                    "Sua conta foi criada com sucesso!",
                    `Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:  <a href="./login.html">Acessar página de login</a>`,
                    false
                );

                buttonSubmit.style.cursor = "not-allowed";
                buttonSubmit.disabled = true;
            } catch (error) {
                console.log(error);

                handleToastNotification(
                    "../assets/register/img/57271af7996cec35388342d77139253c-ca-rculo-vermelho-com-um-x-dentro.webp",
                    "Erro ao cadastrar!",
                    error.response.data.message,
                    true
                );

                buttonSubmit.style.cursor = "not-allowed";
                buttonSubmit.disabled = true;
            }
        }
    });
};

const handleToastNotification = (iconSrc, title, message, isError = false) => {
    const toast = document.querySelector(".main__toastify");
    const toastIcon = document.querySelector(".img__image");
    const toastTitle = document.querySelector(".toastify-text__title");
    const toastMessage = document.querySelector(".toastify-text__description");

    toastIcon.src = iconSrc;
    toastTitle.textContent = title;

    if (!isError) {
        toastMessage.innerHTML = message;
    } else {
        toastMessage.textContent = message;
    }

    toastTitle.classList.toggle("toastify-text__title--error", isError);
    toast.classList.remove("main__toastify--hidden");

    setTimeout(() => {
        toast.classList.add("main__toastify--hidden");
    }, 3000);
};
handleUserRegistration();
