-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2023 at 03:11 AM
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
-- Table structure for table `sccv1_suppliers_products`
--

CREATE TABLE `sccv1_suppliers_products` (
  `suppliers_products_aid` int(11) NOT NULL,
  `suppliers_products_name` varchar(100) NOT NULL,
  `suppliers_products_number` varchar(20) NOT NULL,
  `suppliers_products_price` varchar(50) NOT NULL,
  `suppliers_products_scc_price` varchar(20) NOT NULL,
  `suppliers_products_retail_price` varchar(20) NOT NULL,
  `suppliers_products_ws_retail_price` varchar(20) NOT NULL,
  `suppliers_products_ws_scc_price` varchar(20) NOT NULL,
  `suppliers_products_category_id` varchar(20) NOT NULL,
  `suppliers_products_suppliers_id` varchar(20) NOT NULL,
  `suppliers_products_member_percent` varchar(20) NOT NULL,
  `suppliers_products_retail_percent` varchar(20) NOT NULL,
  `suppliers_products_ws_member_percent` varchar(20) NOT NULL,
  `suppliers_products_ws_retail_percent` varchar(20) NOT NULL,
  `suppliers_products_is_other_percent` tinyint(1) NOT NULL,
  `suppliers_products_created` datetime NOT NULL,
  `suppliers_products_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_suppliers_products`
--

INSERT INTO `sccv1_suppliers_products` (`suppliers_products_aid`, `suppliers_products_name`, `suppliers_products_number`, `suppliers_products_price`, `suppliers_products_scc_price`, `suppliers_products_retail_price`, `suppliers_products_ws_retail_price`, `suppliers_products_ws_scc_price`, `suppliers_products_category_id`, `suppliers_products_suppliers_id`, `suppliers_products_member_percent`, `suppliers_products_retail_percent`, `suppliers_products_ws_member_percent`, `suppliers_products_ws_retail_percent`, `suppliers_products_is_other_percent`, `suppliers_products_created`, `suppliers_products_datetime`) VALUES
(15, 'egg-medium', 'prod-001', '200', '210', '215', '', '', '7', '3', '', '', '', '', 0, '2023-05-23 10:34:03', '2023-07-13 07:13:57'),
(16, 'egg-large', 'prod-002', '210', '215', '220', '', '', '7', '3', '', '', '', '', 0, '2023-05-23 10:34:20', '2023-07-12 14:23:05'),
(17, 'soap', 'prod-003', '18', '20', '23', '', '', '8', '4', '', '', '', '', 0, '2023-07-04 06:47:52', '2023-08-31 14:01:55'),
(18, 'diswashing', 'prod-004', '10', '12', '15', '', '', '8', '3', '', '', '', '', 0, '2023-07-04 06:48:41', '2023-07-12 14:22:38'),
(19, 'egg xl', 'prod-005', '200', '216', '218', '', '', '7', '4', '', '', '', '', 0, '2023-07-04 10:39:08', '2023-09-26 15:28:02'),
(20, 'egg medium', 'prod-006', '200', '205', '230', '', '', '7', '4', '', '', '', '', 0, '2023-07-05 09:00:03', '2023-07-13 09:14:05'),
(21, 'rice rice grain rice jasmine green red blue', 'prod-007', '500', '520', '', '', '', '7', '4', '', '', '', '', 0, '2023-07-05 10:01:58', '2023-07-17 12:03:55'),
(22, 'rices A', 'prod-008', '100', '105', '', '', '', '9', '3', '', '', '', '', 0, '2023-07-06 13:58:51', '2023-07-12 14:25:59'),
(23, 'rice B', 'prod-009', '200', '210', '', '', '', '9', '3', '', '', '', '', 0, '2023-07-06 13:59:14', '2023-07-06 13:59:14'),
(24, 'Rice C', 'prod-010', '150', '155', '', '', '', '9', '3', '', '', '', '', 0, '2023-07-06 13:59:31', '2023-07-12 14:25:14'),
(25, 'Rice D', 'prod-011', '', '', '', '', '', '9', '3', '', '', '', '', 0, '2023-07-06 13:59:43', '2023-07-13 07:17:53'),
(26, 'test', 'prod-012', '', '', '', '', '', '9', '4', '', '', '', '', 0, '2023-07-12 13:28:33', '2023-10-03 13:59:10'),
(27, 'egg', 'prod-013', '200', '205', '', '', '', '7', '4', '', '', '', '', 0, '2023-07-28 07:50:06', '2023-08-31 14:08:30'),
(28, 'sample', 'prod-014', '6', '6.48', '6.54', '', '', '9', '4', '', '', '', '', 0, '2023-09-21 09:43:43', '2023-09-26 10:10:38'),
(29, 'sampleOne', 'prod-015', '6', '6.54', '6.6', '', '', '7', '4', '', '', '', '', 0, '2023-09-26 14:59:40', '2023-10-03 12:56:13'),
(30, 'egg', 'prod-016', '12', '12.96', '13.08', '', '', '7', '3', '', '', '', '', 0, '2023-09-27 07:20:48', '2023-09-27 07:20:48'),
(32, 'Coke Mismo Default', 'prod-017', '15.5', '16.74', '16.895', '16.6625', '16.43', '8', '4', '8', '9', '6', '7.5', 0, '2023-10-03 14:02:36', '2023-10-03 14:02:36'),
(34, 'Coke Mismo', 'prod-018', '15.5', '17.67', '17.98', '17.825', '17.515', '8', '4', '14', '16', '13', '15', 1, '2023-10-03 14:09:08', '2023-10-03 15:02:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_suppliers_products`
--
ALTER TABLE `sccv1_suppliers_products`
  ADD PRIMARY KEY (`suppliers_products_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_suppliers_products`
--
ALTER TABLE `sccv1_suppliers_products`
  MODIFY `suppliers_products_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
