-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2023 at 07:51 AM
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
-- Table structure for table `sccv1_blotter_or_invoice`
--

CREATE TABLE `sccv1_blotter_or_invoice` (
  `or_invoice_aid` int(11) NOT NULL,
  `or_invoice_is_official_receipt` tinyint(1) NOT NULL,
  `or_invoice_is_sales_invoice` tinyint(1) NOT NULL,
  `or_invoice_date` varchar(20) NOT NULL,
  `or_invoice_or_no` varchar(20) NOT NULL,
  `or_invoice_payee` varchar(20) NOT NULL,
  `or_invoice_amount` varchar(20) NOT NULL,
  `or_invoice_remarks` varchar(200) NOT NULL,
  `or_invoice_created` datetime NOT NULL,
  `or_invoice_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_blotter_or_invoice`
--
ALTER TABLE `sccv1_blotter_or_invoice`
  ADD PRIMARY KEY (`or_invoice_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_blotter_or_invoice`
--
ALTER TABLE `sccv1_blotter_or_invoice`
  MODIFY `or_invoice_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
