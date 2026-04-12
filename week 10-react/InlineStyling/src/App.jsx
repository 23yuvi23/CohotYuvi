const App = () => {
  return (
    <div><MyComponent/></div>
  )
}

function MyComponent() {
  return (
    <div style={{ backgroundColor: 'blue', color: 'white', padding:10, borderRadius:10 }}>
      Hello, World!
    </div>
  );
}
export default App