-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 10:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_announcement`
--

INSERT INTO `sccv1_announcement` (`announcement_aid`, `announcement_name`, `announcement_description`, `announcement_is_active`, `announcement_date`, `announcement_created`, `announcement_datetime`) VALUES
(1, 'Testing Announcement', 'Testing Announcement', 1, '2023-04-19', '2023-04-19 16:28:04', '2023-04-19 16:28:04');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_blotter_or_invoice`
--

CREATE TABLE `sccv1_blotter_or_invoice` (
  `or_invoice_aid` int(11) NOT NULL,
  `or_invoice_type` varchar(2) NOT NULL,
  `or_invoice_date` varchar(20) NOT NULL,
  `or_invoice_or_no` varchar(20) NOT NULL,
  `or_invoice_payee_id` varchar(20) NOT NULL,
  `or_invoice_amount` varchar(20) NOT NULL,
  `or_invoice_remarks` varchar(200) NOT NULL,
  `or_invoice_created` datetime NOT NULL,
  `or_invoice_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_blotter_petty_cash`
--

CREATE TABLE `sccv1_blotter_petty_cash` (
  `petty_cash_aid` int(11) NOT NULL,
  `petty_cash_date` varchar(20) NOT NULL,
  `petty_cash_voucher_no` varchar(50) NOT NULL,
  `petty_cash_payee_name` varchar(100) NOT NULL,
  `petty_cash_in` varchar(20) NOT NULL,
  `petty_cash_out` varchar(20) NOT NULL,
  `petty_cash_balance` varchar(20) NOT NULL,
  `petty_cash_remarks` varchar(100) NOT NULL,
  `petty_cash_created` datetime NOT NULL,
  `petty_cash_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_blotter_petty_cash`
--

INSERT INTO `sccv1_blotter_petty_cash` (`petty_cash_aid`, `petty_cash_date`, `petty_cash_voucher_no`, `petty_cash_payee_name`, `petty_cash_in`, `petty_cash_out`, `petty_cash_balance`, `petty_cash_remarks`, `petty_cash_created`, `petty_cash_datetime`) VALUES
(1, '2023-07-19', 'zzz', 'Lumabas', '1000', '1000', '0', 'tests', '2023-07-19 14:50:07', '2023-08-14 10:58:33'),
(2, '2023-07-24', 'aaaa', 'Lumabas', '12', '1', '11', '', '2023-07-24 14:15:57', '2023-07-24 14:15:57');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_capital_amortization`
--

CREATE TABLE `sccv1_capital_amortization` (
  `capital_amortization_aid` int(11) NOT NULL,
  `capital_amortization_member_id` varchar(20) NOT NULL,
  `capital_amortization_date` varchar(20) NOT NULL,
  `capital_amortization_amount` varchar(20) NOT NULL,
  `capital_amortization_amount_dividend` varchar(20) NOT NULL,
  `capital_amortization_amount_patronage` varchar(20) NOT NULL,
  `capital_amortization_remarks` varchar(200) NOT NULL,
  `capital_amortization_is_active` tinyint(1) NOT NULL,
  `capital_amortization_created` datetime NOT NULL,
  `capital_amortization_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `capital_share_is_penalty` tinyint(1) NOT NULL,
  `capital_share_total` varchar(20) NOT NULL,
  `capital_share_created` datetime NOT NULL,
  `capital_share_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_capital_share`
--

INSERT INTO `sccv1_capital_share` (`capital_share_aid`, `capital_share_member_id`, `capital_share_paid_up`, `capital_share_or`, `capital_share_date`, `capital_share_is_initial_pay`, `capital_share_is_penalty`, `capital_share_total`, `capital_share_created`, `capital_share_datetime`) VALUES
(23, '5', '5000', '123123aa', '2023-02-28T13:46:41', 1, 0, '', '2023-07-10 13:46:54', '2023-07-10 14:00:44'),
(24, '5', '200', '123123aa', '2023-02-28T13:46:40', 1, 0, '', '2023-07-10 13:46:54', '2023-07-10 14:23:38'),
(25, '5', '1000', '123123aa', '2023-02-28T13:48:33', 0, 0, '6000', '2023-07-10 13:48:37', '2023-07-10 14:00:51'),
(26, '5', '1000', '123123aa', '2023-03-31T13:59:20', 0, 0, '7000', '2023-07-10 13:59:25', '2023-07-10 14:01:11'),
(27, '5', '1000', '123123aa', '2023-04-30T14:01:13', 0, 0, '8000', '2023-07-10 14:01:25', '2023-07-10 14:01:25'),
(28, '5', '1000', '123123aa', '2023-05-31T14:01:27', 0, 0, '9000', '2023-07-10 14:01:34', '2023-07-10 14:01:34'),
(29, '5', '1000', '123123aa', '2023-06-30T14:01:36', 0, 0, '10000', '2023-07-10 14:01:42', '2023-07-10 14:01:42'),
(30, '5', '1000', '123123aa', '2023-07-31T14:01:44', 0, 0, '11000', '2023-07-10 14:01:50', '2023-07-10 14:01:50'),
(31, '5', '1000', '123123aa', '2023-08-31T14:01:55', 0, 0, '12000', '2023-07-10 14:02:01', '2023-07-10 14:02:01'),
(32, '5', '1000', '123123aa', '2023-09-30T14:02:03', 0, 0, '13000', '2023-07-10 14:02:09', '2023-07-10 14:02:09'),
(33, '5', '1000', '123123aa', '2023-10-31T14:02:11', 0, 0, '14000', '2023-07-10 14:02:17', '2023-07-10 14:02:17'),
(34, '5', '1000', '123123aa', '2023-11-30T14:02:18', 0, 0, '15000', '2023-07-10 14:02:26', '2023-07-10 14:02:26'),
(36, '7', '5000', '123123aa', '2023-07-10 14:20:31', 1, 0, '', '2023-07-10 14:20:47', '2023-07-10 14:20:47'),
(37, '7', '200', '123123aa', '2023-07-10 14:20:31', 1, 0, '', '2023-07-10 14:20:47', '2023-07-10 14:20:47'),
(42, '5', '1000', '123123', '2023-12-01 15:19:50', 0, 0, '16000', '2023-07-17 15:19:58', '2023-07-17 15:19:58'),
(48, '14', '200', '123123', '2023-07-18 06:52:03', 1, 0, '', '2023-07-18 06:52:12', '2023-07-18 06:52:12'),
(49, '14', '1000', '123123', '2023-07-18 06:52:03', 1, 0, '', '2023-07-18 06:52:12', '2023-07-18 06:52:12'),
(51, '11', '200', '123123qq', '2023-07-18 07:04:36', 1, 0, '', '2023-07-18 07:04:45', '2023-07-18 07:04:45'),
(52, '11', '5000', '123123qq', '2023-07-18 07:04:36', 1, 0, '', '2023-07-18 07:04:45', '2023-07-18 07:04:45'),
(53, '11', '500', '123123', '2023-01-01 07:05:30', 0, 0, '5500', '2023-07-18 07:05:43', '2023-07-18 07:05:43'),
(56, '5', '1000', '123123aa', '2024-01-01 09:05:09', 0, 0, '17000', '2023-07-18 09:05:23', '2023-07-18 09:05:23'),
(57, '5', '200', '12133', '2024-02-01 09:09:50', 0, 1, '', '2023-07-18 09:10:04', '2023-07-18 09:10:04'),
(58, '5', '3000', '123213', '2024-03-03 09:10:07', 0, 0, '20000', '2023-07-18 09:10:31', '2023-07-18 09:10:31'),
(61, '18', '200', '123123', '2023-07-18 09:59:33', 1, 0, '', '2023-07-18 09:59:45', '2023-07-18 09:59:45'),
(62, '18', '5000', '123123', '2023-07-18 09:59:33', 1, 0, '', '2023-07-18 09:59:45', '2023-07-18 09:59:45'),
(63, '18', '500', '123132132', '2023-01-01 10:02:43', 0, 0, '5500', '2023-07-18 10:02:55', '2023-07-18 10:02:55'),
(64, '18', '500', '500', '2023-02-01 10:02:57', 0, 0, '6000', '2023-07-18 10:03:09', '2023-07-18 10:03:09'),
(66, '18', '200', 'xcgxcvb', '2023-07-18 10:03:24', 0, 1, '', '2023-07-18 10:03:31', '2023-07-18 10:03:31'),
(67, '18', '500', 'dvxz;lgjofgt', '2023-04-01 10:05:31', 0, 0, '6500', '2023-07-18 10:05:45', '2023-07-18 10:05:45'),
(68, '18', '300', 'qwertqwert', '2023-05-01 10:05:49', 0, 1, '', '2023-07-18 10:06:08', '2023-07-18 10:06:08');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_orders`
--

CREATE TABLE `sccv1_orders` (
  `orders_aid` int(11) NOT NULL,
  `orders_number` varchar(20) NOT NULL,
  `orders_is_paid` tinyint(1) NOT NULL,
  `orders_is_discounted` varchar(20) NOT NULL,
  `orders_transaction_number` varchar(20) NOT NULL,
  `orders_is_draft` tinyint(1) NOT NULL,
  `orders_product_id` varchar(20) NOT NULL,
  `orders_stocks_id` varchar(20) NOT NULL,
  `orders_member_id` varchar(20) NOT NULL,
  `orders_product_quantity` varchar(20) NOT NULL,
  `orders_product_amount` varchar(20) NOT NULL,
  `orders_product_srp` varchar(20) NOT NULL,
  `orders_suplier_price` varchar(20) NOT NULL,
  `orders_date` varchar(20) NOT NULL,
  `orders_remarks` text NOT NULL,
  `orders_created` datetime NOT NULL,
  `orders_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_orders`
--

INSERT INTO `sccv1_orders` (`orders_aid`, `orders_number`, `orders_is_paid`, `orders_is_discounted`, `orders_transaction_number`, `orders_is_draft`, `orders_product_id`, `orders_stocks_id`, `orders_member_id`, `orders_product_quantity`, `orders_product_amount`, `orders_product_srp`, `orders_suplier_price`, `orders_date`, `orders_remarks`, `orders_created`, `orders_datetime`) VALUES
(116, 'ord-001', 0, '', '', 0, '36', '26', '7', '2', '21.6', '10.8', '10', '2024-01-06', 'test', '2024-01-06 12:23:24', '2024-01-06 12:23:24'),
(117, 'ord-002', 1, '', '', 0, '36', '26', '5', '7', '75.6', '10.8', '10', '2024-01-06', 'teat', '2024-01-06 16:52:36', '2024-01-06 17:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_product_barcode`
--

CREATE TABLE `sccv1_product_barcode` (
  `product_barcode_aid` int(11) NOT NULL,
  `product_barcode_id` varchar(100) NOT NULL,
  `product_barcode_product_id` varchar(20) NOT NULL,
  `product_barcode_stocks_id` varchar(20) NOT NULL,
  `product_barcode_created` datetime NOT NULL,
  `product_barcode_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_product_barcode`
--

INSERT INTO `sccv1_product_barcode` (`product_barcode_aid`, `product_barcode_id`, `product_barcode_product_id`, `product_barcode_stocks_id`, `product_barcode_created`, `product_barcode_datetime`) VALUES
(1, '12345', '35', '24', '2024-01-06 11:24:33', '2024-01-06 11:24:33'),
(3, '12345', '36', '26', '2024-01-06 11:55:27', '2024-01-06 11:55:27');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_product_category`
--

INSERT INTO `sccv1_product_category` (`product_category_aid`, `product_category_name`, `product_category_is_active`, `product_category_created`, `product_category_datetime`) VALUES
(1, 'egg', 1, '2023-04-19 16:30:22', '2023-05-08 11:41:18'),
(2, 'seasonings', 1, '2023-04-19 16:30:27', '2023-05-08 11:48:45'),
(3, 'cleaning materials', 1, '2023-05-08 11:46:49', '2023-05-08 11:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_product_history`
--

CREATE TABLE `sccv1_product_history` (
  `product_history_aid` int(11) NOT NULL,
  `product_history_product_id` varchar(20) NOT NULL,
  `product_history_is_active` tinyint(1) NOT NULL,
  `product_history_date` varchar(20) NOT NULL,
  `product_history_price` varchar(20) NOT NULL,
  `product_history_scc_price` varchar(20) NOT NULL,
  `product_history_retail_price` varchar(20) NOT NULL,
  `product_history_ws_retail_price` varchar(20) NOT NULL,
  `product_history_ws_member_price` varchar(20) NOT NULL,
  `product_history_created` datetime NOT NULL,
  `product_history_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_product_history`
--

INSERT INTO `sccv1_product_history` (`product_history_aid`, `product_history_product_id`, `product_history_is_active`, `product_history_date`, `product_history_price`, `product_history_scc_price`, `product_history_retail_price`, `product_history_ws_retail_price`, `product_history_ws_member_price`, `product_history_created`, `product_history_datetime`) VALUES
(41, '35', 1, '2024-01-06 11:24:04', '8', '8.64', '8.72', '8.6', '8', '2024-01-06 11:24:04', '2024-01-06 11:24:04'),
(42, '36', 1, '2024-01-06 11:32:57', '10', '10.8', '10.9', '10.75', '10', '2024-01-06 11:32:57', '2024-01-06 11:32:57');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_sales`
--

INSERT INTO `sccv1_sales` (`sales_aid`, `sales_number`, `sales_is_paid`, `sales_member_id`, `sales_order_id`, `sales_receive_amount`, `sales_member_change`, `sales_or`, `sales_date`, `sales_discount`, `sales_created`, `sales_datetime`) VALUES
(2, 'sls-001', 0, '7', '116', '', '', '', '', '', '2024-01-06 12:23:24', '2024-01-06 12:23:24'),
(3, 'sls-002', 1, '5', '117', '76', '0', '4tjngn', '2024-01-06 17:05:32', '', '2024-01-06 16:52:36', '2024-01-06 17:05:32'),
(4, 'sls-003', 0, '5', '118', '', '', '', '', '0', '2024-01-06 16:53:06', '2024-01-06 16:53:06'),
(5, 'sls-004', 0, '5', '119', '', '', '', '', '0', '2024-01-06 17:00:34', '2024-01-06 17:00:34');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_settings_maintenance`
--

INSERT INTO `sccv1_settings_maintenance` (`settings_system_mode_aid`, `settings_system_mode_name`, `settings_system_mode_is_maintenance`, `settings_system_mode_is_test_mode`, `settings_system_mode_is_on`, `settings_system_mode_created`, `settings_system_mode_datetime`) VALUES
(1, 'maintenance', 1, 0, 0, '2023-05-17 02:23:37.', '2023-06-20 11:58:20'),
(2, 'test mode', 0, 1, 0, '2023-05-17 02:23:37.', '2023-05-17 02:23:37');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_netsurplus`
--

CREATE TABLE `sccv1_settings_netsurplus` (
  `net_surplus_aid` int(11) NOT NULL,
  `net_surplus_year` varchar(20) NOT NULL,
  `net_surplus_before_amount` varchar(20) NOT NULL,
  `net_surplus_distribution_amount` varchar(20) NOT NULL,
  `net_surplus_operating_expenses` varchar(20) NOT NULL,
  `net_surplus_total_income` varchar(20) NOT NULL,
  `net_surplus_general_reserve` varchar(20) NOT NULL,
  `net_surplus_general_reserve_rate` varchar(20) NOT NULL,
  `net_surplus_educ_training` varchar(20) NOT NULL,
  `net_surplus_educ_training_rate` varchar(20) NOT NULL,
  `net_surplus_community_dev` varchar(20) NOT NULL,
  `net_surplus_community_dev_rate` varchar(20) NOT NULL,
  `net_surplus_optional_fund` varchar(20) NOT NULL,
  `net_surplus_optional_fund_rate` varchar(20) NOT NULL,
  `net_surplus_allocation` varchar(20) NOT NULL,
  `net_surplus_dividend` varchar(20) NOT NULL,
  `net_surplus_dividend_rate` varchar(20) NOT NULL,
  `net_surplus_patronage_refund` varchar(20) NOT NULL,
  `net_surplus_patronage_rate` varchar(20) NOT NULL,
  `net_surplus_created` datetime NOT NULL,
  `net_surplus_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_settings_netsurplus`
--

INSERT INTO `sccv1_settings_netsurplus` (`net_surplus_aid`, `net_surplus_year`, `net_surplus_before_amount`, `net_surplus_distribution_amount`, `net_surplus_operating_expenses`, `net_surplus_total_income`, `net_surplus_general_reserve`, `net_surplus_general_reserve_rate`, `net_surplus_educ_training`, `net_surplus_educ_training_rate`, `net_surplus_community_dev`, `net_surplus_community_dev_rate`, `net_surplus_optional_fund`, `net_surplus_optional_fund_rate`, `net_surplus_allocation`, `net_surplus_dividend`, `net_surplus_dividend_rate`, `net_surplus_patronage_refund`, `net_surplus_patronage_rate`, `net_surplus_created`, `net_surplus_datetime`) VALUES
(2, '2023', '499550', '189829', '301350', '800900', '249775', '50', '', '2', '24977.5', '5', '24977.5', '5', '309721', '132880.3', '70', '37965.8', '20', '2023-07-17 09:48:57', '2023-07-18 08:57:59'),
(3, '2022', '4000', '3560', '1000', '5000', '200', '5', '80', '2', '80', '2', '80', '2', '440', '2492', '70', '1068', '30', '2023-07-18 09:01:15', '2023-07-18 09:01:15');

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_price_markup`
--

CREATE TABLE `sccv1_settings_price_markup` (
  `price_markup_aid` int(11) NOT NULL,
  `price_markup_is_active` tinyint(1) NOT NULL,
  `price_markup_retail` varchar(20) NOT NULL,
  `price_markup_member` varchar(20) NOT NULL,
  `price_markup_retail_whole_sale` varchar(20) NOT NULL,
  `price_markup_member_whole_sale` varchar(20) NOT NULL,
  `price_markup_created_at` datetime NOT NULL,
  `price_markup_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_settings_price_markup`
--

INSERT INTO `sccv1_settings_price_markup` (`price_markup_aid`, `price_markup_is_active`, `price_markup_retail`, `price_markup_member`, `price_markup_retail_whole_sale`, `price_markup_member_whole_sale`, `price_markup_created_at`, `price_markup_updated_at`) VALUES
(2, 1, '9', '8', '7.5', '', '2023-09-19 12:53:09', '2023-09-26 15:27:39'),
(4, 0, '34', '34', '3', '', '2023-09-19 13:47:38', '2023-09-20 07:01:58'),
(5, 0, '10', '9', '8', '', '2023-09-26 14:58:37', '2023-09-26 15:18:58');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_settings_role`
--

INSERT INTO `sccv1_settings_role` (`role_aid`, `role_is_active`, `role_name`, `role_description`, `role_created`, `role_datetime`, `role_is_developer`, `role_is_admin`, `role_is_member`, `role_is_manager`, `role_is_cashier`) VALUES
(12, 1, 'Developer', 'for admin.', '2023-03-09 16:03:26', '2023-03-23 16:20:06', 1, 0, 0, 0, 0),
(13, 1, 'Admin', 'for developer', '2023-03-09 16:25:26', '2023-03-09 16:25:26', 0, 1, 0, 0, 0),
(14, 1, 'Member', 'for member', '2023-03-23 16:17:15', '2023-03-23 16:17:15', 0, 0, 1, 0, 0),
(15, 1, 'Manager', 'for manager', '2023-05-10 13:27:48', '2023-05-10 13:27:48', 0, 0, 0, 1, 0),
(16, 1, 'Cashier', 'for casher', '2023-05-10 13:28:21', '2023-05-10 13:28:21', 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_settings_subscribe_capital`
--

CREATE TABLE `sccv1_settings_subscribe_capital` (
  `subscribe_capital_aid` int(11) NOT NULL,
  `subscribe_capital_date` varchar(20) NOT NULL,
  `subscribe_capital_amount` varchar(50) NOT NULL,
  `subscribe_capital_is_active` tinyint(1) NOT NULL,
  `subscribe_capital_created` datetime NOT NULL,
  `subscribe_capital_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_settings_user_other`
--

INSERT INTO `sccv1_settings_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_member_id`, `user_other_role_id`, `user_other_key`, `user_other_password`, `user_other_created`, `user_other_datetime`) VALUES
(16, 1, '5', 13, '', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '2023-05-23 10:02:48', '0000-00-00 00:00:00'),
(18, 1, '6', 13, '34f7d44e911b4ddf7da67e51c637af5e11ce1a87d51e8713e33431f0be4c1155', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '2023-05-23 10:28:21', '2023-05-23 10:28:21'),
(19, 1, '7', 13, '33f1fe1ee8888b3fb154b8c87cd0f0b3073ffa9adeca1201b35a6d7568a33079', '$2y$10$g/zE/UpZWrfsQ.mJ2KSkkOGezAwVvJSdgjeXknWI/VOyDoSl4/uLm', '2023-05-23 10:31:33', '2023-05-23 10:31:33');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `stocks_date` varchar(20) NOT NULL,
  `stocks_quantity` varchar(20) NOT NULL,
  `stocks_suplier_price_history_id` varchar(20) NOT NULL,
  `stocks_remarks` varchar(200) NOT NULL,
  `stocks_barcode_id` varchar(100) NOT NULL,
  `stocks_created` datetime NOT NULL,
  `stocks_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_stocks`
--

INSERT INTO `sccv1_stocks` (`stocks_aid`, `stocks_is_pending`, `stocks_number`, `stocks_product_id`, `stocks_or`, `stocks_date`, `stocks_quantity`, `stocks_suplier_price_history_id`, `stocks_remarks`, `stocks_barcode_id`, `stocks_created`, `stocks_datetime`) VALUES
(24, 0, 'stc-013', '35', '1212', '2024-01-06', '20', '41', 'test data', '12345', '2024-01-06 11:24:33', '2024-01-06 11:24:41'),
(26, 0, 'stc-014', '36', '1212', '2024-01-07', '10', '42', 'test two data', '12345', '2024-01-06 11:55:27', '2024-01-06 11:56:32');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `suppliers_products_retail_price` varchar(20) NOT NULL,
  `suppliers_products_ws_retail_price` varchar(20) NOT NULL,
  `suppliers_products_ws_scc_price` varchar(20) NOT NULL,
  `suppliers_products_category_id` varchar(20) NOT NULL,
  `suppliers_products_suppliers_id` varchar(20) NOT NULL,
  `suppliers_products_member_percent` varchar(20) NOT NULL,
  `suppliers_products_retail_percent` varchar(20) NOT NULL,
  `suppliers_products_ws_member_percent` varchar(20) NOT NULL,
  `suppliers_products_ws_retail_percent` varchar(20) NOT NULL,
  `suppliers_products_is_other_percent` tinyint(1) NOT NULL,
  `suppliers_products_created` datetime NOT NULL,
  `suppliers_products_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_suppliers_products`
--

INSERT INTO `sccv1_suppliers_products` (`suppliers_products_aid`, `suppliers_products_name`, `suppliers_products_number`, `suppliers_products_price`, `suppliers_products_scc_price`, `suppliers_products_retail_price`, `suppliers_products_ws_retail_price`, `suppliers_products_ws_scc_price`, `suppliers_products_category_id`, `suppliers_products_suppliers_id`, `suppliers_products_member_percent`, `suppliers_products_retail_percent`, `suppliers_products_ws_member_percent`, `suppliers_products_ws_retail_percent`, `suppliers_products_is_other_percent`, `suppliers_products_created`, `suppliers_products_datetime`) VALUES
(35, 'eggs large', 'prod-019', '8', '8.64', '8.72', '8.6', '8', '1', '2', '8', '9', '0', '7.5', 0, '2024-01-06 11:24:04', '2024-01-06 11:24:04'),
(36, 'eggs large', 'prod-020', '10', '10.8', '10.9', '10.75', '10', '1', '1', '8', '9', '0', '7.5', 0, '2024-01-06 11:32:57', '2024-01-06 11:32:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_announcement`
--
ALTER TABLE `sccv1_announcement`
  ADD PRIMARY KEY (`announcement_aid`);

--
-- Indexes for table `sccv1_blotter_or_invoice`
--
ALTER TABLE `sccv1_blotter_or_invoice`
  ADD PRIMARY KEY (`or_invoice_aid`);

--
-- Indexes for table `sccv1_blotter_petty_cash`
--
ALTER TABLE `sccv1_blotter_petty_cash`
  ADD PRIMARY KEY (`petty_cash_aid`);

--
-- Indexes for table `sccv1_capital_amortization`
--
ALTER TABLE `sccv1_capital_amortization`
  ADD PRIMARY KEY (`capital_amortization_aid`);

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
-- Indexes for table `sccv1_product_barcode`
--
ALTER TABLE `sccv1_product_barcode`
  ADD PRIMARY KEY (`product_barcode_aid`);

--
-- Indexes for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  ADD PRIMARY KEY (`product_category_aid`);

--
-- Indexes for table `sccv1_product_history`
--
ALTER TABLE `sccv1_product_history`
  ADD PRIMARY KEY (`product_history_aid`);

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
-- Indexes for table `sccv1_settings_maintenance`
--
ALTER TABLE `sccv1_settings_maintenance`
  ADD PRIMARY KEY (`settings_system_mode_aid`);

--
-- Indexes for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  ADD PRIMARY KEY (`net_surplus_aid`);

--
-- Indexes for table `sccv1_settings_price_markup`
--
ALTER TABLE `sccv1_settings_price_markup`
  ADD PRIMARY KEY (`price_markup_aid`);

--
-- Indexes for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  ADD PRIMARY KEY (`role_aid`);

--
-- Indexes for table `sccv1_settings_subscribe_capital`
--
ALTER TABLE `sccv1_settings_subscribe_capital`
  ADD PRIMARY KEY (`subscribe_capital_aid`);

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
-- AUTO_INCREMENT for table `sccv1_blotter_or_invoice`
--
ALTER TABLE `sccv1_blotter_or_invoice`
  MODIFY `or_invoice_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_blotter_petty_cash`
--
ALTER TABLE `sccv1_blotter_petty_cash`
  MODIFY `petty_cash_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv1_capital_amortization`
--
ALTER TABLE `sccv1_capital_amortization`
  MODIFY `capital_amortization_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_capital_share`
--
ALTER TABLE `sccv1_capital_share`
  MODIFY `capital_share_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `sccv1_files`
--
ALTER TABLE `sccv1_files`
  MODIFY `files_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_legal_beneficiaries`
--
ALTER TABLE `sccv1_legal_beneficiaries`
  MODIFY `beneficiaries_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_members`
--
ALTER TABLE `sccv1_members`
  MODIFY `members_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `sccv1_orders`
--
ALTER TABLE `sccv1_orders`
  MODIFY `orders_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `sccv1_product_barcode`
--
ALTER TABLE `sccv1_product_barcode`
  MODIFY `product_barcode_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv1_product_category`
--
ALTER TABLE `sccv1_product_category`
  MODIFY `product_category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sccv1_product_history`
--
ALTER TABLE `sccv1_product_history`
  MODIFY `product_history_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `sccv1_sales`
--
ALTER TABLE `sccv1_sales`
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sccv1_savings`
--
ALTER TABLE `sccv1_savings`
  MODIFY `savings_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_settings_maintenance`
--
ALTER TABLE `sccv1_settings_maintenance`
  MODIFY `settings_system_mode_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv1_settings_netsurplus`
--
ALTER TABLE `sccv1_settings_netsurplus`
  MODIFY `net_surplus_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv1_settings_price_markup`
--
ALTER TABLE `sccv1_settings_price_markup`
  MODIFY `price_markup_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sccv1_settings_role`
--
ALTER TABLE `sccv1_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sccv1_settings_subscribe_capital`
--
ALTER TABLE `sccv1_settings_subscribe_capital`
  MODIFY `subscribe_capital_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_other`
--
ALTER TABLE `sccv1_settings_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sccv1_settings_user_system`
--
ALTER TABLE `sccv1_settings_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv1_stocks`
--
ALTER TABLE `sccv1_stocks`
  MODIFY `stocks_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `sccv1_suppliers`
--
ALTER TABLE `sccv1_suppliers`
  MODIFY `suppliers_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv1_suppliers_products`
--
ALTER TABLE `sccv1_suppliers_products`
  MODIFY `suppliers_products_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
