import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateDog } from '../apis/dog'
import { DogData } from '../../models/dog'
import { ChangeEvent, FormEvent, useState } from 'react'

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

  const handleUpdateDog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
          <label htmlFor={`${id}name`}>
            <b>Name:</b>
          </label>
          <br />
          <input
            id={`${id}name`}
            name="name"
            onChange={handleDogChange}
            value={form.name}
          />
        </div>
        <br />
        <div>
          <label htmlFor={`${id}breed`}>
            <b>Breed:</b>
          </label>
          <br />
          <input
            id={`${id}breed`}
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
