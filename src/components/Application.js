import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  let dailyAppointments = [];
  
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
    .catch ((err) => console.log('error: ', err));
  }


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

  dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewersArray = getInterviewersForDay(state, state.day);


  // const dailyAppointments = getAppointmentsForDay(state,
  //   state.day
  // );
  // const interviewers = getInterviewersForDay(state,
  //   state.day
  // );
  // const appointmentList =
  //   dailyAppointments.map
  //     (appointment => {
  //       const { id, interview } = appointment;
  //       const interviewObj = getInterview(state, interview);
  //       return (
  //         <Appointment
  //           key={id}
  //           {...appointment}
  //           interview={interviewObj}
  //           interviewers={interviewers}
  //           bookInterview={bookInterview}
  //           // cancelInterview={cancelInterview}
  //         />
  //       );
  //     }); 

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(dailyAppointments).map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              interview={interview}
              interviewers={interviewersArray}
              {...appointment}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        {/* {appointmentList}  */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
