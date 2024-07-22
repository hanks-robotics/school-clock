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
        timeZoneName: 'short'
    };
    const timeString = now.toLocaleString('en-US', options);
    document.getElementById('current-time').innerText = timeString;
}

const schedules = {
    underclassmen: [
        { period: '0 Period', start: '07:30', end: '08:15' },
        { period: '1 Period', start: '08:30', end: '09:15' },
        { period: '2 Period', start: '09:20', end: '10:05' },
        { period: '3 Period', start: '10:10', end: '10:55' },
        { period: '4 Period', start: '11:00', end: '11:45' },
        { period: '5 Period (Advisory)', start: '11:50', end: '12:20' },
        { period: '6 Period (A Lunch)', start: '12:20', end: '12:50' },
        { period: '7 Period', start: '12:55', end: '13:40' },
        { period: '8 Period', start: '13:45', end: '14:30' },
        { period: '9 Period', start: '14:35', end: '15:20' },
        { period: '10 Period', start: '15:25', end: '16:10' },
        { period: '11 Period', start: '16:15', end: '17:00' }
    ],
    upperclassmen: [
        { period: '0 Period', start: '07:30', end: '08:15' },
        { period: '1 Period', start: '08:30', end: '09:15' },
        { period: '2 Period', start: '09:20', end: '10:05' },
        { period: '3 Period', start: '10:10', end: '10:55' },
        { period: '4 Period', start: '11:00', end: '11:45' },
        { period: '5 Period (Advisory)', start: '11:50', end: '12:20' },
        { period: '6 Period', start: '12:25', end: '13:10' },
        { period: '7 Period (B Lunch)', start: '13:10', end: '13:40' },
        { period: '8 Period', start: '13:45', end: '14:30' },
        { period: '9 Period', start: '14:35', end: '15:20' },
        { period: '10 Period', start: '15:25', end: '16:10' },
        { period: '11 Period', start: '16:15', end: '17:00' }
    ]
};

function getCurrentPeriod(schedule) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < schedule.length; i++) {
        const [startHour, startMinute] = schedule[i].start.split(':').map(Number);
        const start = startHour * 60 + startMinute;

        const [endHour, endMinute] = schedule[i].end.split(':').map(Number);
        const end = endHour * 60 + endMinute;

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
        const [endHour, endMinute] = current.end.split(':').map(Number);
        end.setHours(endHour, endMinute, 0, 0);

        const remainingTime = end - now;
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        const countdown = `${hours}h ${minutes}m ${seconds}s`;

        const countdownElement = document.getElementById(countdownElementId);
        countdownElement.innerHTML = `Current: ${current.period} <br> Next: ${next ? next.period : 'End of day'} <br> <span>${countdown}</span>`;
    } else {
        document.getElementById(countdownElementId).innerHTML = 'School day is over.';
    }

    schedule.forEach(period => {
        const periodElement = document.createElement('div');
        periodElement.className = 'time-period';
        periodElement.innerHTML = `<strong>${period.period}:</strong> ${period.start} - ${period.end}`;
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
