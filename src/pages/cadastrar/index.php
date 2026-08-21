<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="../../assets/libs/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>

<body id="paginaCadastro">
    <header>
    <nav class="navbar navbar-expand-lg navbar-dark px-3">
      <a href="../../../index.php"><img class="logo" src="../../assets/img/icon/Logo.png"></a>
      <input type="search" id="pesquisa" placeholder="Digite o produto">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"> </span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="../../../index.php"> Início </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="produtosDropdown" role="button" data-bs-toggle="dropdown"> Produtos </a>
            <ul class="dropdown-menu">
              <li> <a class="dropdown-item" href="../../../index.php#roupas"> Roupas </a></li>
              <li> <a class="dropdown-item" href="../../../index.php#acessorios"> Acessórios </a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="../../../index.php#contato"> Ajuda </a></li>
          <li class="nav-item"><a class="nav-link" href="../../../index.php#contato"> Contato </a></li>
        </ul>
      </div>
    </nav>
  </header>
    <div class="container-custom">        
        <div class="registration form">
            <header class="login_tittle">Cadastrar-se</header>
            <form action="GET">
                <input type="text" placeholder="Insira seu nome completo">
                <input type="date" placeholder="Digite sua data de nascimento">
                <label for="genero" class="genero">Gênero</label>
                <select name="genero">
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="prefiro-não-dizer">Prefiro não dizer</option>
                </select>
                <input type="number" placeholder="Digite seu CPF">
                <input type="text" placeholder="Insira seu CEP">
                <input type="email" placeholder="Insira seu email">
                <input type="password" placeholder="Crie uma senha">
                <input type="password" placeholder="Confirme sua senha">
                <input type="button" class="button" value="Cadastrar-se">
            </form>
            <div class="signup">
                <span class="signup">Já tem uma conta?
                    <a href="../login/index.php"><label>Login</label></a>
                </span>
            </div>
        </div>
    </div>
    <footer id="contato">
    <div id="footer_content">
      <div id="footer_contacts">
        <img class="logo" src="../../assets/img/icon/Logo.png">
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
    <button id="modoEscuro">🌙</button>
    <script src="../../assets/js/script.js"></script>
    <script src="../../assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>