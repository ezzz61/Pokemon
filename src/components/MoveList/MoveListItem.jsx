import React from "react";

export default function MoveListItem({ name }) {
  const color_list = ["green", "red", "blue", "amber", "lime"];
  const numbers = ["400", "500"];

  function getRandomBgColor() {
    const getColor = Math.floor(Math.random() * color_list.length);
    const getNumber = Math.floor(Math.random() * numbers.length);

    return `bg-${color_list[getColor]}-${numbers[getNumber]}`;
  }

  return <span className={`py-1 px-2  ${getRandomBgColor()}`}>{name}</span>;
}

