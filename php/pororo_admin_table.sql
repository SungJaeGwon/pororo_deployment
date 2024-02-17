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
-- 테이블 구조 `pororo_admin_table`
--

CREATE TABLE `pororo_admin_table` (
  `idx` int NOT NULL,
  `adminId` varchar(16) NOT NULL,
  `adminPw` varchar(16) NOT NULL,
  `adminName` varchar(50) NOT NULL,
  `adminEmail` varchar(250) DEFAULT NULL,
  `adminHp` varchar(13) DEFAULT NULL,
  `adminAddress` varchar(500) DEFAULT NULL,
  `adminBirth` varchar(10) NOT NULL,
  `adminGaib` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `pororo_admin_table`
--

INSERT INTO `pororo_admin_table` (`idx`, `adminId`, `adminPw`, `adminName`, `adminEmail`, `adminHp`, `adminAddress`, `adminBirth`, `adminGaib`) VALUES
(1, 'imadmin', 'imadmin1', 'imadmin', 'imadmin@naver.com', '010-6161-6161', '(04931) 서울 광진구 중곡동 118-38imadmin', '1909.08.08', '2024-01-31 07:50:50'),
(2, 'subAdmin', 'subAdmin1', 'subAdmin', 'subAdmin@naver.com', '010-1313-1313', '(24239) 강원특별자치도 춘천시 스포츠타운길433번길 4  (삼천동)스포츠맨', '1948.07.08', '2024-01-31 07:52:15'),
(3, 'mainAdmin', 'mainAdmin1', 'mainAdmin', 'mainAdmin@naver.com', '010-2255-2255', '(21576) 인천 남동구 남동대로667번길 75  (구월동)mainAdmin', '1961.12.12', '2024-01-31 07:59:07');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `pororo_admin_table`
--
ALTER TABLE `pororo_admin_table`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `pororo_admin_table`
--
ALTER TABLE `pororo_admin_table`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
