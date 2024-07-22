const underclassmenSchedule = [
    { period: "0 Period", start: "07:30", end: "08:15" },
    { period: "1 Period", start: "08:30", end: "09:15" },
    { period: "2 Period", start: "09:20", end: "10:05" },
    { period: "3 Period", start: "10:10", end: "10:55" },
    { period: "4 Period", start: "11:00", end: "11:45" },
    { period: "5 Period (Advisory)", start: "11:50", end: "12:20" },
    { period: "6 Period (A Lunch)", start: "12:20", end: "12:50" },
    { period: "7 Period", start: "12:55", end: "13:40" },
    { period: "8 Period", start: "13:45", end: "14:30" },
    { period: "9 Period", start: "14:35", end: "15:20" },
    { period: "10 Period", start: "15:25", end: "16:10" },
    { period: "11 Period", start: "16:15", end: "17:00" }
];

const upperclassmenSchedule = [
    { period: "0 Period", start: "07:30", end: "08:15" },
    { period: "1 Period", start: "08:30", end: "09:15" },
    { period: "2 Period", start: "09:20", end: "10:05" },
    { period: "3 Period", start: "10:10", end: "10:55" },
    { period: "4 Period", start: "11:00", end: "11:45" },
    { period: "5 Period (Advisory)", start: "11:50", end: "12:20" },
    { period: "6 Period", start: "12:25", end: "13:10" },
    { period: "7 Period (B Lunch)", start: "13:10", end: "13:40" },
    { period: "8 Period", start: "13:45", end: "14:30" },
    { period: "9 Period", start: "14:35", end: "15:20" },
    { period: "10 Period", start: "15:25", end: "16:10" },
    { period: "11 Period", start: "16:15", end: "17:00" }
];

function getCurrentPeriod(schedule) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (const period of schedule) {
        const [startHour, startMinute] = period.start.split(':').map(Number);
        const [endHour, endMinute] = period.end.split(':').map(Number);
        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;

        if (currentTime >= startTime && currentTime < endTime) {
            return period;
        }
    }

    return null;
}

function updateCountdown() {
    const underclassmenCurrentPeriod = getCurrentPeriod(underclassmenSchedule);
    const upperclassmenCurrentPeriod = getCurrentPeriod(upperclassmenSchedule);

    document.getElementById('underclassmen-countdown').innerText = underclassmenCurrentPeriod
        ? `${underclassmenCurrentPeriod.period}: Ends at ${underclassmenCurrentPeriod.end}`
        : 'No ongoing class';

    document.getElementById('upperclassmen-countdown').innerText = upperclassmenCurrentPeriod
        ? `${upperclassmenCurrentPeriod.period}: Ends at ${upperclassmenCurrentPeriod.end}`
        : 'No ongoing class';
}

updateCountdown();
setInterval(updateCountdown, 60000);
