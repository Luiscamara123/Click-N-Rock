<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

include("src/assets/php/conexao.php");

if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit();
}

$id_usuario = $_SESSION['id_usuario'];

$sql = "SELECT nome_completo, email, data_nascimento, tipo_usuario FROM usuarios WHERE id_usuario = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$usuario = $stmt->get_result()->fetch_assoc();
$stmt->close();

$eh_moderador = in_array($usuario['tipo_usuario'], ['moderador', 'admin']);

$nome_exibicao = !empty($usuario['nome_completo']) ? $usuario['nome_completo'] : $usuario['nome_completo'];
date_default_timezone_set('America/Sao_Paulo');

$hora = (int) date('H');
if ($hora >= 5 && $hora < 12) {
    $saudacao = "Bom dia";
} elseif ($hora >= 12 && $hora < 18) {
    $saudacao = "Boa tarde";
} else {
    $saudacao = "Boa noite";
}

$tipos_rotulo = [
    'admin'     => 'Administrador',
    'moderador' => 'Moderador',      
    'usuário'     => 'Usuário Comum'    
];


?>
<header>
    <nav class="navbar navbar-expand-lg navbar-dark px-3">
      <a href="index.php"><img class="logo" src="./src/assets/img/icon/Logo.png"></a>
      <input type="text" id="pesquisa" placeholder="Digite o produto">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"> </span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="index.php"> Início </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#servicos" id="servicosDropdown" role="button"
              data-bs-toggle="dropdown"> Produtos </a>
            <ul class="dropdown-menu">
              <li> <a class="dropdown-item" href="#roupas"> Roupas </a></li>
              <li> <a class="dropdown-item" href="#acessorios"> Acessórios </a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="#contato"> Ajuda </a></li>
          <li class="nav-item"><a class="nav-link" href="#contato"> Contato </a></li>          
        </ul>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          <img width="40px" src="./src/assets/img/icon/icon-usuario.png">
        </button>
        <div class="dropdown-content">
          <?php if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'admin'): ?>
            <a href="cadastroProduto.php" class="nav-link <?php echo ($pagina_atual === 'cadastroProduto.php') ? 'ativo' : ''; ?>">Cadastrar Produto</a>
          <?php endif; ?>
          <?php if (isset($_SESSION['id_usuario'])): ?>
              <a href="./src/pages/meu-painel/meu-painel.php" class="nav-link <?php echo ($pagina_atual === 'meu-painel.php') ? 'ativo' : ''; ?>">Meu Painel</a>
              <a href="./src/assets/php/logout.php" class="nav-link">Sair</a>
          <?php else: ?>
              <a href="./src/pages/login/index.php" class="nav-link <?php echo ($pagina_atual === 'login.php') ? 'ativo' : ''; ?>">Login</a>
              <a href="./src/pages/cadastrar/index.php" class="nav-link <?php echo ($pagina_atual === 'cadastro.php') ? 'ativo' : ''; ?>">Cadastrar</a>
          <?php endif; ?>
        </div>
      </div>
      <div class="cart">
        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png">
        <div class="cart-count icon-carrinho" id="cartCount">0</div>
      </div>
    </nav>  
  </header>