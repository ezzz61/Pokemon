import React, { useState, useEffect } from "react";
import MoveListItem from "./MoveListItem";

export default function MoveList({ moveList }) {
  const [moveListData, setMoveListData] = useState([]);

  const sliceMoveList = () => {
    let temp_move_list = moveList?.slice(0, 20);
    setMoveListData(temp_move_list);
  };

  const showAllMove = () => {
    setMoveListData(moveList);
  };

  const hideList = () => {
    sliceMoveList();
  };

  useEffect(() => {
    sliceMoveList();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 text-white mt-4 ">
      {!moveListData.length ? (
        <p>No Move List!</p>
      ) : (
        moveListData.map((data) => <MoveListItem name={data.move.name} key={data.move.name} />)
      )}
      {moveList.length !== moveListData.length ? (
        <button className="text-black" onClick={showAllMove}>
          Load More...
        </button>
      ) : (
        <button className="text-black" onClick={hideList}>
          Hide List...
        </button>
      )}
    </div>
  );
}

