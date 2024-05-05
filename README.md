# nodejs-express-template

一个基于nodejs和express的web模板

## 运行

1. 安装mysql.
2. 创建app数据库
3. 创建user表

```sql
-- app.`user` definition
CREATE TABLE `user` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `secret_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `nick_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `avatar` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `phone_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number_verified` tinyint(1) NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `lock_start_time` timestamp NULL DEFAULT NULL,
  `lock_end_time` timestamp NULL DEFAULT NULL,
  `creator_id` bigint(20) NOT NULL DEFAULT '0',
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modifier_id` bigint(20) NOT NULL DEFAULT '0',
  `last_modification_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_account` (`account`),
  UNIQUE KEY `unique_user_email` (`email`),
  UNIQUE KEY `unique_user_phone` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

4. 安装nodejs
5. clone 项目
6. npm install
7. npm start

