import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDog } from '../apis/dog'

interface DeleteProps {
  id: number
}

export default function DeleteDog({ id }: DeleteProps) {
  const queryClient = useQueryClient()

  const deleteDogMutation = useMutation(deleteDog, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['dogs'])
    },
  })

  const handleDeleteDog = () => {
    deleteDogMutation.mutate(id)
  }

  if (deleteDogMutation.isError) {
    return <div>There was an error trying to delete a dog...</div>
  }

  if (deleteDogMutation.isLoading) {
    return <div>Deleting a dog...</div>
  }

  return (
    <div>
      <button onClick={handleDeleteDog}>Delete Dog</button>
    </div>
  )
}
