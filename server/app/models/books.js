import query from 'mysql-query-promise';
import config from  'config';
const tableName = config.books.tableName;

const crud = {
    getAll: async () => {
        return query(`SELECT * from ${tableName}`);
    },
    get: async (id, size) => {
        let books = await query(`SELECT * FROM ${tableName} LIMIT ${Number(size)} OFFSET ${Number(id - 1) * Number(size)}`);
        return books;
    },
    create: async function ({ author, description, image, date, title }) {
        console.log(author, description, image, date, title )
        let book = {author: String(author), description: String(description), image: String(image), title: String(title), date: String(date)};
        let result = await query(`INSERT INTO ${tableName} SET ? ON DUPLICATE KEY UPDATE ?`,[book,book]);
        return crud.get(id);
    },
    // update: async (id, product)=> {
    //     if (typeof product === 'object') {
    //         let uProduct = {};
    //         if (product.hasOwnProperty('name')) uProduct.name = String(product.name);
    //         if (product.hasOwnProperty('price')) uProduct.price = Number(product.price);
    //         if (product.hasOwnProperty('currency')) uProduct.currency = String(product.currency);
    //         let result = await query(`UPDATE ${tableName} SET ? WHERE id=?`,[uProduct, Number(id)]);
    //         return result.affectedRows;
    //     }
    // },
    delete: async (id) => {
        let result = await query(`DELETE FROM ${tableName} WHERE id=?`,[Number(id)]);
        return result.affectedRows;
    }
};
export default crud;