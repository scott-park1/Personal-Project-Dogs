import express from 'express'
import * as db from '../db/dogs'
import { DogData } from '../../models/dog'

const router = express.Router()

// GET /api/v1/dogs
router.get('/', async (req, res) => {
  try {
    const allDogs = await db.getAllDogs()
    res.json(allDogs)
  } catch (error) {
    res.status(500).json({
      error: 'There was an error finding dogs...',
    })
  }
})

// POST /api/v1/dogs
router.post('/', async (req, res) => {
  try {
    const newDog = req.body
    if (!newDog) {
      res.sendStatus(400)
      return
    }

    const dog = await db.addDog(newDog)
    res.json(dog)
  } catch (error) {
    res.sendStatus(500)
  }
})

// DELETE /api/v1/dogs/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleteId = Number(req.params.id)
    await db.deleteDog(deleteId)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

// PATCH /api/v1/dogs/:id
router.patch('/:id', async (req, res) => {
  try {
    const updateId = Number(req.params.id)
    const updateDogData = req.body as DogData
    const updatedDog = await db.updateDog(updateId, updateDogData)
    res.json(updatedDog)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
