<?php
    include('conexao.php');
    # Captura e limpa os dados do formulário
    $nome = trim($_POST['nomeCompleto']);
    $nascimento = $_POST['nascimento'];
    $genero = $_POST['genero'];
    $cpf = $_POST['cpf'];
    $cep = $_POST['cep'];
    $email = $_POST['email'];
    $senha1 = $_POST['senha'];
    $senha2 = $_POST['confirmaSenha'];

    # Validação de campos vazios
    if (empty($nome) || empty($nascimento) || empty($genero) || empty($cpf) || empty($cep) || empty($email) || empty($senha1) || empty($senha2)) {
        echo "<p>Preencha todos os campos corretamente!</p>";
        exit();
    }

    # Validação das senhas
    if ($senha1 !== $senha2) {
        echo "<p>As senhas não correspondem.</p>";
        exit();
    }

    # Criptografia da senha do usuário
    $senha_segura = password_hash($senha1, PASSWORD_DEFAULT);
    # Aplica criptografia na senha
    # Cria comando SQL de inserção usando Prepared Statements (Seguro)
    $stmt = $conexao->prepare("INSERT INTO usuarios (nome_completo, email, data_nascimento, genero, cpf, cep, senha_segura) VALUES (?, ?, ?, ?, ?, ?, ?)");
    # "sssssss" indica que os 7 parâmetros são strings
    $stmt->bind_param("sssssss", $nome, $email, $nascimento, $genero, $cpf, $cep, $senha_segura);
    # Executa o comando
    if($stmt->execute()){
        # Redireciona o usuário para a página de login após o cadastro
        header("Location: ../../pages/login/index.php");
    } else { echo "Erro ao cadastrar: " . $conexao->error;}
    $stmt->close();
    $conexao->close();
?>