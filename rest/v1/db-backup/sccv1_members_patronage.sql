-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2023 at 11:26 AM
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
-- Table structure for table `sccv1_members_patronage`
--

CREATE TABLE `sccv1_members_patronage` (
  `patronage_aid` int(11) NOT NULL,
  `patronage_product_id` varchar(20) NOT NULL,
  `patronage_member_id` varchar(20) NOT NULL,
  `patronage_or` varchar(100) NOT NULL,
  `patronage_product_quantity` varchar(20) NOT NULL,
  `patronage_product_amount` varchar(20) NOT NULL,
  `patronage_date` varchar(20) NOT NULL,
  `patronage_created` datetime NOT NULL,
  `patronage_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_members_patronage`
--
ALTER TABLE `sccv1_members_patronage`
  ADD PRIMARY KEY (`patronage_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_members_patronage`
--
ALTER TABLE `sccv1_members_patronage`
  MODIFY `patronage_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
