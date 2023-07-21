-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2023 at 08:11 AM
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
-- Table structure for table `sccv1_capital_amortization`
--

CREATE TABLE `sccv1_capital_amortization` (
  `capital_amortization_aid` int(11) NOT NULL,
  `capital_amortization_member_id` varchar(20) NOT NULL,
  `capital_amortization_date` varchar(20) NOT NULL,
  `capital_amortization_amount` varchar(20) NOT NULL,
  `capital_amortization_amount_dividend` varchar(20) NOT NULL,
  `capital_amortization_amount_patronage` varchar(20) NOT NULL,
  `capital_amortization_remarks` varchar(200) NOT NULL,
  `capital_amortization_is_active` tinyint(1) NOT NULL,
  `capital_amortization_created` datetime NOT NULL,
  `capital_amortization_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_capital_amortization`
--
ALTER TABLE `sccv1_capital_amortization`
  ADD PRIMARY KEY (`capital_amortization_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_capital_amortization`
--
ALTER TABLE `sccv1_capital_amortization`
  MODIFY `capital_amortization_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
