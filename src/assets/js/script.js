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
}