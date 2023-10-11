-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 11 Paź 2023, 16:47
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `proxyvinted`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` tinyint(11) NOT NULL,
  `name` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(0, 'user'),
(1, 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `searchquery`
--

CREATE TABLE `searchquery` (
  `id` int(11) NOT NULL,
  `user` int(255) NOT NULL,
  `searchText` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `order` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `catalogIDs` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `brandIDs` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `sizeIDs` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `materialIDs` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `videoGameRatingIDs` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `statusIDs` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `isForSwap` tinyint(1) NOT NULL,
  `page` int(11) NOT NULL,
  `perPage` int(11) NOT NULL,
  `isFavourite` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user` varchar(8192) COLLATE utf8_polish_ci NOT NULL,
  `password` varchar(8192) COLLATE utf8_polish_ci NOT NULL,
  `role` tinyint(4) DEFAULT NULL,
  `isBanned` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `searchquery`
--
ALTER TABLE `searchquery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_rules` (`role`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `roles`
--
ALTER TABLE `roles`
  MODIFY `id` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `searchquery`
--
ALTER TABLE `searchquery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `searchquery`
--
ALTER TABLE `searchquery`
  ADD CONSTRAINT `searchquery_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Ograniczenia dla tabeli `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_rules` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
