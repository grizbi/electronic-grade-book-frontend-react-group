import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {

    const[date, setDate] = useState(new Date());

    return ( 
        <div className="calendar-container">
            <Calendar onChange={setDate} value={date}></Calendar>
        </div>
     );
}
 
export default MyCalendar;