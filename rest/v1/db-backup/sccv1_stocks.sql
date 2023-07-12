-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 09:50 AM
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
-- Table structure for table `sccv1_stocks`
--

CREATE TABLE `sccv1_stocks` (
  `stocks_aid` int(11) NOT NULL,
  `stocks_is_pending` tinyint(1) NOT NULL,
  `stocks_number` varchar(100) NOT NULL,
  `stocks_product_id` varchar(20) NOT NULL,
  `stocks_or` varchar(50) NOT NULL,
  `stocks_date` varchar(20) NOT NULL,
  `stocks_quantity` varchar(20) NOT NULL,
  `stocks_suplier_price_history_id` varchar(20) NOT NULL,
  `stocks_remarks` varchar(200) NOT NULL,
  `stocks_created` datetime NOT NULL,
  `stocks_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_stocks`
--

INSERT INTO `sccv1_stocks` (`stocks_aid`, `stocks_is_pending`, `stocks_number`, `stocks_product_id`, `stocks_or`, `stocks_date`, `stocks_quantity`, `stocks_suplier_price_history_id`, `stocks_remarks`, `stocks_created`, `stocks_datetime`) VALUES
(1, 0, 'stc-001', '15', 'dfgh', '2023-06-20 13:46:57', '5', '14', 'test', '2023-06-20 13:47:05', '2023-06-20 13:47:08'),
(2, 0, 'stc-002', '17', 'ere', '2023-07-04 10:31:04', '10', '16', 'test', '2023-07-04 10:31:12', '2023-07-04 10:31:15'),
(3, 0, 'stc-003', '18', 'dfgh', '2023-07-04 10:31:17', '12', '12', 'sadsa', '2023-07-04 10:31:26', '2023-07-04 10:31:29'),
(4, 0, 'stc-004', '19', 'fghjfgh', '2023-07-04 10:39:26', '5', '3', 'test', '2023-07-04 10:39:37', '2023-07-04 10:39:42'),
(6, 0, 'stc-005', '20', 'xcv', '2023-07-05 09:43:59', '5', '1', 'xzcv', '2023-07-05 09:44:04', '2023-07-05 09:44:07'),
(7, 0, 'stc-006', '19', 'vbncvbn', '2023-07-05 11:57:25', '2', '3', '23423', '2023-07-05 11:57:31', '2023-07-06 14:01:12'),
(8, 0, 'stc-007', '22', 'xvcxbvn', '2023-07-06 13:59:50', '5', '4', 'test', '2023-07-06 14:00:02', '2023-07-06 14:01:15'),
(9, 0, 'stc-008', '25', 'fghjfghj', '2023-07-06 14:00:04', '5', '7', 'gds', '2023-07-06 14:00:11', '2023-07-06 14:01:18'),
(10, 0, 'stc-009', '24', 'cvbncbn', '2023-07-06 14:00:12', '5', '6', 'fdg', '2023-07-06 14:00:21', '2023-07-06 14:00:41'),
(11, 0, 'stc-010', '23', 'cvbn', '2023-07-06 14:00:23', '5', '5', 'sdf', '2023-07-06 14:00:31', '2023-07-06 14:00:37'),
(12, 0, 'stc-011', '20', 'xcvb', '2023-07-12 07:42:49', '3', '2', 'test', '2023-07-12 07:42:59', '2023-07-12 07:44:40'),
(13, 1, 'stc-012', '23', '', '2023-07-12 14:04:24', '1', '5', '12', '2023-07-12 14:05:56', '2023-07-12 14:05:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  ADD PRIMARY KEY (`stocks_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  MODIFY `stocks_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
