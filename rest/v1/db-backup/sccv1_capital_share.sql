 -- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 12:53 AM
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
-- Table structure for table `sccv1_capital_share`
--

CREATE TABLE `sccv1_capital_share` (
  `capital_share_aid` int(11) NOT NULL,
  `capital_share_member_id` varchar(20) NOT NULL,
  `capital_share_paid_up` varchar(20) NOT NULL,
  `capital_share_or` varchar(20) NOT NULL,
  `capital_share_date` varchar(20) NOT NULL,
  `capital_share_is_initial_pay` tinyint(1) NOT NULL,
  `capital_share_total` varchar(20) NOT NULL,
  `capital_share_created` datetime NOT NULL,
  `capital_share_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_capital_share`
--

INSERT INTO `sccv1_capital_share` (`capital_share_aid`, `capital_share_member_id`, `capital_share_paid_up`, `capital_share_or`, `capital_share_date`, `capital_share_is_initial_pay`, `capital_share_total`, `capital_share_created`, `capital_share_datetime`) VALUES
(23, '5', '5000', '123123aa', '2023-02-28T13:46:41', 1, '', '2023-07-10 13:46:54', '2023-07-10 14:00:44'),
(24, '5', '200', '123123aa', '2023-02-28T13:46:40', 1, '', '2023-07-10 13:46:54', '2023-07-10 14:23:38'),
(25, '5', '1000', '123123aa', '2023-02-28T13:48:33', 0, '6000', '2023-07-10 13:48:37', '2023-07-10 14:00:51'),
(26, '5', '1000', '123123aa', '2023-03-31T13:59:20', 0, '7000', '2023-07-10 13:59:25', '2023-07-10 14:01:11'),
(27, '5', '1000', '123123aa', '2023-04-30T14:01:13', 0, '8000', '2023-07-10 14:01:25', '2023-07-10 14:01:25'),
(28, '5', '1000', '123123aa', '2023-05-31T14:01:27', 0, '9000', '2023-07-10 14:01:34', '2023-07-10 14:01:34'),
(29, '5', '1000', '123123aa', '2023-06-30T14:01:36', 0, '10000', '2023-07-10 14:01:42', '2023-07-10 14:01:42'),
(30, '5', '1000', '123123aa', '2023-07-31T14:01:44', 0, '11000', '2023-07-10 14:01:50', '2023-07-10 14:01:50'),
(31, '5', '1000', '123123aa', '2023-08-31T14:01:55', 0, '12000', '2023-07-10 14:02:01', '2023-07-10 14:02:01'),
(32, '5', '1000', '123123aa', '2023-09-30T14:02:03', 0, '13000', '2023-07-10 14:02:09', '2023-07-10 14:02:09'),
(33, '5', '1000', '123123aa', '2023-10-31T14:02:11', 0, '14000', '2023-07-10 14:02:17', '2023-07-10 14:02:17'),
(34, '5', '1000', '123123aa', '2023-11-30T14:02:18', 0, '15000', '2023-07-10 14:02:26', '2023-07-10 14:02:26'),
(35, '5', '1000', '123123aa', '2023-12-31T14:02:28', 0, '16000', '2023-07-10 14:02:37', '2023-07-10 14:02:37'),
(36, '7', '5000', '123123aa', '2023-07-10 14:20:31', 1, '', '2023-07-10 14:20:47', '2023-07-10 14:20:47'),
(37, '7', '200', '123123aa', '2023-07-10 14:20:31', 1, '', '2023-07-10 14:20:47', '2023-07-10 14:20:47'),
(38, '7', '500', '123123aa', '2023-07-10 14:22:50', 0, '5500', '2023-07-10 14:22:54', '2023-07-10 14:22:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_capital_share`
--
ALTER TABLE `sccv1_capital_share`
  ADD PRIMARY KEY (`capital_share_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_capital_share`
--
ALTER TABLE `sccv1_capital_share`
  MODIFY `capital_share_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
