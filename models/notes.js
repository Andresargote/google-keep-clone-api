const {Schema, model} = require("mongoose");

const NotesSchema = Schema({
    title: {
        type: String
    },
    quote: {
        type: String
    }
});

module.exports = model("Note", NotesSchema); 