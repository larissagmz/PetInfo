import {
    getPosts,
    getUser,
    createPost,
    deletePostRequest,
    getPost,
    editPostRequest,
} from "./request.js";

const token = localStorage.getItem("token");

const renderUser = async (token) => {
    const user = await getUser(token);

    const imgUser = document.querySelector(".img__img");

    imgUser.src = user.avatar;
};

const renderPosts = async () => {
    const modal = document.querySelector(".main__modal-acess-post");
    modal.style.display = "none";
    const editModal = document.querySelector("#edit-modal");
    editModal.style.display = "none";
    const modalDelete = document.querySelector(".main__modal-delete");
    modalDelete.style.display = "none";

    const ul = document.querySelector(".main__list-posts");

    const fragment = document.createDocumentFragment();

    const postList = await getPosts(token);

    const user = await getUser(token);
    postList.reverse().forEach((post) => {
        const li = document.createElement("li");
        const divUser = document.createElement("div");
        const div = document.createElement("div");
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const divSpan = document.createElement("div");
        const spanName = document.createElement("span");
        const divGrey = document.createElement("div");
        const spanDate = document.createElement("span");
        const titltePost = document.createElement("h1");
        const textPost = document.createElement("p");
        const buttonAcessPost = document.createElement("button");

        li.className = "list-posts__post";
        divUser.className = "post__div-user";
        div.className = "div-user__div";
        figure.className = "div__img-post";
        img.className = "img-post__img";
        divSpan.className = "div__div-span";
        spanName.className = "div-span__name-user";
        divGrey.className = "div-span__grey";
        spanDate.className = "div-span__date";
        titltePost.className = "post__title-post";
        textPost.className = "post__text-post";
        buttonAcessPost.className = "post__access-publication";

        buttonAcessPost.dataset.acessId = post.id;

        img.src = post.user.avatar;
        img.alt = "user image";
        spanName.textContent = post.user.username;

        titltePost.textContent = post.title;
        textPost.textContent = post.content;
        buttonAcessPost.textContent = "Acessar publicação";

        const year = new Date().getUTCFullYear();
        const month = new Date(post.createdAt).getUTCMonth();
        const monthName = getMonthName(month);

        spanDate.textContent = `${monthName} de ${year}`;

        li.append(divUser, titltePost, textPost, buttonAcessPost);
        divUser.append(div, divSpan);
        div.append(figure, divSpan);
        divSpan.append(spanName, divGrey, spanDate);
        figure.append(img);

        if (post.user.id === user.id) {
            const divButtons = document.createElement("div");
            const buttonEdit = document.createElement("button");
            const buttonDelete = document.createElement("button");

            divButtons.className = "post__div-buttons";
            buttonDelete.className = "div-buttons__delete";
            buttonEdit.className = "div-buttons__edit";

            buttonEdit.textContent = "Editar";
            buttonDelete.textContent = "Excluir";

            buttonDelete.dataset.deleteId = post.id;
            buttonEdit.dataset.editId = post.id;

            divButtons.append(buttonEdit, buttonDelete);
            divUser.append(divButtons);
        }

        fragment.append(li);
    });
    ul.innerHTML = "";
    ul.append(fragment);
    ul.addEventListener("click", getPostById);

    ul.addEventListener("click", openEditPost);
};

const renderFormEdit = (dialog) => {
    if (document.querySelector("#edit-form")) {
        document.querySelector("#edit-form").remove();
    }

    const form = document.createElement("form");
    const divInput = document.createElement("div");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    const divTextArea = document.createElement("div");
    const labelTextArea = document.createElement("label");
    const textarea = document.createElement("textarea");
    const divButtons = document.createElement("div");
    const cancelButton = document.createElement("button");
    const saveButton = document.createElement("button");

    form.method = "dialog";
    form.className = "modal__form-modal";
    form.id = "edit-form";

    divInput.className = "form-modal__div-input-modal";

    labelTitle.className = "div-input-modal__label";
    labelTitle.htmlFor = "title";
    labelTitle.textContent = "Título do post";

    inputTitle.type = "text";
    inputTitle.name = "title";
    inputTitle.id = "edit-title-post";
    inputTitle.placeholder = "Digite o título aqui...";
    inputTitle.className = "div-input-modal__input";
    inputTitle.required = true;

    divTextArea.className = "form-modal__div-input-modal";

    labelTextArea.className = "div-input-modal__label";
    labelTextArea.htmlFor = "content";
    labelTextArea.textContent = "Conteúdo do post";

    textarea.name = "content";
    textarea.id = "edit-content-modal";
    textarea.className = "div-input-modal__textArea";
    textarea.rows = 5;
    textarea.placeholder = "Desenvolva o conteúdo do post aqui...";
    textarea.required = true;

    divButtons.className = "modal__div-buttons";
    cancelButton.id = "cancel-edit-button";
    cancelButton.type = "button";
    cancelButton.className = "form-modal__cancel-button";
    cancelButton.textContent = "Cancelar";

    cancelButton.addEventListener("click", () => {
        dialog.close();
        dialog.style.display = "none";
    });
    saveButton.className = "form-modal__send-post";
    saveButton.type = "submit";
    saveButton.id = "save-edit-button";
    saveButton.textContent = "Salvar Alterações";

    divInput.append(labelTitle, inputTitle);
    divTextArea.append(labelTextArea, textarea);
    divButtons.append(cancelButton, saveButton);
    form.appendChild(divInput);
    form.appendChild(divTextArea);
    form.appendChild(divButtons);

    dialog.appendChild(form);
};

const openEditPost = async (event) => {
    const button = event.target.closest(".div-buttons__edit");
    if (!button) return;
    let id = button.dataset.editId;
    const editModal = document.querySelector("#edit-modal");
    renderFormEdit(editModal);

    const form = document.querySelector("#edit-form");
    const post = await getPost(token, id);

    const title = document.querySelector("#edit-title-post");
    const textArea = document.querySelector("#edit-content-modal");

    title.value = post.title;
    textArea.value = post.content;

    setTimeout(() => {
        textArea.style.height = textArea.scrollHeight + "px";
    }, 0);
    textArea.addEventListener("input", () => autoResize(textArea));

    editModal.style.display = "flex";
    editModal.showModal();
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatePost = {
            title: title.value,
            content: textArea.value,
        };

        await editPostRequest(token, post.id, updatePost);

        renderPosts();
        editModal.close();
        editModal.style.display = "none";
        title.value = "";
        textArea.value = "";
    });
};

const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
};

const closeEdit = () => {
    const editModal = document.querySelector("#edit-modal");
    const buttonClose = document.querySelector("#close-edit-modal");
    buttonClose.addEventListener("click", () => {
        editModal.close();
        editModal.style.display = "none";
    });
};

const openModalDelete = () => {
    const ul = document.querySelector(".main__list-posts");
    const modalDelete = document.querySelector(".main__modal-delete");
    const buttonDelete = document.querySelector(".div-buttons-delete__submit");
    const buttonCancel = document.querySelector(".div-buttons-delete__cancel");
    const buttonClose = document.querySelector("#button-close-delete");

    let id;

    const closeModal = () => {
        modalDelete.style.display = "none";
        modalDelete.close();
    };

    buttonCancel.addEventListener("click", () => {
        closeModal();
    });

    buttonClose.addEventListener("click", () => {
        closeModal();
    });

    buttonDelete.addEventListener("click", async () => {
        await deletePostRequest(token, id);
        closeModal();
        renderPosts();
    });

    const deletePost = async (event) => {
        const button = event.target.closest(".div-buttons__delete");
        if (!button) return;

        id = button.dataset.deleteId;

        modalDelete.showModal();
        modalDelete.style.display = "flex";
    };

    ul.addEventListener("click", deletePost);
};

const renderAcessPost = (post) => {
    const imgUser = document.querySelector(".img-modal");
    const nameUser = document.querySelector(".div-span__name-user-modal");
    const date = document.querySelector(".div-span__date-modal");
    const h1 = document.querySelector(".modal-acess-post__title");
    const content = document.querySelector(".modal-acess-post__content");

    const year = new Date().getUTCFullYear();
    const month = new Date(post.createdAt).getUTCMonth();
    const monthName = getMonthName(month);

    imgUser.src = post.user.avatar;
    nameUser.textContent = post.user.username;
    date.textContent = `${monthName} de ${year}`;
    h1.textContent = post.title;
    content.textContent = post.content;
};

const getPostById = async (event) => {
    const button = event.target.closest(".post__access-publication");
    if (!button) return;
    const modal = document.querySelector(".main__modal-acess-post");
    const buttonExitModal = document.querySelector(
        ".div-user__button-close-modal"
    );

    const closeModalHandler = () => {
        modal.style.display = "none";
        modal.close();
    };

    const acessId = button.dataset.acessId;
    const listPosts = await getPosts(token);
    const post = listPosts.find((post) => post.id === acessId);

    buttonExitModal.addEventListener("click", closeModalHandler);
    modal.style.display = "flex";
    modal.showModal();
    renderAcessPost(post);
};

const getMonthName = (ordinalNumber) => {
    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    return months[ordinalNumber] || "-";
};

const addPost = () => {
    const buttonCloseModal = document.querySelector(
        ".div-close-modal__button-close"
    );
    const formModal = document.querySelector(".modal__form-modal");
    const modal = document.querySelector("dialog");
    const buttonOpenModal = document.querySelector(".div-profile__create-post");
    const buttonCancel = document.querySelector(".form-modal__cancel-button");
    const inputTitle = document.querySelector("#title-post");
    const textArea = document.querySelector("#content-modal");

    modal.style.display = "none";

    const closeModal = () => {
        modal.style.display = "none";
        modal.close();
    };

    buttonCancel.addEventListener("click", closeModal);

    buttonOpenModal.addEventListener("click", () => {
        modal.style.display = "flex";
        inputTitle.value = "";
        textArea.value = "";
        autoResize(textArea);
        modal.showModal();
    });

    buttonCloseModal.addEventListener("click", closeModal);

    formModal.addEventListener("submit", async (e) => {
        e.preventDefault();

        const post = {
            title: inputTitle.value,
            content: textArea.value,
        };

        await createPost(token, post);
        renderPosts();
        closeModal();
    });
};

const renderLogout = () => {
    const imgProfile = document.querySelector(".div-profile__avatar");
    const divLogout = document.querySelector(".avatar__div-logout");

    imgProfile.addEventListener("mouseover", () => {
        divLogout.style.display = "flex";
    });

    imgProfile.addEventListener("mouseout", () => {
        divLogout.style.display = "none";
    });
};

const handleLogout = async () => {
    const buttonLogout = document.querySelector(
        ".div-information__logout-account"
    );
    const username = document.querySelector(".div-logout__username");

    const user = await getUser(token);

    username.textContent = `@${user.username}`;
    buttonLogout.addEventListener("click", async () => {
        window.location.href = "../pages/login.html";
        localStorage.removeItem("token");
    });
};

const main = () => {
    renderUser(token);
    renderPosts();
    addPost();
    closeEdit();
    openModalDelete();
    handleLogout();
};

main();
renderLogout();
