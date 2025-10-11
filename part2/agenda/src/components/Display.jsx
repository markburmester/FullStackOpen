const Display = ({array, handleDeleteClick}) => array.map((x)=>
    <div key={x.name}>
        <p>{x.name} {x.number} &nbsp;
        
        <button onClick={() => handleDeleteClick(x)}>
            delete
        </button>
        </p>
    </div>)

export default Display