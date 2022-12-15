import React, { useState } from "react";
import Card from "../Card/Card";
import CustomInput from "../CustomInput/CustomInput";

import "./Board.css";
import { ICategory, ITask } from "../../Interfaces/Interfaces";

interface BoardProps {
  board: ICategory;
  addCard: (boardId: string | undefined, title: string) => void;
  removeBoard: (boardId: string | undefined) => void;
  removeCard: (boardId: string | undefined, cardId: string | undefined) => void;
  onDragEnd: (boardId: string | undefined, cardId: string | undefined) => void;
  onDragEnter: (boardId: string | undefined, cardId: string | undefined) => void;
  updateCard: (boardId: string | undefined, cardId: string | undefined, card: ITask) => void;
}

function Board(props: BoardProps) {
  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  function showModal() {
    setShowDropdown(true)
  }
  return (
    <div className="board">
      <div className="board-inner" key={board?._id}>
        <div className="board-header">
          <p className="board-header-title">
            {board?.name}
            <span>{board?.tasks?.length || 0}</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={showModal}
          >
            <p onClick={() => removeBoard(board?._id)}>x</p>
            
          </div>
        </div>
        <div className="board-cards custom-scroll">
          {board?.tasks?.map((item) => (
            <Card
              key={item._id}
              card={item}
              boardId={board?._id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value: string) => addCard(board._id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
