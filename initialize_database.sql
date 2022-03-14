-- Initial setup

DROP DATABASE IF EXISTS data;
CREATE DATABASE data;

CREATE TABLE data.categories (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name TEXT NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE data.posts (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	title TEXT NOT NULL,
	url LONGTEXT NOT NULL,
	description LONGTEXT NOT NULL,
	category INT NOT NULL,
	FOREIGN KEY (category) REFERENCES data.categories(id),
	likes LONGTEXT NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO data.categories (name) VALUES
	('Airdrops'), ('NFT Giveaways'), ('Shill your coin');


-- DEBUG (Do not run in production)

INSERT INTO data.posts (title, url, description, category) VALUES
	('Testing Airdrop', 'https://google.com', 'This is a test', 1),
	('THIS NFT IS FREE', 'https://nfts.com', 'Free nft this way', 2),
	('Heres where you can create a coin', 'https://coingecko.com', 'Whattttt', 3)