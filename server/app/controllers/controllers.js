import query from 'mysql-query-promise';
import config from  'config';
const tableName = config.books.tableName;

const controllers = {
    getLength: async () => {
        return query(`SELECT COUNT(id) FROM ${tableName};`);
    },
    getAll: async () => {
        return query(`SELECT * from ${tableName}`);
    },
    get: async (id, size) => {
        let books = await query(`SELECT * FROM ${tableName} LIMIT ${Number(size)} OFFSET ${Number(id - 1) * Number(size)}`);
        return books;
    },
    create: async function ({ author, description, image, date, title }) {
        let book = {author: String(author), description: String(description), image: String(image), title: String(title), date: String(date)};
        let result = await query(`INSERT INTO ${tableName} SET ? ON DUPLICATE KEY UPDATE ?`,[book,book]);
        return controllers.getLength()
    },
    delete: async (id) => {
        let result = await query(`DELETE FROM ${tableName} WHERE id=?`,[Number(id)]);
        return result.affectedRows;
    }
}

export default controllers;
