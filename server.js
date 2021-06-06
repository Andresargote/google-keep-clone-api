require("dotenv").config();

const express = require("express");
const app = express();
const Note = require("./models/notes");

const {dbConnection} = require("./database/config");

//Conexion a bd
dbConnection();

app.use(express.json());

app.post("/api/note", async (req, res) => {
    try {
        const {title, quote} = req.body;
        const newNote = new Note({
            title,
            quote
        });
    
        const newNoteSave = await newNote.save();
    
        res.status(201).json({
            msg: "Post API",
            newNoteSave
        });
    }catch(err) {
        res.status(500).json({
            msg: "No se pudo crear la nota"
        })
    }
});

app.get("/api/notes", async (req, res) => {
    try {
        const allNotes = await Note.find({});
        res.status(200).json({
            allNotes
        });
    }catch(err) {
        res.status(500).json({
            msg: "Hay un error, intente mas tarde",
        });
    }
});

app.put("/api/note/update/:id", async (req, res) => {
    try {
        const {title, quote} = req.body;
        const noteID = await Note.findByIdAndUpdate(req.params.id, {
            title,
            quote
        });

        res.status(200).send({
            msg: "Nota actualizada",
            noteID
        });
    }catch(err) {
        res.status(500).send({
            msg: "Ocurrio un error actualizando la nota, intente mas tarde"
        });
    }
});

app.delete("/api/note/delete/:id", async (req, res) => {
    try {
        const noteDelete = await Note.findByIdAndRemove(req.params.id);
        res.send(200).json({
            msg: "Nota eliminada",
            noteDelete
        });
    }catch(err) {
        res.send(500).json({
            msg: "No se pudo eliminar la nota"
        });
    }
});

app.listen(3000, () => {
    console.log("Aplicacion escuchando en el puerto 3000");
});