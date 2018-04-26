-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2018 at 07:35 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `piw`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(555) NOT NULL,
  `file` varchar(555) NOT NULL,
  `client` varchar(555) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `projectType` int(11) NOT NULL,
  `htmlWorkStatus` int(11) NOT NULL DEFAULT '0',
  `descriptionWorkStatus` int(11) NOT NULL DEFAULT '0',
  `htmlWorkUsers` longtext NOT NULL,
  `descriptionWorkUsers` longtext NOT NULL,
  `updatedDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `htmlQcStatus` int(11) NOT NULL DEFAULT '0',
  `descriptionQcStatus` int(11) NOT NULL DEFAULT '0',
  `htmlQcUsers` longtext NOT NULL,
  `descriptionQcUsers` longtext NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `createdDate`, `name`, `file`, `client`, `startDate`, `endDate`, `createdBy`, `updatedBy`, `projectType`, `htmlWorkStatus`, `descriptionWorkStatus`, `htmlWorkUsers`, `descriptionWorkUsers`, `updatedDate`, `isActive`, `htmlQcStatus`, `descriptionQcStatus`, `htmlQcUsers`, `descriptionQcUsers`, `comment`) VALUES
(1, '2018-04-06 11:50:01', 'project1', 'fil1.xlsx', 'client1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 3, 1, 0, 0, '3', '', '0000-00-00 00:00:00', 1, 0, 0, '', '', ''),
(2, '2018-04-06 12:40:42', 'project2', 'fil2.xlsx', 'client2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 0, 1, 0, 0, '4', '4,3', '0000-00-00 00:00:00', 1, 0, 0, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `name`, `email`, `password`, `regdate`, `role`, `gender`) VALUES
(1, 'qgold', 'admin@qgold.com', 'admin', '2018-03-23 07:39:00', 1, 'male'),
(2, 'sanchit sawardekar', 'sanchit@qgold.com', 'sanchit', '2018-03-23 07:39:00', 2, 'male'),
(3, 'ashwini utturkar', 'ashwini@qgold.com', 'ashwini', '2018-03-23 10:58:56', 3, 'female'),
(4, 'hiren lad', 'hiren@qgold.com', 'hiren', '2018-03-26 09:14:09', 3, 'male'),
(7, 'suyogi mehta', 'suyogi@qc.com', 'suyogi', '2018-04-04 06:46:18', 2, 'female'),
(8, 'sanket Munj', 'sanket@qgold.com', 'sanket', '2018-04-04 07:50:48', 2, 'male');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('WkydRTotC9SebIUzitBg6p82o937pSLw', 1523081039, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userData\":{\"id\":1,\"name\":\"qgold\",\"email\":\"admin@qgold.com\",\"regdate\":\"2018-03-23T07:39:00.000Z\",\"role\":1}}'),
('Y-sofivBemi4syAXtomq_DIDq9akkebF', 1523080631, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userData\":{\"id\":1,\"name\":\"qgold\",\"email\":\"admin@qgold.com\",\"regdate\":\"2018-03-23T07:39:00.000Z\",\"role\":1}}'),
('kZhTtUj2jTa9rJWnKVO7nQxVnJmMhZJ3', 1523080669, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userData\":{\"id\":3,\"name\":\"ashwini utturkar\",\"email\":\"ashwini@qgold.com\",\"regdate\":\"2018-03-23T10:58:56.000Z\",\"role\":3}}');

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

CREATE TABLE `work` (
  `id` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `style` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `htmlWorkUser` int(11) NOT NULL,
  `htmlWorkStatus` int(11) NOT NULL DEFAULT '0',
  `descriptionWorkUser` int(11) NOT NULL,
  `descriptionWorkStatus` int(11) NOT NULL DEFAULT '0',
  `htmlQcUser` int(11) NOT NULL,
  `htmlQcStatus` int(11) NOT NULL DEFAULT '0',
  `descriptionQcUser` int(11) NOT NULL,
  `descriptionQcStatus` int(11) NOT NULL DEFAULT '0',
  `adminHtmlStatus` int(11) NOT NULL DEFAULT '0',
  `adminDescriptionStatus` int(11) NOT NULL DEFAULT '0',
  `lastmodified` date NOT NULL,
  `html` text NOT NULL,
  `longdescription` text NOT NULL,
  `createdBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workstatus`
--

CREATE TABLE `workstatus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workstatus`
--

INSERT INTO `workstatus` (`id`, `name`) VALUES
(0, 'Pending'),
(1, 'In Progress'),
(2, 'In Review'),
(3, 'Completed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workstatus`
--
ALTER TABLE `workstatus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `work`
--
ALTER TABLE `work`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workstatus`
--
ALTER TABLE `workstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
