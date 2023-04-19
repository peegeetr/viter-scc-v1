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
-- Table structure for table `sccv1_product`
--

CREATE TABLE `sccv1_product` (
  `product_aid` int(11) NOT NULL,
  `product_number` varchar(100) NOT NULL,
  `product_supplier_product_id` varchar(20) NOT NULL,
  `product_supplier_id` varchar(20) NOT NULL,
  `product_sold_quantity` varchar(20) NOT NULL,
  `product_scc_price` varchar(20) NOT NULL,
  `product_market_price` varchar(20) NOT NULL,
  `product_created` datetime NOT NULL,
  `product_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_product`
--

INSERT INTO `sccv1_product` (`product_aid`, `product_number`, `product_supplier_product_id`, `product_supplier_id`, `product_sold_quantity`, `product_scc_price`, `product_market_price`, `product_created`, `product_datetime`) VALUES
(1, 'Prod-001', '1', '1', '', '150', '200', '2023-04-19 16:33:55', '2023-04-19 16:33:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_product`
--
ALTER TABLE `sccv1_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_product`
--
ALTER TABLE `sccv1_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
