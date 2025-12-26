import './App.css'

function App() {
  return (
    <div style={{background:"#dfe6e9",height:"100vh",}}>
    {/* <div style={{}}> */}
      <div style={{display:"flex",justifyContent :"center",alignItems:"center"}}>
      {/* <PostComponent /> */}
      <ProfileCard/>  
      </div>
    </div>    
  )
}

const style = {width:200, backgroundColor: "white", borderRadius: 10, borderColor: "gray" , borderWidth: 1, 
padding: 20 }
// const style2 = {width:}

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

function ProfileCard (){
  return (
    <div id='superparent' style={{style}}>
    <div style={{display:"flex",flexDirection: "column",alignItemst:'center'}}> 
    <img src={"https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!bw700"} 
    alt="image here" 
    style={{
      width:60,
      height:60,
      borderRadius:10,
      marginBottom:10
    }}
      />
      <b>Harkirat Singh</b>
      <span>Working with WebRTC</span>
    </div>
    <div style={{ fontSize: 14, marginTop: 25 }}>
                <p style={{display: "flex", justifyContent: "space-between"}}>
                    <span>Profile Viewers </span>
                    <span style={{color: "blue"}}>41,903</span>
                </p>
                <p style={{display: "flex", justifyContent: "space-between"}}>
                    <span>Post Impressions</span>
                    <span style={{color: "blue"}}>1,313</span>
                </p>
            </div>
    </div>
  )
}

export default App 

