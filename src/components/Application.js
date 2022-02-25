import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";

import DayList from "./DayList"
import Appointment from "./Appointment"
import { getAppointmentsForDay } from 'helpers/selectors'

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = [];





  const setDay = day => {
    setState({...state, day})
  };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(([{data: days}, {data: appointments}, {data: interviewers}]) => 
      setState(prev => ({...prev, days, appointments, interviewers})))}
  , [])


  const listSchedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    console.log(appointment)
    return(
      <Appointment key={appointment.id} {...appointment} />
    )
  })

  return (
    
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listSchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
