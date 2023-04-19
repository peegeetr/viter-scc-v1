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
-- Table structure for table `sccv1_suppliers`
--

CREATE TABLE `sccv1_suppliers` (
  `suppliers_aid` int(11) NOT NULL,
  `suppliers_company_name` varchar(100) NOT NULL,
  `suppliers_is_active` tinyint(1) NOT NULL,
  `suppliers_company_address` varchar(100) NOT NULL,
  `suppliers_contact_person` varchar(100) NOT NULL,
  `suppliers_contact_num` varchar(20) NOT NULL,
  `suppliers_created` datetime NOT NULL,
  `suppliers_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_suppliers`
--

INSERT INTO `sccv1_suppliers` (`suppliers_aid`, `suppliers_company_name`, `suppliers_is_active`, `suppliers_company_address`, `suppliers_contact_person`, `suppliers_contact_num`, `suppliers_created`, `suppliers_datetime`) VALUES
(1, 'fbs', 1, 'Brgy, San Ignaio', 'maja', '031231324657', '2023-04-19 16:29:03', '2023-04-19 16:29:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_suppliers`
--
ALTER TABLE `sccv1_suppliers`
  ADD PRIMARY KEY (`suppliers_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_suppliers`
--
ALTER TABLE `sccv1_suppliers`
  MODIFY `suppliers_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
