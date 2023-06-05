import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch((err) => console.log("err: ", err))
    
  }
  
  function del() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch((err) => console.log("err: ", err))
  }

 
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status onSave={()=> transition(SAVING)} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
          // transition={props.transition}
          onDelete={()=> transition(CONFIRM)}
        />
      )}
      {mode === CONFIRM && <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={del}
        />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  )
}