const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');
const express = require('express');

const app = express();
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

app.get('/', (req, res) => {
    return res.status(200).send({ message: "Visit /users or /cached-users to see Redis cache results"})
})

app.get('/users', (req, res) => {

  try {
    axios.get(`${USERS_API}`).then(function (response) {
      const users = response.data;
      console.log('Users retrieved from the API');
      res.status(200).send(users);
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/cached-users', (req, res) => {

  try {
    client.get('users', (err, data) => {

      if (err) {
        console.error(err);
        throw err;
      }

      if (data) {
        console.log('Users retrieved from Redis');
        res.status(200).send(JSON.parse(data));
      } else {
        axios.get(`${USERS_API}`).then(function (response) {
          const users = response.data;
          client.setex('users', 600, JSON.stringify(users));
          console.log('Users retrieved from the API');
          res.status(200).send(users);
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});

/*
const express = require('express')
const app = express();
const redis = require('redis');
const fetch = require('cross-fetch');
const cacheClient = redis.createClient();

// This is required so your error doesn't bubble
// upwards and kills your instance
cacheClient.on("error", function (err) {
    console.log("Error " + err);
});
cacheClient.set("key", "value", redis.print);
cacheClient.get("key", redis.print);

app.get('/', async (req, res, next) => {
    await cacheClient.get('sample', async (err, data) => {
        if (err) console.error(err);
        if (data) {
            console.log('Data was cached before')
            return res.json({ data: JSON.parse(data) });
        }
        else {
            await fetch('https://jsonplaceholder.typicode.com/photos')
                .then(response => response.json())
                .then(json => {
                    console.log('Newly fetched data')
                    cacheClient.setex('sample',
                        60,
                        JSON.stringify(json));
                    return res.json({ data: json });
                })
        }

    })
});

app.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));
*/

/*
const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
  console.log('Connected!'); // Connected!
});

// Strings

client.set('framework', 'ReactJS', function(err, reply) {
  console.log(reply); // OK
});

client.get('framework', function(err, reply) {
  console.log(reply); // ReactJS
});

// Hashes

client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

client.hgetall('frameworks_hash', function(err, object) {
  console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});

// Lists

client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function(err, reply) {
  console.log(reply); // 2
});

client.lrange('frameworks_list', 0, -1, function(err, reply) {
  console.log(reply); // [ 'ReactJS', 'Angular' ]
});

// Sets

client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function(err, reply) {
  console.log(reply); // 4
});

client.smembers('frameworks_set', function(err, reply) {
  console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
});

// Check the existence of a key

client.exists('framework', function(err, reply) {
  if (reply === 1) {
    console.log('Exists!');
  } else {
    console.log('Doesn\'t exist!');
  }
});

// Delete a key

client.del('frameworks_list', function(err, reply) {
  console.log(reply); // 1
});

// Increment a key

client.set('working_days', 5, function() {
  client.incr('working_days', function(err, reply) {
    console.log(reply); // 6
  });
});
*/