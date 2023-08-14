-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2023 at 03:37 AM
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
-- Table structure for table `sccv1_blotter_petty_cash`
--

CREATE TABLE `sccv1_blotter_petty_cash` (
  `petty_cash_aid` int(11) NOT NULL,
  `petty_cash_date` varchar(20) NOT NULL,
  `petty_cash_voucher_no` varchar(50) NOT NULL,
  `petty_cash_payee_name` varchar(100) NOT NULL,
  `petty_cash_in` varchar(20) NOT NULL,
  `petty_cash_out` varchar(20) NOT NULL,
  `petty_cash_balance` varchar(20) NOT NULL,
  `petty_cash_created` datetime NOT NULL,
  `petty_cash_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_blotter_petty_cash`
--

INSERT INTO `sccv1_blotter_petty_cash` (`petty_cash_aid`, `petty_cash_date`, `petty_cash_voucher_no`, `petty_cash_payee_name`, `petty_cash_in`, `petty_cash_out`, `petty_cash_balance`, `petty_cash_created`, `petty_cash_datetime`) VALUES
(1, '2023-07-19', 'zzz', '5', '1000', '1000', '0', '2023-07-19 14:50:07', '2023-07-24 14:16:45'),
(2, '2023-07-24', 'aaaa', '16', '12', '1', '11', '2023-07-24 14:15:57', '2023-07-24 14:15:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_blotter_petty_cash`
--
ALTER TABLE `sccv1_blotter_petty_cash`
  ADD PRIMARY KEY (`petty_cash_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_blotter_petty_cash`
--
ALTER TABLE `sccv1_blotter_petty_cash`
  MODIFY `petty_cash_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
