function App(){

  return (
    <div style={{backgroundColor:"black",height:"100vh"}}>
      <div style={{display:"flex",justifyContent:"center"}}>
<div>
  <div>
    <PostComponent
    name={"Deepak"}
    followerCount={50}
    time={"18m ago"}
    description={"hello i am Deepak from HCL"}
    image={"https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg"}
    />
  </div>
  <div>
    <PostComponent
    name={"yuvi"}
    followerCount={40}
    time={"1m ago"}
    image={"https://images.scalebranding.com/cool-a-logo-50afaa14-6473-4b28-b9c5-e08d50d8e7da.jpg"}
    />
  </div>

</div>

      </div>


    </div>
  )
}
// Create a style object to apply styles to the div element in PostComponent
const style = {
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 20,
    margin: 10,
    color: "black"
};

function PostComponent({name,followerCount,time,image,description}){
return(
<div style={style}> 
  <div style={{display:"flex"}}>
  <img src={image} alt="image here" style={{ width: 40, height: 40, borderRadius: 40 }} />
  <div style={{ fontSize: 14, marginLeft: 10 }}>
      <b>{name}</b> 
      <div>{followerCount} followers</div>
      <div>{time}</div>
      <div>{description}</div>
    </div>
  </div>
</div>
)
}
export default App;