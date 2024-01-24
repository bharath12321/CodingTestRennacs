"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
let db;
const initDatabase = async () => {
    db = await (0, sqlite_1.open)({
        filename: 'database.db',
        driver: sqlite3_1.default.Database
    });
    await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
    )`);
};
app.get('/api/users', async (_req, res) => {
    const users = await db.all('SELECT * FROM users');
    res.json(users);
});
app.post('/api/users', async (req, res) => {
    const { name } = req.body;
    const result = await db.run('INSERT INTO users (name) VALUES (?)', [name]);
    res.json({ id: result.lastID, name });
});
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    await db.run('DELETE FROM users WHERE id = ?', id);
    res.json({ success: true });
});
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await initDatabase();
});
