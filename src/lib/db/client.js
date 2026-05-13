import { Pool } from "pg";
import { DB_URL, NODE_ENV } from "./secret";

const poolConfig = {
  connectionString: DB_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let pool;

if (!global.pgPool) {
  global.pgPool = new Pool(poolConfig);
  
  global.pgPool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
}

pool = global.pgPool;

const db = {
  query: async (text, params) => {
    const start = Date.now();
    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      
      if (NODE_ENV === 'development') {
        // console.log('Query executed in', duration, 'ms');
      }
      
      return res;
    } catch (error) {
      console.error('Database Query Error:', error);
      throw error;
    }
  },

  getClient: () => pool.connect(),
};

export default db;