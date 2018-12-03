
module.exports = {
    read: (req, res) => {
      const dbInstance = req.app.get('db')
      dbInstance.get_todos()
      .then((todo)=>{
        res.status(200).send(todo)
      })
      .catch((err)=>{
        console.log(err)
        res.sendStatus(500)
      })
    },
    create: (req, res) => {
        const { toDoThing } = req.body
        const dbInstance = req.app.get('db')
        dbInstance.create_todo([toDoThing])
        .then((todo)=> {
          res.status(200).send(todo)
        })
        .catch((err)=>{
          console.log(err)
          res.sendStatus(500)
        })
    },
    edit: (req,res)=> {
      const {id} = req.params
      const {editedTodo} = req.body
      const dbInstance = req.app.get('db')
      console.log(req.body)
      dbInstance.edit_todo([id,editedTodo])
      .then((todo)=>{
        console.log(todo)
        res.status(200).send(todo)
      })
      .catch((err)=>{
        console.log(err)
        res.sendStatus(500)
      })

    }

}