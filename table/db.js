const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Database connected');
});

const createTable = () => {
    const schoolTable = `CREATE TABLE IF NOT EXISTS
    students(
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(128) NOT NULL,
      student_age INT NOT NULL,
      student_class VARCHAR(128) NOT NULL,
      parent_contact VARCHAR(128) NOT NULL,
      admission_date VARCHAR(128) NOT NULL
    )`;
pool.query(schoolTable)
    .then(res => {
        console.log(res);
        pool.end();
    })
    .catch(err => {
        console.log(err);
        pool.end();
    });

/*const Bookings = `CREATE TABLE IF NOT EXISTS booking (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_on  DATE NOT NULL,
    trip_time TIMESTAMP NOT NULL,
    seat_number INTEGER NOT NULL,
    first_name VARCHAR (100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    email VARCHAR (100) UNIQUE NOT NULL
)`;
pool.query(Bookings)
.then(res => {
    console.log(res);
    pool.end();
})
.catch(err => {
    console.log(err);
    pool.end();
});
*/
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTable,
    pool
};

require('make-runnable');