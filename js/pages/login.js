const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register__btn");
const loginBtn = document.querySelector(".login__btn");

const nome = document.getElementById("nome")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const confirmarSenha = document.getElementById("confirmar__senha")
const idade = document.getElementById("idade")
const cpf = document.getElementById("cpf")
const botao = document.getElementsByClassName("btn")[0]
const msgError = document.getElementsByClassName("msgError")[0]
const form = document.getElementById("form")

console.log(form)

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// --------------------------------------------------------------------
nome.addEventListener("input", (event) => {

    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

    console.log(regex.test(event.target.value))

    if(event.target.value.length < 3) {
        console.log("O nome precisa ser maior que 3 caracteres!")
    }

    if(!regex.test(event.target.value)) {
        console.log("Nome invalido")
    }
})

email.addEventListener("input", (event) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(regexEmail.test(event.target.value))

    if(!regexEmail.test(event.target.value)) {
        console.log("email invalido")
    }
})

idade.addEventListener("input", (event) => {
    let valorIdade = event.target.value.replace(/\D/g, "");
    console.log(valorIdade);

    if(valorIdade >= 18) {
        console.log("voce e maior de idade!")
    }else{
      console.log("voce e menor de idade, nao pode fazer o cadastro")
    }
})

cpf.addEventListener("input", (event) => {
    let valorCPF = event.target.value;

    valorCPF = valorCPF.replace(/\D/g, "");

    valorCPF = valorCPF.substring(0, 11);

    // aplicando mascara do RG
    valorCPF = valorCPF.replace(/\D/g,"");
    valorCPF = valorCPF.replace(/(\d{3})(\d)/,"$1.$2");
    valorCPF = valorCPF.replace(/(\d{3})(\d)/,"$1.$2");
    valorCPF = valorCPF.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

    event.target.value = valorCPF;
})

senha.addEventListener("input", (event) => {
  let senha = "";
  senha = event.target.value;

  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

  if (regex.test(senha)) {
    console.log("Senha válida");
  } else {
    console.log("Senha inválida. Precisa ter:");
    console.log("- mínimo de 10 caracteres");
    console.log("- 1 letra maiúscula");
    console.log("- 1 número");
    console.log("- 1 caractere especial");
  }
});

confirmarSenha.addEventListener("input", (event) => {
    let confirmarSenha = event.target.value;
    console.log(confirmarSenha);

    if(confirmarSenha === senha.value) {
        console.log("senha confirmada")
    }else{
      console.log("senha nao esta igual")
    }
})

const createDisplayMsgError = (mensagem) => {
  console.log(mensagem)
  createDisplayMsgError.textContent = mensagem;

  setTimeout(() => {
    createDisplayMsgError.textContent = "";
    console.log("Voce nao pode mandar o formulario, algo esta errado")
  }, 5000)
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomeregex = /^[a-zA-ZÀ-ÿ\s]+$/;
  if (!nomeregex.test(nome.value)||nome.value.length < 3) {
    createDisplayMsgError("Nome invalido")

    return;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!regexEmail.test(email.value)) {
    createDisplayMsgError("Email invalido")

    return;
  }

  let valorIdade = idade.value.replace(/\D/g, "");
  if (valorIdade <= 18) {
    createDisplayMsgError("Idade invalida")

    return;
  }

  let valorCPF = cpf.value.replace(/\D/g, "");
  if(valorCPF.length !== 11){
    createDisplayMsgError("Valor do CPF invalido")

    return;
  }

  const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;
  if(!regexSenha.test(senha.value)) {
    createDisplayMsgError("Senha invalida")
    return;
  }

  if(senha.value !== confirmarSenha.value){
    createDisplayMsgError("senhas diferentes")
    return;
  }

  msgError.textContent = "";
  console.log("Cadastro salvo com sucesso")

  form.submit();
})
