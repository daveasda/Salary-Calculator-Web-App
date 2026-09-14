import { useState } from "react"
import FileUpload from "./FileUpload";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <p>Hello</p>
            <FileUpload />
        </div>
    )
}

export default App;
