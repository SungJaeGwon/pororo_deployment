-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 24-02-17 17:13
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
-- 테이블 구조 `pororo_table`
--

CREATE TABLE `pororo_table` (
  `userId` varchar(16) NOT NULL,
  `userPw` varchar(16) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userAddress` varchar(250) DEFAULT NULL,
  `userHp` varchar(13) NOT NULL,
  `userEmail` varchar(250) NOT NULL,
  `userBirth` varchar(10) NOT NULL,
  `userRecommend` varchar(16) NOT NULL,
  `userService` varchar(250) DEFAULT NULL,
  `userSignInDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `pororo_table`
--

INSERT INTO `pororo_table` (`userId`, `userPw`, `userName`, `userAddress`, `userHp`, `userEmail`, `userBirth`, `userRecommend`, `userService`, `userSignInDate`) VALUES
('gamja', 'gamja123', '감자탕', '(31812) 충남 당진시 합덕읍 감자마을1길 12 13-66', '010-9965-4607', 'gamja@naver.com', '1994.09.12', 'soondae', '[필수] 이용약관 동의,[필수] 개인정보 수집 및 이용 동의,[선택] 개인정보 제3자 제공 동의,[선택] SMS 수신 동의,[선택] 이메일 수신 동의', '2023-12-18 06:11:49'),
('karina', 'karina12', '카리나', '(12407) 경기 가평군 북면 카이저길 25 카이저빌딩 A동 1705호', '010-7410-7410', 'karina@naver.com', '1994.09.12', 'ningning', '[필수] 이용약관 동의,[필수] 개인정보 수집 및 이용 동의,[선택] 개인정보 제3자 제공 동의,[선택] SMS 수신 동의,[선택] 이메일 수신 동의', '2023-12-18 06:42:43'),
('zizel', 'zizel123', '지젤', '(17821) 경기 평택시 고덕면 지제로 175 종이마을 3번출구', '010-9630-9630', 'zizel@naver.com', '2002.08.15', 'karina', '[필수] 이용약관 동의,[필수] 개인정보 수집 및 이용 동의,[선택] 개인정보 제3자 제공 동의,[선택] SMS 수신 동의,[선택] 이메일 수신 동의', '2023-12-18 06:44:28'),
('winter', 'winter12', '윈터', '(08523) 서울 금천구 시흥대로123길 7  (독산동) 123e4', '010-4565-4565', 'winter@naver.com', '2000.12.20', 'zizel', '[필수] 이용약관 동의,[필수] 개인정보 수집 및 이용 동의,[선택] 개인정보 제3자 제공 동의,[선택] SMS 수신 동의,[선택] 이메일 수신 동의', '2023-12-18 06:53:52'),
('dooly', 'dooly12345', '둘리', '(07530) 서울 강서구 가양동 150-27 가양빌라 302호', '010-6545-6545', 'dooly@naver.com', '1986.06.08', '', '[필수] 뷰티포인트 서비스 이용 약관,[필수] 개인정보 이용 및 수집에 대한 동의,[필수] 개인정보 제3자 제공 동의 (이니스프리),[선택] 개인정보 제 3자 제공 동의,[선택] 국외 이전 동의,[선택] 뷰티포인트 문자 수신 동의,[필수] 이니스프리 서비스 이용약관,[필수] 개인정보 수집 및 이용 동의 (이니스프리),[선택] 개인정보 수집 및 이용동의 (마케팅)(이니스프리),[선택] 이니스프리  문자 수신 동의', '2023-12-21 06:04:14'),
('mangch', 'mangch12', '최망치', '(53329) 경남 거제시 일운면 망치1길 2 쇠망치', '010-7687-7687', 'mangch@naver.com', '1999.09.09', ' ', '[필수] 이용약관 동의,[필수] 개인정보 수집 및 이용 동의,[선택] 개인정보 제3자 제공 동의,[선택] SMS 수신 동의,[선택] 이메일 수신 동의', '2024-01-05 15:20:59'),
('pobi', 'pobi1234', '포비', '(03617) 서울 서대문구 홍제동 285-14포비는 착해', '010-4684-4684', 'pobi@naver.com', '1903.03.03', '', '[필수] 개인정보 수집 및 이용 동의,[필수] 이용약관 동의', '2024-01-06 07:42:29'),
('tower', 'tower123', 'tower', '(22013) 인천 연수구 인천타워대로 지하 57  (송도동)12ㅈㄷ', '010-3131-3131', 'tower@naver.com', '1912.12.12', 'karina', '[필수] 이용약관 동의,[필수] 개인정보 수집 및 이용 동의,[선택] 개인정보 제3자 제공 동의,[선택] SMS 수신 동의,[선택] 이메일 수신 동의', '2024-02-15 10:44:24');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `pororo_table`
--
ALTER TABLE `pororo_table`
  ADD PRIMARY KEY (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
