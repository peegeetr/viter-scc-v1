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
-- Table structure for table `sccv1_stocks`
--

CREATE TABLE `sccv1_stocks` (
  `stocks_aid` int(11) NOT NULL,
  `stocks_is_pending` tinyint(1) NOT NULL,
  `stocks_number` varchar(100) NOT NULL,
  `stocks_product_id` varchar(20) NOT NULL,
  `stocks_or` varchar(50) NOT NULL,
  `stocks_quantity` varchar(20) NOT NULL,
  `stocks_created` datetime NOT NULL,
  `stocks_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_stocks`
--

INSERT INTO `sccv1_stocks` (`stocks_aid`, `stocks_is_pending`, `stocks_number`, `stocks_product_id`, `stocks_or`, `stocks_quantity`, `stocks_created`, `stocks_datetime`) VALUES
(4, 0, 'stc-001', '5', 'bpofjg09r85-095', '20', '2023-04-25 06:49:04', '2023-05-08 12:13:20'),
(6, 0, 'stc-002', '5', '21dfgsdft', '20', '2023-04-26 16:50:27', '2023-05-08 12:12:09'),
(7, 0, 'stc-003', '7', 'bpofjg09r85-095', '2', '2023-04-26 17:06:12', '2023-05-08 12:12:03'),
(8, 1, 'stc-004', '13', '13235468d', '20', '2023-05-08 14:07:23', '2023-05-08 14:07:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  ADD PRIMARY KEY (`stocks_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  MODIFY `stocks_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
