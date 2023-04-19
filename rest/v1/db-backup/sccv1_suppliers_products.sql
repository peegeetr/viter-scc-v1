-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2023 at 10:37 AM
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
  `suppliers_products_price` varchar(50) NOT NULL,
  `suppliers_products_category_id` varchar(20) NOT NULL,
  `suppliers_products_suppliers_id` varchar(20) NOT NULL,
  `suppliers_products_created` datetime NOT NULL,
  `suppliers_products_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_suppliers_products`
--

INSERT INTO `sccv1_suppliers_products` (`suppliers_products_aid`, `suppliers_products_name`, `suppliers_products_price`, `suppliers_products_category_id`, `suppliers_products_suppliers_id`, `suppliers_products_created`, `suppliers_products_datetime`) VALUES
(1, 'rices', '10', '2', '1', '2023-04-19 16:33:26', '2023-04-19 16:33:26'),
(2, 'oil', '20', '1', '1', '2023-04-19 16:33:42', '2023-04-19 16:33:42');

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
  MODIFY `suppliers_products_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
