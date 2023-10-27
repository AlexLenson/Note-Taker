const router = require("express").Router();
const fs = require("fs");
const uniqid = require("uniqid");

router.get("/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
});

router.post("/notes", (req, res) => {
    const dbData = JSON.parse(fs.readFileSync("db/db.json"));
    const newNote = req.body;
    newNote.id = uniqid();
    dbData.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(dbData));
    res.json(dbData);
});

module.exports = router;