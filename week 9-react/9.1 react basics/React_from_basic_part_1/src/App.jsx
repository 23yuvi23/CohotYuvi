function App() {
  return (
    <div style={{background:"gray", height:"100vh"}}> 
    <div style={{display:"flex", justifyContent:"center"}}>
        <PostComponent name="Rahul" time="2 mins ago" description="Yeh mera pehla post hai!" />
        <PostComponent name="Yuvi" time="5 mins ago" description="Yeh mera second post hai " />
        <PostComponent name="Aman" description="teesra post!" />

        </div>
    </div>
      
  )
}

const style = { width: 200, backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1, padding: 20}
function PostComponent(props) {
  props.name
  props.time
  props.description
  return (
    // super parent
<div style={style}> 

{/* parent */}
      {/* <div style={{display: "flex"}}>
        parent
        <div style={{
          marginLeft: 20,
          fontSize: 10
        }}>
          <b>my profile</b>
          <div>10 followers</div>
          <div>12 likes </div>
        </div>

      </div> */}

{/* child */}
      {/* <div style={{
        fontSize: 12
      }}>
        this is my first post checkout
      </div> */}

{/* child 2 */}
      {/* <div style={{
        width: 80,
        height: 80,
        border: "2px solid gray",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}>
        <img src={"https://cdn.myspeedpost.com/images/content/IndiaPost-512.png"} style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }} alt="" srcset="" />
      </div> */}

{/* props child */}
    <div style={{fontSize:10, margin:10}}>
        <b>
          {props.name}
        </b>
        {/* conditional rendering */}
       { props.time && <div style={{display:"flex"}}>
          <div>{props.time}</div>
         <div style={{fontSize:12}}>
        {props.description}
        </div>
    </div>
}
    </div>
</div>

  )
}
export default App;
