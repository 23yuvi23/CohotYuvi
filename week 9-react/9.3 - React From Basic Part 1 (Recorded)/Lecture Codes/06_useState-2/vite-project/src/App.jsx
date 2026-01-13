import { PostComponent } from "./PostComponent";

function App(){

  const posts = [{
            name:"yuvi",
            subtitle:"1100 followers",
            time:"2m ago",
            image:"https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
            description:"what to know how to earn big ? Check out how theese folks won $6000 in bounties"
  }]

  const PostComponent = posts.map (post=><PostComponent
            name={post.name}
            subtitle={post.subtitle}
            time={post.time}
            image={post.image}
            description={post.description}
  />)
  function addPost(){
    posts.push({
            name:"yuvi",
            subtitle:"1100 followers",
            time:"2m ago",
            image:"https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
            description:"what to know how to earn big ? Check out how theese folks won $6000 in bounties"
    })
  }

  return (
    <div style={{background: "#dfe6e9", height: "100vh"}}>
      <button onClick={addPost}>Add post</button>
      <div style={{display: "flex",justifyContent:"center"}}>
        <div>
          {PostComponent}
        </div>
      </div>
    </div>
  )
}

export default App