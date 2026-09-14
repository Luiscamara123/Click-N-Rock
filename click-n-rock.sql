-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Tempo de geração: 14/09/2026 às 19:07
-- Versão do servidor: 8.0.44
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `click-n-rock`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id_produto` int NOT NULL,
  `img_produto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_produto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `preco_produto` int NOT NULL,
  `categoria_produto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao_produto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo_produto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Prefiro não dizer') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Prefiro não dizer',
  `cpf` varchar(20) NOT NULL,
  `cep` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha_segura` varchar(2500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tipo_usuario` enum('admin','moderador','usuário') NOT NULL DEFAULT 'usuário'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome_completo`, `data_nascimento`, `genero`, `cpf`, `cep`, `email`, `senha_segura`, `tipo_usuario`) VALUES
(1, 'Lucas Camilo', '1995-11-28', 'Masculino', '98765432110', '4578910', 'lucas.6161@df.senac.br', '$2y$10$7aLum3PSA5Nqjpf3UU1Mc.k.t7TDPLMGRcp2szI9HMO6miGaHs9M6', 'admin'),
(4, 'Luis felipe Camara Alcantara', '2008-10-26', 'Masculino', '09063130155', '72738001', 'luis.alcantaracamra@gmail.com', '$2y$10$qFGpgmG4B03M6LiduXghK.VUcgFz2qVBv..riMqsmXaM9WRCkjlNe', 'usuário'),
(6, 'Bryan Willian', '2008-07-11', 'Masculino', '98765432102', '4578910', 'bryan@gmail.com', '$2y$10$kKLzG1xAc.yXB/0QpzwA2.6PL1jP.ac8ojq2UQQEmRc/6kXP/sTHK', 'usuário'),
(9, 'Bryan Willian', '2008-07-11', 'Masculino', '98765432222', '4578910', 'bryan2@gmail.com', '$2y$10$7uaO7FZHV8Y8vqjdIqGdDu1/T9jcVPkeOGbNR1fZT4zFjVFIjcTCm', 'usuário'),
(10, 'Mauricio Alves', '2008-12-30', 'Masculino', '33855623331', '4578910', 'mauricio@gmail.com', '$2y$10$UFBG7OKY.mB9Qi9zFIZQbeqnaaDpog6PkivZgHIvhsrH4LbXd9ct.', 'usuário'),
(11, 'Anny', '2008-07-03', 'Feminino', '09030143677', '4578910', 'anny@gmail.com', '$2y$10$hQISt41U2OxZ75VptOUkjOEAdb0.lYL4YQcelvRIaQvzBuU9UnLqu', 'usuário');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id_produto`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id_produto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
