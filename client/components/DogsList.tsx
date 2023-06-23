import { useQuery } from '@tanstack/react-query'
import { fetchDogs } from '../apis/dog'
import DogsForm from './DogsForm'
import Dog from './Dog'

function DogsList() {
  const {
    data: dogs,
    isLoading,
    isError,
  } = useQuery(['dogs'], () => fetchDogs())

  if (isError) {
    return <div>Error trying to fetch the dogs...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        {dogs.map((dog) => (
          <Dog key={dog.id} dog={dog} />
        ))}
      </div>
      <br />
      <DogsForm />
    </>
  )
}

export default DogsList
