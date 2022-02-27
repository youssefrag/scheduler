import React from "react";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import useVisualMode from 'hooks/useVisualMode'

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, false)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={[]}
          onCancel={() => back()} 
        />
      )}
    </article>
  );
}