import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerItem = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      interviewer={interviewer.id}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItem}
      </ul>
    </section>
  )
}