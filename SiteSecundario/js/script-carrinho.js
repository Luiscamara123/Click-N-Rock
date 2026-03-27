const produtos = [];
const btnCarrinho = document.querySelector('#carrinho');
const carrinhoLateral = document.querySelector('.carrinho-lateral');
const carrinhoInterno = document.querySelector('.carrinho-lateral .carrinho-interno');


btnCarrinho.addEventListener('click', function (e) {
    e.preventDefault();

    const nomeProduto = document.querySelector('.product-details .product-info h2').textContent;
    const precoProduto = Number(document.querySelector('.product-details .product-info .price span').textContent.replace(',', '.'));
    const qtdProduto = Number(document.querySelector('.product-details .product-info #quantity').value);
    const imgProduto = document.querySelector('.product-details .product-gallery img').src.toString();

    const produto = { nomeProduto, precoProduto, qtdProduto, imgProduto };
    produtos.push(produto);

    mostrarCarrinho();    
});

function mostrarCarrinho() {
    carrinhoInterno.innerHTML = '';

    for (let produto of produtos) {
        const card = document.createElement('div');
        card.classList.add('card');
        const valorTotal = produto.precoProduto * produto.qtdProduto;
        const imgAtual = produto.imgProduto;
        
        card.innerHTML = `
            <div>
                <img src= "${imgAtual}">
                <h3>${produto.nomeProduto}</h3>
                <hr>
                <p>Preço Unitário: ${produto.precoProduto.toFixed(2)}</p>
                <p>Quantidade: <span>${produto.qtdProduto}</span></p>
                <p>Total: ${valorTotal.toFixed(2).replace('.', ',')}</p>
            </div>`;
        carrinhoInterno.appendChild(card);

        carrinhoInterno.addEventListener('click', (e) => {
            if (e.target.classList.contains('comprar')){
                carrinhoInterno.innerHTML = `Compra realizada com sucesso!<br>Comprou ${produto.qtdProduto} unidades de ${produto.nomeProduto} por R$${valorTotal}.`;
                carrinhoInterno.appendChild(botaoFechar);
            }
        });
    }
    const botaoComprar = document.createElement('button');
    botaoComprar.classList.add('comprar');
    botaoComprar.textContent = 'COMPRAR';
    carrinhoInterno.appendChild(botaoComprar);

    const botaoFechar = document.createElement('button');
    botaoFechar.classList.add('fechar');
    botaoFechar.textContent = 'X';
    carrinhoInterno.appendChild(botaoFechar);

    carrinhoLateral.classList.add('active');    
}

carrinhoInterno.addEventListener('click', (e) => {
    if (e.target.classList.contains('fechar')) {
        carrinhoLateral.classList.remove('active');
    }
});
