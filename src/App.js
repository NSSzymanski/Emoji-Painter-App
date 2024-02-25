import React, { useState } from "react";
import "./App.css";
import Title from "./Title";
import EmojiLogic from "./EmojiLogic";

function App() {
  const emojiOptions = ["🤍", "💛", "🧡", "❤️", "💜", "💙", "💚", "🤎", "🖤"];
  const [hearts, setHearts] = useState([]);

  const addHeart = () => {
    const newHeart = {
      emoji: emojiOptions[0], // Start as white (🤍)
      fontSize: 40, // Set an initial font size
    };

    setHearts((prevHearts) => [...prevHearts, newHeart]);
  };

  return (
    <div className="App">
      <Title />
      <div className="canvas-container">
        <div className="button-container">
          <button onClick={addHeart}>Add a heart</button>
        </div>
        <EmojiLogic hearts={hearts} setHearts={setHearts} />
      </div>
    </div>
  );
}

export default App;
