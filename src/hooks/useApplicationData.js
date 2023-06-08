import { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";


export function useApplicationData(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    }).catch((err) => console.log('error: ', err));
  })


  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
  }
  

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log("appointment: ", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log("appointments: ", appointments);

    return Axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        setState({
          ...state,
          appointments
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

  

  