
const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Card children={<div style={{ color: "green" }}> What do u want to post <br /> <br />
        <input type={"text"} />
      </div>} />
      <Card children={"hi there"} />
    </div>
  )
}

function Card({ children }) {
  return <span style={{ backgroundColor: "black", borderRadius: 10, color: "white", padding: 10, margin: 10 }}>
    {children}
  </span>
}

export default App