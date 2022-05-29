-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 29, 2022 alle 15:34
-- Versione del server: 10.4.18-MariaDB
-- Versione PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thezone`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `like_post`
--

CREATE TABLE `like_post` (
  `username_like` varchar(25) NOT NULL,
  `id_post` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `like_post`
--

INSERT INTO `like_post` (`username_like`, `id_post`) VALUES
('moh', 0),
('Skskni', 0),
('Spread_moff', 0),
('Maru456', 0),
('bella', 0),
('Fede', 0),
('Fede', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `id_post` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `titolo` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `img` varchar(100) NOT NULL,
  `n_like` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`id_post`, `username`, `titolo`, `data`, `img`, `n_like`) VALUES
(0, 'Spread_moff', 'uno dei miei artisti preferiti', '2022-05-29', 'https://media.giphy.com/media/l46CcjdThguMPrBPW/source.gif', 2),
(0, 'Simo', 'applausi', '2022-05-29', 'https://media.giphy.com/media/5xaOcLDE64VMF4LqqrK/source.gif', 2),
(0, 'Fede', 'bhu', '2022-05-29', 'https://media.giphy.com/media/26BkNIqbzQIXdUi08/source.gif', 2),
(0, 'Fede', 'be quiet bruh!!', '2022-05-29', 'https://media.giphy.com/media/26FPKYByTatOXrDeE/source.gif', 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `segui`
--

CREATE TABLE `segui` (
  `utente1` varchar(24) NOT NULL,
  `utente2` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `segui`
--

INSERT INTO `segui` (`utente1`, `utente2`) VALUES
('imane73', 'gerod'),
('gerod', 'imane73'),
('fatimuccia23', 'imane73'),
('imane73', 'fatimuccia23'),
('fatimuccia23', 'gerod'),
('Spread_moff', 'gerod'),
('Spread_moff', 'Bella');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `nome` varchar(24) NOT NULL,
  `cognome` varchar(24) NOT NULL,
  `data` date NOT NULL,
  `email` varchar(24) NOT NULL,
  `username` varchar(24) NOT NULL,
  `password` varchar(24) NOT NULL,
  `immagine` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`nome`, `cognome`, `data`, `email`, `username`, `password`, `immagine`) VALUES
('Iman', 'Raoudi', '2004-03-27', 'imaneraoudi1234@outlook.', 'Bella', 'imane.123', 'img/5eb7f3463a0556.01946772.jpg'),
('Enza', 'Fatima', '2000-09-20', 'fatima@gmail.com', 'fatimuccia23', '123456', 'img/peace.jpg'),
('Federico', 'spinazzola', '1998-04-25', 'fede@gmail.com', 'Fede', 'Fede.123', 'img/bella.jpg'),
('Gero', 'Messana', '1995-08-15', 'messanc15@gmail.com', 'gerod', '1234', 'img/nofoto.jfif'),
('Marouane', 'Raoudi', '1995-08-15', 'marouanraoudi67@gmail.co', 'imane73', '123', ''),
('Marouane', 'Raoudi', '2022-05-27', 'maru@gmail.fr', 'Maru456', '123456.78', 'img/monkey.jpg'),
('Mohamed', 'Ghob', '1998-05-30', 'mohamed123@gmail.com', 'moh', 'Mohamed.123', 'img/5eb7f3463a0556.01946772.jpg'),
('Simone', 'Caruso', '2022-05-29', 'Simone@gmail.com', 'Simo', '123456789', 'img/download.jfif'),
('Otmane', 'Raoudi', '1999-10-16', 'Otmane@gmail.com', 'Skskni', 'Otmane', 'img/ice.jfif'),
('pippo', 'spread', '1998-02-20', 'Spread@gmail.com', 'Spread_moff', '123456', 'img/simo.jpg');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `like_post`
--
ALTER TABLE `like_post`
  ADD KEY `id_post` (`id_post`),
  ADD KEY `like_post_ibfk_2` (`username_like`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD KEY `post_ibfk_1` (`username`);

--
-- Indici per le tabelle `segui`
--
ALTER TABLE `segui`
  ADD KEY `utente1` (`utente1`),
  ADD KEY `utente2` (`utente2`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`username`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`username`) REFERENCES `utente` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `segui`
--
ALTER TABLE `segui`
  ADD CONSTRAINT `segui_ibfk_1` FOREIGN KEY (`utente1`) REFERENCES `utente` (`username`),
  ADD CONSTRAINT `segui_ibfk_2` FOREIGN KEY (`utente2`) REFERENCES `utente` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
