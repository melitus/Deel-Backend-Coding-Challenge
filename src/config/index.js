module.exports = {
    db: {
        development: {
            dialect: "sqlite",
            storage: "./database.sqlite3",
            logging: false
        },
        test: {
            dialect: "sqlite",
            storage: "./database_test.sqlite3"
        },
        production: {
            dialect: "sqlite",
            storage: "./database_prod.sqlite3"
        }
    }
};