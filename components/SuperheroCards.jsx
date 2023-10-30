import SuperheroCard from "./SuperheroCard";

const SuperheroCards = ({ data }) => {
  return (
    <div>
      {
        data && data.map((superhero) => (
          <SuperheroCard
            key={superhero.id}
            type='search'
            superhero={superhero}
          />
        ))
      }
    </div>
  )
}

export default SuperheroCards