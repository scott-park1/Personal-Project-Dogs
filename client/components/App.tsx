import DogsList from './DogsList'
import DogsForm from './DogsForm'

function App() {
  return (
    <>
      <header className="header">
        <h1>Dogs</h1>
      </header>
      <section className="main">
        <DogsList />
        <DogsForm />
      </section>
    </>
  )
}

export default App
