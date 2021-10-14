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