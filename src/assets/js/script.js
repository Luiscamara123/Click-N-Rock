/*  =======================================
                MODO ESCURO
===========================================  */

const toggleTema = document.getElementById('modoEscuro');
const logoClaro = document.getElementById('logoClaro');
const logoEscuro = document.getElementById('logoEscuro');
const temaSalvo = localStorage.getItem('tema');

// Função para aplicar o tema claro
function aplicarTemaClaro() {
    document.body.classList.add('dark');
    if (toggleTema) toggleTema.textContent = '🌙';
    if (logoClaro && logoEscuro) {
        logoClaro.style.display = 'inline';
        logoEscuro.style.display = 'none';
    }
}

// Função para aplicar o tema escuro
function aplicarTemaEscuro() {
    document.body.classList.remove('dark');
    if (toggleTema) toggleTema.textContent = '☀️';
    if (logoClaro && logoEscuro) {
        logoClaro.style.display = 'none';
        logoEscuro.style.display = 'inline';
    }
}

// Carrega o tema salvo ao iniciar
if (temaSalvo === 'claro') {
    aplicarTemaClaro();
} else {
    aplicarTemaEscuro();
}

// Alterna o tema ao clicar no botão
if (toggleTema) {
    toggleTema.addEventListener('click', () => {
        const eModoClaro = document.body.classList.contains('dark');

        if (eModoClaro) {
            aplicarTemaEscuro();
            localStorage.setItem('tema', 'escuro');
        } else {
            aplicarTemaClaro();
            localStorage.setItem('tema', 'claro');
        }
    });
}
/*  =========================================
                FIM MODO ESCURO
============================================= */

let cart = [];

/* EVENTOS GERAIS */
document.addEventListener("click", function(e){

    // ADD PRODUTO
    if(e.target.classList.contains("add-btn")){
        let card = e.target.closest(".card, .product-details");
        if(!card) return;

        let name = card.querySelector(".product-name").innerText;
        let priceText = card.querySelector(".product-price, .price span").innerText;
        let img = card.querySelector(".img-card, .product-gallery img").src;

        let price = parseFloat(priceText.replace("R$", "").replace(",", "."));

        let item = cart.find(p => p.name === name);

        if(item){ 
            item.qtd++; 
        } else { 
            cart.push({name, price, img, qtd:1}); 
        }

        updateCart();
    }

    // ABRIR CARRINHO
    if(e.target.closest(".cart")){
        toggleCart();
    }

    // FECHAR CARRINHO
    if(e.target.classList.contains("close-btn")){
        toggleCart();
    }

    // AUMENTAR / DIMINUIR
    if(e.target.classList.contains("qty-btn")){
        let index = e.target.dataset.index;
        let delta = e.target.dataset.action === "plus" ? 1 : -1;
        changeQty(index, delta);
    }

    // REMOVER
    if(e.target.classList.contains("delete")){
        let index = e.target.dataset.index;
        removeItem(index);
    }

    // FINALIZAR
    if(e.target.classList.contains("checkout")){
        checkout();
    }

    // FECHAR MODAL
    if(e.target.id === "closeSuccess"){
        document.getElementById("successModal").style.display = "none";
    }

    function toggleCart(){
        document.getElementById("cartModal").classList.toggle("active");
    }
});

function updateCart(){
    const cartCountEl = document.getElementById("cartCount");
    if(cartCountEl){
        cartCountEl.innerText = cart.reduce((acc, item) => acc + item.qtd, 0);
    }
    renderCart();
}

function changeQty(index, delta){
    cart[index].qtd += delta;
    if(cart[index].qtd <= 0) cart.splice(index,1);
    updateCart();
}

function removeItem(index){
    cart.splice(index,1);
    updateCart();
}

function renderCart(){
    let container = document.getElementById("cartItems");
    let total = 0;

    let emptyMessage = document.getElementById("emptyMessage");
    let totalDiv = document.getElementById("total");
    let checkoutBtn = document.querySelector(".checkout");

    if(!container) return;

    container.innerHTML = "";

    if(cart.length === 0){
        if(emptyMessage) emptyMessage.style.display = "block";
        if(totalDiv) totalDiv.style.display = "none";
        if(checkoutBtn) checkoutBtn.style.display = "none";
        return;
    }

    if(emptyMessage) emptyMessage.style.display = "none";
    if(totalDiv) totalDiv.style.display = "block";
    if(checkoutBtn) checkoutBtn.style.display = "block";

    cart.forEach((item,index)=>{
        let subtotal = item.price * item.qtd;
        total += subtotal;

        container.innerHTML += `
        <div class="cart-item">
            <img src="${item.img}">
            <div class="cart-info">
                <p><strong>${item.name}</strong></p>
                <p>R$ ${item.price.toFixed(2)}</p>

                <div class="controls">
                    <button class="qty-btn" data-index="${index}" data-action="minus">-</button>
                    <span>${item.qtd}</span>
                    <button class="qty-btn" data-index="${index}" data-action="plus">+</button>
                </div>

                <p>Valor total: R$ ${subtotal.toFixed(2)}</p>
            </div>

            <div class="delete" data-index="${index}">🗑️</div>
        </div>
        `;
    });

    if(totalDiv) totalDiv.innerText = "Total: R$ " + total.toFixed(2);
}

function showSuccessModal(){
    const modal = document.getElementById("successModal");

    if(!modal) return;

    if(!modal.innerHTML.trim()){
        modal.innerHTML = `
            <div class="success-box">
                <h2>✅ Compra realizada!</h2>
                <p>Pedido finalizado com sucesso 🎸</p>
                <button id="closeSuccess" type="button">Fechar</button>
            </div>
        `;
    }

    modal.style.display = "flex";
}

function checkout(){
    if(cart.length === 0){
        toggleCart();
        return;
    }

    showSuccessModal();
    cart = [];
    updateCart();
};

/* =====================================================
   DADOS CAPTURADOS DA SESSÃO REAL (PHP)
===================================================== */
// O objeto 'usuarioLogado' é fornecido dinamicamente pela página PHP do painel
let usuario = {
    nome: typeof usuarioLogado !== 'undefined' ? usuarioLogado.nome : "Visitante",
    email: typeof usuarioLogado !== 'undefined' ? usuarioLogado.email : "email@naoinformado.com",
    telefone: "(61) 99999-9999", 
    cidade: "Brasília - DF"
};

/* =====================================================
   ELEMENTOS DOM
===================================================== */
const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");
const pageContent = document.getElementById("pageContent");
const headerAvatar = document.getElementById("headerAvatar");
const headerUserName = document.getElementById("headerUserName");
const dashboard = document.getElementById("dashboard");
const logoutScreen = document.getElementById("logoutScreen");
const menuButtons = document.querySelectorAll(".menu button");

/* =====================================================
   FUNÇÕES AUXILIARES
===================================================== */
function getInitials(nome) {
    if (!nome) return "US";
    const partes = nome.trim().split(/\s+/);
    if (partes.length === 0) return "US";
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

function atualizarCabecalho() {
    if (headerUserName) headerUserName.textContent = usuario.nome;
    if (headerAvatar) headerAvatar.textContent = getInitials(usuario.nome);
}

/* =====================================================
   LÓGICA DO FORMULÁRIO DE PERFIL
===================================================== */
function salvarPerfil() {
    const nomeInput = document.getElementById("nomeInput").value;
    const emailInput = document.getElementById("emailInput").value;
    const telefoneInput = document.getElementById("telefoneInput").value;
    const cidadeInput = document.getElementById("cidadeInput").value;

    if (!nomeInput.trim()) return;

    usuario.nome = nomeInput;
    usuario.email = emailInput;
    usuario.telefone = telefoneInput;
    usuario.cidade = cidadeInput;

    atualizarCabecalho();

    const profileName = document.getElementById("profileName");
    const profileAvatar = document.getElementById("profileAvatar");
    const successMessage = document.getElementById("successMessage");

    if (profileName) profileName.textContent = usuario.nome;
    if (profileAvatar) profileAvatar.textContent = getInitials(usuario.nome);

    if (successMessage) {
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    }
}

/* =====================================================
   RENDERIZAÇÃO DE PÁGINAS DO PAINEL
===================================================== */
function renderPagina(pagina) {
    if (pagina === "inicio") {
        if (pageTitle) pageTitle.textContent = `Olá, ${usuario.nome.split(" ")[0]}! `;
        if (pageDescription) pageDescription.textContent = "Bem-vindo de volta à Click N Rock.";

        if (pageContent) {
            pageContent.innerHTML = `
                <section class="cards">
                    <div class="card">
                        <div class="card-top">
                            <span class="card-title">Pedidos</span>
                            <span class="card-icon">📦</span>
                        </div>
                        <div class="card-number">3</div>
                        <div class="card-description">pedidos realizados</div>
                    </div>

                    <div class="card">
                        <div class="card-top">
                            <span class="card-title">Em andamento</span>
                            <span class="card-icon">🚚</span>
                        </div>
                        <div class="card-number">1</div>
                        <div class="card-description">pedido a caminho</div>
                    </div>
                </section>

                <div class="panel">
                    <div class="panel-header">
                        <h2>Pedidos recentes</h2>
                        <span>3 pedidos</span>
                    </div>

                    <div class="order">
                        <div class="order-icon">🎸</div>
                        <div class="order-info">
                            <div class="order-name">Colar Rock 'n' Roll</div>
                            <div class="order-number">Pedido #1024</div>
                        </div>
                        <span class="status">Entregue</span>
                    </div>

                    <div class="order">
                        <div class="order-icon">🖤</div>
                        <div class="order-info">
                            <div class="order-name">Pulseira de couro</div>
                            <div class="order-number">Pedido #1018</div>
                        </div>
                        <span class="status">Enviado</span>
                    </div>

                    <div class="order">
                        <div class="order-icon">💀</div>
                        <div class="order-info">
                            <div class="order-name">Anel Caveira</div>
                            <div class="order-number">Pedido #1009</div>
                        </div>
                        <span class="status">Entregue</span>
                    </div>
                </div>
            `;
        }
        return;
    }

    if (pagina === "pedidos") {
        if (pageTitle) pageTitle.textContent = "Meus pedidos";
        if (pageDescription) pageDescription.textContent = "Acompanhe seus pedidos na Click N Rock.";

        if (pageContent) {
            pageContent.innerHTML = `
                <div class="panel">
                    <div class="panel-header">
                        <h2>Meus pedidos</h2>
                        <span>3 pedidos</span>
                    </div>

                    <div class="order">
                        <div class="order-icon">🎸</div>
                        <div class="order-info">
                            <div class="order-name">Colar Rock 'n' Roll</div>
                            <div class="order-number">#1024 · R$ 89,90</div>
                        </div>
                        <span class="status">Entregue</span>
                    </div>

                    <div class="order">
                        <div class="order-icon">🖤</div>
                        <div class="order-info">
                            <div class="order-name">Pulseira de couro</div>
                            <div class="order-number">#1018 · R$ 59,90</div>
                        </div>
                        <span class="status">Enviado</span>
                    </div>

                    <div class="order">
                        <div class="order-icon">💀</div>
                        <div class="order-info">
                            <div class="order-name">Anel Caveira</div>
                            <div class="order-number">#1009 · R$ 79,90</div>
                        </div>
                        <span class="status">Entregue</span>
                    </div>
                </div>
            `;
        }
        return;
    }

    if (pagina === "perfil") {
        if (pageTitle) pageTitle.textContent = "Meu perfil";
        if (pageDescription) pageDescription.textContent = "Altere suas informações pessoais.";

        if (pageContent) {
            pageContent.innerHTML = `
                <div class="panel profile">
                    <div class="profile-top">
                        <div class="large-avatar" id="profileAvatar">
                            ${getInitials(usuario.nome)}
                        </div>
                        <div>
                            <h2 class="profile-name" id="profileName">${usuario.nome}</h2>
                            <p class="profile-description">Cliente da Click N Rock</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Nome</label>
                        <input id="nomeInput" type="text" value="${usuario.nome}">
                    </div>

                    <div class="form-group">
                        <label>E-mail</label>
                        <input id="emailInput" type="email" value="${usuario.email}">
                    </div>

                    <div class="form-group">
                        <label>Telefone</label>
                        <input id="telefoneInput" type="text" value="${usuario.telefone}">
                    </div>

                    <div class="form-group">
                        <label>Cidade</label>
                        <input id="cidadeInput" type="text" value="${usuario.cidade}">
                    </div>

                    <button class="save-button" id="saveProfileButton">
                        Salvar alterações
                    </button>

                    <div class="success-message" id="successMessage">
                        ✓ Dados atualizados com sucesso!
                    </div>
                </div>
            `;

            const btnSave = document.getElementById("saveProfileButton");
            if (btnSave) btnSave.addEventListener("click", salvarPerfil);
        }
        return;
    }

    if (pagina === "configuracoes") {
        if (pageTitle) pageTitle.textContent = "Configurações";
        if (pageDescription) pageDescription.textContent = "Gerencie sua conta e segurança.";

        if (pageContent) {
            pageContent.innerHTML = `
                <div class="panel profile">
                    <div class="panel-header">
                        <h2>Configurações da Conta</h2>
                    </div>
                    <p>Sua sessão está ativa e vinculada ao sistema de login do site.</p>
                </div>
            `;
        }
        return;
    }
}

/* =====================================================
   EVENTOS DE NAVEGAÇÃO
===================================================== */
menuButtons.forEach(button => {
    button.addEventListener("click", () => {
        menuButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderPagina(button.getAttribute("data-page"));
    });
});

/* =====================================================
   INICIALIZAÇÃO
===================================================== */
atualizarCabecalho();
renderPagina("inicio");

/* =========================================================
   CLICK'N'ROCK
   SISTEMA DE BUSCA DE PRODUTOS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS DA PÁGINA
       ===================================================== */

    const campoPesquisa =
        document.getElementById("pesquisa");

    const botaoPesquisa =
        document.getElementById("botaoPesquisa");

    const sugestoesPesquisa =
        document.getElementById("sugestoesPesquisa");

    const resultadoPesquisa =
        document.getElementById("resultadoPesquisa");

    const listaResultados =
        document.getElementById("listaResultados");

    const nenhumResultado =
        document.getElementById("nenhumResultado");

    const quantidadeResultados =
        document.getElementById("quantidadeResultados");


    /* =====================================================
       VERIFICA SE O CAMPO EXISTE
       ===================================================== */

    if (!campoPesquisa) {

        console.error(
            "Campo de pesquisa não encontrado."
        );

        return;
    }


    /* =====================================================
       NORMALIZAR TEXTO
       ===================================================== */

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }


    /* =====================================================
       ESCAPAR HTML
       Evita inserir HTML indesejado nos resultados.
       ===================================================== */

    function escaparHTML(texto) {

        const div = document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;
    }


    /* =====================================================
       PEGAR TODOS OS PRODUTOS DA PÁGINA
       ===================================================== */

    function obterProdutos() {

        const produtos = [];

        /*
         * No seu projeto, cada produto está dentro de:
         *
         * .produto
         *
         * E possui:
         *
         * .product-name
         * .product-price
         * .img-card
         */

        document
            .querySelectorAll(".produto")
            .forEach(function (produto) {

                const nomeElemento =
                    produto.querySelector(".product-name");

                const precoElemento =
                    produto.querySelector(".product-price");

                const imagemElemento =
                    produto.querySelector(".img-card");

                const linkElemento =
                    produto.querySelector("a");


                /*
                 * Se não tiver nome,
                 * não é um produto válido.
                 */

                if (!nomeElemento) {
                    return;
                }


                const nome =
                    nomeElemento.textContent.trim();

                const preco =
                    precoElemento
                        ? precoElemento.textContent.trim()
                        : "";


                const imagem =
                    imagemElemento
                        ? imagemElemento.getAttribute("src")
                        : "";


                const link =
                    linkElemento
                        ? linkElemento.getAttribute("href")
                        : "#";


                produtos.push({

                    nome: nome,

                    nomeNormalizado:
                        normalizarTexto(nome),

                    preco: preco,

                    imagem: imagem,

                    link: link

                });

            });


        return produtos;
    }


    /* =====================================================
       REMOVER PRODUTOS DUPLICADOS
       ===================================================== */

    function removerDuplicados(produtos) {

        const produtosUnicos = [];

        const nomes = new Set();


        produtos.forEach(function (produto) {

            const nome =
                produto.nomeNormalizado;


            if (!nomes.has(nome)) {

                nomes.add(nome);

                produtosUnicos.push(produto);

            }

        });


        return produtosUnicos;
    }


    /* =====================================================
       BUSCAR PRODUTOS
       ===================================================== */

    function buscarProdutos(termo) {

        const termoNormalizado =
            normalizarTexto(termo);


        /*
         * Campo vazio
         */

        if (!termoNormalizado) {

            return [];

        }


        const produtos =
            removerDuplicados(
                obterProdutos()
            );


        /*
         * Divide a pesquisa em palavras.
         *
         * Exemplo:
         *
         * "jaqueta slipknot"
         *
         * vira:
         *
         * ["jaqueta", "slipknot"]
         */

        const palavras =
            termoNormalizado
                .split(/\s+/)
                .filter(Boolean);


        /*
         * Produto precisa conter
         * todas as palavras pesquisadas.
         */

        return produtos.filter(function (produto) {

            return palavras.every(function (palavra) {

                return produto.nomeNormalizado
                    .includes(palavra);

            });

        });

    }


    /* =====================================================
       CRIAR CARD DO PRODUTO
       ===================================================== */

    function criarCardProduto(produto) {

        const card =
            document.createElement("div");

        card.className =
            "resultado-card";


        const nome =
            escaparHTML(produto.nome);

        const preco =
            escaparHTML(produto.preco);


        /*
         * Caminho da imagem.
         */

        const imagem =
            produto.imagem || "";


        card.innerHTML = `

            <a href="${produto.link}">

                <div class="resultado-imagem">

                    <img
                        src="${imagem}"
                        alt="${nome}"
                        loading="lazy"
                    >

                </div>


                <div class="resultado-info">

                    <h3>
                        ${nome}
                    </h3>


                    <p class="resultado-preco">
                        ${preco}
                    </p>


                    <span class="resultado-comprar">
                        Comprar
                    </span>

                </div>

            </a>

        `;


        return card;
    }


    /* =====================================================
       MOSTRAR SUGESTÕES
       ===================================================== */

    function mostrarSugestoes(produtos) {

        if (!sugestoesPesquisa) {
            return;
        }


        sugestoesPesquisa.innerHTML = "";


        /*
         * Limita as sugestões
         * para não ocupar a tela inteira.
         */

        const resultados =
            produtos.slice(0, 5);


        if (resultados.length === 0) {

            sugestoesPesquisa.style.display =
                "none";

            return;
        }


        resultados.forEach(function (produto) {

            const item =
                document.createElement("a");


            item.className =
                "sugestao-item";


            item.href =
                produto.link;


            item.innerHTML = `

                <img
                    src="${produto.imagem}"
                    alt="${escaparHTML(produto.nome)}"
                >

                <div class="sugestao-info">

                    <span class="sugestao-nome">
                        ${escaparHTML(produto.nome)}
                    </span>

                    <span class="sugestao-preco">
                        ${escaparHTML(produto.preco)}
                    </span>

                </div>

            `;


            sugestoesPesquisa
                .appendChild(item);

        });


        sugestoesPesquisa.style.display =
            "block";

    }


    /* =====================================================
       MOSTRAR RESULTADOS
       ===================================================== */

    function mostrarResultados(produtos) {

        /*
         * Se a área não existir,
         * não executa.
         */

        if (!resultadoPesquisa) {
            return;
        }


        listaResultados.innerHTML = "";


        /*
         * Nenhum resultado
         */

        if (produtos.length === 0) {

            resultadoPesquisa.style.display =
                "block";


            nenhumResultado.style.display =
                "block";


            quantidadeResultados.textContent =
                "0 produtos encontrados";


            return;
        }


        /*
         * Existem resultados
         */

        nenhumResultado.style.display =
            "none";


        resultadoPesquisa.style.display =
            "block";


        quantidadeResultados.textContent =
            produtos.length === 1
                ? "1 produto encontrado"
                : `${produtos.length} produtos encontrados`;


        /*
         * Cria os cards
         */

        produtos.forEach(function (produto) {

            const card =
                criarCardProduto(produto);


            listaResultados.appendChild(card);

        });


        /*
         * Leva o usuário até os resultados.
         */

        resultadoPesquisa.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }


    /* =====================================================
       EXECUTAR PESQUISA
       ===================================================== */

    function executarPesquisa() {

        const termo =
            campoPesquisa.value;


        const produtos =
            buscarProdutos(termo);


        /*
         * Mostra os resultados.
         */

        mostrarResultados(produtos);


        /*
         * Fecha as sugestões.
         */

        if (sugestoesPesquisa) {

            sugestoesPesquisa.style.display =
                "none";

        }

    }


    /* =====================================================
       PESQUISA EM TEMPO REAL
       ===================================================== */

    campoPesquisa.addEventListener(
        "input",
        function () {

            const termo =
                campoPesquisa.value;


            /*
             * Se estiver vazio,
             * fecha tudo.
             */

            if (!termo.trim()) {

                if (sugestoesPesquisa) {

                    sugestoesPesquisa.style.display =
                        "none";

                }


                if (resultadoPesquisa) {

                    resultadoPesquisa.style.display =
                        "none";

                }


                return;

            }


            /*
             * Pesquisa produtos.
             */

            const produtos =
                buscarProdutos(termo);


            /*
             * Mostra sugestões.
             */

            mostrarSugestoes(produtos);

        }
    );


    /* =====================================================
       BOTÃO DE PESQUISA
       ===================================================== */

    if (botaoPesquisa) {

        botaoPesquisa.addEventListener(
            "click",
            executarPesquisa
        );

    }


    /* =====================================================
       ENTER
       ===================================================== */

    campoPesquisa.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                executarPesquisa();
            }
        }
    );

    /* =====================================================
       ESC
       ===================================================== */

    campoPesquisa.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Escape") {
                campoPesquisa.value = "";
                if (sugestoesPesquisa) {
                    sugestoesPesquisa.style.display =
                        "none";
                }
                if (resultadoPesquisa) {
                    resultadoPesquisa.style.display =
                        "none";
                }
            }
        }
    );


    /* =====================================================
       CLICAR FORA DAS SUGESTÕES
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {
            if (
                sugestoesPesquisa &&
                !campoPesquisa.contains(event.target) &&
                !sugestoesPesquisa.contains(event.target)
            ) {
                sugestoesPesquisa.style.display =
                    "none";
            }
        }
    );
});