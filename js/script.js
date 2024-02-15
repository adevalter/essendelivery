if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}





var totalAmount = "0,00"

function ready() {


    const removeProdutosButton = document.getElementsByClassName("remove-product-button");

    for (var i = 0; i < removeProdutosButton.length; i++) {
        removeProdutosButton[i].addEventListener("click", removeProduct)
    }

    const quantityInput = document.getElementsByClassName("product-qtd-input");
    for (var i = 0; i < quantityInput.length; i++) {
        quantityInput[i].addEventListener("change", updateTotal)
    }

    const addTocartButtons = document.querySelectorAll(".add-produto");

    addTocartButtons.forEach(button => {
        button.addEventListener("click", event => {
            // Obtenha a aba atual
            const currentTab = button.closest(".tab");

            // Chame a função passando a aba atual como parâmetro
            addProductToCart(event, currentTab);
        });
    });

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
        Obrigado pela sua compra!
        Valor do pedido: R$${totalAmount}\n
        Volte sempre :)
      `
        )

        document.querySelector(".cart-table tbody").innerHTML = ""
        updateTotal()
    }
}

let divPizza = document.querySelector(".Pizza");
let divSCardapio = document.createElement("section");

divSCardapio.classList.add("s-cardapio");

fetch("http://127.0.0.1:5500/pizza.json").then((response) => {
    response.json().then((dados) => {
        console.log(dados);
        dados.produtos.map((produto) => {
            divSCardapio.innerHTML += `
             <div class="card-produto">
                            <div class="card-titulo">
                                <h6 class="card-nome">${produto.nome}</h6>
                                <span class="card-tag">${produto.categoria}</span>
                            </div>
                            <div class="card-subtitulo">
                               ${produto.ingrediente}
                            </div>
                            <div class="card-image">
                                <img src="../imagens/produtos/${produto.foto}" alt="${produto.nome}">
                            </div>
                            <div class="card-preco">
                                <h3>${produto.preco}</h3>
                                <button class="add-produto" type="button"> <img src="../imagens/mais.svg" /></button>
                            </div>
                        </div>
            `;
        });
        divPizza.append(divSCardapio);
        ready();
    });
});



let divRefrigerante = document.querySelector(".Refrigerante");
let divSCardapioBebida = document.createElement("section");

divSCardapioBebida.classList.add("s-cardapio");

fetch("http://127.0.0.1:5500/bebida.json").then((response) => {
    response.json().then((dados) => {
        console.log(dados);
        dados.bebidas.map((bebida) => {
            divSCardapioBebida.innerHTML += `
             <div class="card-produto">
                            <div class="card-titulo">
                                <h6 class="card-nome">${bebida.nome}</h6>
                                <span class="card-tag">${bebida.categoria}</span>
                            </div>
                            <div class="card-subtitulo">
                               ${bebida.ingrediente}
                            </div>
                            <div class="card-image">
                                <img src="../imagens/produtos/${bebida.foto}" alt="${bebida.nome}">
                            </div>
                            <div class="card-preco">
                                <h3>${bebida.preco}</h3>
                                <button class="add-produto" type="button"> <img src="../imagens/mais.svg" /></button>
                            </div>
                        </div>
            `;
        });
        divRefrigerante.append(divSCardapioBebida);
        ready();
    });
});


function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement.parentElement
    const productImg = productInfos.getElementsByClassName("card-image")[0].querySelector("img").src;
    const productName = productInfos.getElementsByClassName("card-nome")[0].innerText;
    const productPrice = productInfos.getElementsByClassName("card-preco")[0].innerText;

    const productsCardName = document.getElementsByClassName("cart-product-title");

    for (var i = 0; i < productsCardName.length; i++) {
        if (productsCardName[i].innerText === productName) {
            productsCardName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++;
            updateTotal();
            return;

        }
    }

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");
    newCartProduct.innerHTML =
        `
          <td class="product-identification">
            <img src="${productImg}" alt="${productName}" class="cart-product-image">
            <strong class="cart-product-title">${productName}</strong>
          </td>
          <td>
            <span class="cart-product-price">${productPrice}</span>
          </td>
          <td>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
          </td>
        `
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()

    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)

}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
}

document.getElementById("mainHeader").innerHTML = `
<div class="container">

        <div class="menu">
            <a href="#" class=""><img src="../imagens/logo.svg" alt="Logo Essen Delivery"></a>

            <nav>
                <ul>
                    <li><a href="">HOME</a></li>
                    <li><a href="">SOBRE</a></li>
                    <li><a href="">CARDÁPIO</a></li>
                    <li><a href="">CONTATO</a></li>
                    <li><a href="">LOGIN</a></li>
                </ul>
            </nav>
            <ul>

                <li><img src="../imagens/facebook.svg" alt="Logo Facebook"></li>
                <li><img src="../imagens/instagram.svg" alt="Logo Instagram"></li>
                <li><img src="../imagens/whatsapp.svg" alt=" Logo Whatsapp"></li>
            </ul>
            <button><img src="../imagens/icon-menu.png" alt="Icone Navegação"></button>
        </div>

    </div>
    
`

document.getElementById("mainFooter").innerHTML = `
 <div class="container">
        <div class="main-area">
            <div class="left">
                <img src="../imagens/Logo-xg.png" alt="">
            </div>
            <div class="right">
                <div class="item-nav">
                    <ul>
                        <li><a href="./index.html">HOME</a></li>
                        <li><a href="">SOBRE</a></li>
                        <li><a href="">CARDÁPIO</a></li>
                        <li><a href="">CONTATO</a></li>
                        <li><a href="">LOGIN</a></li>
                    </ul>
                </div>
                <div class="item-politica">
                    <h5><a href="../politica/politica.html">Política Privacidade</a></h5>
                </div>
                <div class="social-footer">
                    <ul>
                        <li><img src="../imagens/facebook.svg" alt="Facebook"></li>
                        <li><img src="../imagens/instagram.svg" alt="Instagram"></li>
                        <li><img src="../imagens/whatsapp.svg" alt="Whatsapp"></li>
                    </ul>
                </div>

            </div>
        </div>
        <p class="copy">2023 &copy; Todos os direitos reservados. Essen Delivery</p>
    </div>
`
const tabs = document.querySelectorAll(".tabs");
const tab = document.querySelectorAll(".tab");
const panel = document.querySelectorAll(".panel");

function onTabClick(event) {

    // deactivate existing active tabs and panel

    for (let i = 0; i < tab.length; i++) {
        tab[i].classList.remove("active");
    }

    for (let i = 0; i < panel.length; i++) {
        panel[i].classList.remove("active");
    }


    // activate new tabs and panel
    event.target.classList.add('active');
    let classString = event.target.getAttribute('data-target');
    console.log(classString);
    document.getElementById('panels').getElementsByClassName(classString)[0].classList.add("active");
}

for (let i = 0; i < tab.length; i++) {
    tab[i].addEventListener('click', onTabClick, false);
}

//carrinho


function updateTotal() {

    totalAmount = 0;
    const cardProducts = document.getElementsByClassName("cart-product");

    for (var i = 0; i < cardProducts.length; i++) {
        const productPrice = cardProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".");
        const productQuantity = cardProducts[i].getElementsByClassName("product-qtd-input")[0].value;

        totalAmount += productPrice * productQuantity;
        console.log(totalAmount)
    }
    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace(".", ",");
    document.querySelector(".cart-total-container span").innerText = "R$ " + totalAmount;

}

function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove();
    }
    updateTotal();
}


