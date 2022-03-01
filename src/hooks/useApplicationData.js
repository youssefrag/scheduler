import { useState, useEffect } from "react";
import axios from 'axios'

export default function useApplicationData(useApplicationData) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => {
    setState({...state, day})
  };

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments})
    await axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments})
    await axios.delete(`http://localhost:8001/api/appointments/${id}`)
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