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
