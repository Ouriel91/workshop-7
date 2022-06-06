const express = require('express');
const jediService = require('./JediService');
const emitted = require('events')
const app = express();
app.use(express.json());
const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json({
        health: 'ok'
    });
});

app.post("/jedi", async (req, res) => {
    await jediService.addJedi(req.body);
    res.status(200).json(req.body);
});

app.get("/jedi/:id", async (req, res) => {
    let jediId = Number.parseInt(req.params.id);
    if (isNaN(jediId)) return res.status(400).json({
        status: 400,
        error: "wrong parameters"
    });

    const jedi = await jediService.getJedi(jediId);

    if (!jedi) return res.status(404).json({
        status: 404,
        error: "Not found"
    });

    res.status(200).json(jedi);
});

//TODO 1. create GET /jedi route and handle logic inside of it
app.get('/jedi', async(req, res) => {
    const allJedis =  await jediService.getAll()
    if (!allJedis) return res.status(404).json({
        status: 404,
        error: "Not found"
    });

    res.status(200).json(allJedis)
})

//TODO 2. create PUT /jedi/:id route and handle logic of updating jedi that already exists in the list.
//Dont forget to take care of errors (e.g. jedi with id not exists)
app.put('/jedi/:id', async(req, res)=> {
    if (isNaN(req.params.id)) return res.status(404).json({
        status: 404,
        error: "Not found string"
    })

    const jedi = await jediService.replaceJedi(req.params.id, req.body)
    res.status(200).json(jedi)
})

//TODO 3. create DELETE /jedi/:id route and handle logic of deleting jedi
app.delete('/jedi/:id', async(req, res)=> {
    if (isNaN(req.params.id)) return res.status(404).json({
        status: 404,
        error: "Not found string"
    })

    const jedi = await jediService.deleteJedi(req.params.id)
    res.status(200).json(jedi)
})


app.listen(port, () => {
    console.log("Server started on port", port);
});