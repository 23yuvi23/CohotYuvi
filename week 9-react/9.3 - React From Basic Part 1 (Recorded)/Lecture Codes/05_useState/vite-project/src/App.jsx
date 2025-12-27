// Import the useState hook from react
import { useState } from 'react';

// Create a function component named App that will be rendered in the root element
function App() {
    // return JSX that will be rendered
    return (
        // Apply inline styles to the div element
        <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
            <ToggleMessage />
        </div>
    );
}


//the componet  is not re-rendering 
//because we haven't used a state variable
const ToggleMessage = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    function increment(){
      setNotificationCount(notificationCount+1)
    }

    return (
        <div>
            <button onClick={increment}>
              Toggle Message
            </button>
            {notificationCount}
        </div>
    );
};
// Export App Component to use it in other components
export default App;