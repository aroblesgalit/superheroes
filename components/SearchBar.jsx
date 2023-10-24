

const SearchBar = ({ type, query, setQuery, handleSubmit }) => {
  return (
    <section className="">
      <h1>Search {type}</h1>
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <input 
          type="search" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </section>
  )
}

export default SearchBar