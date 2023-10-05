-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2023 at 03:08 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scc`
--

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_product_history`
--

CREATE TABLE `sccv1_product_history` (
  `product_history_aid` int(11) NOT NULL,
  `product_history_product_id` varchar(20) NOT NULL,
  `product_history_is_active` tinyint(1) NOT NULL,
  `product_history_date` varchar(20) NOT NULL,
  `product_history_price` varchar(20) NOT NULL,
  `product_history_scc_price` varchar(20) NOT NULL,
  `product_history_retail_price` varchar(20) NOT NULL,
  `product_history_ws_retail_price` varchar(20) NOT NULL,
  `product_history_ws_member_price` varchar(20) NOT NULL,
  `product_history_created` datetime NOT NULL,
  `product_history_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_product_history`
--

INSERT INTO `sccv1_product_history` (`product_history_aid`, `product_history_product_id`, `product_history_is_active`, `product_history_date`, `product_history_price`, `product_history_scc_price`, `product_history_retail_price`, `product_history_ws_retail_price`, `product_history_ws_member_price`, `product_history_created`, `product_history_datetime`) VALUES
(1, '20', 0, '2023-07-05 10:13:31', '210', '220', '', '', '', '2023-07-05 10:13:35', '2023-07-05 10:25:13'),
(2, '20', 0, '2023-07-05 10:25:26', '200', '210', '', '', '', '2023-07-05 10:25:31', '2023-07-13 09:13:47'),
(3, '19', 0, '2023-07-05 11:57:51', '200', '205', '', '', '', '2023-07-05 11:57:54', '2023-09-26 15:27:32'),
(4, '22', 0, '2023-07-06 13:58:51', '100', '105', '', '', '', '2023-07-06 13:58:51', '2023-07-12 14:25:53'),
(5, '23', 1, '2023-07-06 13:59:14', '200', '210', '', '', '', '2023-07-06 13:59:14', '2023-07-06 13:59:14'),
(6, '24', 0, '2023-07-06 13:59:31', '150', '155', '', '', '', '2023-07-06 13:59:31', '2023-07-12 14:25:08'),
(7, '25', 0, '2023-07-06 13:59:43', '250', '260', '', '', '', '2023-07-06 13:59:43', '2023-07-13 07:17:53'),
(12, '18', 1, '2023-07-12 14:22:33', '10', '12', '', '', '', '2023-07-12 14:22:38', '2023-07-12 14:22:38'),
(13, '16', 1, '2023-07-12 14:22:59', '210', '215', '', '', '', '2023-07-12 14:23:05', '2023-07-12 14:23:05'),
(14, '15', 1, '2023-07-12 14:23:14', '200', '210', '', '', '', '2023-07-12 14:23:21', '2023-07-13 07:13:57'),
(15, '21', 1, '2023-07-12 14:23:43', '500', '520', '', '', '', '2023-07-12 14:23:48', '2023-07-12 14:23:48'),
(16, '17', 0, '2023-07-12 14:24:30', '20', '22', '', '', '', '2023-07-12 14:24:33', '2023-07-31 12:18:20'),
(17, '24', 1, '2023-07-12 14:25:09', '150', '155', '', '', '', '2023-07-12 14:25:14', '2023-07-12 14:25:14'),
(19, '22', 1, '2023-07-12 14:25:54', '100', '105', '', '', '', '2023-07-12 14:25:59', '2023-07-12 14:25:59'),
(21, '20', 1, '2023-07-13 09:13:48', '200', '205', '', '', '', '2023-07-13 09:14:05', '2023-07-13 09:14:05'),
(22, '27', 1, '2023-07-28 07:50:06', '200', '205', '', '', '', '2023-07-28 07:50:06', '2023-08-31 14:08:30'),
(27, '17', 1, '2023-07-31', '18', '20', '', '', '', '2023-07-31 12:20:55', '2023-08-31 14:01:55'),
(28, '27', 0, '2023-08-31', '201', '206', '', '', '', '2023-08-31 13:59:13', '2023-08-31 14:08:22'),
(29, '28', 0, '2023-09-21 09:43:43', '5', '5.4', '5.45', '', '', '2023-09-21 09:43:43', '2023-09-26 10:10:26'),
(30, '28', 0, '2023-09-21', '20', '21.6', '21.8', '', '', '2023-09-21 10:08:20', '2023-09-21 10:08:32'),
(31, '28', 1, '2023-09-26', '6', '6.48', '6.54', '', '', '2023-09-26 10:10:38', '2023-09-26 10:10:38'),
(32, '29', 1, '2023-09-26 14:59:40', '6', '6.54', '6.6', '', '', '2023-09-26 14:59:40', '2023-09-26 14:59:40'),
(33, '19', 1, '2023-09-26', '200', '216', '218', '', '', '2023-09-26 15:28:02', '2023-09-26 15:28:02'),
(34, '30', 1, '2023-09-27 07:20:48', '12', '12.96', '13.08', '', '', '2023-09-27 07:20:48', '2023-09-27 07:20:48'),
(36, '32', 1, '2023-10-03 14:02:36', '15.5', '16.74', '16.895', '16.6625', '16.43', '2023-10-03 14:02:36', '2023-10-03 14:02:36'),
(38, '34', 0, '2023-10-03', '15.5', '17.67', '17.98', '17.825', '17.515', '2023-10-03 14:09:08', '2023-10-03 14:49:02'),
(39, '34', 0, '2023-10-03', '15.5', '16.74', '16.895', '16.6625', '16.43', '2023-10-03 15:00:59', '2023-10-03 15:01:10'),
(40, '34', 1, '2023-10-04', '15.5', '17.67', '17.98', '17.825', '17.515', '2023-10-03 15:02:20', '2023-10-03 15:02:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_product_history`
--
ALTER TABLE `sccv1_product_history`
  ADD PRIMARY KEY (`product_history_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_product_history`
--
ALTER TABLE `sccv1_product_history`
  MODIFY `product_history_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
