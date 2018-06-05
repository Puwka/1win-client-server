module.exports = {
    app: {
        name: '1winServer',
        version: '0.1'
    },
    server: {
        port: 3000
    },
    books: {
        tableName: 'books'
    },
    database: {
        master: {
            host: "localhost",
            user: "root",
            password: "12345678",
            port: "3306",
            database: "books",
            connectionLimit: 3
        }
    }
};