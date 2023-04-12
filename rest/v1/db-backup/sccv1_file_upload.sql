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
-- Table structure for table `sccv1_file_upload`
--

CREATE TABLE `sccv1_file_upload` (
  `file_upload_aid` int(11) NOT NULL,
  `file_upload_name` varchar(100) NOT NULL,
  `file_upload_date` varchar(20) NOT NULL,
  `file_upload_link` varchar(200) NOT NULL,
  `file_upload_created` datetime NOT NULL,
  `file_upload_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_file_upload`
--

INSERT INTO `sccv1_file_upload` (`file_upload_aid`, `file_upload_name`, `file_upload_date`, `file_upload_link`, `file_upload_created`, `file_upload_datetime`) VALUES
(1, 'link', '2023-04-12', 'link', '2023-04-12 17:25:27', '2023-04-12 17:25:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_file_upload`
--
ALTER TABLE `sccv1_file_upload`
  ADD PRIMARY KEY (`file_upload_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_file_upload`
--
ALTER TABLE `sccv1_file_upload`
  MODIFY `file_upload_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
