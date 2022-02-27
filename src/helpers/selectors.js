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

export function getInterviewersForDay(state, day) {
    let appointmentsArray = []
    const days = state.days
    for (let item of days) {
      if (item.name === day) {
        appointmentsArray = item.appointments
      }
    }
    let interviewerIDsArray = []
    for (let appointment of appointmentsArray) {
     if(state.appointments[appointment].interview) {
      interviewerIDsArray.push(state.appointments[appointment].interview.interviewer)
     }
    }
    let interviewersForDayObject = []
    for (let id of interviewerIDsArray) {
      interviewersForDayObject.push(state.interviewers[id])
    }
    return interviewersForDayObject
}