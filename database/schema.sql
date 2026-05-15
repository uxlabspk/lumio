CREATE DATABASE IF NOT EXISTS lumio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE lumio;

CREATE TABLE IF NOT EXISTS module_records (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    module_key VARCHAR(80) NOT NULL,
    data_json LONGTEXT NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    INDEX module_records_module_key_index (module_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
