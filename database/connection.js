const { Pool } = require('pg');

// Connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecom',
  password: 'new_password', // Update this with the correct password
  port: 5432,
});

// Example query
async function updateData() {
    const client = await pool.connect();
   
    try {
    

// Create a table

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
  );
`;

pool.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table', err);
    pool.end(); // Release the client to the pool
    return;
  }

  console.log('Table created successfully');

  //Insert data into the table
  const insertDataQuery = `
    INSERT INTO users (username, email) VALUES
    ('user1', 'user1@example.com'),
    ('user2', 'user2@example.com');
  `;

   pool.query(insertDataQuery, (err, result) => {
    if (err) {
      console.error('Error inserting data', err);
    } else {
      console.log('Data inserted successfully');
    }

   // Don't forget to release the client to the pool when done
   pool.end();
  });
   });

}
    
     catch (err) {
      console.error(err);
    } finally {
     
      client.release();
     
    }
  }
  
  module.exports = {
    updateData,
  };
  

