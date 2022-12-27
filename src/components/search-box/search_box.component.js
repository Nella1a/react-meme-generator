function SearchBox({onChangeHandler}){
  return(
  <div>
    <input
    type="search"
    placeholder="search meme"
    onChange={onChangeHandler}
    />

  </div>)
}

export default SearchBox