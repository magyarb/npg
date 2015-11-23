var pg = require('pg');
var connectionString = 'postgres://admin:root@localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
console.log('done');
query.on('end', function() { client.end(); });