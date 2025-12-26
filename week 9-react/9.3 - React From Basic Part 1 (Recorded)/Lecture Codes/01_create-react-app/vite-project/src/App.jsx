import './App.css'

function App() {
  return (
    <div style={{background:"#dfe6e9",height:"100vh",}}>
      <div style={{display:"flex",justifyContent :"center"}}>
      <PostComponent />
      <PostComponent />
      <PostComponent />
      </div>
    </div>    
  )
}

const style = {width:200, backgroundColor: "white", borderRadius: 10, borderColor: "gray" , borderWidth: 1, 
padding: 20 }
function PostComponent(){
  return(
    <div style={style}>
    <div style={{display:"flex"}}> 
    <img src={"https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!bw700"} 
    alt="image here" 
    style={{
      width:30,
      height:30,
      borderRadius:20
    }}
    />
    <div style={{fontSize:10,marginLeft:10}}>
      <b>
      100xdevs
      </b>
      
      <div>23,888 followers </div>
      <div>12m </div>
    </div>

    </div>
    <div style={{fontSize:12}}>
      want to know how to win big ? Check out how theese folks won $6000 in bounties.
    </div>
    </div>

  )
}

export default App 

