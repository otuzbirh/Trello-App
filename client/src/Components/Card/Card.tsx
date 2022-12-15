import React, { useState } from "react";
import {  MoreHorizontal } from "react-feather";
import { ITask} from "../../Interfaces/Interfaces";
import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
interface CardProps {
  card: ITask;
  boardId: string | undefined;
  removeCard: (boardId: string|undefined, cardId: string|undefined) => void;
  onDragEnd: (boardId: string|undefined, cardId: string|undefined) => void;
  onDragEnter: (boardId: string|undefined, cardId: string|undefined) => void;
  updateCard: (boardId: string|undefined, cardId: string|undefined, card: ITask) => void;
}
function Card(props: CardProps) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  const { title, _id, body, category} = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        key={card?._id}
        draggable
        onDragEnd={() => onDragEnd(boardId, _id)}
        onDragEnter={() => onDragEnter(boardId, _id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">
        
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeCard(boardId, _id)}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-title">{title}</div>
       
       
      </div>
    </>
  );
}

export default Card;
