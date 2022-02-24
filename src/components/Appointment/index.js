import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">Appointment {props.time && <span>at {props.time}</span>}</article>
  );
}