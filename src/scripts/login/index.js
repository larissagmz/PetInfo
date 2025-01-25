import { loginRequest } from "./request.js";

const handleUserLogin = () => {
    const form = document.querySelector(".main__form-login");
    const email = document.querySelector("#email-login");
    const password = document.querySelector("#login-password");
    const div = document.querySelector(".form-login__div-input-password");
    const p = document.createElement("p");
    p.textContent = "Senha ou Email incorreto";
    p.className = "div-input__message-error";

    let token = "";
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = {
            email: email.value,
            password: password.value,
        };
        try {
            handleRenderLoader(false);

            await new Promise((resolve) => setTimeout(resolve, 3000));

            token = await loginRequest(user);
            localStorage.setItem("token", token);
            window.location.href = "/src/pages/dashboard.html";
        } catch (error) {
            handleRenderLoader(true);
            email.classList.add("div-input__input--error");
            password.classList.add("div-input__input--error");
            div.append(p);
        }
    });
};

const handleRenderLoader = (isLoader = false) => {
    const loader = document.querySelector(".loader");
    const button = document.querySelector(".form-login__access");
    const fade = document.querySelector(".fade");

    fade.classList.remove("fade--hidden");
    loader.classList.remove("loader--hidden");

    button.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = "";
        }
    });

    if (isLoader) {
        loader.classList.add("loader--hidden");
        fade.classList.add("fade--hidden");
        button.textContent = "Acessar";
    }
};

handleUserLogin();
