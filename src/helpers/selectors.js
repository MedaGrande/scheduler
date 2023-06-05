export function getAppointmentsForDay(state, dayName) {
  const filteredDay = state.days.filter(day => day.name === dayName);
  const checkDay = [];
  if (filteredDay.length < 1) {
    return checkDay;
  }
  const appointmentIdsOfDay = filteredDay[0]['appointments'];
  const appointmentList = state.appointments;
  
  const appointmentArray = appointmentIdsOfDay.map((appointmentId) => {
    if (appointmentId === appointmentList[appointmentId].id) {
      return appointmentList[appointmentId];
    } 
  })

  return appointmentArray;
}

export function getInterview(state, interview) {
  
  if (interview) {
    const interviewers = state.interviewers;
    const interviewerID = interview.interviewer;
    const interviewer = interviewers[interviewerID];
    return { ...interview, interviewer: interviewer };
  } else {
    return null;
  }

}

export function getInterviewersForDay(state, dayName) {
  
  const wantedDayObj = state.days.find(day => day.name === dayName)
  if (!wantedDayObj) return [];
  
  const interviewerIdsOfDay = wantedDayObj.interviewers;
  const interviewerList = state.interviewers;

  const interviewersArray = interviewerIdsOfDay.map((interviewerId) => {

    if (interviewerId === interviewerList[interviewerId].id) {
      
      return interviewerList[interviewerId];
    }
  })
  
  return interviewersArray;
}

