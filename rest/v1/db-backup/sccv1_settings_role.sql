-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2023 at 08:05 AM
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
-- Table structure for table `sccv1_settings_role`
--

CREATE TABLE `sccv1_settings_role` (
  `role_aid` int(11) NOT NULL,
  `role_is_active` tinyint(1) NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `role_description` text NOT NULL,
  `role_created` varchar(20) NOT NULL,
  `role_datetime` datetime NOT NULL,
  `role_is_developer` tinyint(1) NOT NULL,
  `role_is_admin` tinyint(1) NOT NULL,
  `role_is_member` tinyint(1) NOT NULL,
  `role_is_manager` tinyint(1) NOT NULL,
  `role_is_cashier` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_role`
--

INSERT INTO `sccv1_settings_role` (`role_aid`, `role_is_active`, `role_name`, `role_description`, `role_created`, `role_datetime`, `role_is_developer`, `role_is_admin`, `role_is_member`, `role_is_manager`, `role_is_cashier`) VALUES
(12, 1, 'Developer', 'for admin.', '2023-03-09 16:03:26', '2023-03-23 16:20:06', 1, 0, 0, 0, 0),
(13, 1, 'Admin', 'for developer', '2023-03-09 16:25:26', '2023-03-09 16:25:26', 0, 1, 0, 0, 0),
(14, 1, 'Member', 'for member', '2023-03-23 16:17:15', '2023-03-23 16:17:15', 0, 0, 1, 0, 0),
(15, 1, 'Manager', 'for manager', '2023-05-10 13:27:48', '2023-05-10 13:27:48', 0, 0, 0, 1, 0),
(16, 1, 'Cashier', 'for casher', '2023-05-10 13:28:21', '2023-05-10 13:28:21', 0, 0, 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  ADD PRIMARY KEY (`role_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
