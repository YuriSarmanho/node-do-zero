import { sql } from './db.js'

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL  -- duration in seconds
);
`.then(()=> {
    console.log("tabela criada")
})