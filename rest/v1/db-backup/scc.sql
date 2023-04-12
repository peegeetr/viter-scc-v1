-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2023 at 11:25 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_capital_share`
--

CREATE TABLE `sccv1_capital_share` (
  `capital_share_aid` int(11) NOT NULL,
  `capital_share_member_id` varchar(20) NOT NULL,
  `capital_share_paid_up` varchar(20) NOT NULL,
  `capital_share_total_amount` varchar(20) NOT NULL,
  `capital_share_or` varchar(20) NOT NULL,
  `capital_share_date` varchar(20) NOT NULL,
  `capital_share_created` datetime NOT NULL,
  `capital_share_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_legal_beneficiaries`
--

CREATE TABLE `sccv1_legal_beneficiaries` (
  `beneficiaries_aid` int(11) NOT NULL,
  `beneficiaries_employee_id` varchar(20) NOT NULL,
  `beneficiaries_name` varchar(100) NOT NULL,
  `beneficiaries_relationship` varchar(100) NOT NULL,
  `beneficiaries_created` datetime NOT NULL,
  `beneficiaries_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_members`
--

CREATE TABLE `sccv1_members` (
  `members_aid` int(11) NOT NULL,
  `members_id` varchar(50) NOT NULL,
  `members_is_approved` tinyint(1) NOT NULL,
  `members_is_cancel` tinyint(1) NOT NULL,
  `members_is_active` tinyint(1) NOT NULL,
  `members_picture` varchar(200) NOT NULL,
  `members_first_name` varchar(100) NOT NULL,
  `members_last_name` varchar(100) NOT NULL,
  `members_middle_name` varchar(100) NOT NULL,
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
  `members_created` datetime NOT NULL,
  `members_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_members`
--

INSERT INTO `sccv1_members` (`members_aid`, `members_id`, `members_is_approved`, `members_is_cancel`, `members_is_active`, `members_picture`, `members_first_name`, `members_last_name`, `members_middle_name`, `members_civil_status`, `members_gender`, `members_birth_place`, `members_birth_date`, `members_education_attainment`, `members_permanent_address`, `members_permanent_zip_code`, `members_permanent_mobile_no`, `members_present_address`, `members_present_zip_code`, `members_present_mobile_no`, `members_position`, `members_other_income`, `members_income_gross`, `members_other_source_income`, `members_spouse_occupation`, `members_income_net`, `members_spouse_income`, `members_spouse_net_income`, `members_properties_owned`, `members_pre_membership_date`, `members_created`, `members_datetime`) VALUES
(1, '2301-001', 0, 0, 1, '', 'Ronaldo', 'Lumaba', 'Soalibio', '', 'male', '', '2023-01-04', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-28', '2023-03-13 16:55:35', '2023-03-14 16:56:41'),
(2, '23-02-002', 1, 0, 1, '', 'cycy', 'Lumabas', 'Soalibio', '', 'male', '', '2023-01-04', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-28', '2023-03-13 16:55:42', '2023-03-13 16:59:12'),
(3, '23-02-003', 0, 0, 1, '', 'zaicy', 'Lumabas', 'Soalibio', '', 'male', '', '2023-01-04', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-03-12', '2023-03-13 16:55:56', '2023-03-13 16:55:56');

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

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_product`
--

CREATE TABLE `sccv1_product` (
  `product_aid` int(11) NOT NULL,
  `product_item_name` varchar(20) NOT NULL,
  `product_date` varchar(20) NOT NULL,
  `product_quantity` varchar(20) NOT NULL,
  `product_remaining_quantity` varchar(20) NOT NULL,
  `product_sold_quantity` varchar(20) NOT NULL,
  `product_price` varchar(20) NOT NULL,
  `product_scc_price` varchar(20) NOT NULL,
  `product_profit` varchar(20) NOT NULL,
  `product_market_price` varchar(20) NOT NULL,
  `product_created` datetime NOT NULL,
  `product_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_savings`
--

CREATE TABLE `sccv1_savings` (
  `savings_aid` int(11) NOT NULL,
  `savings_member_id` varchar(20) NOT NULL,
  `savings_date` varchar(20) NOT NULL,
  `savings_category` varchar(2) NOT NULL,
  `savings_deposite` varchar(20) NOT NULL,
  `savings_withdrawal` varchar(20) NOT NULL,
  `savings_interest` varchar(20) NOT NULL,
  `savings_or` varchar(100) NOT NULL,
  `savings_created` datetime NOT NULL,
  `savings_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_netsurplus`
--

CREATE TABLE `sccv1_settings_netsurplus` (
  `net_surplus_aid` int(11) NOT NULL,
  `net_surplus_id` varchar(20) NOT NULL,
  `net_surplus_amount` varchar(20) NOT NULL,
  `net_surplus_total_capital` varchar(20) NOT NULL,
  `net_surplus_total_profit` varchar(20) NOT NULL,
  `net_surplus_dividend` varchar(20) NOT NULL,
  `net_surplus_patronage_refund` varchar(20) NOT NULL,
  `net_surplus_created` datetime NOT NULL,
  `net_surplus_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `role_is_member` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_role`
--

INSERT INTO `sccv1_settings_role` (`role_aid`, `role_is_active`, `role_name`, `role_description`, `role_created`, `role_datetime`, `role_is_developer`, `role_is_admin`, `role_is_member`) VALUES
(12, 1, 'Developer', 'for admin.', '2023-03-09 16:03:26', '2023-03-23 16:20:06', 1, 0, 0),
(13, 1, 'admin', 'for developer', '2023-03-09 16:25:26', '2023-03-09 16:25:26', 0, 1, 0),
(14, 1, 'member', 'for member', '2023-03-23 16:17:15', '2023-03-23 16:17:15', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_user_other`
--

CREATE TABLE `sccv1_settings_user_other` (
  `user_other_aid` int(11) NOT NULL,
  `user_other_is_active` tinyint(1) NOT NULL,
  `user_other_member_id` varchar(20) NOT NULL,
  `user_other_email` varchar(200) NOT NULL,
  `user_other_role_id` int(11) NOT NULL,
  `user_other_key` varchar(255) NOT NULL,
  `user_other_password` varchar(255) NOT NULL,
  `user_other_created` varchar(20) NOT NULL,
  `user_other_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_user_other`
--

INSERT INTO `sccv1_settings_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_member_id`, `user_other_email`, `user_other_role_id`, `user_other_key`, `user_other_password`, `user_other_created`, `user_other_datetime`) VALUES
(9, 1, '2', 'cyrenemlumabas@gmail.com', 13, '', '$2y$10$Wsq8tTePhUDCmKqhsWuvNuXD7NICwGlnf4krXQzhIkhOk1bPREGza', '2023-03-09 16:38:45', '2023-03-23 06:49:44'),
(10, 1, '3', 'cyrene.lumabas@frontlinebusiness.com.ph', 14, '', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '2023-03-23 16:21:35', '2023-03-23 16:27:08');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_user_system`
--

CREATE TABLE `sccv1_settings_user_system` (
  `user_system_aid` int(11) NOT NULL,
  `user_system_is_active` tinyint(1) NOT NULL,
  `user_system_name` varchar(128) NOT NULL,
  `user_system_email` varchar(255) NOT NULL,
  `user_system_role_id` int(11) NOT NULL,
  `user_system_key` varchar(255) NOT NULL,
  `user_system_password` varchar(255) NOT NULL,
  `user_system_created` varchar(20) NOT NULL,
  `user_system_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_user_system`
--

INSERT INTO `sccv1_settings_user_system` (`user_system_aid`, `user_system_is_active`, `user_system_name`, `user_system_email`, `user_system_role_id`, `user_system_key`, `user_system_password`, `user_system_created`, `user_system_datetime`) VALUES
(1, 1, 'cycy', 'cyrenemlumabas@gmail.com', 12, '', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '', '2023-04-12 11:23:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_announcement`
--
ALTER TABLE `sccv1_announcement`
  ADD PRIMARY KEY (`announcement_aid`);

--
-- Indexes for table `sccv1_capital_share`
--
ALTER TABLE `sccv1_capital_share`
  ADD PRIMARY KEY (`capital_share_aid`);

--
-- Indexes for table `sccv1_file_upload`
--
ALTER TABLE `sccv1_file_upload`
  ADD PRIMARY KEY (`file_upload_aid`);

--
-- Indexes for table `sccv1_legal_beneficiaries`
--
ALTER TABLE `sccv1_legal_beneficiaries`
  ADD PRIMARY KEY (`beneficiaries_aid`);

--
-- Indexes for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  ADD PRIMARY KEY (`members_aid`);

--
-- Indexes for table `sccv1_members_patronage`
--
ALTER TABLE `sccv1_members_patronage`
  ADD PRIMARY KEY (`patronage_aid`);

--
-- Indexes for table `sccv1_product`
--
ALTER TABLE `sccv1_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- Indexes for table `sccv1_savings`
--
ALTER TABLE `sccv1_savings`
  ADD PRIMARY KEY (`savings_aid`);

--
-- Indexes for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  ADD PRIMARY KEY (`net_surplus_aid`);

--
-- Indexes for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  ADD PRIMARY KEY (`role_aid`);

--
-- Indexes for table `sccv1_settings_user_other`
--
ALTER TABLE `sccv1_settings_user_other`
  ADD PRIMARY KEY (`user_other_aid`);

--
-- Indexes for table `sccv1_settings_user_system`
--
ALTER TABLE `sccv1_settings_user_system`
  ADD PRIMARY KEY (`user_system_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_announcement`
--
ALTER TABLE `sccv1_announcement`
  MODIFY `announcement_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_capital_share`
--
ALTER TABLE `sccv1_capital_share`
  MODIFY `capital_share_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_file_upload`
--
ALTER TABLE `sccv1_file_upload`
  MODIFY `file_upload_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_legal_beneficiaries`
--
ALTER TABLE `sccv1_legal_beneficiaries`
  MODIFY `beneficiaries_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  MODIFY `members_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv1_members_patronage`
--
ALTER TABLE `sccv1_members_patronage`
  MODIFY `patronage_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_product`
--
ALTER TABLE `sccv1_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_savings`
--
ALTER TABLE `sccv1_savings`
  MODIFY `savings_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  MODIFY `net_surplus_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_other`
--
ALTER TABLE `sccv1_settings_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_system`
--
ALTER TABLE `sccv1_settings_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
