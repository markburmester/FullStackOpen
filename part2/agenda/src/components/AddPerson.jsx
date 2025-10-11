const AddPerson = (props) => (
  <form onSubmit={props.onSubmit}>
        <div>
            name: <input value={props.nameValue} onChange={props.onNameChange}/><br></br>
            number: <input value={props.numberValue} onChange={props.onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
)

export default AddPerson