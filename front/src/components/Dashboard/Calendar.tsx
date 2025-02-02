import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "Reunión", date: "2025-02-03" },
        { title: "Reunión", date: "2025-03-03" },
      ]}
    />
    //Comentario
  );
}
