import request from 'superagent'
import type { Dog, DogData } from '../../models/dog'

// GET /api/v1/dogs
export async function fetchDogs(): Promise<Dog[]> {
  const response = await request.get('/api/v1/dogs')
  return response.body
}

// POST /api/v1/dogs
export async function addDog(newDog: DogData): Promise<Dog> {
  const response = await request.post('/api/v1/dogs').send(newDog)
  return response.body.dogs
}

// DELETE /api/v1/dogs/:id
export async function deleteDog(id: number): Promise<void> {
  await request.delete(`/api/v1/dogs/${id}`)
}
