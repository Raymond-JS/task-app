const express = require("express")
const taskRouter = express.Router();
const Tasks = require("../models/tasks.js")

// Get all
taskRouter.get("/", (req, res, next) => {
      Tasks.find((err, tasks) => {
          if (err) {
              res.status(500)
              return next(err)
          }
          return res.status(200).send(tasks)
      })
})

// Get one
taskRouter.get("/:id", (req, res, next) => {
    Tasks.find(
        {_id: req.params.id},
        (err, task) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(task)
        }
    )

})

// Create todo
taskRouter.post("/", (req, res, next) => {
   const newTask = new Tasks(req.body)
   newTask.save((err, savedTask) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTask)
   })
})

// Edit todo
taskRouter.put("/:id", (req, res, next ) => {
    Tasks.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true},
        (err, updatedTask) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedTask)
        }
    )

})

// Search by completion status
taskRouter.get("/search/completed", (req, res, next) => {
    Tasks.find(
        { completed: req.query.completed}, 
        (err, tasks) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(tasks)
        }
    )
})


// Delete todo
taskRouter.delete("/:id", (req, res, next) => {
    Tasks.findOneAndDelete(
        {_id: req.params.id},
        (err, deletedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`${deletedItem.name} has been successfully deleted from the database.`)
        }
        )

})


module.exports = taskRouter;