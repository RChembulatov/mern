const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

//Получить все задачи
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error'
    })
  }
})

// Создать задачу
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      label: req.body.label
    })
    await todo.save()
    res.status(200).json(todo)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error'
    })
  }
})

//Изменение задачи
router.put('/done/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    todo.done = !todo.done
    await todo.save()
    res.status(200).json({todo})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error'
    })
  }
})

router.put('/important/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    todo.important = !todo.important
    await todo.save()
    res.status(200).json({todo})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error'
    })
  }
})

//Удаление задачи
router.delete('/:id' , async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    await todo.remove()

    res.status(204).json({})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error'
    })
  }
})


module.exports = router