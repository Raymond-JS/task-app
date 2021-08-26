const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Todos blueprint
const tasksSchema = new Schema( 
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        completed: Boolean,
        editMode: Boolean
    }
    )





module.exports = mongoose.model( "Tasks", tasksSchema )





