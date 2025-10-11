const Header = ({header}) => (<h1>{header}</h1>)

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {return(
  <div>
    
    {parts.map((x)=>
      (<Part key={x.id} name={x.name} exercises={x.exercises}></Part>))}
    
    <p><strong>total of {parts.reduce((sum, x)=>(x.exercises))} exercises</strong></p>
  </div>
  )
}

const Course = ({course}) => {
  /*console.log("Parámetro -course-",course)*/
  const header = course.name
  /*console.log("Nombre del curso:", header)*/
  const parts = course.parts 
  return(
    <div>
      <Header header={header}/>
      <Content parts={parts}/>
    </div>   
  )
}

export default Course


