-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2023 at 09:55 AM
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
-- Table structure for table `sccv1_settings_price_markup`
--

CREATE TABLE `sccv1_settings_price_markup` (
  `price_markup_aid` int(11) NOT NULL,
  `price_markup_is_active` tinyint(1) NOT NULL,
  `price_markup_retail` varchar(20) NOT NULL,
  `price_markup_member` varchar(20) NOT NULL,
  `price_markup_whole_sale` varchar(20) NOT NULL,
  `price_markup_created_at` datetime NOT NULL,
  `price_markup_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_price_markup`
--

INSERT INTO `sccv1_settings_price_markup` (`price_markup_aid`, `price_markup_is_active`, `price_markup_retail`, `price_markup_member`, `price_markup_whole_sale`, `price_markup_created_at`, `price_markup_updated_at`) VALUES
(2, 1, '9', '8', '7.5', '2023-09-19 12:53:09', '2023-09-26 15:27:39'),
(4, 0, '34', '34', '3', '2023-09-19 13:47:38', '2023-09-20 07:01:58'),
(5, 0, '10', '9', '8', '2023-09-26 14:58:37', '2023-09-26 15:18:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_settings_price_markup`
--
ALTER TABLE `sccv1_settings_price_markup`
  ADD PRIMARY KEY (`price_markup_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_settings_price_markup`
--
ALTER TABLE `sccv1_settings_price_markup`
  MODIFY `price_markup_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
