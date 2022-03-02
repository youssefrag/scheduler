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

  const updateSpots = function(state, appointments) {
    const newDays = []
    for (let day of state.days) {
      let totalSpots = state.days[state.days.indexOf(day)].appointments.length
      let spotsAdded = 0;
      const appointmentsArray = day.appointments
      for (let appointment of appointmentsArray) {
        if (appointments[appointment].interview) {
          spotsAdded++;
        }
      }
      const spotsRemaining = totalSpots - spotsAdded
      newDays.push({...day, spots: spotsRemaining})
    }
  
    return newDays;
  };

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
    .then(() => setState({...newState, days: updateSpots(newState, appointments)}))
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
    .then(() => setState({...newState, days: updateSpots(newState, appointments)}))
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(([{data: days}, {data: appointments}, {data: interviewers}]) =>
      setState(prev => ({...prev, days, appointments, interviewers})))}
  , [])

  return { state, setDay, bookInterview, cancelInterview };
}