CREATE TABLE `users` (
	`id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mapping2` (
	`id` int NOT NULL,
	`shortCode` varchar(255) NOT NULL,
	`url` text NOT NULL,
	CONSTRAINT `mapping2_id` PRIMARY KEY(`id`)
);
