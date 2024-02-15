// ---------- VALIDAÇÃO USERNAME ---------- //
let usernameInput = document.getElementById("username");
let usernameLabel = document.querySelector('label[for="username"]');
let usernameHelper = document.getElementById("username-helper");

// ---------- VALIDAÇÃO EMAIL ---------- //
let useremailInput = document.getElementById("email");
let useremailLabel = document.querySelector('label[for="email"]');
let useremailHelper = document.getElementById("email-helper");

// ---------- VALIDAÇÃO IDADE ---------- //
let useridadeInput = document.getElementById("idade");
let useridadeLabel = document.querySelector('label[for="idade"]');
let useridadeHelper = document.getElementById("idade-helper");

// ---------- VALIDAÇÃO SENHA ---------- //
let usersenhaInput = document.getElementById("senha");
let usersenhaLabel = document.querySelector('label[for="senha"]');
let usersenhaHelper = document.getElementById("senha-helper");

// ---------- VALIDAÇÃO CONFIRMAR-SENHA ---------- //
let usercomfirmarsenhaInput = document.getElementById("confirma-senha");
let usercomfirmarsenhaLabel = document.querySelector(
    'label[for="confirma-senha"]'
);
let usercomfirmarsenhaHelper = document.getElementById("confirma-senha-helper");

// ----------  ---------- //
const INPUT_CIDADE = document.querySelector('#cidade');
const INPUT_ESTADO = document.querySelector('#estado');

const buscarCEP = (cep) => {
  let check = false;
  if (cep.length < 8) return;
  let url = 'https://viacep.com.br/ws/${cep}/json/'.replace('${cep}', cep);
  fetch(url)
    .then((res) => {
    if (res.ok) {
      res.json().then((json) => {
        if (!json.erro) {
          let cidade = json.localidade;
          let estado = json.uf;
          // Preenche os campos
          INPUT_CIDADE.value = cidade;
          INPUT_ESTADO.value = estado;
        }
      });
    }
  });
}

let btnVerificarCEP = document.querySelector('#VerificarCEP');
// Adiciona o evento click
btnVerificarCEP.addEventListener('click', function(e) {
  let campoCEP = document.querySelector('#cep');
  buscarCEP(campoCEP.value);
});

// Mostrar popup de campo obrigatório
usernameInput.addEventListener("focus", function () {
    usernameLabel.classList.add("required-popup");
});
useremailInput.addEventListener("focus", function () {
    useremailLabel.classList.add("required-popup");
});

// Ocultar popup de campo obrigatório
usernameInput.addEventListener("blur", function () {
    usernameLabel.classList.remove("required-popup");
});

useremailInput.addEventListener("blur", function () {
    useremailLabel.classList.remove("required-popup");
});

// Validações de input
// 1- O username deve ter mais de 3 caracteres
usernameInput.addEventListener("change", function (event) {
    const nome = event.target.value;

    if (nome.length < 3) {
        usernameInput.classList.remove("correct");
        usernameInput.classList.add("error");
        usernameHelper.classList.add("visible");
    } else {
        usernameInput.classList.remove("error");
        usernameInput.classList.add("correct");
        usernameHelper.classList.remove("visible");
    }
});
// 2- O email deve ter o ".com" e o "@"
useremailInput.addEventListener("change", function (event) {
    const email = event.target.value;

    if (email.includes("@") && email.includes(".com")) {
        useremailInput.classList.remove("error");
        useremailInput.classList.add("correct");
        useremailHelper.classList.remove("visible");
    } else {
        useremailInput.classList.add("error");
        useremailInput.classList.remove("correct");
        useremailHelper.classList.add("visible");
    }
});
// 3- A idade deve ser maior de 16 anos
useridadeInput.addEventListener("change", function (event) {
    const idade = Number(event.target.value);
    if (idade > 16) {
        useridadeInput.classList.remove("error");
        useridadeInput.classList.add("correct");
        useridadeHelper.classList.remove("visible");
    } else {
        useridadeInput.classList.add("error");
        useridadeInput.classList.remove("correct");
        useridadeHelper.classList.add("visible");
    }
});

// 4- A senha deve ter mais de 5 caracteres
let senha = "";
usersenhaInput.addEventListener("change", function (event) {
    senha = event.target.value;

    if (senha.length > 5) {
        usersenhaInput.classList.remove("error");
        usersenhaInput.classList.add("correct");
        usersenhaHelper.classList.remove("visible");
    } else {
        usersenhaInput.classList.add("error");
        usersenhaInput.classList.remove("correct");
        usersenhaHelper.classList.add("visible");
    }
});

// 5- A confirmação de senha deve ser igual a senha
usercomfirmarsenhaInput.addEventListener("change", function (event) {
    const confirmarSenha = event.target.value;

    if (confirmarSenha === senha) {
        usercomfirmarsenhaInput.classList.remove("error");
        usercomfirmarsenhaInput.classList.add("correct");
        usercomfirmarsenhaHelper.classList.remove("visible");
    } else {
        usercomfirmarsenhaInput.classList.add("error");
        usercomfirmarsenhaInput.classList.remove("correct");
        usercomfirmarsenhaHelper.classList.add("visible");
    }
});
