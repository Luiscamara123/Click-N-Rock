<!DOCTYPE html>
<html lang="pt-br">
  
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Click'N'Rock</title>
  <link rel="stylesheet" href="../../../assets/libs/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../../assets/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
    integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body id="paginaProduto">
  <!--Cabeçalho-->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark px-3">
      <a href="../../../../index.php"><img class="logo" src="../../../assets/img/icon/Logo.png"></a>
      <input type="text" id="pesquisa" placeholder="Digite o produto">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"> </span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="../../../../index.php"> Início </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#servicos" id="servicosDropdown" role="button"
              data-bs-toggle="dropdown"> Produtos </a>
            <ul class="dropdown-menu">
              <li> <a class="dropdown-item" href="../../../../index.php#roupas"> Roupas </a></li>
              <li> <a class="dropdown-item" href="../../../../index.php#acessorios"> Acessórios </a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="#contato"> Ajuda </a></li>
          <li class="nav-item"><a class="nav-link" href="#contato"> Contato </a></li>
        </ul>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          <img width="40px" src="../../../assets/img/icon/icon-usuario.png">
        </button>
        <div class="dropdown-content">
          <a href="../../login/index.php">Login</a>
          <a href="../../cadastrar/index.php">Cadastrar</a>
        </div>
      </div>
      <div class="cart">
        <img class="icon-carrinho" width="40px" src="https://cdn-icons-png.flaticon.com/512/263/263142.png">
        <div class="cart-count icon-carrinho"id="cartCount">0</div>
      </div>
    </nav>
  </header>
    <main class="container">
      <div class="product-details">
        <div class="product-gallery">
          <img src="../../../assets/img/acessorios/bandana1.jpg" alt="Fone de Ouvido Bluetooth" />
        </div>
        <div class="product-info">
          <h2 class="product-name">Bandana</h2>
          <p class="product-code">Código do Produto: 98765XYZ</p>
          <p class="price">R$ <span>29,99</span></p>
          <p class="rating">
            <i class="fas fa-star"></i><i class="fas fa-star"></i
            ><i class="fas fa-star"></i><i class="fas fa-star"></i
            ><i class="fas fa-star-half-alt"></i> 45 avaliações
          </p>
          <p class="product-description">
            Bandana Estampada Preto Lenço Rock Máscara.
          </p>
          <div class="product-options">
            <label for="color">Cor:</label>
            <select id="color">
              <option>Preto</option>
            </select>
            <label for="quantity">Quantidade:</label>
            <input type="number" id="quantity" value="1" />
          </div>
          <div class="buttons">
            <a class="add-btn">
            Comprar
          </a>
          </div>
          <p class="delivery">
            <i class="fas fa-truck"></i> Estimativa de Entrega: Consulte nossos
            Termos e Condições
          </p>
        </div>
      </div>
      <div class="product-specs">
        <ul class="tabs">
          <li><i class="fas fa-info-circle"></i> Detalhes</li>
          <li><i class="fas fa-undo"></i> Devolução</li>
          <li><i class="fas fa-shipping-fast"></i> Entrega</li>
        </ul>
        <div class="specs-content">
          <div>
            <p><strong>SKU:</strong> TECH98765</p>
            <p><strong>Material :</strong> Cetim</p>
          </div>
        </div>
      </div>
    </main>
    <button id="modoEscuro">🌙</button>
    <div class="carrinho-lateral">
      <div class="carrinho-interno">
      </div>
    </div>
  <!-----------------Carrinho Lateral----------------->
  <div class="cart-modal" id="cartModal">

  <div class="cart-header">
  <h2>Carrinho</h2>
  <span class="close-btn">✖</span>
  </div>

  <div id="emptyMessage">🛒 Seu carrinho está vazio</div>

  <div id="cartItems"></div>
  <div class="total" id="total"></div>

  <button class="checkout">Finalizar Compra</button>

  </div>

  <div class="success-modal" id="successModal">
  <div class="success-box">
  <img src="../../../assets/img/icon/mark.png">
  <h2>Compra realizada!</h2>
  <span class="star-divider">★</span>
  <p>Pedido finalizado com sucesso.
    Em breve você receberá um e-email com os detalhes da sua compra.
  </p>
  <div class="numero-pedido">
    <img src="../../../assets/img/icon/document-sucess.png">
      <div class="gap">
        <h3>Número do pedido</h3>
        <p>#12345</p>
      </div>
  </div>
  <hr>
  <button id="closeSuccess">Continuar Comprando</button>
  </div>
  </div>
  <!------------------------------------------------->
  <footer id="contato">
    <div id="footer_content">
      <div id="footer_contacts">
        <img class="logo" src="../../../assets/img/icon/Logo.png">
        <ul class="footer-list">
          <li>
            <a href="#" class="footer-link">Ana Moura</a>
          </li>
          <li>
            <a href="#" class="footer-link">Bryan Willian</a>
          </li>
          <li>
            <a href="#" class="footer-link">Luís Câmara</a>
          </li>
          <div id="footer_social_media">
            <a href="#" class="footer-link" id="instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" class="footer-link" id="facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" class="footer-link" id="whatsapp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </ul>
      </div>
      <ul class="footer-list">
        <li>
          <h3>Conta</h3>
        </li>
        <li>
          <a href="#" class="footer-link">Meus pedidos</a>
        </li>
        <li>
          <a href="#" class="footer-link">Rastrear pedido</a>
        </li>
        <li>
          <a href="#" class="footer-link">Área do revendedor</a>
        </li>
      </ul>
      <ul class="footer-list">
        <li>
          <h3>Ajuda</h3>
        </li>
        <li>
          <a href="#" class="footer-link">FAQ</a>
        </li>
        <li>
          <a href="#" class="footer-link">Troca e devoluções</a>
        </li>
        <a href="#" class="footer-link">Entre em contato</a>
        </li>
        <li>
          <a href="#" class="footer-link">Termos e condições</a>
        </li>
        <li>
        <li>
          <a href="#" class="footer-link">Política de privacidade</a>
        </li>
      </ul>
      <div id="footer_subscribe">
        <h3>Inscrever-se</h3>
        <p>
          Insira seu e-mail para receber notificações sobre nossas novidades:
        </p>
        <div id="input_group">
          <input type="email" id="email">
          <button>
            <i class="fa-regular fa-envelope"></i>
          </button>
        </div>
      </div>
    </div>
    <div id="footer_copyright">
      &#169
      2025 all copyright reserved.
    </div>
  </footer>
  <script src="../../../assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../../../assets/js/script.js"></script>
  </body>
</html>
