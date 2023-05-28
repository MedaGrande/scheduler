export function getAppointmentsForDay(state, name) {
  const filteredDay = state.days.filter(day => day.name === name);
  const checkDay = [];
  if (filteredDay.length < 1) {
    return checkDay;
  }
  const appointmentsOfDay = filteredDay[0]['appointments'];
  const appointmentList = state.appointments;
  
  const appointmentID = appointmentsOfDay.map((appointmentID) => {
    if (appointmentID === appointmentList[appointmentID].id) {
      return appointmentList[appointmentID];
    } 
  })
  return appointmentID;
}
