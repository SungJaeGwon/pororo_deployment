-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 24-02-17 17:14
-- 서버 버전: 8.0.36
-- PHP 버전: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `gksmf519`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `pororo_cart_table`
--

CREATE TABLE `pororo_cart_table` (
  `idx` int NOT NULL,
  `userId` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `제품코드` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `번호` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `이미지` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `제품명` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `할인율` double NOT NULL,
  `판매가` int DEFAULT NULL,
  `제품특징` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `제조사` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `배송` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `옵션` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `옵션상품목록` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `정가` int NOT NULL,
  `장바구니상품명` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `수량` int NOT NULL,
  `등록일` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `pororo_cart_table`
--

INSERT INTO `pororo_cart_table` (`idx`, `userId`, `제품코드`, `번호`, `이미지`, `제품명`, `할인율`, `판매가`, `제품특징`, `제조사`, `배송`, `옵션`, `옵션상품목록`, `정가`, `장바구니상품명`, `수량`, `등록일`) VALUES
(12, 'gamja', 'SUB1_01_04_032', 'SUB1_01_04_032', './images/sub/sub1/sub1_01_04_032.jpg', '띠띠뽀 무지개 버블건', 0.41, 7670, 'undefined', NULL, '택배', '단일상품', '[]', 13000, '띠띠뽀 무지개 버블건', 2, '2024-02-15 05:29:09'),
(10, 'karina', 'SUB1_01_04_022', 'SUB1_01_04_022', './images/sub/sub1/sub1_01_04_022.jpg', '크롱 이빨 룰렛', 0.4, 16800, 'undefined', NULL, '택배', '단일상품', '[]', 28000, '크롱 이빨 룰렛', 1, '2024-02-15 05:23:48'),
(11, 'gamja', 'SUB1_01_05_018', 'SUB1_01_05_018', './images/sub/sub1/sub1_01_05_018.jpg', '타요와 물속여행 보트튜브', 0.4, 33000, 'undefined', NULL, '택배', '단일상품', '[]', 55000, '타요와 물속여행 보트튜브', 2, '2024-02-15 05:28:52');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `pororo_cart_table`
--
ALTER TABLE `pororo_cart_table`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `userId` (`userId`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `pororo_cart_table`
--
ALTER TABLE `pororo_cart_table`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
