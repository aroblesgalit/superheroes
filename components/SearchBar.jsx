

const SearchBar = ({ type, query, setQuery, handleSubmit }) => {
  return (
      <form
        onSubmit={handleSubmit}
        className='w-60'
      >
        <input 
          type='search' 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full border-2 border-primary-black rounded-full outline-1 outline-offset-0 outline-primary-red px-3 py-1'
        />
      </form>
  )
}

export default SearchBar