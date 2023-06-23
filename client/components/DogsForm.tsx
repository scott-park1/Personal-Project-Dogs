import { ChangeEvent, FormEvent, useState } from 'react'
import { DogData } from '../../models/dog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDog } from '../apis/dog'

const initialFormData = {
  name: '',
  breed: '',
}

export default function DogsForm() {
  const [form, setForm] = useState<DogData>(initialFormData)

  const queryClient = useQueryClient()

  const addDogMutation = useMutation(addDog, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['dogs'])
    },
  })

  function handleDogChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleDogSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addDogMutation.mutate(form)
    setForm(initialFormData)
  }

  if (addDogMutation.isError) {
    return <div>There was an error trying to add a dog...</div>
  }

  if (addDogMutation.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <form onSubmit={handleDogSubmit} aria-label="Add Dog Form">
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
        <button>Add Dog</button>
      </form>
    </div>
  )
}
