//custom hook containing state & associated functions
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

  //fetch data & update state
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

  //a function for booking an interview & update local & remote state
  function bookInterview(id, interview) {
    //add new interview object to appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    //update spots remaining
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
  
    //update remote state
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
  
  // a function to remove an interview & update state
  function cancelInterview(id) {
    //set interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //update spots remaining
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

    //update remote state
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

  

  