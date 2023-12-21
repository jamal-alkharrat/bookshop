# Bookshop - Orders

This document describes the order process of the bookshop application. All order related files are saved in the folder `orders` and are accessible via the URL `http://localhost/orders/` for the dev branch.

### Prepare the Database - MariaDB

1. Connect to the database

2. Create a table 'order' and 'order_items' to save order information

```sql
CREATE TABLE `orders` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `total_price` DECIMAL(10,2) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `order_items` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `book_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `price_per_book` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
);
```

- Optional: Create test orders

```sql
INSERT INTO `orders` (`user_id`, `total_price`) VALUES (1, 10.00);
INSERT INTO `order_items` (`order_id`, `book_id`, `quantity`, `price_per_book`) VALUES (1, 1, 1, 10.00);
```

