-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2023 at 05:37 AM
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
-- Table structure for table `sccv1_members`
--

CREATE TABLE `sccv1_members` (
  `members_aid` int(11) NOT NULL,
  `members_id` varchar(50) NOT NULL,
  `members_barcode` varchar(20) NOT NULL,
  `members_is_approved` tinyint(1) NOT NULL,
  `members_is_cancel` tinyint(1) NOT NULL,
  `members_is_active` tinyint(1) NOT NULL,
  `members_picture` varchar(200) NOT NULL,
  `members_first_name` varchar(100) NOT NULL,
  `members_last_name` varchar(100) NOT NULL,
  `members_middle_name` varchar(100) NOT NULL,
  `members_contact_no` varchar(20) NOT NULL,
  `members_email` varchar(100) NOT NULL,
  `members_civil_status` varchar(10) NOT NULL,
  `members_gender` varchar(10) NOT NULL,
  `members_birth_place` varchar(100) NOT NULL,
  `members_birth_date` varchar(20) NOT NULL,
  `members_education_attainment` varchar(100) NOT NULL,
  `members_permanent_address` varchar(100) NOT NULL,
  `members_permanent_zip_code` varchar(10) NOT NULL,
  `members_permanent_mobile_no` varchar(20) NOT NULL,
  `members_present_address` varchar(100) NOT NULL,
  `members_present_zip_code` varchar(10) NOT NULL,
  `members_present_mobile_no` varchar(100) NOT NULL,
  `members_position` varchar(100) NOT NULL,
  `members_other_income` varchar(100) NOT NULL,
  `members_income_gross` varchar(100) NOT NULL,
  `members_other_source_income` varchar(100) NOT NULL,
  `members_spouse_occupation` varchar(100) NOT NULL,
  `members_income_net` varchar(100) NOT NULL,
  `members_spouse_income` varchar(100) NOT NULL,
  `members_spouse_net_income` varchar(100) NOT NULL,
  `members_properties_owned` varchar(100) NOT NULL,
  `members_pre_membership_date` varchar(20) NOT NULL,
  `members_subscribe_capital_id` varchar(20) NOT NULL,
  `members_member_fee` varchar(20) NOT NULL,
  `members_created` datetime NOT NULL,
  `members_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_members`
--

INSERT INTO `sccv1_members` (`members_aid`, `members_id`, `members_barcode`, `members_is_approved`, `members_is_cancel`, `members_is_active`, `members_picture`, `members_first_name`, `members_last_name`, `members_middle_name`, `members_contact_no`, `members_email`, `members_civil_status`, `members_gender`, `members_birth_place`, `members_birth_date`, `members_education_attainment`, `members_permanent_address`, `members_permanent_zip_code`, `members_permanent_mobile_no`, `members_present_address`, `members_present_zip_code`, `members_present_mobile_no`, `members_position`, `members_other_income`, `members_income_gross`, `members_other_source_income`, `members_spouse_occupation`, `members_income_net`, `members_spouse_income`, `members_spouse_net_income`, `members_properties_owned`, `members_pre_membership_date`, `members_subscribe_capital_id`, `members_member_fee`, `members_created`, `members_datetime`) VALUES
(5, '23-01-001', '', 1, 0, 1, 'lumabas1.jpg', 'Cyrene', 'Lumabas', 'Mercado', '', 'cyrene.lumabas@frontlinebusiness.com.ph', '', 'Female', '', '1999-09-09', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-01-01', '6', '200', '2023-05-23 09:44:12', '2023-07-21 14:18:00'),
(7, '23-02-003', 'scc-001-2023', 1, 0, 1, '', 'CK', 'Abrigo', 'm', '', 'cyrenemlumabas@gmail.com', '', 'Female', '', '1875-05-17', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-01', '6', '200', '2023-05-23 10:30:37', '2023-08-11 09:30:13'),
(9, '23-05-004', '', 1, 0, 1, '', 'patrick', 'reyes', 't', '', 'patrick.reyes@frontlinebusienss.com.ph', '', 'male', '', '2023-05-25', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-05-25', '', '', '2023-05-25 07:25:22', '2023-06-06 13:43:06'),
(10, '23-05-005', '', 1, 0, 1, '', 'Zaicy', 'Lumabas', 'Soalibio', '', 'zaicy@gmail.com', '', 'female', '', '2004-02-15', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-05-03', '6', '200', '2023-06-06 13:43:45', '2023-07-24 15:20:49'),
(12, '23-05-007', '', 1, 0, 1, '', 'ramon', 'plaza', '', '', 'plaza@gmail.com', '', 'male', '', '1999-02-20', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-02', '', '', '2023-06-06 14:37:46', '2023-06-08 15:06:12'),
(13, '23-05-008', '', 1, 0, 1, '', 'grace', 'reyes', '', '', 'grace@gmail.com', '', 'male', '', '1999-02-20', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-02', '', '', '2023-06-06 14:38:18', '2023-07-20 10:39:54'),
(14, '23-06-009', 'scc-002-2023', 1, 0, 1, '', 'C.', 'aa', 'a', '', 'asdsd@gmail.com', '', 'female', '', '1998-06-08', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-06-08', '6', '200', '2023-06-08 15:06:43', '2023-08-11 09:30:24'),
(15, '23-05-010', '', 1, 0, 1, '', 'asdwew', 'sdasdasd', 'asdasd', '', 'asdsew@gmail.com', '', 'female', '', '1998-06-08', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-06-08', '', '', '2023-06-08 15:06:55', '2023-06-08 15:07:38'),
(16, '23-05-011', '', 1, 0, 1, '', 'aa', 'sdasdasd', 'asdasd', '', 'aaa@gmail.com', '', 'female', '', '1998-06-08', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-06-08', '', '', '2023-06-08 15:07:03', '2023-06-08 15:07:42'),
(17, '23-05-012', '', 1, 0, 1, '', 'asas', 'sdasdasd', 'asdasd', '', 'asas@gmail.com', '', 'female', '', '1998-06-08', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-06-08', '', '', '2023-06-08 15:07:10', '2023-06-08 15:07:40'),
(18, '23-05-013', '', 1, 0, 1, '', 'bbb', 'sdasdasd', 'asdasd', '', 'bbbb@gmail.com', '', 'female', '', '1998-06-08', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-06-08', '', '', '2023-06-08 15:07:22', '2023-07-20 10:46:21'),
(19, '23-05-014', '', 1, 0, 1, '', 'qwedcc', 'sdasdasd', 'asdasd', '', 'cccc@gmail.com', '', 'female', '', '1998-06-08', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-06-08', '6', '200', '2023-06-08 15:07:29', '2023-07-28 11:08:30'),
(22, '23-05-015', '', 0, 0, 1, '', 'ghdfghdfgh', 'dfgdf', 'dhdgh', '', 'rkjgkjhg@gmail.com', '', 'female', '', '1999-07-06', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-07-06', '', '', '2023-07-06 14:45:12', '2023-07-06 14:45:12'),
(33, '23-05-006', '', 1, 0, 1, '', 'mark ryan', 'merin', '', '+63 (002) 3211 123', 'merindfghdghdghdfghdfghgh@gmail.com', 'Single', 'male', 'dfdfghd', '1999-02-20', 'fgh', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-02', '6', '200', '2023-06-06 14:37:28', '2023-07-24 15:22:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  ADD PRIMARY KEY (`members_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  MODIFY `members_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
