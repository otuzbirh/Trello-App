import React, { useEffect, useState } from "react";
import {  Type } from "react-feather";
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";

import "./CardInfo.css";
import { ITask} from "../../../Interfaces/Interfaces";
import taskAPI from "../../../http/taskApi";

interface CardInfoProps {
  onClose: () => void;
  card: ITask;
  boardId: string|undefined;
  updateCard: (boardId: string|undefined, cardId: string|undefined, card: ITask) => void;
}
function CardInfo(props: CardInfoProps) {
  const { onClose, card, boardId, updateCard } = props;
  const [cardValues, setCardValues] = useState<ITask>({
    ...card,
  });
  
  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });

    const task: ITask = {
      title: value ,
      category: boardId,
      
     
   }
    taskAPI().updateTask(task, cardValues._id)
    .then((res: any) => {
      console.log("Update task", res)
     

    })
    .catch((e: any) => {
      console.log(e);
    });
  };

 



;

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues?._id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);


  


  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>


      </div>
    </Modal>
  );
}

export default CardInfo;
