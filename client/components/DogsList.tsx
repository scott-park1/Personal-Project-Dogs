import { useQuery } from '@tanstack/react-query'
import { fetchDogs } from '../apis/dog'

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
          <div key={dog.id}>
            <ul>
              <h2>
                <b>Name:</b> {dog.name}
              </h2>
              <p>
                <b>Breed:</b> {dog.breed}
              </p>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default DogsList
