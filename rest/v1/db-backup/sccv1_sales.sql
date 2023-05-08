-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 09:43 AM
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
-- Table structure for table `sccv1_sales`
--

CREATE TABLE `sccv1_sales` (
  `sales_aid` int(11) NOT NULL,
  `sales_number` varchar(20) NOT NULL,
  `sales_is_paid` tinyint(1) NOT NULL,
  `sales_member_id` varchar(20) NOT NULL,
  `sales_order_id` varchar(20) NOT NULL,
  `sales_receive_amount` varchar(20) NOT NULL,
  `sales_or` varchar(50) NOT NULL,
  `sales_date` varchar(20) NOT NULL,
  `sales_created` datetime NOT NULL,
  `sales_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_sales`
--

INSERT INTO `sccv1_sales` (`sales_aid`, `sales_number`, `sales_is_paid`, `sales_member_id`, `sales_order_id`, `sales_receive_amount`, `sales_or`, `sales_date`, `sales_created`, `sales_datetime`) VALUES
(1, 'sales-001', 0, '2', '1', '', '', '', '2023-05-08 09:59:35', '2023-05-08 13:42:33'),
(3, 'sales-003', 1, '2', '3', '170', 'sf;asdufopiut', '2023-05-08', '2023-05-08 13:28:45', '2023-05-08 14:06:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_sales`
--
ALTER TABLE `sccv1_sales`
  ADD PRIMARY KEY (`sales_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_sales`
--
ALTER TABLE `sccv1_sales`
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
