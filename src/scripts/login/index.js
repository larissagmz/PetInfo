import { loginRequest } from "./request.js";

export const login = () => {
    const form = document.querySelector(".main__form-login");
    const email = document.querySelector("#email-login");
    const password = document.querySelector("#login-password");
    const button = document.querySelector(".form-login__access");
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
            token = await loginRequest(user);
            localStorage.setItem("token", token);
            window.location.href = "/src/pages/dashboard.html";
        } catch (error) {
            email.classList.add("div-input__input--error");
            password.classList.add("div-input__input--error");
            div.append(p);
        }
    });
};

login();
