import React from "react";
import Draggable from "react-draggable";

function EmojiLogic({ hearts, setHearts }) {
  const emojiOptions = ["🤍", "💛", "🧡", "❤️", "💜", "💙", "💚", "🤎", "🖤"];

  const cycleHeart = (index) => {
    const updatedHearts = [...hearts];
    updatedHearts[index].emoji =
      emojiOptions[
        (emojiOptions.indexOf(hearts[index].emoji) + 1) % emojiOptions.length
      ];
    setHearts(updatedHearts);
  };

  const deleteHeart = (index) => {
    const updatedHearts = hearts.filter((_, i) => i !== index);
    setHearts(updatedHearts);
  };

  const handleWheel = (index, scrollEvent) => {
    const updatedHearts = [...hearts];

    if (updatedHearts[index] && updatedHearts[index].fontSize) {
      const fontSize = updatedHearts[index].fontSize || 40;

      if (scrollEvent.deltaY > 0) {
        updatedHearts[index].fontSize = fontSize - 5;
      } else {
        updatedHearts[index].fontSize = fontSize + 5;
      }

      setHearts(updatedHearts);
    }
  };

  return (
    <div className="canvas">
      {hearts.map((heart, index) => (
        <Draggable
          key={heart.id}
          axis="both"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[1, 1]}
          scale={1}
          onStart={(e, data) => console.log("Drag started", data)}
          onDrag={(e, data) => console.log("Dragging", data)}
          onStop={(e, data) => console.log("Drag stopped", data)}
        >
          <div className="handle">
            {" "}
            {/* This is the handle element */}
            <div
              key={index}
              className="heart"
              onClick={() => cycleHeart(index)}
              onDoubleClick={() => deleteHeart(index)}
              onWheel={(e) => handleWheel(index, e)}
              style={{
                fontSize: `${heart.fontSize}px`,
              }}
            >
              {heart.emoji}
            </div>
            ;
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default EmojiLogic;
