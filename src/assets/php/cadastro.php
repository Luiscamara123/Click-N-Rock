<?php
    include('conexao.php');
    # Captura os dados do formulário de cadastro
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $nascimento = $_POST['nascimento'];
    $senha = $_POST['senha'];
    # Valida os dados vazios
    if(empty($nome) || empty($email) || empty($senha) || empty($nascimento)){
        echo"<p>Preencha todos os campos!</p>"; exit(); }
    # Aplica criptografia na senha
    $senha_segura = password_hash($senha, PASSWORD_DEFAULT);
    # Cria comando SQL de inserção usando Prepared Statements (Seguro)
    $stmt = $conexao->prepare("INSERT INTO usuarios (nome, email, nascimento, genero, cpf, cep, senha_segura) VALUES (?, ?, ?, ?, ?, ?, ?)");
    # "sssssss" indica que os 7 parâmetros são strings
    $stmt->bind_param("sssssss", $nome, $email, $nascimento, $genero, $cpf, $cep, $senha_segura);
    # Executa o comando
    if($stmt->execute()){
        # Redireciona o usuário para a página de login após o cadastro
        header("Location: ../pages/login.html");
    } else { echo "Erro ao cadastrar: " . $conexao->error;}
    $stmt->close();
    $conexao->close();
?>