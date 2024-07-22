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
};

function getCurrentPeriod(schedule) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < schedule.length; i++) {
        const [startHour, startMinute, startPeriod] = schedule[i].start.split(/[: ]/);
        const [endHour, endMinute, endPeriod] = schedule[i].end.split(/[: ]/);

        const start = ((startPeriod === 'PM' && parseInt(startHour) !== 12 ? parseInt(startHour) + 12 : parseInt(startHour)) * 60) + parseInt(startMinute);
        const end = ((endPeriod === 'PM' && parseInt(endHour) !== 12 ? parseInt(endHour) + 12 : parseInt(endHour)) * 60) + parseInt(endMinute);

        if (currentTime >= start && currentTime < end) {
            return { current: schedule[i], next: schedule[i + 1] || null };
        }
    }
    return { current: null, next: schedule[0] };
}

function updateSchedule(schedule, elementId, countdownElementId) {
    const now = new Date();
    const day = now.getDay();
    const isWeekend = (day === 0 || day === 6); // Check if it's Saturday (6) or Sunday (0)

    if (isWeekend) {
        document.getElementById(elementId).innerHTML = '<p>No schedule available on weekends.</p>';
        return;
    }

    const scheduleElement = document.getElementById(elementId);
    scheduleElement.innerHTML = '';

    const { current, next } = getCurrentPeriod(schedule);

    if (current) {
        const end = new Date(now);
        const [endHour, endMinute] = current.end.split(/[: ]/).slice(0, 2).map(Number);
        const endPeriod = current.end.split(' ')[1];
        end.setHours(endPeriod === 'PM' && endHour !== 12 ? endHour + 12 : endHour, endMinute, 0, 0);

        const remainingTime = end - now;
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        const countdown = `${hours}h ${minutes}m ${seconds}s`;

        const countdownElement = document.getElementById(countdownElementId);
        countdownElement.innerHTML = `Current: ${current.period} | Ends in: ${countdown}`;

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
    updateSchedule(schedules.underclassmen, 'underclassmen-schedule', 'underclassmen-countdown');
    updateSchedule(schedules.upperclassmen, 'upperclassmen-schedule', 'upperclassmen-countdown');
}

setInterval(updateCurrentTime, 1000);
setInterval(updateAllSchedules, 1000);

updateCurrentTime();
updateAllSchedules();
