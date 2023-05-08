-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 09:44 AM
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
  `suppliers_products_market_price` varchar(20) NOT NULL,
  `suppliers_products_category_id` varchar(20) NOT NULL,
  `suppliers_products_suppliers_id` varchar(20) NOT NULL,
  `suppliers_products_created` datetime NOT NULL,
  `suppliers_products_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_suppliers_products`
--

INSERT INTO `sccv1_suppliers_products` (`suppliers_products_aid`, `suppliers_products_name`, `suppliers_products_number`, `suppliers_products_price`, `suppliers_products_scc_price`, `suppliers_products_market_price`, `suppliers_products_category_id`, `suppliers_products_suppliers_id`, `suppliers_products_created`, `suppliers_products_datetime`) VALUES
(5, 'alamang', 'prod-001', '80', '85', '90', '2', '1', '2023-04-24 16:48:33', '2023-05-08 11:54:26'),
(6, 'egg small', 'prod-002', '190', '195', '200', '1', '2', '2023-04-26 17:05:46', '2023-05-08 12:29:38'),
(7, 'egg medium', 'prod-003', '205', '210', '215', '1', '2', '2023-04-26 17:05:54', '2023-05-08 12:44:58'),
(8, 'egg large', 'prod-004', '230', '235', '240', '1', '2', '2023-05-08 11:51:29', '2023-05-08 12:24:04'),
(9, 'chili garlic paste', 'prod-005', '80', '85', '90', '2', '1', '2023-05-08 11:52:42', '2023-05-08 12:23:41'),
(10, 'kimchi', 'prod-006', '110', '115', '120', '2', '1', '2023-05-08 11:53:03', '2023-05-08 12:29:52'),
(11, 'dishwashing liquid', 'prod-007', '30', '35', '40', '3', '1', '2023-05-08 11:53:36', '2023-05-08 12:23:51'),
(13, 'walis ting-ting', 'prod-008', '25', '', '', '3', '1', '2023-05-08 13:57:31', '2023-05-08 13:57:31');

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
  MODIFY `suppliers_products_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
