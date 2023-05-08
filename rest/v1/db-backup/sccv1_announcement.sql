-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 09:41 AM
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
-- Table structure for table `sccv1_announcement`
--

CREATE TABLE `sccv1_announcement` (
  `announcement_aid` int(11) NOT NULL,
  `announcement_name` varchar(200) NOT NULL,
  `announcement_description` varchar(200) NOT NULL,
  `announcement_is_active` tinyint(1) NOT NULL,
  `announcement_date` varchar(20) NOT NULL,
  `announcement_created` datetime NOT NULL,
  `announcement_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_announcement`
--

INSERT INTO `sccv1_announcement` (`announcement_aid`, `announcement_name`, `announcement_description`, `announcement_is_active`, `announcement_date`, `announcement_created`, `announcement_datetime`) VALUES
(1, 'Testing Announcement', 'Testing Announcement', 1, '2023-04-19', '2023-04-19 16:28:04', '2023-04-19 16:28:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_announcement`
--
ALTER TABLE `sccv1_announcement`
  ADD PRIMARY KEY (`announcement_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_announcement`
--
ALTER TABLE `sccv1_announcement`
  MODIFY `announcement_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
