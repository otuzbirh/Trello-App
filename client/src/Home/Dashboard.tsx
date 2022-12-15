import React, { useEffect, useState } from "react";
import Board from "../Components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../Components/CustomInput/CustomInput";
import { ICategory, ITask, ITask2 } from "../Interfaces/Interfaces";
import categoryAPI from "../http/categoryAPI";
import taskAPI from "../http/taskApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [boards, setBoards] = useState<ICategory[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await categoryAPI().getAllCategories();
    setBoards(data);
  }

  const [targetCard, setTargetCard] = useState({
    boardId: "",
    cardId: "",
  });

  const addboardHandler = (name: string) => {
    const bo: ICategory = {
      name: name,
    }
    const tempBoardsList: ICategory[] = [...boards];
    categoryAPI().create(bo)
      .then((res: any) => {
        tempBoardsList.push(bo);
        setBoards(tempBoardsList);

      })
      .catch((e: any) => {
        console.log(e);
      });


  };

  const removeBoard = (boardId: string | undefined) => {
    const boardIndex = boards.findIndex((item: ICategory) => item._id === boardId);
    if (boardIndex < 0) return;

    categoryAPI().deleteCategory(boardId).then((res: any) => {
      const tempBoardsList = [...boards];
      tempBoardsList.splice(boardIndex, 1);
      setBoards(tempBoardsList);

    })
      .catch((e: any) => {
        console.log(e);
      });



  };
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("access_token");
      navigate(0);
    
  }

  const addCardHandler = (boardId: any, title: string) => {
    const boardIndex = boards.findIndex((item: ICategory) => item._id === boardId);
    if (Number(boardIndex) < 0) return;
    const tempBoardsList = [...boards];
    const task: ITask = {
      title,
      category: boardId
    }

    taskAPI().create(task)
      .then((res: any) => {
        tempBoardsList[boardIndex].tasks?.push(task);
        setBoards(tempBoardsList);

      })
      .catch((e: any) => {
        console.log(e);
      });

  };

  const removeCard = (boardId: string | undefined, cardId: string | undefined) => {

    const boardIndex = boards.findIndex((item: ICategory) => item._id === boardId);
    if (Number(boardIndex) < 0) return;

    const tempBoardsList = [...boards];
    const tasks = tempBoardsList[boardIndex].tasks;
    const taskIndex = tasks?.findIndex((item: ITask) => item._id === cardId) ?? -1;

    if (Number(taskIndex) < 0) return;

    taskAPI().deleteTask(cardId).then((res: any) => {
      tasks?.splice(taskIndex, 1);
      setBoards(tempBoardsList);

    })
      .catch((e: any) => {
        console.log(e);
      });


  };

  const updateCard = (boardId: string | undefined, cardId: string | undefined, card: ITask) => {
    const boardIndex = boards.findIndex((item) => item._id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards: any = tempBoardsList[boardIndex].tasks;

    const cardIndex: any = cards?.findIndex((item: any) => item._id === cardId);
    if (cardIndex < 0) return;

    const task: ITask2 = {
      category: cardIndex
    }
    taskAPI().updateTask2(task, cardIndex)
      .then((res: any) => {
        cards[cardIndex] = card;
        setBoards(tempBoardsList);

      })
      .catch((e: any) => {
        console.log(e);
      });

    // tempBoardsList[boardIndex].tasks[cardIndex] = card;

  };

  const onDragEnd = (boardId: string | undefined, cardId: string | undefined) => {
    const sourceBoardIndex: any | undefined = boards.findIndex(
      (item: ICategory) => item._id === boardId,
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex: any | undefined = boards[sourceBoardIndex]?.tasks?.findIndex(
      (item) => item._id === cardId,
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item: ICategory) => item._id === targetCard.boardId,
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex: any = boards[targetBoardIndex]?.tasks?.findIndex(
      (item) => item._id === targetCard.cardId,
    );
    if (targetCardIndex < 0) return;

    const task: ITask2 = {
      // title: 
      category: targetCard.boardId
    }
    taskAPI().updateTask2(task, cardId)
      .then((res: any) => {
        const tempBoardsList: any = [...boards];
        const sourceCard: any = tempBoardsList[sourceBoardIndex]?.tasks[sourceCardIndex];
        tempBoardsList[sourceBoardIndex].tasks?.splice(sourceCardIndex, 1);
        tempBoardsList[targetBoardIndex].tasks?.splice(
          targetCardIndex,
          0,
          sourceCard,
        );
        setBoards(tempBoardsList);

        setTargetCard({
          boardId: "",
          cardId: "",
        });

      })
      .catch((e: any) => {
        console.log(e);
      });


  };

  const onDragEnter = (boardId: any, cardId: any) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };


  return (
    <div className="app">
      <div className="app-nav">
        <h1> Trello </h1>
        
        <button onClick={logOut}>LOG OUT</button>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <Board
              key={item._id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item._id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
