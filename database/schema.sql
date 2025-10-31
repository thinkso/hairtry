-- HairTry MySQL 数据库表结构

-- 创建数据库
CREATE DATABASE IF NOT EXISTS hairtry CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hairtry;

-- 发型表
CREATE TABLE IF NOT EXISTS hairstyles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    thumbnail_url VARCHAR(500),
    prompt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 使用日志表
CREATE TABLE IF NOT EXISTS usage_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hairstyle_id VARCHAR(50) NOT NULL,
    status ENUM('success', 'failed') NOT NULL,
    duration_ms INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hairstyle_id) REFERENCES hairstyles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入模拟发型数据
INSERT INTO hairstyles (id, name, gender, thumbnail_url, prompt) VALUES
('style_01', '短卷发刘海', 'female', '/hairstyles/style_01_thumb.jpg', 'short curly bangs hairstyle for a female'),
('style_02', '长直发', 'female', '/hairstyles/style_02_thumb.jpg', 'long straight hair for a female'),
('style_03', '波浪长发', 'female', '/hairstyles/style_03_thumb.jpg', 'long wavy hair for a female'),
('style_04', '短发', 'male', '/hairstyles/style_04_thumb.jpg', 'short hair for a male'),
('style_05', '中长发', 'male', '/hairstyles/style_05_thumb.jpg', 'medium length hair for a male');

-- 创建索引
CREATE INDEX idx_hairstyles_gender ON hairstyles(gender);
CREATE INDEX idx_usage_logs_timestamp ON usage_logs(timestamp);