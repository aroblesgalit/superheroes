

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
          className="border-2 border-primary-black rounded-full outline-1 outline-offset-0 outline-primary-red px-3 py-1"
        />
      </form>
    </section>
  )
}

export default SearchBar