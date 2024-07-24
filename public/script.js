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
        hour12: true,
        timeZone: 'America/Denver',
        timeZoneName: 'short'
    };
    const timeString = now.toLocaleString('en-US', options);
    document.getElementById('current-time').innerText = timeString;
}

const schedules = {
    default: {
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
    oneEvent: {
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
    twoHourDelay: {
        underclassmen: [
            { period: '1 Period', start: '10:30 AM', end: '11:00 AM' },
            { period: '2 Period', start: '11:05 AM', end: '11:35 AM' },
            { period: '3 Period', start: '11:40 AM', end: '12:10 PM' },
            { period: '4 Period', start: '12:15 PM', end: '12:45 PM' },
            { period: '5 Period', start: '12:50 PM', end: '01:20 PM' },
            { period: '6 Period (A Lunch)', start: '01:20 PM', end: '01:50 PM' },
            { period: '7 Period', start: '01:55 PM', end: '02:25 PM' },
            { period: '8 Period', start: '02:30 PM', end: '03:00 PM' },
            { period: '9 Period', start: '03:05 PM', end: '03:35 PM' },
            { period: '10 Period', start: '03:40 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ],
        upperclassmen: [
            { period: '1 Period', start: '10:30 AM', end: '11:00 AM' },
            { period: '2 Period', start: '11:05 AM', end: '11:35 AM' },
            { period: '3 Period', start: '11:40 AM', end: '12:10 PM' },
            { period: '4 Period', start: '12:15 PM', end: '12:45 PM' },
            { period: '5 Period', start: '12:50 PM', end: '01:20 PM' },
            { period: '6 Period', start: '01:20 PM', end: '01:55 PM' },
            { period: '7 Period (B Lunch)', start: '01:55 PM', end: '02:25 PM' },
            { period: '8 Period', start: '02:30 PM', end: '03:00 PM' },
            { period: '9 Period', start: '03:05 PM', end: '03:35 PM' },
            { period: '10 Period', start: '03:40 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ]
    },
    earlyReleaseMorning: {
        underclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:25 AM' },
            { period: '2 Period', start: '09:30 AM', end: '10:30 AM' },
            { period: '3 Period', start: '10:35 AM', end: '11:30 AM' },
            { period: '4 Period', start: '11:35 AM', end: '12:30 PM' }
        ],
        upperclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:25 AM' },
            { period: '2 Period', start: '09:30 AM', end: '10:30 AM' },
            { period: '3 Period', start: '10:35 AM', end: '11:30 AM' },
            { period: '4 Period', start: '11:35 AM', end: '12:30 PM' }
        ]
    },
    earlyReleaseAfternoon: {
        underclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '6 / 7 Period', start: '08:30 AM', end: '09:25 AM' },
            { period: '8 Period', start: '09:30 AM', end: '10:30 AM' },
            { period: '9 Period', start: '10:35 AM', end: '11:30 AM' },
            { period: '10 Period', start: '11:35 AM', end: '12:30 AM' },
        ],
        upperclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '6 / 7 Period', start: '08:30 AM', end: '09:25 AM' },
            { period: '8 Period', start: '09:30 AM', end: '10:30 AM' },
            { period: '9 Period', start: '10:35 AM', end: '11:30 AM' },
            { period: '10 Period', start: '11:35 AM', end: '12:30 AM' },
        ]
    },
    testing: {
        underclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:20 AM' },
            { period: '2 Period', start: '09:25 AM', end: '10:15 AM' },
            { period: '3 Period', start: '10:20 AM', end: '11:10 AM' },
            { period: '4 Period', start: '11:15 AM', end: '12:05 PM' },
            { period: '6 Period (A Lunch)', start: '12:10 PM', end: '01:00 PM' },
            { period: '8 Period', start: '02:00 PM', end: '02:40 PM' },
            { period: '9 Period', start: '02:45 PM', end: '03:25 PM' },
            { period: '10 Period', start: '03:30 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ],
        upperclassmen: [
            { period: '0 Period', start: '07:30 AM', end: '08:15 AM' },
            { period: '1 Period', start: '08:30 AM', end: '09:20 AM' },
            { period: '2 Period', start: '09:25 AM', end: '10:15 AM' },
            { period: '3 Period', start: '10:20 AM', end: '11:10 AM' },
            { period: '4 Period', start: '11:15 AM', end: '12:05 PM' },
            { period: '6 Period (A Lunch)', start: '12:10 PM', end: '01:00 PM' },
            { period: '8 Period', start: '02:00 PM', end: '02:40 PM' },
            { period: '9 Period', start: '02:45 PM', end: '03:25 PM' },
            { period: '10 Period', start: '03:30 PM', end: '04:10 PM' },
            { period: '11 Period', start: '04:15 PM', end: '05:00 PM' }
        ]
    }
};

function formatTime(date) {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
}

function updateSchedule(schedule, scheduleElementId, countdownElementId) {
    const now = new Date();
    const today = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Denver' });

    let currentPeriod = null;
    for (const period of schedule) {
        const [startHour, startMinute] = period.start.split(':');
        const [endHour, endMinute] = period.end.split(':');
        const startTime = new Date(now);
        const endTime = new Date(now);
        startTime.setHours(parseInt(startHour) + (period.start.includes('PM') && parseInt(startHour) !== 12 ? 12 : 0), parseInt(startMinute));
        endTime.setHours(parseInt(endHour) + (period.end.includes('PM') && parseInt(endHour) !== 12 ? 12 : 0), parseInt(endMinute));

        if (now >= startTime && now < endTime) {
            currentPeriod = period;
            break;
        }
    }

    const scheduleElement = document.getElementById(scheduleElementId);
    scheduleElement.innerHTML = '';
    for (const period of schedule) {
        const periodElement = document.createElement('li');
        periodElement.innerText = `${period.period}: ${period.start} - ${period.end}`;
        scheduleElement.appendChild(periodElement);
    }

    if (currentPeriod) {
        const endTime = new Date(now);
        const [endHour, endMinute] = currentPeriod.end.split(':');
        endTime.setHours(parseInt(endHour) + (currentPeriod.end.includes('PM') && parseInt(endHour) !== 12 ? 12 : 0), parseInt(endMinute));
        const timeLeft = (endTime - now) / 1000;
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = Math.floor(timeLeft % 60);

        document.getElementById(countdownElementId).innerText = `Time left in ${currentPeriod.period}: ${minutesLeft}m ${secondsLeft}s`;
    } else {
        document.getElementById(countdownElementId).innerText = 'No ongoing period';
    }
}

function updateSchedules() {
    const scheduleSelect = document.getElementById('schedule-select');
    const selectedSchedule = scheduleSelect.value;

    updateSchedule(schedules[selectedSchedule].underclassmen, 'underclassmen-schedule', 'underclassmen-countdown');
    updateSchedule(schedules[selectedSchedule].upperclassmen, 'upperclassmen-schedule', 'upperclassmen-countdown');
}

document.getElementById('schedule-select').addEventListener('change', updateSchedules);

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

updateSchedules();
setInterval(updateSchedules, 1000);
