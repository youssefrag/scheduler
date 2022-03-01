import { useState, useEffect } from "react";
import axios from 'axios'

export default function useApplicationData(useApplicationData) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const spots = function() {
    for (let appointment of state.day.appointments) {
      console.log(appointment)
    }
  }

  const setDay = day => {
    setState({...state, day})
  };

  const updateSpots = function(state) {
    const newDays = []
    for (let day of state.days) {
      let spots = 0;
      const appointmentsArray = day.appointments
      for (let appointment of appointmentsArray) {
        if (state.appointments[appointment].interview) {
          spots++
        }
      }
      newDays.push({...day, spots: (5 - spots)})
    }
    return newDays
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newState = {...state, appointments}
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })
    .then(() => setState({...newState, days: updateSpots(newState)}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newState = {...state, appointments}
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...newState, days: updateSpots(newState)}))
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(([{data: days}, {data: appointments}, {data: interviewers}]) =>
      setState(prev => ({...prev, days, appointments, interviewers})))}
  , [])

  return { state, setDay, bookInterview, cancelInterview, spots };
}