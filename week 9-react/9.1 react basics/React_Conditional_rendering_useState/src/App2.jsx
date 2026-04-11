import { useState } from "react";

function App2() {
    const [posts, setPosts] = useState([])

    const postComponent = posts.map((post, index) => 
        <p key={index}>{post.name}</p>
    )

    function addPost() {
        setPosts([...posts, {
            name: "Aman"
        }])
    }

    return (
        <div>
            <button onClick={addPost}>Add Post</button>
            <div>{postComponent}</div>
        </div>
    )
}

export default App2