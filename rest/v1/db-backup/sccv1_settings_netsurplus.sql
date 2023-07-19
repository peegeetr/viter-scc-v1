-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2023 at 12:57 AM
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
-- Table structure for table `sccv1_settings_netsurplus`
--

CREATE TABLE `sccv1_settings_netsurplus` (
  `net_surplus_aid` int(11) NOT NULL,
  `net_surplus_year` varchar(20) NOT NULL,
  `net_surplus_before_amount` varchar(20) NOT NULL,
  `net_surplus_distribution_amount` varchar(20) NOT NULL,
  `net_surplus_operating_expenses` varchar(20) NOT NULL,
  `net_surplus_total_income` varchar(20) NOT NULL,
  `net_surplus_general_reserve` varchar(20) NOT NULL,
  `net_surplus_general_reserve_rate` varchar(20) NOT NULL,
  `net_surplus_educ_training` varchar(20) NOT NULL,
  `net_surplus_educ_training_rate` varchar(20) NOT NULL,
  `net_surplus_community_dev` varchar(20) NOT NULL,
  `net_surplus_community_dev_rate` varchar(20) NOT NULL,
  `net_surplus_optional_fund` varchar(20) NOT NULL,
  `net_surplus_optional_fund_rate` varchar(20) NOT NULL,
  `net_surplus_allocation` varchar(20) NOT NULL,
  `net_surplus_dividend` varchar(20) NOT NULL,
  `net_surplus_dividend_rate` varchar(20) NOT NULL,
  `net_surplus_patronage_refund` varchar(20) NOT NULL,
  `net_surplus_patronage_rate` varchar(20) NOT NULL,
  `net_surplus_created` datetime NOT NULL,
  `net_surplus_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_netsurplus`
--

INSERT INTO `sccv1_settings_netsurplus` (`net_surplus_aid`, `net_surplus_year`, `net_surplus_before_amount`, `net_surplus_distribution_amount`, `net_surplus_operating_expenses`, `net_surplus_total_income`, `net_surplus_general_reserve`, `net_surplus_general_reserve_rate`, `net_surplus_educ_training`, `net_surplus_educ_training_rate`, `net_surplus_community_dev`, `net_surplus_community_dev_rate`, `net_surplus_optional_fund`, `net_surplus_optional_fund_rate`, `net_surplus_allocation`, `net_surplus_dividend`, `net_surplus_dividend_rate`, `net_surplus_patronage_refund`, `net_surplus_patronage_rate`, `net_surplus_created`, `net_surplus_datetime`) VALUES
(2, '2023', '499550', '189829', '301350', '800900', '249775', '50', '', '2', '24977.5', '5', '24977.5', '5', '309721', '132880.3', '70', '37965.8', '20', '2023-07-17 09:48:57', '2023-07-18 08:57:59'),
(3, '2022', '4000', '3560', '1000', '5000', '200', '5', '80', '2', '80', '2', '80', '2', '440', '2492', '70', '1068', '30', '2023-07-18 09:01:15', '2023-07-18 09:01:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  ADD PRIMARY KEY (`net_surplus_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  MODIFY `net_surplus_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
