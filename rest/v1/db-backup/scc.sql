-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2023 at 07:23 AM
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
(2, '2', '500', '12364798', '2023-05-10', '2023-05-09 09:28:36', '2023-05-09 09:55:41');

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
(1, '23-01-001', 0, 1, 0, '', 'Ronaldos', 'Lumabaa', 'Soalibio', '', '', '', 'male', '', '2023-01-04', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-28', '2023-03-13 16:55:35', '2023-05-09 13:38:44'),
(2, '23-01-001', 1, 0, 1, '59270081.jfif', 'Patrick', 'Reyes', 'T.', '', '', '', 'male', '', '2023-01-03', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-02-28', '2023-03-13 16:55:42', '2023-05-09 13:39:51'),
(3, '2301-001', 1, 0, 1, '', 'zaicy', 'Lumabas', 'Soalibio', '09095632145', 'cy@gmaiul.com', 'ws', 'male', '2023-03-02', '2023-01-04', 'sdfsdf', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-03-12', '2023-03-13 16:55:56', '2023-05-10 13:22:04'),
(4, '2301-001', 0, 0, 1, '', 'Ronaldo', 'Lumabas', 'Soalibio', '', '', 'ss', 'female', 's', '2000-07-09', 's', '', '', '', 'Brgy, San Cristobal', '4000', 'e', 'e', 'e', 'e', 'e', '', 'e', '', '', '', '2023-05-09', '2023-05-09 13:41:19', '2023-05-09 13:54:55');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_orders`
--

CREATE TABLE `sccv1_orders` (
  `orders_aid` int(11) NOT NULL,
  `orders_number` varchar(20) NOT NULL,
  `orders_is_paid` tinyint(1) NOT NULL,
  `orders_product_id` varchar(20) NOT NULL,
  `orders_member_id` varchar(20) NOT NULL,
  `orders_product_quantity` varchar(20) NOT NULL,
  `orders_product_amount` varchar(20) NOT NULL,
  `orders_date` varchar(20) NOT NULL,
  `orders_created` datetime NOT NULL,
  `orders_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_orders`
--

INSERT INTO `sccv1_orders` (`orders_aid`, `orders_number`, `orders_is_paid`, `orders_product_id`, `orders_member_id`, `orders_product_quantity`, `orders_product_amount`, `orders_date`, `orders_created`, `orders_datetime`) VALUES
(11, 'ord-001', 1, '7', '2', '1', '210', '2023-05-10 08:29:53', '2023-05-10 08:30:00', '2023-05-10 11:55:08'),
(12, 'ord-002', 0, '5', '3', '2', '170', '2023-05-10 11:59:31', '2023-05-10 12:00:17', '2023-05-10 12:00:17');

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
(1, 'egg', 1, '2023-04-19 16:30:22', '2023-05-08 11:41:18'),
(2, 'seasonings', 1, '2023-04-19 16:30:27', '2023-05-08 11:48:45'),
(3, 'cleaning materials', 1, '2023-05-08 11:46:49', '2023-05-09 13:55:23');

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
  `sales_created` datetime NOT NULL,
  `sales_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_sales`
--

INSERT INTO `sccv1_sales` (`sales_aid`, `sales_number`, `sales_is_paid`, `sales_member_id`, `sales_order_id`, `sales_receive_amount`, `sales_member_change`, `sales_or`, `sales_date`, `sales_created`, `sales_datetime`) VALUES
(10, 'sls-001', 1, '2', '11', '1000', '790', '3246f576drty', '2023-05-10 11:55:08', '2023-05-10 08:30:00', '2023-05-10 11:55:08'),
(11, 'sls-002', 0, '3', '12', '0', '0', '', '', '2023-05-10 12:00:17', '2023-05-10 12:00:17');

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

--
-- Dumping data for table `sccv1_savings`
--

INSERT INTO `sccv1_savings` (`savings_aid`, `savings_member_id`, `savings_date`, `savings_category`, `savings_deposite`, `savings_withdrawal`, `savings_interest`, `savings_or`, `savings_created`, `savings_datetime`) VALUES
(4, '2', '2023-05-01', '0', '500', '0', '0', 'ss34534566', '2023-05-09 10:00:00', '2023-05-09 10:00:25');

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
(10, 1, '3', 'cyrene.lumabas@frontlinebusiness.com.ph', 13, '', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '2023-03-23 16:21:35', '2023-03-23 16:27:08'),
(14, 1, '2', 'cyrenemlumabas@gmail.com', 14, '', '$2y$10$Wsq8tTePhUDCmKqhsWuvNuXD7NICwGlnf4krXQzhIkhOk1bPREGza', '2023-03-09 16:38:45', '2023-03-23 06:49:44');

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
  `stocks_quantity` varchar(20) NOT NULL,
  `stocks_created` datetime NOT NULL,
  `stocks_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv1_stocks`
--

INSERT INTO `sccv1_stocks` (`stocks_aid`, `stocks_is_pending`, `stocks_number`, `stocks_product_id`, `stocks_or`, `stocks_quantity`, `stocks_created`, `stocks_datetime`) VALUES
(4, 0, 'stc-001', '5', 'bpofjg09r85-095', '20', '2023-04-25 06:49:04', '2023-05-08 12:13:20'),
(6, 0, 'stc-002', '5', '21dfgsdft', '20', '2023-04-26 16:50:27', '2023-05-08 12:12:09'),
(7, 0, 'stc-003', '7', 'bpofjg09r85-095', '2', '2023-04-26 17:06:12', '2023-05-08 12:12:03'),
(8, 1, 'stc-004', '13', '13235468d', '20', '2023-05-08 14:07:23', '2023-05-08 14:07:23');

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
(1, 'fbs', 1, 'Brgy, San Ignaio', 'maja', '031231324657', '2023-04-19 16:29:03', '2023-04-19 16:29:03'),
(2, 'fca', 1, 'Brgy, San Cristobal', 'Luffy', '090956132654', '2023-04-26 17:05:37', '2023-04-26 17:05:37');

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
(5, 'alamang', 'prod-001', '80', '85', '90', '2', '1', '2023-04-24 16:48:33', '2023-05-08 11:54:26'),
(6, 'egg small', 'prod-002', '190', '195', '200', '1', '2', '2023-04-26 17:05:46', '2023-05-08 12:29:38'),
(7, 'egg medium', 'prod-003', '205', '210', '215', '1', '2', '2023-04-26 17:05:54', '2023-05-08 12:44:58'),
(8, 'egg large', 'prod-004', '230', '235', '240', '1', '2', '2023-05-08 11:51:29', '2023-05-08 12:24:04'),
(9, 'chili garlic paste', 'prod-005', '80', '85', '90', '2', '1', '2023-05-08 11:52:42', '2023-05-08 12:23:41'),
(10, 'kimchi', 'prod-006', '110', '115', '120', '2', '1', '2023-05-08 11:53:03', '2023-05-08 12:29:52'),
(11, 'dishwashing liquid', 'prod-007', '30', '35', '40', '3', '1', '2023-05-08 11:53:36', '2023-05-08 12:23:51'),
(13, 'walis ting-ting', 'prod-008', '25', '', '', '3', '1', '2023-05-08 13:57:31', '2023-05-08 13:57:31');

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
  MODIFY `capital_share_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv1_file_upload`
--
ALTER TABLE `sccv1_file_upload`
  MODIFY `file_upload_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_legal_beneficiaries`
--
ALTER TABLE `sccv1_legal_beneficiaries`
  MODIFY `beneficiaries_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  MODIFY `members_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sccv1_orders`
--
ALTER TABLE `sccv1_orders`
  MODIFY `orders_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  MODIFY `product_category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sccv1_sales`
--
ALTER TABLE `sccv1_sales`
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_other`
--
ALTER TABLE `sccv1_settings_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_system`
--
ALTER TABLE `sccv1_settings_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  MODIFY `stocks_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sccv1_suppliers`
--
ALTER TABLE `sccv1_suppliers`
  MODIFY `suppliers_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv1_suppliers_products`
--
ALTER TABLE `sccv1_suppliers_products`
  MODIFY `suppliers_products_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
