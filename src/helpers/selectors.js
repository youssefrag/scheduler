export function getAppointmentsForDay(state, day) {
  let appointmentsArray = []
  const days = state.days
  for (let item of days) {
    if (item.name === day) {
      appointmentsArray = item.appointments
    }
  }
  const objectsArray = appointmentsArray.map((id) => {
    return (
      state.appointments[id]
    )
  })
  return objectsArray
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state, day) {
  let interviewersArray = []
  const days = state.days
  for (let item of days) {
    if (item.name === day) {
      interviewersArray = item.interviewers
    }
  }
  const objectsArray = interviewersArray.map((id) => {
    return (
      state.interviewers[id]
    )
  })
  return objectsArray
}