// script.js

function updateCurrentTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Denver',
        timeZoneName: 'short',
        hour12: true
    };
    const timeString = now.toLocaleString('en-US', options);
    document.getElementById('current-time').innerText = timeString;
}

const schedules = {
    regular: {
        underclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:15 AM' },
            { period: '2 Period', start: '09:20 AM', end: '10:05 AM' },
            { period: '3 Period', start: '10:10 AM', end: '10:55 AM' },
            { period: '4 Period', start: '11:00 AM', end: '11:45 AM' },
            { period: '5 Period (Advisory)', start: '11:50 AM', end: '12:20 PM' },
            { period: '6 Period (A Lunch)', start: '12:20 PM', end: '12:50 PM' },
            { period: '7 Period', start: '12:55 PM', end: '01:40 PM' },
            { period: '8 Period', start: '01:45 PM', end: '02:30 PM' },
            { period: '9 Period', start: '02:35 PM', end: '03:20 PM' },
            { period: '10 Period', start: '03:25 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ],
        upperclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:15 AM' },
            { period: '2 Period', start: '09:20 AM', end: '10:05 AM' },
            { period: '3 Period', start: '10:10 AM', end: '10:55 AM' },
            { period: '4 Period', start: '11:00 AM', end: '11:45 AM' },
            { period: '5 Period (Advisory)', start: '11:50 AM', end: '12:20 PM' },
            { period: '6 Period', start: '12:25 PM', end: '01:10 PM' },
            { period: '7 Period (B Lunch)', start: '01:10 PM', end: '01:40 PM' },
            { period: '8 Period', start: '01:45 PM', end: '02:30 PM' },
            { period: '9 Period', start: '02:35 PM', end: '03:20 PM' },
            { period: '10 Period', start: '03:25 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ]
    },
    'one-event': {
        underclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:08 AM' },
            { period: '2 Period', start: '09:13 AM', end: '09:51 AM' },
            { period: '3 Period', start: '09:56 AM', end: '10:34 AM' },
            { period: '4 Period', start: '10:39 AM', end: '11:17 AM' },
            { period: '5 Period (Advisory)', start: '11:22 AM', end: '12:52 PM' },
            { period: '6 Period (A Lunch)', start: '12:52 PM', end: '01:22 PM' },
            { period: '7 Period', start: '01:27 PM', end: '02:05 PM' },
            { period: '8 Period', start: '02:10 PM', end: '02:48 PM' },
            { period: '9 Period', start: '02:53 PM', end: '03:31 PM' },
            { period: '10 Period', start: '03:36 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ],
        upperclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:08 AM' },
            { period: '2 Period', start: '09:13 AM', end: '09:51 AM' },
            { period: '3 Period', start: '09:56 AM', end: '10:34 AM' },
            { period: '4 Period', start: '10:39 AM', end: '11:17 AM' },
            { period: '5 Period (Advisory)', start: '11:22 AM', end: '12:52 PM' },
            { period: '6 Period', start: '12:57 PM', end: '01:35 PM' },
            { period: '7 Period (B Lunch)', start: '01:35 PM', end: '02:05 PM' },
            { period: '8 Period', start: '02:10 PM', end: '02:48 PM' },
            { period: '9 Period', start: '02:53 PM', end: '03:31 PM' },
            { period: '10 Period', start: '03:36 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ]
    },
    // Add other schedules here
};

function getRemainingTime(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { distance, hours, minutes, seconds };
}

function formatRemainingTime(hours, minutes, seconds) {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateSchedule(schedule, scheduleElementId, countdownElementId) {
    const scheduleElement = document.getElementById(scheduleElementId);
    scheduleElement.innerHTML = '';
    const now = new Date();
    const currentTime = now.getTime();

    let current = null;
    let next = null;

    for (let i = 0; i < schedule.length; i++) {
        const period = schedule[i];
        const startTime = new Date();
        const [startHour, startMinute] = period.start.split(/[: ]/);
        startTime.setHours(period.start.endsWith('PM') && startHour !== '12' ? +startHour + 12 : +startHour);
        startTime.setMinutes(+startMinute);
        startTime.setSeconds(0);

        const endTime = new Date();
        const [endHour, endMinute] = period.end.split(/[: ]/);
        endTime.setHours(period.end.endsWith('PM') && endHour !== '12' ? +endHour + 12 : +endHour);
        endTime.setMinutes(+endMinute);
        endTime.setSeconds(0);

        if (currentTime >= startTime.getTime() && currentTime <= endTime.getTime()) {
            current = { ...period, endTime: endTime.getTime() };
            next = i + 1 < schedule.length ? schedule[i + 1] : null;
            break;
        }
    }

    if (current) {
        const countdownElement = document.getElementById(countdownElementId);
        const { hours, minutes, seconds } = getRemainingTime(current.endTime);
        countdownElement.innerHTML = `${current.period}: ${formatRemainingTime(hours, minutes, seconds)}<br>Ends in: ${formatRemainingTime(hours, minutes, seconds)}`;

        if (next) {
            countdownElement.innerHTML += `<br>Next: ${next.period}`;
        }
    } else {
        const countdownElement = document.getElementById(countdownElementId);
        countdownElement.innerHTML = 'No current period';
    }

    schedule.forEach(period => {
        const periodElement = document.createElement('p');
        periodElement.textContent = `${period.period}: ${period.start} - ${period.end}`;
        scheduleElement.appendChild(periodElement);
    });
}

function updateAllSchedules() {
    const selectedSchedule = document.getElementById('schedule-select').value;
    updateSchedule(schedules[selectedSchedule].underclassmen, 'underclassmen-schedule', 'underclassmen-countdown');
    updateSchedule(schedules[selectedSchedule].upperclassmen, 'upperclassmen-schedule', 'upperclassmen-countdown');
}

document.getElementById('schedule-select').addEventListener('change', updateAllSchedules);

setInterval(updateCurrentTime, 1000);
setInterval(updateAllSchedules, 1000);

updateCurrentTime();
updateAllSchedules();
