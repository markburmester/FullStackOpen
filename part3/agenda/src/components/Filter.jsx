const Filter = (props) => (
  <form>
        <div>
          filter shown with: <input value={props.searchValue} onChange={props.onSearchChange}/>
        </div>
  </form>
)

export default Filter