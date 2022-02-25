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