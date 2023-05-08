-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 09:42 AM
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
-- Table structure for table `sccv1_product_category`
--

CREATE TABLE `sccv1_product_category` (
  `product_category_aid` int(11) NOT NULL,
  `product_category_name` varchar(100) NOT NULL,
  `product_category_is_active` tinyint(1) NOT NULL,
  `product_category_created` datetime NOT NULL,
  `product_category_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_product_category`
--

INSERT INTO `sccv1_product_category` (`product_category_aid`, `product_category_name`, `product_category_is_active`, `product_category_created`, `product_category_datetime`) VALUES
(1, 'egg', 1, '2023-04-19 16:30:22', '2023-05-08 11:41:18'),
(2, 'seasonings', 1, '2023-04-19 16:30:27', '2023-05-08 11:48:45'),
(3, 'cleaning materials', 1, '2023-05-08 11:46:49', '2023-05-08 11:50:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  ADD PRIMARY KEY (`product_category_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  MODIFY `product_category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
