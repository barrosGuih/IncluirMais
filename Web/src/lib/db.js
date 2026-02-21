import { Pool } from 'pg';

export const query = (text, params) => pool.query(text, params);

export default new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});