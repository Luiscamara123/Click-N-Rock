<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock Store - Minha Conta</title>
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>

<body id="meu-painel">

    <header>
    <nav class="navbar navbar-expand-lg navbar-dark px-3">
      <a href="index.php"><img class="logo" src="../../assets/img/icon/Logo.png"></a>
      <input type="text" id="pesquisa" placeholder="Digite o produto">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"> </span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="../../../index.php"> Início </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#servicos" id="servicosDropdown" role="button"
              data-bs-toggle="dropdown"> Produtos </a>
            <ul class="dropdown-menu">
              <li> <a class="dropdown-item" href="../../../index.php#roupas"> Roupas </a></li>
              <li> <a class="dropdown-item" href="../../../index.php#acessorios"> Acessórios </a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="#contato"> Ajuda </a></li>
          <li class="nav-item"><a class="nav-link" href="#contato"> Contato </a></li>
        </ul>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          <img width="40px" src="../../assets/img/icon/icon-usuario.png">
        </button>
        <div class="dropdown-content">
          <a href="../../pages/login/index.php">Login</a>
          <a href="../../pages/cadastrar/index.php">Cadastrar</a>
        </div>
      </div>
      <div class="cart">
        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png">
        <div class="cart-count icon-carrinho" id="cartCount">0</div>
      </div>
    </nav>  
  </header>

    <!-- DASHBOARD -->
    <div class="dashboard" id="dashboard">

        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="logo">
                <img class="img-logo" src="../../assets/img/icon/logo.png">
            </div>

            <nav class="menu">
                <button class="active" data-page="inicio">
                    🏠 &nbsp; Início
                </button>
                <button data-page="pedidos">
                    📦 &nbsp; Meus pedidos
                </button>
                <button data-page="perfil">
                    👤 &nbsp; Meu perfil
                </button>
                <button data-page="configuracoes">
                    ⚙️ &nbsp; Configurações
                </button>
            </nav>

            <button class="logout" id="logoutButton">
                🚪 &nbsp; Sair
            </button>
        </aside>

        <!-- CONTEÚDO -->
        <main class="main">
            <header class="header">
                <div>
                    <h1 id="pageTitle"></h1>
                    <p id="pageDescription"></p>
                </div>

                <div class="user-area">
                    <div class="avatar" id="headerAvatar"></div>
                    <div>
                        <div class="user-name" id="headerUserName"></div>
                        <span class="user-type">Cliente</span>
                    </div>
                </div>
            </header>

            <div id="pageContent"></div>
        </main>
    </div>

    <!-- TELA DEPOIS DE SAIR -->
    <div class="logout-screen" id="logoutScreen">
        <div class="logout-box">
            <div class="logout-icon">✓</div>
            <h2>Você saiu da conta</h2>
            <p>Sua sessão foi encerrada com sucesso.</p>
            <button class="return-button" id="returnButton">
                Voltar para minha conta
            </button>
        </div>
    </div>

    <!--Modo Escuro-->
    <button id="modoEscuro">🌙</button>

    <!--Footer-->
  <footer id="contato">
    <div id="footer_content">
      <div id="footer_contacts">
        <img class="logo" src="./src/assets/img/icon/Logo.png">
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
        <li><a href="#" class="footer-link">FAQ</a></li>
        <li><a href="#" class="footer-link">Troca e devoluções</a></li>
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

    <script src="../../assets/js/script.js"></script>
</body>

</html>