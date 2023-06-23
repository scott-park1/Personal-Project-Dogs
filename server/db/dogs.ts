import { Dog, DogData } from '../../models/dog'
import db from './connection'

export async function getAllDogs(): Promise<Dog[]> {
  const dogs = await db('dogs').select('*')
  return dogs
}

export async function addDog(newDog: DogData): Promise<Dog> {
  const [dog] = await db('dogs').insert(newDog).returning('*')
  return dog
}

export async function deleteDog(id: number): Promise<void> {
  await db('dogs').where('id', id).delete()
  return
}

export async function updateDog(id: number, updatedDog: DogData): Promise<Dog> {
  const [updateDog] = await db('dogs')
    .where('id', id)
    .update(updatedDog)
    .returning('*')
  return updateDog
}
