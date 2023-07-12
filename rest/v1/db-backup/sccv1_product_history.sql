-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 09:47 AM
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
  `product_history_created` datetime NOT NULL,
  `product_history_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_product_history`
--

INSERT INTO `sccv1_product_history` (`product_history_aid`, `product_history_product_id`, `product_history_is_active`, `product_history_date`, `product_history_price`, `product_history_scc_price`, `product_history_created`, `product_history_datetime`) VALUES
(1, '20', 0, '2023-07-05 10:13:31', '210', '', '2023-07-05 10:13:35', '2023-07-05 10:25:13'),
(2, '20', 1, '2023-07-05 10:25:26', '200', '', '2023-07-05 10:25:31', '2023-07-06 13:57:58'),
(3, '19', 1, '2023-07-05 11:57:51', '200', '', '2023-07-05 11:57:54', '2023-07-06 13:57:52'),
(4, '22', 0, '2023-07-06 13:58:51', '100', '', '2023-07-06 13:58:51', '2023-07-12 14:25:53'),
(5, '23', 1, '2023-07-06 13:59:14', '200', '', '2023-07-06 13:59:14', '2023-07-06 13:59:14'),
(6, '24', 0, '2023-07-06 13:59:31', '150', '', '2023-07-06 13:59:31', '2023-07-12 14:25:08'),
(7, '25', 0, '2023-07-06 13:59:43', '250', '', '2023-07-06 13:59:43', '2023-07-12 14:25:25'),
(8, '26', 0, '2023-07-12 13:28:33', '10', '15', '2023-07-12 13:28:33', '2023-07-12 13:32:12'),
(9, '26', 1, '2023-07-12 13:33:10', '15', '20', '2023-07-12 13:33:36', '2023-07-12 14:23:56'),
(12, '18', 1, '2023-07-12 14:22:33', '10', '12', '2023-07-12 14:22:38', '2023-07-12 14:22:38'),
(13, '16', 1, '2023-07-12 14:22:59', '210', '215', '2023-07-12 14:23:05', '2023-07-12 14:23:05'),
(14, '15', 1, '2023-07-12 14:23:14', '200', '210', '2023-07-12 14:23:21', '2023-07-12 14:23:21'),
(15, '21', 1, '2023-07-12 14:23:43', '500', '520', '2023-07-12 14:23:48', '2023-07-12 14:23:48'),
(16, '17', 1, '2023-07-12 14:24:30', '20', '22', '2023-07-12 14:24:33', '2023-07-12 14:24:33'),
(17, '24', 1, '2023-07-12 14:25:09', '150', '155', '2023-07-12 14:25:14', '2023-07-12 14:25:14'),
(18, '25', 1, '2023-07-12 14:25:28', '250', '260', '2023-07-12 14:25:38', '2023-07-12 14:25:38'),
(19, '22', 1, '2023-07-12 14:25:54', '100', '105', '2023-07-12 14:25:59', '2023-07-12 14:25:59');

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
  MODIFY `product_history_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
