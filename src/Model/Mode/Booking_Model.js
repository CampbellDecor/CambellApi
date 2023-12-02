const Booking = function (bookcode = '', userId = '', payPdf = '', bookQr = '', bookingName, Payment = '', status = '', bookDate = '', eventDate = '') {
    return {
        bookcode,
        userId,
        payPdf,
        bookQr,
        bookingName,
        Payment,
        status,
        bookDate,
        eventDate,
        set Bookcode(bookcode) {
            this.bookcode = bookcode;
            return this;
        },
        get Bookcode() {
            return this.bookcode;
        },
        set UserId(userId) {
            this.userId = userId;
            return this;
        },
        get UserId() {
            return this.userId;
        },
        set PayPdf(payPdf) {
            this.payPdf = payPdf;
            return this
        },
        get PayPdf() {
            return this.payPdf;
        },
        set BookQr(bookQr) {
            this.bookQr = bookQr;
            return this;
        },
        get BookQr() {
            return this.bookQr;
        },
        set BookingName(bookingName) {
            this.bookingName = bookingName;
            return this;
        },
        get BookingName() {
            return this.bookingName;
        },
        set BookDate(bookDate) {
            this.bookDate = bookDate;
            return this;
        },
        get BookDate() {
            return this.bookDate;
        },
        set EventDate(eventDate) {
            this.eventDate = eventDate;
            return this;
        },
        get EventDate() {
            return this.eventDate;
            return this;
        },
        get Payment() {
            return this.Payment
        },
        set Status(status) {
            this.status = status;
            return this;
        },
        get Status() {
            return this.status;
        },
        toString() {
            return JSON.stringify({
                bookcode,
                userId,
                payPdf,
                bookQr,
                bookingName,
                Payment,
                status,
                bookDate,
                eventDate
            })
        },
        get data() {
            return {
                bookcode,
                userId,
                payPdf,
                bookQr,
                bookingName,
                Payment,
                status,
                bookDate,
                eventDate
            }
        },
        set data({
            bookcode,
            userId,
            payPdf,
            bookQr,
            bookingName,
            Payment,
            status,
            bookDate,
            eventDate,
        }) {
            this.bookcode=bookcode,
            this.userId=userId,
            this.payPdf=payPdf,
            this.bookQr=bookQr,
            this.bookingName=bookingName,
            this.Payment=Payment,
            this.status=status,
            this.bookDate=bookDate,
            this.eventDate=eventDate
        }

    }
}
