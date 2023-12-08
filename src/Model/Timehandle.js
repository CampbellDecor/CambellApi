const TimeDiffFromToday = (date) => {
    const Today = new Date();
    return {
        Y: Today.getFullYear() - date.getFullYear(),
        M: Today.getMonth() - date.getMonth(),
        D: Today.getDate() - (date.getDate() - 1),
        h: Today.getHours() - date.getHours(),
        m: Today.getMinutes() - date.getMinutes(),
        s: Today.getSeconds() - date.getSeconds()
    };
}
const diffTimeString = (date) => {
    const time = TimeDiffFromToday(date);
    if (time.Y > 0) {
        return `${time.Y} yrs ago`
    } else {
        if (time.M > 0) {
            return `${time.M} Mon ago`
        } else {
            if (time.D > 0) {
                return `${time.D} Days ago`
            } else {
                if (time.h > 0) {
                    return `${time.h} Hrs ago`
                } else {
                    if (time.m > 0) {
                        return `${time.m} min ago`
                    } else {
                        return "Just now";
                    }
                }
            }
        }
    }
}
module.exports = {
    diffTimeString,
    TimeDiffFromToday
}
