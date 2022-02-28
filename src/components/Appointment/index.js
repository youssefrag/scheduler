import React from "react";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import useVisualMode from 'hooks/useVisualMode'
import Status from "./Status";
import Confirm from "./Confirm";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name === null || interviewer === null) {
      return
    }
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
  }

  function deleteInterview() {
    transition(CONFIRMING)
  }

  function confirmDelete() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
  }

  function cancelDelete() {
    transition(SHOW)
  }

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, false)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />}

    </article>
  );
}