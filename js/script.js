const botaoModoEscuro = document.getElementById("modoEscuro");
const logoClaro = document.getElementById("logoClaro");
const logoEscuro = document.getElementById("logoEscuro");

if (botaoModoEscuro) {
    botaoModoEscuro.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            botaoModoEscuro.textContent = ' ☀️';

            if (logoClaro && logoEscuro) {
                logoClaro.style.display = "none";
                logoEscuro.style.display = "inline";
            }
        } else {
            botaoModoEscuro.textContent = "🌙";

            if (logoClaro && logoEscuro) {
                logoClaro.style.display = "inline";
                logoEscuro.style.display = "none";
            }
        }
    });
}

let cart = [];

/* EVENTOS GERAIS */
document.addEventListener("click", function(e){

    // ADD PRODUTO
    if(e.target.classList.contains("add-btn")){
        let card = e.target.closest(".card");

        let name = card.querySelector(".product-name").innerText;
        let priceText = card.querySelector(".product-price").innerText;
        let img = card.querySelector(".img-card").src;

        let price = parseFloat(priceText.replace("R$", "").replace(",", "."));

        let item = cart.find(p => p.name === name);

        if(item){ item.qtd++; }
        else{ cart.push({name,price,img,qtd:1}); }

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

});

function updateCart(){
    document.getElementById("cartCount").innerText =
        cart.reduce((acc, item) => acc + item.qtd, 0);

    renderCart();
}

function toggleCart(){
    document.getElementById("cartModal").classList.toggle("active");
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

                <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
            </div>

            <div class="delete" data-index="${index}">🗑️</div>
        </div>
        `;
    });

    totalDiv.innerText = "Total: R$ " + total.toFixed(2);
}

function checkout(){
    if(cart.length === 0){
        toggleCart();
        return;
    }

    document.getElementById("successModal").style.display = "flex";
    cart = [];
    updateCart();
}