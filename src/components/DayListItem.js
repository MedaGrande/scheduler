import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
import { formatSpots } from "./formatSpots";


export default function DayListItem(props) {
  const { name, spots, setDay } = props;
  const spotsMessage = formatSpots(spots);

  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots
  });
  
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsMessage}</h3>
    </li>
  );
}