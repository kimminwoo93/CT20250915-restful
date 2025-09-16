-- CreateTable
CREATE TABLE `Food` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `food_code` VARCHAR(10) NOT NULL,
    `group_name` VARCHAR(20) NOT NULL,
    `food_name` VARCHAR(20) NOT NULL,
    `research_year` VARCHAR(4) NOT NULL,
    `maker_name` VARCHAR(20) NOT NULL,
    `ref_name` VARCHAR(30) NOT NULL,
    `serving_size` SMALLINT UNSIGNED NOT NULL,
    `calorie` DOUBLE NULL,
    `carbohydrate` DOUBLE NULL,
    `protein` DOUBLE NULL,
    `province` DOUBLE NULL,
    `sugars` DOUBLE NULL,
    `salt` DOUBLE NULL,
    `cholesterol` DOUBLE NULL,
    `saturated_fatty_acids` DOUBLE NULL,
    `trans_fat` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Food_food_code_key`(`food_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
