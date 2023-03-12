import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime); // Load the relativeTime plugin
dayjs.extend(duration)
export const  fromNow = (timestamp)=>{

    const date1 = new Date(timestamp * 1000); // Create a Date object from the timestamp
    const date2 = new Date(Date.now()); // Get the current date

    const diff = dayjs(date2).diff(date1, 'second');  // Get the difference in days
// Convert the difference to a human-readable string
    return  dayjs.duration(diff, 'second').humanize()
}