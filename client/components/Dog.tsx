import DeleteDog from './DeleteDog'
import UpdateDog from './UpdateDog'
import * as Models from '../../models/dog'
import { useState } from 'react'

interface DogProps {
  dog: Models.Dog
}

function Dog({ dog }: DogProps) {
  const [editDog, setEditDog] = useState(false)

  return (
    <>
      <div>
        {editDog ? (
          <UpdateDog id={dog.id} updatedDog={dog} />
        ) : (
          <>
            <p>
              <b>Name:</b> {dog.name}
            </p>
            <p>
              <b>Breed:</b> {dog.breed}
            </p>
            <DeleteDog id={dog.id} />
          </>
        )}
        <button onClick={() => setEditDog(!editDog)}>Edit Dog</button>
      </div>
    </>
  )
}

export default Dog
