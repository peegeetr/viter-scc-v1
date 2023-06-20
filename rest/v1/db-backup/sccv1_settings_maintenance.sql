-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2023 at 05:59 AM
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
-- Table structure for table `sccv1_settings_maintenance`
--

CREATE TABLE `sccv1_settings_maintenance` (
  `settings_system_mode_aid` int(11) NOT NULL,
  `settings_system_mode_name` varchar(100) NOT NULL,
  `settings_system_mode_is_maintenance` tinyint(1) NOT NULL,
  `settings_system_mode_is_test_mode` tinyint(1) NOT NULL,
  `settings_system_mode_is_on` tinyint(1) NOT NULL,
  `settings_system_mode_created` varchar(20) NOT NULL,
  `settings_system_mode_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_maintenance`
--

INSERT INTO `sccv1_settings_maintenance` (`settings_system_mode_aid`, `settings_system_mode_name`, `settings_system_mode_is_maintenance`, `settings_system_mode_is_test_mode`, `settings_system_mode_is_on`, `settings_system_mode_created`, `settings_system_mode_datetime`) VALUES
(1, 'maintenance', 1, 0, 0, '2023-05-17 02:23:37.', '2023-06-20 11:58:20'),
(2, 'test mode', 0, 1, 0, '2023-05-17 02:23:37.', '2023-05-17 02:23:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_settings_maintenance`
--
ALTER TABLE `sccv1_settings_maintenance`
  ADD PRIMARY KEY (`settings_system_mode_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_settings_maintenance`
--
ALTER TABLE `sccv1_settings_maintenance`
  MODIFY `settings_system_mode_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
