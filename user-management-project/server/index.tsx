import express, {Request, Response} from 'express';
import sqlite3 from 'sqlite3';
import {open} from 'sqlite'
import {Database} from 'sqlite'

const app = express();
const port = 3001;

app.use(express.json());

let db: Database;

const initDatabase = async () => {
  db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
    )`);
};

app.get('/api/users', async (_req: Request, res: Response) => {
  const users = await db.all('SELECT * FROM users');
  res.json(users);
});

app.post('/api/users', async (req: Request, res: Response) => {
  const {name} = req.body;
  const result = await db.run('INSERT INTO users (name) VALUES (?)', [name]);
  res.json({ id: (result as any).lastID, name });
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  await db.run('DELETE FROM users WHERE id = ?', id);
  res.json({success: true});
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await initDatabase();
})
