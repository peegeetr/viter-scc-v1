-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2023 at 01:10 AM
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
  `orders_product_id` varchar(20) NOT NULL,
  `orders_member_id` varchar(20) NOT NULL,
  `orders_or` varchar(100) NOT NULL,
  `orders_product_quantity` varchar(20) NOT NULL,
  `orders_product_amount` varchar(20) NOT NULL,
  `orders_date` varchar(20) NOT NULL,
  `orders_created` datetime NOT NULL,
  `orders_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_orders`
--

INSERT INTO `sccv1_orders` (`orders_aid`, `orders_number`, `orders_product_id`, `orders_member_id`, `orders_or`, `orders_product_quantity`, `orders_product_amount`, `orders_date`, `orders_created`, `orders_datetime`) VALUES
(1, 'order-001', '5', '2', '1236547989', '2', '', '2023-04-19', '2023-04-19 16:38:51', '2023-04-19 16:38:51');

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
  MODIFY `orders_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
