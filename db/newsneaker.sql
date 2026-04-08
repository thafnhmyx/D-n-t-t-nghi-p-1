-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 03, 2026 lúc 09:46 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `newsneaker`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `adress` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brand`
--

INSERT INTO `brand` (`id`, `name`, `quantity`, `description`, `status`) VALUES
(1, 'Nike', 0, 'Just Do It', 'Available'),
(2, 'Adidas', 0, 'Impossible is nothing', 'Available'),
(3, 'Jordan', 0, 'Air Jordan Legacy', 'Available'),
(4, 'Puma', 0, NULL, 'Available'),
(5, 'Vans', 0, NULL, 'Available'),
(6, 'Hoka', 0, NULL, 'Available'),
(7, 'gg', 0, NULL, 'Hidden'),
(8, 'hh', 0, NULL, 'Hidden');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `Name`, `description`, `status`) VALUES
(1, 'Running', 'Giày chạy bộ chuyên dụng', 'Available'),
(2, 'Sneaker', 'Giày thời trang hằng ngày', 'Available'),
(3, 'Basketball', 'Giày bóng rổ chuyên nghiệp', 'Available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `total_money` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT NULL,
  `order_status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`id`, `user_id`, `fullname`, `phone_number`, `address`, `total_money`, `payment_method`, `payment_status`, `order_status`, `created_at`) VALUES
(1, 3, 'Thành Mỹ', '0886569966', 'Quận 12', 7100000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 22:05:53'),
(2, 3, 'Hoàng Thành Mỹ', '0886064466', 'Quận 12', 5800000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 22:11:00'),
(3, 3, 'hh', '44444444444', 'Quận 12', 5800000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 22:17:46'),
(4, 3, 'qq', '0886569966', 'qq', 6800000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 22:55:42'),
(5, 3, 'ff', '44444444444', 'qq', 6800000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:00:32'),
(6, 3, 'hh', '0886064466', 'hh', 7400000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:05:54'),
(7, 3, 'aa', '44444444444', 'gg', 7600000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:08:19'),
(8, 3, 'gg', '0886569966', 'gg', 9000000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:11:22'),
(9, 3, 'gg', '0886569966', 'gg', 8400000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:18:24'),
(10, 3, 'll', '0886064466', 'll', 15200000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:20:44'),
(11, 3, 'bb', '0886064466', 'bb', 8200000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:24:37'),
(12, 3, 'vv', '0886569966', 'vv', 4500000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:26:30'),
(13, 3, 'cc', '0886569966', 'cc', 3900000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:28:13'),
(14, 3, 'cc', '0886569966', 'cccc', 4200000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:32:22'),
(15, 3, 'bb', '0886569966', 'bb', 2100000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:33:50'),
(16, 3, 'bb', '0886569966', 'bb', 2100000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:37:37'),
(17, 3, 'xx', '0886569966', 'xx', 3900000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:38:30'),
(18, 3, 'yy', '0886064466', 'yy', 7400000.00, 'COD', 'Unpaid', 'Pending', '2026-04-02 23:48:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_variant_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `order_id`, `product_variant_id`, `quantity`, `price`) VALUES
(1, 1, 98, 1, 3400000.00),
(2, 1, 97, 1, 3700000.00),
(3, 2, 52, 2, 2900000.00),
(4, 3, 52, 2, 2900000.00),
(5, 4, 98, 2, 3400000.00),
(6, 5, 98, 2, 3400000.00),
(7, 6, 97, 2, 3700000.00),
(8, 7, 96, 2, 3800000.00),
(9, 8, 93, 2, 4500000.00),
(10, 9, 94, 2, 4200000.00),
(11, 10, 96, 4, 3800000.00),
(12, 11, 95, 2, 4100000.00),
(13, 12, 93, 1, 4500000.00),
(14, 13, 92, 1, 3900000.00),
(15, 14, 94, 1, 4200000.00),
(16, 16, 85, 1, 2100000.00),
(17, 17, 92, 1, 3900000.00),
(18, 18, 52, 1, 2900000.00),
(19, 18, 55, 1, 2600000.00),
(20, 18, 59, 1, 1900000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `post`
--

INSERT INTO `post` (`id`, `title`, `content`, `image`, `views`, `status`, `created_at`, `author_id`) VALUES
(1, 'Cách vệ sinh giày Sneaker', 'Nội dung hướng dẫn vệ sinh giày tại nhà...', 'blog1.jpg', 0, NULL, '2026-03-27 09:23:18', 1),
(2, 'Xu hướng giày 2026', 'Những mẫu giày sẽ lên ngôi trong năm nay...', 'blog2.jpg', 0, NULL, '2026-03-27 09:23:18', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Available',
  `gender` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `brand_id`, `category_id`, `name`, `price`, `description`, `image`, `status`, `gender`, `created_at`) VALUES
(52, 1, 1, 'Nike Air Force 1 07', 2900000.00, 'Biểu tượng thời trang đường phố.', 'nike-1.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(53, 1, 1, 'Nike Dunk Low Panda', 3500000.00, 'Phối màu kinh điển đen trắng.', 'nike-2.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(54, 1, 2, 'Nike Air Max 97 Metallic', 4200000.00, 'Thiết kế lấy cảm hứng từ tàu điện ngầm.', 'nike-3.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(55, 1, 1, 'Nike Blazer Mid 77', 2600000.00, 'Phong cách cổ điển retro.', 'nike-4.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(56, 1, 2, 'Nike Pegasus 40 Premium', 3800000.00, 'Giày chạy bộ chuyên nghiệp.', 'nike-5.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(57, 1, 1, 'Nike Cortez Basic', 2200000.00, 'Mẫu giày lâu đời nhất của Nike.', 'nike-6.png', 'Available', 'Women', '2026-04-01 02:41:47'),
(58, 1, 2, 'Nike Air Max Excee', 2800000.00, 'Biến thể hiện đại của Air Max 90.', 'nike-7.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(59, 1, 2, 'Nike Revolution 7', 1900000.00, 'Giày chạy bộ giá rẻ bền bỉ.', 'nike-8.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(60, 2, 1, 'Adidas Samba OG', 3100000.00, 'Mẫu giày đang cực hot hiện nay.', 'adidas-1.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(61, 2, 1, 'Adidas Gazelle Indoor', 3300000.00, 'Phong cách bóng đá những năm 70.', 'adidas-2.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(62, 2, 2, 'Adidas Ultraboost Light', 5000000.00, 'Công nghệ đệm Boost êm ái nhất.', 'adidas-3.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(63, 2, 1, 'Adidas Stan Smith Lux', 3500000.00, 'Huyền thoại tối giản.', 'adidas-4.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(64, 2, 1, 'Adidas Superstar Core Black', 2800000.00, 'Mũi giày vỏ sò đặc trưng.', 'adidas-5.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(65, 2, 1, 'Adidas NMD R1 V3', 4200000.00, 'Dành cho những người khám phá đô thị.', 'adidas-6.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(66, 2, 1, 'Adidas Forum Low CL', 3200000.00, 'Giày bóng rổ thập niên 80.', 'adidas-7.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(67, 2, 1, 'Adidas SL 72 OG', 2900000.00, 'Mẫu giày siêu nhẹ phong cách vintage.', 'adidas-8.png', 'Available', 'Women', '2026-04-01 02:41:47'),
(68, 3, 3, 'Air Jordan 1 High Lost & Found', 9500000.00, 'Cực phẩm dành cho giới sưu tầm.', 'jordan-1.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(69, 3, 3, 'Air Jordan 4 Retro Bred Reimagined', 8500000.00, 'Màu đỏ đen huyền thoại.', 'jordan-2.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(70, 3, 1, 'Air Jordan 1 Low Wolf Grey', 4500000.00, 'Phối màu sang trọng dễ phối đồ.', 'jordan-3.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(71, 3, 3, 'Air Jordan 3 Retro Cement', 6500000.00, 'Họa tiết da voi đặc trưng.', 'jordan-4.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(72, 3, 3, 'Air Jordan 11 Cherry', 7200000.00, 'Giày bóng rổ phong cách cổ điển.', 'jordan-5.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(73, 3, 3, 'Air Jordan 1 Mid Lucky Green', 3800000.00, 'Sự kết hợp màu xanh lá trẻ trung.', 'jordan-6.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(74, 3, 1, 'Jordan Stadium 90', 3600000.00, 'Thiết kế hiện đại mang hơi thở 90s.', 'jordan-7.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(75, 3, 3, 'Jordan Max Aura 5', 3200000.00, 'Giày bóng rổ hiệu năng cao.', 'jordan-8.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(76, 4, 1, 'Puma Suede Classic XXI', 2200000.00, 'Huyền thoại chất liệu da lộn.', 'puma-1.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(77, 4, 1, 'Puma RS-X Efekt', 3500000.00, 'Phong cách thiết kế cồng kềnh Chunky.', 'puma-2.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(78, 4, 1, 'Puma Cali Star', 2500000.00, 'Phong cách trẻ trung.', 'puma-3.png', 'Available', 'Women', '2026-04-01 02:41:47'),
(79, 4, 1, 'Puma Mayze Stack', 2800000.00, 'Đế bánh mì dành cho phái đẹp.', 'puma-4.png', 'Available', 'Women', '2026-04-01 02:41:47'),
(80, 4, 2, 'Puma Velocity Nitro 3', 3900000.00, 'Công nghệ Nitro siêu nhẹ.', 'puma-5.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(81, 4, 1, 'Puma Palermo Special', 2700000.00, 'Mẫu giày Terrace cổ điển.', 'puma-6.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(82, 4, 1, 'Puma Slipstream Lo', 3100000.00, 'Di sản bóng rổ Puma.', 'puma-7.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(83, 4, 1, 'Puma Smash V3', 1700000.00, 'Giày sneaker giá tốt cho hằng ngày.', 'puma-8.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(84, 5, 1, 'Vans Old Skool Core Class', 1850000.00, 'Sọc jazz kinh điển.', 'vans-1.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(85, 5, 1, 'Vans Sk8-Hi Black White', 2100000.00, 'Giày cao cổ phong cách Skater.', 'vans-2.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(86, 5, 1, 'Vans Classic Slip-On Checkerboard', 1650000.00, 'Họa tiết caro huyền thoại.', 'vans-3.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(87, 5, 1, 'Vans Authentic Navy', 1550000.00, 'Thiết kế tối giản nguyên bản.', 'vans-4.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(88, 5, 1, 'Vans Era True White', 1600000.00, 'Mẫu giày cổ thấp đệm êm.', 'vans-5.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(89, 5, 1, 'Vans Knu Skool Black Gum', 2600000.00, 'Phong cách mập mạp 90s.', 'vans-6.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(90, 5, 2, 'Vans Ultrarange Exo', 3200000.00, 'Dòng giày dành cho dân du lịch.', 'vans-7.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(91, 5, 1, 'Vans Half Cab 33 DX', 2400000.00, 'Biểu tượng của môn trượt ván.', 'vans-8.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(92, 6, 2, 'Hoka Clifton 9 Black', 3900000.00, 'Vua của dòng giày chạy bộ hằng ngày.', 'hoka-1.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(93, 6, 2, 'Hoka Bondi 8 Shark', 4500000.00, 'Độ đệm tối đa bảo vệ khớp chân.', 'hoka-2.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(94, 6, 2, 'Hoka Speedgoat 5 Blue', 4200000.00, 'Giày chạy địa hình (Trail) tốt nhất.', 'hoka-3.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(95, 6, 2, 'Hoka Mach 6 Flame', 4100000.00, 'Tối ưu cho những buổi chạy tốc độ.', 'hoka-4.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(96, 6, 2, 'Hoka Challenger 7', 3800000.00, 'Sự kết hợp giữa đường bằng và địa hình.', 'hoka-5.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(97, 6, 1, 'Hoka Transport All White', 3700000.00, 'Giày sneaker phong cách di chuyển đô thị.', 'hoka-6.png', 'Available', 'Unisex', '2026-04-01 02:41:47'),
(98, 6, 2, 'Hoka Rincon 3 Wide', 3400000.00, 'Siêu nhẹ và thoáng khí.', 'hoka-7.png', 'Available', 'Men', '2026-04-01 02:41:47'),
(104, 2, 3, 'tm', 1111.00, '', '1775056528285.jpg', 'Hidden', 'Unisex', '2026-04-01 15:15:28'),
(105, 3, 2, 'bb', 99999999.99, '', '1775056542391.jpg', 'Hidden', 'Unisex', '2026-04-01 15:15:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productsvariants`
--

CREATE TABLE `productsvariants` (
  `id` int(11) NOT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `size` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `productsvariants`
--

INSERT INTO `productsvariants` (`id`, `ProductID`, `size`, `quantity`) VALUES
(6, 52, 39, 20),
(7, 52, 40, 20),
(8, 52, 41, 20),
(9, 52, 42, 20),
(10, 52, 43, 20),
(11, 53, 39, 20),
(12, 53, 40, 20),
(13, 53, 41, 20),
(14, 53, 42, 20),
(15, 53, 43, 20),
(16, 54, 39, 20),
(17, 54, 40, 20),
(18, 54, 41, 20),
(19, 54, 42, 20),
(20, 54, 43, 20),
(21, 55, 39, 20),
(22, 55, 40, 20),
(23, 55, 41, 20),
(24, 55, 42, 20),
(25, 55, 43, 20),
(26, 56, 39, 20),
(27, 56, 40, 20),
(28, 56, 41, 20),
(29, 56, 42, 20),
(30, 56, 43, 20),
(31, 57, 39, 20),
(32, 57, 40, 20),
(33, 57, 41, 20),
(34, 57, 42, 20),
(35, 57, 43, 20),
(36, 58, 39, 20),
(37, 58, 40, 20),
(38, 58, 41, 20),
(39, 58, 42, 20),
(40, 58, 43, 20),
(41, 59, 39, 20),
(42, 59, 40, 20),
(43, 59, 41, 20),
(44, 59, 42, 20),
(45, 59, 43, 20),
(46, 60, 39, 20),
(47, 60, 40, 20),
(48, 60, 41, 20),
(49, 60, 42, 20),
(50, 60, 43, 20),
(51, 61, 39, 20),
(52, 61, 40, 15),
(53, 61, 41, 20),
(54, 61, 42, 20),
(55, 61, 43, 19),
(56, 62, 39, 20),
(57, 62, 40, 20),
(58, 62, 41, 20),
(59, 62, 42, 19),
(60, 62, 43, 20),
(61, 63, 39, 20),
(62, 63, 40, 20),
(63, 63, 41, 20),
(64, 63, 42, 20),
(65, 63, 43, 20),
(66, 64, 39, 20),
(67, 64, 40, 20),
(68, 64, 41, 20),
(69, 64, 42, 20),
(70, 64, 43, 20),
(71, 65, 39, 20),
(72, 65, 40, 20),
(73, 65, 41, 20),
(74, 65, 42, 20),
(75, 65, 43, 20),
(76, 66, 39, 20),
(77, 66, 40, 20),
(78, 66, 41, 20),
(79, 66, 42, 20),
(80, 66, 43, 20),
(81, 67, 39, 20),
(82, 67, 40, 20),
(83, 67, 41, 20),
(84, 67, 42, 20),
(85, 67, 43, 19),
(86, 104, 39, 20),
(87, 104, 40, 20),
(88, 104, 41, 20),
(89, 104, 42, 20),
(90, 104, 43, 20),
(91, 68, 39, 20),
(92, 68, 40, 18),
(93, 68, 41, 17),
(94, 68, 42, 17),
(95, 68, 43, 18),
(96, 69, 39, 14),
(97, 69, 40, 17),
(98, 69, 41, 15),
(99, 69, 42, 20),
(100, 69, 43, 20),
(101, 70, 39, 20),
(102, 70, 40, 20),
(103, 70, 41, 20),
(104, 70, 42, 20),
(105, 70, 43, 20),
(106, 71, 39, 20),
(107, 71, 40, 20),
(108, 71, 41, 20),
(109, 71, 42, 20),
(110, 71, 43, 20),
(111, 72, 39, 20),
(112, 72, 40, 20),
(113, 72, 41, 20),
(114, 72, 42, 20),
(115, 72, 43, 20),
(116, 73, 39, 20),
(117, 73, 40, 20),
(118, 73, 41, 20),
(119, 73, 42, 20),
(120, 73, 43, 20),
(121, 74, 39, 20),
(122, 74, 40, 20),
(123, 74, 41, 20),
(124, 74, 42, 20),
(125, 74, 43, 20),
(126, 75, 39, 20),
(127, 75, 40, 20),
(128, 75, 41, 20),
(129, 75, 42, 20),
(130, 75, 43, 20),
(131, 105, 39, 20),
(132, 105, 40, 20),
(133, 105, 41, 20),
(134, 105, 42, 20),
(135, 105, 43, 20),
(136, 76, 39, 20),
(137, 76, 40, 20),
(138, 76, 41, 20),
(139, 76, 42, 20),
(140, 76, 43, 20),
(141, 77, 39, 20),
(142, 77, 40, 20),
(143, 77, 41, 20),
(144, 77, 42, 20),
(145, 77, 43, 20),
(146, 78, 39, 20),
(147, 78, 40, 20),
(148, 78, 41, 20),
(149, 78, 42, 20),
(150, 78, 43, 20),
(151, 79, 39, 20),
(152, 79, 40, 20),
(153, 79, 41, 20),
(154, 79, 42, 20),
(155, 79, 43, 20),
(156, 80, 39, 20),
(157, 80, 40, 20),
(158, 80, 41, 20),
(159, 80, 42, 20),
(160, 80, 43, 20),
(161, 81, 39, 20),
(162, 81, 40, 20),
(163, 81, 41, 20),
(164, 81, 42, 20),
(165, 81, 43, 20),
(166, 82, 39, 20),
(167, 82, 40, 20),
(168, 82, 41, 20),
(169, 82, 42, 20),
(170, 82, 43, 20),
(171, 83, 39, 20),
(172, 83, 40, 20),
(173, 83, 41, 20),
(174, 83, 42, 20),
(175, 83, 43, 20),
(176, 84, 39, 20),
(177, 84, 40, 20),
(178, 84, 41, 20),
(179, 84, 42, 20),
(180, 84, 43, 20),
(181, 85, 39, 20),
(182, 85, 40, 20),
(183, 85, 41, 20),
(184, 85, 42, 20),
(185, 85, 43, 20),
(186, 86, 39, 20),
(187, 86, 40, 20),
(188, 86, 41, 20),
(189, 86, 42, 20),
(190, 86, 43, 20),
(191, 87, 39, 20),
(192, 87, 40, 20),
(193, 87, 41, 20),
(194, 87, 42, 20),
(195, 87, 43, 20),
(196, 88, 39, 20),
(197, 88, 40, 20),
(198, 88, 41, 20),
(199, 88, 42, 20),
(200, 88, 43, 20),
(201, 89, 39, 20),
(202, 89, 40, 20),
(203, 89, 41, 20),
(204, 89, 42, 20),
(205, 89, 43, 20),
(206, 90, 39, 20),
(207, 90, 40, 20),
(208, 90, 41, 20),
(209, 90, 42, 20),
(210, 90, 43, 20),
(211, 91, 39, 20),
(212, 91, 40, 20),
(213, 91, 41, 20),
(214, 91, 42, 20),
(215, 91, 43, 20),
(216, 92, 39, 20),
(217, 92, 40, 20),
(218, 92, 41, 20),
(219, 92, 42, 20),
(220, 92, 43, 20),
(221, 93, 39, 20),
(222, 93, 40, 20),
(223, 93, 41, 20),
(224, 93, 42, 20),
(225, 93, 43, 20),
(226, 94, 39, 20),
(227, 94, 40, 20),
(228, 94, 41, 20),
(229, 94, 42, 20),
(230, 94, 43, 20),
(231, 95, 39, 20),
(232, 95, 40, 20),
(233, 95, 41, 20),
(234, 95, 42, 20),
(235, 95, 43, 20),
(236, 96, 39, 20),
(237, 96, 40, 20),
(238, 96, 41, 20),
(239, 96, 42, 20),
(240, 96, 43, 20),
(241, 97, 39, 20),
(242, 97, 40, 20),
(243, 97, 41, 20),
(244, 97, 42, 20),
(245, 97, 43, 20),
(246, 98, 39, 20),
(247, 98, 40, 20),
(248, 98, 41, 20),
(249, 98, 42, 20),
(250, 98, 43, 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `Name`, `Email`, `sdt`, `password`, `isAdmin`) VALUES
(1, 'Admin', 'admin@gmail.com', '0901234567', '$2b$10$cr4yd3B8om5.cnAXweJTiuiFLPlWsb3mKXXvDiM1n4MA9jeglh2A6', 1),
(2, 'Thành Mỹ', 'thafnhmyx@gmail.com', '0987654321', '$2b$10$as8PiRivg8vGjLRTS1i8nuQXxOaWbw/222gBQ0qL7W4m8KhZ72TQi', 0),
(3, 'Hoàng Thành Mỹ', 'vothanhmy316@gmail.com', '', '$2b$10$ksvbLYTZ0EeJ6kGUNlu09epX8oKy6KOdZcytJkSb.3DJjMQ9XO6Ba', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Chỉ mục cho bảng `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `productsvariants`
--
ALTER TABLE `productsvariants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT cho bảng `productsvariants`
--
ALTER TABLE `productsvariants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=261;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `productsvariants` (`id`);

--
-- Các ràng buộc cho bảng `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Các ràng buộc cho bảng `productsvariants`
--
ALTER TABLE `productsvariants`
  ADD CONSTRAINT `productsvariants_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
