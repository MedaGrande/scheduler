import { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";


export function useApplicationData(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}, 
  });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then((all) => { 
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    }).catch((err) => console.log('error: ', err));
  }, [])

//  appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": {
//       id: 2,
//       time: "1pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Leopold Silvers", interviewer: 4 }
//     },
//     "4": { id: 4, time: "3pm", interview: null }
//   },
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    console.log("state: ", state);
    
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        let counter = 0;
        day.appointments.forEach(appointmentId => {
          if (appointments[appointmentId].interview === null) {
            counter++
          }
        });
        return {
          ...day, spots: counter
        }
      } else {
        return day
      }
    }

    )
  


    return Axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments, 
          days
        });
      });
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
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return {
          ...day, spots: day.spots + 1
        }
      } else {
        return day
      }
    }

    )

    return Axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }
  return {
    state, 
    setDay,
    bookInterview, 
    cancelInterview
  }
}

  

  