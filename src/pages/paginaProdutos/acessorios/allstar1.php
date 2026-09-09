<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

include('../../../assets/php/conexao.php');

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
<?php include('../../../assets/php/header.php'); ?>  
  <main class="container">
    <div class="product-details">
      <div class="product-gallery">
        <img src="../../../assets/img/acessorios/All star1.jpg" alt="All star" />
      </div>
      <div class="product-info">
        <h2 class="product-name" value="All Star converse preto">All Star converse preto</h2>
        <p class="product-code">Código do Produto: 98765XYZ</p>
        <p class="price">R$ <span>249,99</span></p>
        <p class="rating">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
            class="fas fa-star-half-alt"></i> 45 avaliações
        </p>
        <p class="product-description">
          Desde 1917, o Chuck Taylor All Star tem sido o ícone do dia a dia. Você já conhece os detalhes icônicos como o
          cabedal em lona de algodão, solado com padrão de diamante e a indistinguível biqueira de borracha. Finalizado
          com palmilha em EVA para ajudar a manter os pés confortáveis.
        </p>
        <div class="product-options">
          <label for="color">Cor:</label>
          <div class="btn-cores">
            <a class="btn-cor btn-cor-preto" href="allstar1.php">Preto</a>
            <a class="btn-cor btn-cor-vermelho" href="allstar2.php">Vermelho</a>
            <a class="btn-cor btn-cor-branco" href="allstar3.php">Branco</a>
          </div>
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
          <p><strong>Material :</strong> Lona de algodão</p>
          <p><strong>Material da sola:</strong> Borracha</p>
        </div>
      </div>
    </div>
  </main>
  <button id="modoEscuro">🌙</button>
  <div class="carrinho-lateral">
    <div class="carrinho-interno"></div>
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