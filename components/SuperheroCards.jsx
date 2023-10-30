import SuperheroCard from "./SuperheroCard";

const SuperheroCards = ({ data }) => {
  return (
    <div className='flex flex-wrap gap-4'>
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