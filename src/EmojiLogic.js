import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function EmojiLogic({ hearts, setHearts }) {
  const emojiOptions = ["🤍", "💛", "🧡", "❤️", "💜", "💙", "💚", "🤎", "🖤"];

  const cycleHeart = (index) => {
    const updatedHearts = [...hearts];
    updatedHearts[index].currentIndex =
      (updatedHearts[index].currentIndex + 1) % emojiOptions.length;
    updatedHearts[index].emoji =
      emojiOptions[updatedHearts[index].currentIndex];
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

  //to prevent default scrolling the page up and down

  useEffect(() => {
    const canvas = document.querySelector(".canvas");

    const preventScroll = (e) => {
      if (canvas && canvas.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventScroll);
    };
  }, []);

  return (
    <Droppable droppableId="canvas">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="canvas"
        >
          {hearts.map((heart, index) => (
            <Draggable key={index} draggableId={`heart-${index}`} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="heart"
                  onClick={() => {
                    cycleHeart(index);
                  }}
                  onDoubleClick={() => {
                    deleteHeart(index);
                  }}
                  onWheel={(e) => {
                    handleWheel(index, e);
                  }}
                  style={{
                    fontSize: `${heart.fontSize}px`,
                    cursor: "grab",
                  }}
                >
                  {heart.emoji}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default EmojiLogic;
