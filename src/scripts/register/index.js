import { registerRequest } from "./request.js";

const registerUser = () => {
    const form = document.querySelector(".main__form-register");
    const userName = document.querySelector("#register-user");
    const email = document.querySelector("#register-email");
    const img = document.querySelector("#register-avatar");
    const password = document.querySelector("#register-password");

    const toastify = document.querySelector(".main__toastify");
    const imageToastfy = document.querySelector(".img__image");
    const titleToastify = document.querySelector(".toastify-text__title");
    const descriptionToastify = document.querySelector(
        ".toastify-text__description"
    );
    const a = document.querySelector("a");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = {
            username: userName.value,
            email: email.value,
            password: password.value,
            avatar: img.value,
        };
        try {
            await registerRequest(user);
            imageToastfy.src = "../assets/register/img/Group 17.svg";
            titleToastify.textContent = "Sua conta foi criada com sucesso!";
            descriptionToastify.innerHTML = `Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:  <a href="./login.html">Acessar página de login</a>`;
            titleToastify.classList.remove("toastify-text__title--red");
            toastify.classList.remove("main__toastify--hidden");
            setTimeout(() => {
                toastify.classList.add("main__toastify--hidden");
            }, 3000);
        } catch (error) {
            console.log(error);
            imageToastfy.src =
                "../assets/register/img/57271af7996cec35388342d77139253c-ca-rculo-vermelho-com-um-x-dentro.webp";
            titleToastify.textContent = "Erro ao cadastrar!";
            descriptionToastify.textContent = error.response.data.message;
            titleToastify.classList.add("toastify-text__title--red");
            toastify.classList.remove("main__toastify--hidden");
            setTimeout(() => {
                toastify.classList.add("main__toastify--hidden");
            }, 3000);
        }
    });
};

registerUser();
