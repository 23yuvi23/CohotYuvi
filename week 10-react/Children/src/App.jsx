const App = () => {
  return (
    <div style={{ display: "flex" }}>

{/* all below content automatically become children content*/}
      <Card >
        <div style={{ color: "green" }}>
          What do u want to post <br /> <br />
          <input type={"text"} />
        </div>
      </Card>

      <Card >
        hi there
      </Card>
    </div>
  )
}

function Card({ children }) {
  return <span style={{ backgroundColor: "black", borderRadius: 10, color: "white", padding: 10, margin: 10 }}>
    {children}
  </span>
}

export default App