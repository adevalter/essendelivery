document.getElementById("mainHeader").innerHTML = `
<div class="container">

        <div class="menu">
            <a href="#" class=""><img src="../imagens/logo.svg" alt="Logo Essen Delivery"></a>

            <nav>
                <ul>
                    <li><a href="">HOME</a></li>
                    <li><a href="">SOBRE</a></li>
                    <li><a href="">PRODUTOS</a></li>
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
                        <li><a href="">PRODUTOS</a></li>
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