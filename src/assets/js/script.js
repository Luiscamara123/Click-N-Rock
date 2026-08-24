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
        let card = e.target.closest(".card, .product-details"); // vírgula combina seletores
        if(!card) return; // evita erro se não encontrar

        console.log('achou produto');

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

    container.innerHTML = "";

    if(cart.length === 0){
        emptyMessage.style.display = "block";
        totalDiv.style.display = "none";
        checkoutBtn.style.display = "none";
        return;
    }

    emptyMessage.style.display = "none";
    totalDiv.style.display = "block";
    checkoutBtn.style.display = "block";

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

    totalDiv.innerText = "Total: R$ " + total.toFixed(2);
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
   DADOS INICIAIS E VARIÁVEIS DE SESSÃO
===================================================== */
const dadosIniciais = {
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(61) 99999-9999",
    cidade: "Brasília - DF",
    senha: "123456"
};

let usuario = JSON.parse(localStorage.getItem("rockStoreUsuario")) || { ...dadosIniciais };

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
const logoutModal = document.getElementById("logoutModal");
const confirmEmail = document.getElementById("confirmEmail");
const confirmSenha = document.getElementById("confirmSenha");
const modalError = document.getElementById("modalError");
const menuButtons = document.querySelectorAll("#meu-painel .menu button");

/* =====================================================
   FUNÇÕES AUXILIARES
===================================================== */
function getInitials(nome) {
    const partes = nome.trim().split(/\s+/);
    if (partes.length === 0) return "US";
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

function salvarUsuario() {
    localStorage.setItem("rockStoreUsuario", JSON.stringify(usuario));
}

function atualizarCabecalho() {
    headerUserName.textContent = usuario.nome;
    headerAvatar.textContent = getInitials(usuario.nome);
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

    salvarUsuario();
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
   LÓGICA DE ALTERAÇÃO DE SENHA
===================================================== */
function salvarSenha() {
    const senhaAtual = document.getElementById("senhaAtual").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const msg = document.getElementById("senhaMessage");

    if (senhaAtual !== usuario.senha) {
        msg.style.display = "block";
        msg.style.background = "#ffebee";
        msg.style.borderColor = "#c62828";
        msg.style.color = "#c62828";
        msg.textContent = "✕ Senha atual incorreta!";
        return;
    }

    if (!novaSenha.trim()) {
        msg.style.display = "block";
        msg.style.background = "#ffebee";
        msg.style.borderColor = "#c62828";
        msg.style.color = "#c62828";
        msg.textContent = "✕ A nova senha não pode ser vazia!";
        return;
    }

    usuario.senha = novaSenha;
    salvarUsuario();

    msg.style.display = "block";
    msg.style.background = "#e8f5e9";
    msg.style.borderColor = "#2e7d32";
    msg.style.color = "#2e7d32";
    msg.textContent = "✓ Senha alterada com sucesso!";

    document.getElementById("senhaAtual").value = "";
    document.getElementById("novaSenha").value = "";

    setTimeout(() => {
        msg.style.display = "none";
    }, 3000);
}

/* =====================================================
   RENDERIZAÇÃO DE PÁGINAS
===================================================== */
function renderPagina(pagina) {
    if (pagina === "inicio") {
        pageTitle.textContent = `Olá, ${usuario.nome.split(" ")[0]}! 🤘`;
        pageDescription.textContent = "Bem-vindo de volta à Rock Store.";

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
        return;
    }

    if (pagina === "pedidos") {
        pageTitle.textContent = "Meus pedidos 📦";
        pageDescription.textContent = "Acompanhe seus pedidos na Rock Store.";

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
        return;
    }

    if (pagina === "perfil") {
        pageTitle.textContent = "Meu perfil 👤";
        pageDescription.textContent = "Altere suas informações pessoais.";

        pageContent.innerHTML = `
            <div class="panel profile">
                <div class="profile-top">
                    <div class="large-avatar" id="profileAvatar">
                        ${getInitials(usuario.nome)}
                    </div>
                    <div>
                        <h2 class="profile-name" id="profileName">${usuario.nome}</h2>
                        <p class="profile-description">Cliente da Rock Store</p>
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

        document.getElementById("saveProfileButton").addEventListener("click", salvarPerfil);
        return;
    }

    if (pagina === "configuracoes") {
        pageTitle.textContent = "Configurações ⚙️";
        pageDescription.textContent = "Gerencie sua conta e segurança.";

        pageContent.innerHTML = `
            <div class="panel profile">
                <div class="panel-header">
                    <h2>Alterar senha</h2>
                </div>

                <div class="form-group">
                    <label>Senha atual</label>
                    <input id="senhaAtual" type="password" placeholder="Digite sua senha atual">
                </div>

                <div class="form-group">
                    <label>Nova senha</label>
                    <input id="novaSenha" type="password" placeholder="Digite sua nova senha">
                </div>

                <button class="save-button" id="saveSenhaButton">
                    Atualizar senha
                </button>

                <div class="success-message" id="senhaMessage"></div>
            </div>
        `;

        document.getElementById("saveSenhaButton").addEventListener("click", salvarSenha);
        return;
    }
}

/* =====================================================
   EVENTOS DE NAVEGAÇÃO E LOGOUT
===================================================== */
menuButtons.forEach(button => {
    button.addEventListener("click", () => {
        menuButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderPagina(button.getAttribute("data-page"));
    });
});

// Abrir o modal ao clicar no botão Sair
document.getElementById("logoutButton").addEventListener("click", () => {
    confirmEmail.value = "";
    confirmSenha.value = "";
    modalError.style.display = "none";
    logoutModal.style.display = "flex";
});

// Fechar o modal
document.getElementById("cancelLogoutButton").addEventListener("click", () => {
    logoutModal.style.display = "none";
});

// Confirmar o e-mail e a senha antes de sair
document.getElementById("confirmLogoutButton").addEventListener("click", () => {
    const emailDigitado = confirmEmail.value.trim();
    const senhaDigitada = confirmSenha.value.trim();

    if (emailDigitado !== usuario.email || senhaDigitada !== usuario.senha) {
        modalError.textContent = "✕ E-mail ou senha incorretos!";
        modalError.style.display = "block";
        return;
    }

    logoutModal.style.display = "none";
    dashboard.style.display = "none";
    logoutScreen.style.display = "flex";
});

// Voltar para a conta a partir da tela de confirmação
document.getElementById("returnButton").addEventListener("click", () => {
    logoutScreen.style.display = "none";
    dashboard.style.display = "flex";
});

/* =====================================================
   INICIALIZAÇÃO
===================================================== */
atualizarCabecalho();
renderPagina("inicio");