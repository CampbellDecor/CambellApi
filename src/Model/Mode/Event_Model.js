exports.Event = function (
    eventName = '',
    eventImge = '',
    description = '',
    numberOfBooking = 0,
    eventcode = '',
) {
    return {
        eventName,
        eventImge,
        description,
        numberOfBooking,
        eventcode,
        get eventName() {
            return eventName;
        },
        set eventName(eventName) {
            this.eventName = eventName;
            return this;
        },
        get eventImge() {
            return eventImge;
        },
        set eventImge(eventImge) {
            this.eventImge = eventImge;
            return this;
        },
        get description() {
            return description
        },
        set description(description) {
            this.description = description
            return this;
        },
        get numberOfBooking() {
            return numberOfBooking
        },
        set numberOfBooking(numberOfBooking) {
            this.numberOfBooking = numberOfBooking;
            return this;
        },
        get eventcode() {
            return eventcode
        },
        set eventcode(eventcode) {
            this.eventcode = eventcode;
            return this;
        },
        get event() {
            return {
                eventName,
                eventImge,
                description,
                numberOfBooking,
                eventcode
            }
        },
        toString() {
            return JSON.stringify({
                eventName,
                eventImge,
                description,
                numberOfBooking,
                eventcode
            })
        }

    }
}
