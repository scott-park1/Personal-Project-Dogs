import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateDog } from '../apis/dog'
import { DogData } from '../../models/dog'
import { ChangeEvent, useState } from 'react'

interface UpdateProps {
  id: number
  updatedDog: DogData
}

export default function UpdateDog({ id, updatedDog }: UpdateProps) {
  const [form, setForm] = useState<DogData>({
    name: updatedDog.name,
    breed: updatedDog.breed,
  })

  const queryClient = useQueryClient()

  const updateDogMutation = useMutation(updateDog, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['dogs'])
    },
  })

  function handleDogChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  const handleUpdateDog = () => {
    updateDogMutation.mutate({ id, updatedDog: form })
  }

  if (updateDogMutation.isError) {
    return <div>There was an error trying to update a dog...</div>
  }

  if (updateDogMutation.isLoading) {
    return <div>Updating a dog...</div>
  }

  return (
    <div>
      <form onSubmit={handleUpdateDog} aria-label="Update Dog Form">
        <div>
          <label htmlFor="name">
            <b>Name:</b>
          </label>
          <br />
          <input
            id="name"
            name="name"
            onChange={handleDogChange}
            value={form.name}
          />
        </div>
        <br />
        <div>
          <label htmlFor="breed">
            <b>Breed:</b>
          </label>
          <br />
          <input
            id="breed"
            name="breed"
            onChange={handleDogChange}
            value={form.breed}
          />
        </div>
        <br />
        <button>Update Dog</button>
      </form>
    </div>
  )
}
