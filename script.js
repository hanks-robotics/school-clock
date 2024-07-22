// Function to format time in 12-hour format
function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedMinutes} ${period}`;
}

// Function to format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Function to display current time and date
function displayCurrentTimeAndDate() {
    const now = new Date();
    const timeString = formatTime(now);
    const dateString = formatDate(now);

    document.getElementById('current-time').innerHTML = `Current Time: ${timeString} <br> Date: ${dateString}`;
}

// Function to calculate time until the next period
function getTimeUntilNextPeriod(startTime, endTime) {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
    end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    // Adjust for Mountain Time
    start.setHours(start.getHours() - 6);
    end.setHours(end.getHours() - 6);

    // Check if we're in transition period
    if (now > end && now < new Date(end.getTime() + 5 * 60 * 1000)) {
        return `Transitioning to next period.`;
    }

    if (now < start) {
        return `Starts in ${Math.floor((start - now) / 60000)} minutes.`;
    } else if (now < end) {
        return `Ends in ${Math.floor((end - now) / 60000)} minutes.`;
    } else if (now < new Date(end.getTime() + 5 * 60 * 1000)) {
        return `Transitioning to next period.`;
    }

    return `Period ended.`;
}

// Define the schedules
const underclassmenSchedule = [
    { period: '0 Period', start: '7:30 AM', end: '8:15 AM' },
    { period: '1 Period', start: '8:30 AM', end: '9:15 AM' },
    { period: '2 Period', start: '9:20 AM', end: '10:05 AM' },
    { period: '3 Period', start: '10:10 AM', end: '10:55 AM' },
    { period: '4 Period', start: '11:00 AM', end: '11:45 AM' },
    { period: '5 Period (Advisory)', start: '11:50 AM', end: '12:20 PM' },
    { period: '6 Period (A Lunch)', start: '12:20 PM', end: '12:50 PM' },
    { period: '7 Period', start: '12:55 PM', end: '1:40 PM' },
    { period: '8 Period', start: '1:45 PM', end: '2:30 PM' },
    { period: '9 Period', start: '2:35 PM', end: '3:20 PM' },
    { period: '10 Period', start: '3:25 PM', end: '4:10 PM' },
    { period: '11 Period', start: '4:15 PM', end: '5:00 PM' }
];

const upperclassmenSchedule = [
    { period: '0 Period', start: '7:30 AM', end: '8:15 AM' },
    { period: '1 Period', start: '8:30 AM', end: '9:15 AM' },
    { period: '2 Period', start: '9:20 AM', end: '10:05 AM' },
    { period: '3 Period', start: '10:10 AM', end: '10:55 AM' },
    { period: '4 Period', start: '11:00 AM', end: '11:45 AM' },
    { period: '5 Period (Advisory)', start: '11:50 AM', end: '12:20 PM' },
    { period: '6 Period', start: '12:25 PM', end: '1:10 PM' },
    { period: '7 Period (B Lunch)', start: '1:10 PM', end: '1:40 PM' },
    { period: '8 Period', start: '1:45 PM', end: '2:30 PM' },
    { period: '9 Period', start: '2:35 PM', end: '3:20 PM' },
    { period: '10 Period', start: '3:25 PM', end: '4:10 PM' },
    { period: '11 Period', start: '4:15 PM', end: '5:00 PM' }
];

// Function to update the schedule on the page
function updateSchedule(scheduleId, schedule) {
    const container = document.getElementById(scheduleId);
    container.innerHTML = '';
    schedule.forEach(period => {
        const startTime = new Date(`1970-01-01T${period.start}:00`);
        const endTime = new Date(`1970-01-01T${period.end}:00`);
        const periodElement = document.createElement('div');
        periodElement.classList.add('time-period');
        periodElement.innerHTML = `
            <strong>${period.period}</strong>: ${period.start} - ${period.end}<br>
            ${getTimeUntilNextPeriod(startTime, endTime)}
        `;
        container.appendChild(periodElement);
    });
}

// Update the schedules and current time/date every minute
function updateSchedules() {
    displayCurrentTimeAndDate();
    updateSchedule('underclassmen-schedule', underclassmenSchedule);
    updateSchedule('upperclassmen-schedule', upperclassmenSchedule);
}

// Initial call to update schedules and time/date
updateSchedules();

// Update schedules and time/date every minute
setInterval(updateSchedules, 60000);
