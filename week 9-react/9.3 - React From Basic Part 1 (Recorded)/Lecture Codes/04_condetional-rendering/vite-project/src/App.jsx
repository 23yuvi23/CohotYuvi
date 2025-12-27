// Import the useState hook from react
import { useState } from 'react';

// Create a function component named App that will be rendered in the root element
function App() {
    // return JSX that will be rendered
    return (
        // Apply inline styles to the div element
        <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
            {/* Call ToggleMessage component here to render it in the App component */}
            <ToggleMessage />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
            </div>
        </div>
    );
}

// Create a function component named ToggleMessage to render it in the App component
const ToggleMessage = () => {
    // Create a state variable isVisible and a function setIsVisible to toggle the visibility of the message
    const [isVisible, setIsVisible] = useState(false);

    // return JSX that will be rendered
    return (
        <div>
            {/* Create a button to toggle the visibility of the message */}
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle Message
            </button>

            {/* Conditionally render the message if isVisible is true */}
            {isVisible && <p>This message is conditionally rendered!</p>}
        </div>
    );
};
// Export App Component to use it in other components
export default App;