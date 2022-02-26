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
  const interviewObject = {}
  interviewObject.student = interview.student
  const interviewerId = interview.interviewer
  const interviewerObject = state.interviewers[interviewerId]
  interviewObject.interviewer = interviewerObject
  return interviewObject
}