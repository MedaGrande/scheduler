import React, { Component } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  //conditional css
  const interviewersItem = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewersItem} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name }
    </li>
  )
}