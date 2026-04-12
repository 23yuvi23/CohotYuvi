const App = () => {

  return (
    <div>{[
      <Todo  key={1} title = {"Go to gym"} done = {false} /> ,
      <Todo  key={2} title = {"Go to home"} done = {true}/>

    ]}</div>
  )
}

function Todo ({title, done}) {
  return <div>
    {title} - {done ? "Done!" : "Not Done"}
    </div>

}
