<?php
$servidor = "localhost";
$usuario = "root";
$senha = "senac";
$banco = "click-n-rock";
$conexao = new mysqli($servidor, $usuario, $senha, $banco, 3307);

if($conexao -> connect_error){
    die("Erro: ". $conexao -> connect_error);
}

?>