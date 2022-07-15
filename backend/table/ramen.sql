-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306:4306
-- Generation Time: Jul 15, 2022 at 05:15 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ramen`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `SID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `valid_Time` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`SID`, `username`, `password`, `valid_Time`, `created_at`) VALUES
(1, 'admin', '$2a$10$4sje11/ZvDlJ2JtJIR1cEunOpEXPkJPe1czMZg3ox.cmSS08EiunC', '2030-07-01 23:52:41', '2022-07-07 17:52:41');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `salesOrder` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quality` int(11) NOT NULL,
  `TotalPrice` int(11) NOT NULL,
  `cart_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`salesOrder`, `username`, `product_id`, `quality`, `TotalPrice`, `cart_created`) VALUES
(1, 'admintest', 1, 1, 230, '2022-07-10 12:00:56'),
(4, 'admintest', 3, 3, 300, '2022-07-10 12:03:02'),
(5, 'admintest', 2, 1, 150, '2022-07-10 12:03:14');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `sid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `mobile` int(10) NOT NULL,
  `address` text NOT NULL,
  `birthday` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`sid`, `username`, `password`, `created_at`, `mobile`, `address`, `birthday`) VALUES
(1, 'admintest', '$2a$10$CTRZ6TJoWyXWq.cGCkUwye5GflkjUjg3M1FOPVycupakjfIQLXfXi', '2022-07-01 09:39:02', 988123456, '12485798jbjfuvkbjhfgmj', '1989-12-06 15:39:02');

-- --------------------------------------------------------

--
-- Table structure for table `product_detail`
--

CREATE TABLE `product_detail` (
  `product_sid` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text DEFAULT NULL,
  `Publish_Date` datetime NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`product_sid`, `product_name`, `product_description`, `Publish_Date`, `price`) VALUES
(1, '娘惹辣炸雞飯', ' 辣雞飯勢必能夠左右未來。我們都很清楚，這是個嚴謹的議題。池田大作說過一句發人省思的話，不要迴避苦惱和困難，挺起身來向它挑戰，進而克服它。這段話雖短，卻足以改變人類的歷史。我以為我了解辣雞飯，但我真的了解辣雞飯嗎？仔細想想，我對辣雞飯的理解只是皮毛而已。', '2022-12-07 00:00:00', 230),
(2, '青檸酸酸粉', '白茵說過一句著名的話，最忙的人有最多的時間。這句話幾乎解讀出了問題的根本。約翰勳曾提出，愛情是兩顆靈魂的結合。這似乎解答了我的疑惑。我們不妨可以這樣來想: 青檸酸酸粉的發生，到底需要如何實現，不青檸酸酸粉的發生，又會如何產生。', '0000-00-00 00:00:00', 180),
(3, '照燒日式蓋飯', '艾潤生講過一段深奧的話，一個人的生命是短暫的，而我的事業卻無限的長久，個人儘管遭到不幸和許多痛苦，但是我們的勞動融合在集體的勝利裡，這幸福有我的一份。只要我活一天，我一定為黨為人民工作一天。什麼是最大的幸福？毫不利己，專門利人。這影響了我的價值觀。其實，若思緒夠清晰，那麼照燒日式蓋飯也就不那麼複雜了。', '2022-07-12 08:01:57', 230),
(4, '家鄉炸雞椰漿飯', '顧炎武講過，人生富貴駒過隙，唯有榮名壽金石。這影響了我的價值觀。當前最急迫的事，想必就是釐清疑惑了。我認為，韓詩外曾經認為，不患人之不己知，患其不能也。這是撼動人心的。若發現問題比我們想像的還要深奧，那肯定不簡單。毛澤東在不經意間這樣說過，概念這種東西已經不是事物的現象，不是事物的各個片面，不是它們的外部聯繫，而是抓著了事物的本質，事物的全體，事物的內部聯繫了。這句話讓我們得到了一個全新的觀點去思考這個問題。我們一般認為，抓住了問題的關鍵，其他一切則會迎刃而解。每個人的一生中，幾乎可說碰到家鄉炸雞椰漿飯這件事，是必然會發生的。', '2022-07-12 08:02:24', 250),
(5, '酥脆雞塊椰漿飯', ' 酥脆雞塊椰漿飯絕對是史無前例的。所謂酥脆雞塊椰漿飯，關鍵是酥脆雞塊椰漿飯需要如何解讀。從這個角度來看，若能夠欣賞到酥脆雞塊椰漿飯的美，相信我們一定會對酥脆雞塊椰漿飯改觀。由於，李時珍講過一段深奧的話，百病必先治其本，後治其標。希望大家能從這段話中有所收穫。', '2022-07-12 08:02:45', 300),
(6, '乾辣椒烤魚飯', '孔子曾經提到過，知之者不如好之者，好之者不如樂之者。這句話語雖然很短，但令我浮想聯翩。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。需要考慮周詳乾辣椒烤魚飯的影響及因應對策。這樣看來，謹慎地來說，我們必須考慮到所有可能。', '2022-07-12 08:03:08', 280),
(7, '一鍋咖哩雞', ' 面對如此難題，我們必須設想周全。一鍋咖哩雞絕對是史無前例的。問題的關鍵究竟為何？老舊的想法已經過時了。所謂一鍋咖哩雞，關鍵是一鍋咖哩雞需要如何解讀。探討一鍋咖哩雞時，如果發現非常複雜，那麼想必不簡單。對於一鍋咖哩雞，我們不能不去想，卻也不能走火入魔。', '2022-07-12 08:03:29', 300),
(8, '三八炸雞椰漿飯', '可是，即使是這樣，三八炸雞椰漿飯的出現仍然代表了一定的意義。如果別人做得到，那我也可以做到。高爾基說過一句富有哲理的話，理智要比心靈為高，思想要比感情可靠。希望各位能用心體會這段話。這樣看來，我們一般認為，抓住了問題的關鍵，其他一切則會迎刃而解。', '2022-07-12 08:03:47', 320),
(9, '滷豬肉和有機蛋', '就我個人來說，滷豬肉和有機蛋對我的意義，不能不說非常重大。但丁曾經提過，愛情使人心的憧憬昇華到至善之境。這不禁令我重新仔細的思考。儘管如此，我們仍然需要對滷豬肉和有機蛋保持懷疑的態度。滷豬肉和有機蛋因何而發生？塞萬提斯講過一段耐人尋思的話，財富可以彌補許多不足之處。這段話令我陷入了沈思。', '2022-07-12 08:04:05', 100),
(10, '白胡椒排骨湯', '愛默生曾經提到過，即使斷了一條弦，其餘的三條弦還是要繼續演奏，這就是人生。這句話反映了問題的急切性。世界需要改革，需要對白胡椒排骨湯有新的認知。謹慎地來說，我們必須考慮到所有可能。對於一般人來說，白胡椒排骨湯究竟象徵著什麼呢？', '2022-07-12 08:04:31', 120),
(11, '夠力的燒肉', '培根講過一段深奧的話，友誼的主要效用之一就在使人心中的憤懣抑鬱之氣得以宣洩弛放，這些不平凡之氣是各種的情感都可以引起的。這影響了我的價值觀。夠力的燒肉的出現，必將帶領人類走向更高的巔峰。在這種困難的抉擇下，本人思來想去，寢食難安。', '2022-07-12 08:07:07', 120),
(12, '香港海運叉燒', '  問題的核心究竟是什麼？香港海運叉燒對我來說，已經成為了我生活的一部分。探討香港海運叉燒時，如果發現非常複雜，那麼想必不簡單。既然如此，其實，若思緒夠清晰，那麼香港海運叉燒也就不那麼複雜了。看看別人，再想想自己，會發現問題的核心其實就在你身旁。', '2022-07-12 08:07:27', 100);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`SID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`salesOrder`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `product_detail`
--
ALTER TABLE `product_detail`
  ADD PRIMARY KEY (`product_sid`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `salesOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_detail`
--
ALTER TABLE `product_detail`
  MODIFY `product_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
