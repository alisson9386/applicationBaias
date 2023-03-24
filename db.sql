-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.31 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para application_baias
CREATE DATABASE IF NOT EXISTS `application_baias` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `application_baias`;

-- Copiando estrutura para tabela application_baias.baia
CREATE TABLE IF NOT EXISTS `baia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `andar` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `fl_ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela application_baias.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `periodo_inicio` datetime NOT NULL,
  `periodo_fim` datetime NOT NULL,
  `id_usuario_reserva` int NOT NULL,
  `id_baia_reserva` int NOT NULL,
  `fl_ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_usuario_reserva` (`id_usuario_reserva`),
  KEY `id_baia_reserva` (`id_baia_reserva`),
  CONSTRAINT `FK_reservas_baia` FOREIGN KEY (`id_baia_reserva`) REFERENCES `baia` (`id`),
  CONSTRAINT `FK_reservas_usuario` FOREIGN KEY (`id_usuario_reserva`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela application_baias.setores
CREATE TABLE IF NOT EXISTS `setores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_gerente` int NOT NULL,
  `nome_setor` varchar(255) NOT NULL,
  `fl_ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_gerente` (`id_gerente`),
  CONSTRAINT `FK_setores_usuario` FOREIGN KEY (`id_gerente`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela application_baias.tipo_usuarios
CREATE TABLE IF NOT EXISTS `tipo_usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  `fl_ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela application_baias.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idade` int NOT NULL,
  `tipo_user` int NOT NULL,
  `setor_user` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fl_ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `tipo_user` (`tipo_user`),
  KEY `setor_user` (`setor_user`),
  CONSTRAINT `FK_usuario_setores` FOREIGN KEY (`setor_user`) REFERENCES `setores` (`id`),
  CONSTRAINT `FK_usuario_tipo_usuarios` FOREIGN KEY (`tipo_user`) REFERENCES `tipo_usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
