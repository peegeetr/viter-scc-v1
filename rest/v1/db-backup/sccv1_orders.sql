-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 02:38 AM
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
-- Table structure for table `sccv1_orders`
--

CREATE TABLE `sccv1_orders` (
  `orders_aid` int(11) NOT NULL,
  `orders_number` varchar(20) NOT NULL,
  `orders_is_paid` tinyint(1) NOT NULL,
  `orders_is_discounted` varchar(20) NOT NULL,
  `orders_transaction_number` varchar(20) NOT NULL,
  `orders_is_draft` tinyint(1) NOT NULL,
  `orders_product_id` varchar(20) NOT NULL,
  `orders_stocks_id` varchar(20) NOT NULL,
  `orders_member_id` varchar(20) NOT NULL,
  `orders_product_quantity` varchar(20) NOT NULL,
  `orders_product_amount` varchar(20) NOT NULL,
  `orders_product_srp` varchar(20) NOT NULL,
  `orders_suplier_price` varchar(20) NOT NULL,
  `orders_date` varchar(20) NOT NULL,
  `orders_remarks` text NOT NULL,
  `orders_created` datetime NOT NULL,
  `orders_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_orders`
--

INSERT INTO `sccv1_orders` (`orders_aid`, `orders_number`, `orders_is_paid`, `orders_is_discounted`, `orders_transaction_number`, `orders_is_draft`, `orders_product_id`, `orders_stocks_id`, `orders_member_id`, `orders_product_quantity`, `orders_product_amount`, `orders_product_srp`, `orders_suplier_price`, `orders_date`, `orders_remarks`, `orders_created`, `orders_datetime`) VALUES
(1, 'ord-001', 1, '', '', 0, '17', '1', '14', '1', '22', '22', '20', '2023-06-27', '', '2023-07-27 10:23:40', '2023-07-31 12:13:04'),
(32, 'ord-005', 1, '', '', 0, '17', '1', '33', '1', '22', '22', '20', '2023-06-28', '', '2023-07-28 07:27:44', '2023-07-31 12:12:58'),
(34, 'ord-007', 1, '', '', 0, '17', '1', '33', '1', '22', '22', '20', '2023-06-28', '', '2023-07-28 11:31:01', '2023-07-31 12:13:13'),
(84, 'ord-018', 1, '', '', 0, '17', '6', '5', '1', '20', '20', '18', '2023-08-14', '', '2023-08-14 10:19:17', '2023-08-14 10:21:19'),
(101, 'ord-022', 0, '', '', 0, '23', '2', '33', '2', '420', '210', '200', '2023-09-21', '', '2023-09-21 13:41:36', '2023-09-21 13:52:34'),
(103, 'ord-024', 0, '', '', 0, '24', '8', '33', '1', '155', '155', '150', '2023-09-21', '', '2023-09-21 13:52:04', '2023-09-21 13:52:04'),
(110, 'ord-025', 0, '', '', 0, '28', '15', '33', '2', '13.08', '5.45', '5', '2023-09-26', '', '2023-09-26 09:24:59', '2023-09-26 15:37:15'),
(111, 'ord-026', 1, '0', '', 0, '28', '16', '33', '1', '6.54', '6.54', '6', '2023-09-26', '', '2023-09-26 10:17:59', '2023-09-26 12:08:26'),
(114, 'ord-027', 1, '', '', 0, '28', '16', '5', '1', '6.48', '6.48', '6', '2023-09-26', '', '2023-09-26 15:45:58', '2023-09-26 15:45:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_orders`
--
ALTER TABLE `sccv1_orders`
  ADD PRIMARY KEY (`orders_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_orders`
--
ALTER TABLE `sccv1_orders`
  MODIFY `orders_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
