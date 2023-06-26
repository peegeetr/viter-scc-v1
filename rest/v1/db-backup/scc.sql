-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2023 at 04:16 AM
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
(1, 'Testing Announcement', 'Testing Announcement', 1, '2023-04-19', '2023-04-19 16:28:04', '2023-05-23 13:12:19');

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
  `capital_share_created` datetime NOT NULL,
  `capital_share_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_capital_share`
--

INSERT INTO `sccv1_capital_share` (`capital_share_aid`, `capital_share_member_id`, `capital_share_paid_up`, `capital_share_or`, `capital_share_date`, `capital_share_created`, `capital_share_datetime`) VALUES
(1, '2', '500', '12364798', '2023-05-09', '2023-05-09 08:30:24', '2023-05-09 08:30:24'),
(2, '2', '500', '12364798', '2023-05-10', '2023-05-09 09:28:36', '2023-05-09 09:55:41'),
(3, '5', '500', 'fgdf3g2d6fg5', '2023-05-23', '2023-05-23 13:17:31', '2023-05-23 13:17:31'),
(4, '5', '500', 'fgdfhdfh', '2023-05-23', '2023-05-23 13:17:43', '2023-05-23 13:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_files`
--

CREATE TABLE `sccv1_files` (
  `files_aid` int(11) NOT NULL,
  `files_name` varchar(100) NOT NULL,
  `files_date` varchar(20) NOT NULL,
  `files_link` varchar(200) NOT NULL,
  `files_created` datetime NOT NULL,
  `files_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

--
-- Dumping data for table `sccv1_legal_beneficiaries`
--

INSERT INTO `sccv1_legal_beneficiaries` (`beneficiaries_aid`, `beneficiaries_employee_id`, `beneficiaries_name`, `beneficiaries_relationship`, `beneficiaries_created`, `beneficiaries_datetime`) VALUES
(2, '5', 'ronaldo', 'father', '2023-05-23 09:45:19', '2023-05-23 09:45:19');

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
  `members_created` datetime NOT NULL,
  `members_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_members`
--

INSERT INTO `sccv1_members` (`members_aid`, `members_id`, `members_is_approved`, `members_is_cancel`, `members_is_active`, `members_picture`, `members_first_name`, `members_last_name`, `members_middle_name`, `members_contact_no`, `members_email`, `members_civil_status`, `members_gender`, `members_birth_place`, `members_birth_date`, `members_education_attainment`, `members_permanent_address`, `members_permanent_zip_code`, `members_permanent_mobile_no`, `members_present_address`, `members_present_zip_code`, `members_present_mobile_no`, `members_position`, `members_other_income`, `members_income_gross`, `members_other_source_income`, `members_spouse_occupation`, `members_income_net`, `members_spouse_income`, `members_spouse_net_income`, `members_properties_owned`, `members_pre_membership_date`, `members_created`, `members_datetime`) VALUES
(5, '23-01-001', 1, 0, 1, 'Mac (1).png', 'Cyrene', 'Lumabas', 'Mercado', '', 'cyrene.lumabas@frontlinebusiness.com.ph', '', 'female', '', '1999-09-09', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-01-01', '2023-05-23 09:44:12', '2023-06-06 13:30:53'),
(7, '23-02-003', 1, 0, 1, '', 'Ronaldo', 'Lumabas', 'Soalibio', '', 'cyrenemlumabas@gmail.com', '', 'male', '', '1875-05-17', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-01', '2023-05-23 10:30:37', '2023-06-06 09:33:08'),
(9, '23-05-004', 1, 0, 1, '', 'patrick', 'reyes', 't', '', 'patrick.reyes@frontlinebusienss.com.ph', '', 'male', '', '2023-05-25', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-05-25', '2023-05-25 07:25:22', '2023-06-06 13:43:06'),
(10, '23-05-005', 1, 0, 1, '', 'Zaicy', 'Lumabas', 'Soalibio', '', 'zaicy@gmail.com', '', 'female', '', '2004-02-15', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-05-03', '2023-06-06 13:43:45', '2023-06-06 13:43:51'),
(11, '23-05-006', 0, 0, 1, '', 'mark ryan', 'merin', '', '', 'merin@gmail.com', '', 'male', '', '1999-02-20', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-02', '2023-06-06 14:37:28', '2023-06-06 14:37:28'),
(12, '23-05-007', 0, 0, 1, '', 'ramon', 'plaza', '', '', 'plaza@gmail.com', '', 'male', '', '1999-02-20', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-02', '2023-06-06 14:37:46', '2023-06-06 14:37:46'),
(13, '23-05-008', 0, 0, 1, '', 'grace', 'reyes', '', '', 'grace@gmail.com', '', 'male', '', '1999-02-20', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-02', '2023-06-06 14:38:18', '2023-06-06 14:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_orders`
--

CREATE TABLE `sccv1_orders` (
  `orders_aid` int(11) NOT NULL,
  `orders_number` varchar(20) NOT NULL,
  `orders_is_paid` tinyint(1) NOT NULL,
  `orders_is_draft` tinyint(1) NOT NULL,
  `orders_product_id` varchar(20) NOT NULL,
  `orders_member_id` varchar(20) NOT NULL,
  `orders_product_quantity` varchar(20) NOT NULL,
  `orders_product_amount` varchar(20) NOT NULL,
  `orders_date` varchar(20) NOT NULL,
  `orders_remarks` text NOT NULL,
  `orders_created` datetime NOT NULL,
  `orders_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(7, 'egg', 1, '2023-05-23 10:32:22', '2023-05-23 10:32:22'),
(8, 'diswashing', 1, '2023-05-23 10:32:32', '2023-05-23 10:32:32');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_sales`
--

CREATE TABLE `sccv1_sales` (
  `sales_aid` int(11) NOT NULL,
  `sales_number` varchar(20) NOT NULL,
  `sales_is_paid` tinyint(1) NOT NULL,
  `sales_member_id` varchar(20) NOT NULL,
  `sales_order_id` varchar(20) NOT NULL,
  `sales_receive_amount` varchar(20) NOT NULL,
  `sales_member_change` varchar(20) NOT NULL,
  `sales_or` varchar(50) NOT NULL,
  `sales_date` varchar(20) NOT NULL,
  `sales_discount` varchar(20) NOT NULL,
  `sales_created` datetime NOT NULL,
  `sales_datetime` datetime NOT NULL
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
  `role_is_member` tinyint(1) NOT NULL,
  `role_is_manager` tinyint(1) NOT NULL,
  `role_is_cashier` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_role`
--

INSERT INTO `sccv1_settings_role` (`role_aid`, `role_is_active`, `role_name`, `role_description`, `role_created`, `role_datetime`, `role_is_developer`, `role_is_admin`, `role_is_member`, `role_is_manager`, `role_is_cashier`) VALUES
(12, 1, 'Developer', 'for admin.', '2023-03-09 16:03:26', '2023-03-23 16:20:06', 1, 0, 0, 0, 0),
(13, 1, 'admin', 'for developer', '2023-03-09 16:25:26', '2023-03-09 16:25:26', 0, 1, 0, 0, 0),
(14, 1, 'member', 'for member', '2023-03-23 16:17:15', '2023-03-23 16:17:15', 0, 0, 1, 0, 0),
(15, 1, 'manager', 'for manager', '2023-05-10 13:27:48', '2023-05-10 13:27:48', 0, 0, 0, 1, 0),
(16, 1, 'casher', 'for casher', '2023-05-10 13:28:21', '2023-05-10 13:28:21', 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_user_other`
--

CREATE TABLE `sccv1_settings_user_other` (
  `user_other_aid` int(11) NOT NULL,
  `user_other_is_active` tinyint(1) NOT NULL,
  `user_other_member_id` varchar(20) NOT NULL,
  `user_other_role_id` int(11) NOT NULL,
  `user_other_key` varchar(255) NOT NULL,
  `user_other_password` varchar(255) NOT NULL,
  `user_other_created` varchar(20) NOT NULL,
  `user_other_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_settings_user_other`
--

INSERT INTO `sccv1_settings_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_member_id`, `user_other_role_id`, `user_other_key`, `user_other_password`, `user_other_created`, `user_other_datetime`) VALUES
(15, 1, '5', 14, '5070699936ffc2ba63bfb63acbdc70f3b938f557577ba37cd4baba0850c772e1', '$2y$10$yGKxOncgSTmgYSM2yYLbveIyd3B9eU7rN4lVp3Y5LRRahrGeNraqe', '2023-05-23 10:02:48', '2023-06-06 09:34:08'),
(23, 1, '7', 13, '80e3ca1e79d9e1231c1ebe444953ee44e7c6a1bcc395c6a49ac44e4579cd4c90', '$2y$10$yGKxOncgSTmgYSM2yYLbveIyd3B9eU7rN4lVp3Y5LRRahrGeNraqe', '2023-06-06 09:33:33', '2023-06-06 09:34:04');

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
(1, 1, 'cycy', 'cyrenemlumabas@gmail.com', 12, '', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '', '2023-06-06 09:12:24');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_stocks`
--

CREATE TABLE `sccv1_stocks` (
  `stocks_aid` int(11) NOT NULL,
  `stocks_is_pending` tinyint(1) NOT NULL,
  `stocks_number` varchar(100) NOT NULL,
  `stocks_product_id` varchar(20) NOT NULL,
  `stocks_or` varchar(50) NOT NULL,
  `stocks_date` varchar(20) NOT NULL,
  `stocks_quantity` varchar(20) NOT NULL,
  `stocks_created` datetime NOT NULL,
  `stocks_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_stocks`
--

INSERT INTO `sccv1_stocks` (`stocks_aid`, `stocks_is_pending`, `stocks_number`, `stocks_product_id`, `stocks_or`, `stocks_date`, `stocks_quantity`, `stocks_created`, `stocks_datetime`) VALUES
(10, 0, 'stc-002', '16', 'sertyhe56546', '2023-05-23 10:38:10', '2', '2023-05-23 10:38:15', '2023-05-23 10:51:41'),
(11, 0, 'stc-003', '15', 'dfgsre3423', '2023-05-23 10:38:23', '1', '2023-05-23 10:38:29', '2023-05-23 10:48:25'),
(14, 0, 'stc-004', '16', 'none', '2023-06-05 12:10:48', '8', '2023-06-05 12:10:55', '2023-06-05 12:11:01'),
(15, 0, 'stc-005', '16', 'fsfsdsf', '2023-06-05 12:11:26', '1', '2023-06-05 12:11:31', '2023-06-05 12:11:37'),
(16, 0, 'stc-006', '15', 'dfgdfgsdfg', '2023-06-06 14:34:26', '20', '2023-06-06 14:34:35', '2023-06-06 14:34:49');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_suppliers`
--

CREATE TABLE `sccv1_suppliers` (
  `suppliers_aid` int(11) NOT NULL,
  `suppliers_company_name` varchar(100) NOT NULL,
  `suppliers_is_active` tinyint(1) NOT NULL,
  `suppliers_company_address` varchar(100) NOT NULL,
  `suppliers_contact_person` varchar(100) NOT NULL,
  `suppliers_contact_num` varchar(20) NOT NULL,
  `suppliers_created` datetime NOT NULL,
  `suppliers_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_suppliers`
--

INSERT INTO `sccv1_suppliers` (`suppliers_aid`, `suppliers_company_name`, `suppliers_is_active`, `suppliers_company_address`, `suppliers_contact_person`, `suppliers_contact_num`, `suppliers_created`, `suppliers_datetime`) VALUES
(3, 'FBS', 1, 'Brgy, Sto nino', 'Jhonny Dechoso', '0905632145', '2023-05-23 10:33:23', '2023-05-23 10:33:37');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_suppliers_products`
--

CREATE TABLE `sccv1_suppliers_products` (
  `suppliers_products_aid` int(11) NOT NULL,
  `suppliers_products_name` varchar(100) NOT NULL,
  `suppliers_products_number` varchar(20) NOT NULL,
  `suppliers_products_price` varchar(50) NOT NULL,
  `suppliers_products_scc_price` varchar(20) NOT NULL,
  `suppliers_products_market_price` varchar(20) NOT NULL,
  `suppliers_products_category_id` varchar(20) NOT NULL,
  `suppliers_products_suppliers_id` varchar(20) NOT NULL,
  `suppliers_products_created` datetime NOT NULL,
  `suppliers_products_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_suppliers_products`
--

INSERT INTO `sccv1_suppliers_products` (`suppliers_products_aid`, `suppliers_products_name`, `suppliers_products_number`, `suppliers_products_price`, `suppliers_products_scc_price`, `suppliers_products_market_price`, `suppliers_products_category_id`, `suppliers_products_suppliers_id`, `suppliers_products_created`, `suppliers_products_datetime`) VALUES
(15, 'egg-medium', 'prod-001', '2000', '210', '215', '7', '3', '2023-05-23 10:34:03', '2023-05-23 10:44:31'),
(16, 'egg-large', 'prod-002', '210', '215', '220', '7', '3', '2023-05-23 10:34:20', '2023-05-23 10:39:03');

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
-- Indexes for table `sccv1_files`
--
ALTER TABLE `sccv1_files`
  ADD PRIMARY KEY (`files_aid`);

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
-- Indexes for table `sccv1_orders`
--
ALTER TABLE `sccv1_orders`
  ADD PRIMARY KEY (`orders_aid`);

--
-- Indexes for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  ADD PRIMARY KEY (`product_category_aid`);

--
-- Indexes for table `sccv1_sales`
--
ALTER TABLE `sccv1_sales`
  ADD PRIMARY KEY (`sales_aid`);

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
-- Indexes for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  ADD PRIMARY KEY (`stocks_aid`);

--
-- Indexes for table `sccv1_suppliers`
--
ALTER TABLE `sccv1_suppliers`
  ADD PRIMARY KEY (`suppliers_aid`);

--
-- Indexes for table `sccv1_suppliers_products`
--
ALTER TABLE `sccv1_suppliers_products`
  ADD PRIMARY KEY (`suppliers_products_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_announcement`
--
ALTER TABLE `sccv1_announcement`
  MODIFY `announcement_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_capital_share`
--
ALTER TABLE `sccv1_capital_share`
  MODIFY `capital_share_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sccv1_files`
--
ALTER TABLE `sccv1_files`
  MODIFY `files_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_legal_beneficiaries`
--
ALTER TABLE `sccv1_legal_beneficiaries`
  MODIFY `beneficiaries_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  MODIFY `members_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sccv1_orders`
--
ALTER TABLE `sccv1_orders`
  MODIFY `orders_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  MODIFY `product_category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sccv1_sales`
--
ALTER TABLE `sccv1_sales`
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_savings`
--
ALTER TABLE `sccv1_savings`
  MODIFY `savings_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  MODIFY `net_surplus_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_other`
--
ALTER TABLE `sccv1_settings_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_system`
--
ALTER TABLE `sccv1_settings_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  MODIFY `stocks_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sccv1_suppliers`
--
ALTER TABLE `sccv1_suppliers`
  MODIFY `suppliers_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv1_suppliers_products`
--
ALTER TABLE `sccv1_suppliers_products`
  MODIFY `suppliers_products_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
