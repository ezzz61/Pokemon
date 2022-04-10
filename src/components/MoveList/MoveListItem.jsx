import React from "react";

export default function MoveListItem({ name }) {
  //   const [color, setColor] = useState("bg-emerald-400");
  //   const color_list = ["green", "red", "blue", "amber", "lime"];
  //   const numbers = ["400", "500"];

  //   useEffect(() => {
  //     const getColor = Math.floor(Math.random() * color_list.length);
  //     const getNumber = Math.floor(Math.random() * numbers.length);
  //     setColor(`bg-${color_list[getColor]}-${numbers[getNumber]}`);
  //   }, []);

  return <span className={`py-1 px-2  bg-blue-600`}>{name}</span>;
}

