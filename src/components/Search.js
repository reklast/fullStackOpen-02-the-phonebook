
function Search(props) {

  const handleChange = (e) => {
    props.setFilterName(e.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="search through phonebook"
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
