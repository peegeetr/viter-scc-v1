-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2023 at 08:58 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ntp_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `ntpv1_settings_movement`
--

CREATE TABLE `ntpv1_settings_movement` (
  `movement_aid` int(11) NOT NULL,
  `movement_is_active` tinyint(1) NOT NULL,
  `movement_name` varchar(200) NOT NULL,
  `movement_church` varchar(200) NOT NULL,
  `movement_created` varchar(20) NOT NULL,
  `movement_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ntpv1_settings_movement`
--

INSERT INTO `ntpv1_settings_movement` (`movement_aid`, `movement_is_active`, `movement_name`, `movement_church`, `movement_created`, `movement_datetime`) VALUES
(1, 1, 'xcvxcvxcvx', 'dddd', 'wdwdw', '0000-00-00 00:00:00'),
(2, 1, 'xxxx', 'xxxxxxxx', '2023-03-03', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ntpv1_settings_movement`
--
ALTER TABLE `ntpv1_settings_movement`
  ADD PRIMARY KEY (`movement_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ntpv1_settings_movement`
--
ALTER TABLE `ntpv1_settings_movement`
  MODIFY `movement_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
