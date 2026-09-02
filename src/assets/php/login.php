<?php
session_start();
include('conexao.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];

    // Busca o usuário pelo e-mail
    $sql = "SELECT id_usuario, nome_completo, senha_segura FROM usuarios WHERE email = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($usuario = $resultado->fetch_assoc()) {
        // Valida a senha do usuário existente
        if (password_verify($senha, $usuario['senha_segura'])) {
            $_SESSION['id_usuario']   = $usuario['id_usuario'];
            $_SESSION['nome_usuario'] = $usuario['nome_completo'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];

            header("Location: ../../../index.php");
            exit();
        } else {
            // Usuário existe, porém a senha está errada
            header("Location: ../pages/login.php?erro=senha_incorreta");
            exit();
        }
    } else {
        // E-mail não encontrado no banco de dados
        header("Location: ../pages/login.php?erro=nao_cadastrado");
        exit();
    }

    $stmt->close();
    $conexao->close();
}
?>