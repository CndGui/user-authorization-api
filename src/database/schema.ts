import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    login: varchar("login", { length: 256 }).unique(),
    password: varchar("password", { length: 256 })
})