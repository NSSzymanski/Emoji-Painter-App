import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import Title from "./Title";
import EmojiLogic from "./EmojiLogic";

function App() {
  const emojiOptions = ["🤍", "💛", "🧡", "❤️", "💜", "💙", "💚", "🤎", "🖤"];
  const [hearts, setHearts] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // Drop outside the list
    }

    const { source, destination } = result;

    // Reorder the hearts array based on the drag-and-drop result
    const updatedHearts = [...hearts];
    const [movedHeart] = updatedHearts.splice(source.index, 1);
    updatedHearts.splice(destination.index, 0, movedHeart);

    setHearts(updatedHearts);
  };

  const addHeart = () => {
    const newHeart = {
      emoji: emojiOptions[0], // Start as white (🤍)
      currentIndex: 0,
      fontSize: 40, // Set an initial font size
      top: 0, // initialize the 'top' property
      left: 0, // initialize the 'left' property
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
        <DragDropContext onDragEnd={onDragEnd}>
          <EmojiLogic hearts={hearts} setHearts={setHearts} />
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
