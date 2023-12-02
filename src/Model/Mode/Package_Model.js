const Package = function (packagecode = '', packagName = '', packagePrice = '', description = '', packageImage = '', No_of_Booking = 0, ratingCount=0,
        avarageRating=0.0) {

    return {
        packagecode,
        packagName,
        packagePrice,
        description,
        packageImage,
        No_of_Booking,
        ratingCount,
        avarageRating,
        get data() {
            return {
                packagecode,
                packagName,
                packagePrice,
                description,
                packageImage,
                No_of_Booking,
                  ratingCount,
                  avarageRating
            }
        },
        set data({
            packagecode,
            packagName,
            packagePrice,
            description,
            packageImage,
            No_of_Booking,
              ratingCount,
              avarageRating
        }) {
            this.packagecode = packagecode,
                this.packagName = packagName,
                this.packagePrice = packagePrice,
                this.description = description,
                this.packageImage = packageImage,
                this.No_of_Booking = No_of_Booking,
                 this.ratingCount=ratingCount,
                  this.avarageRating=avarageRating

        },
        get packagecode() {
            return this.packagecode;
        },
        set packagecode(packagecode) {
            this.packagecode = packagecode;
            return this;
        },
        get packagName() {
            return this.packagName;

        },
        set packagName(packagName) {
            this.packagName = packagName;
            return this
        },
        get packageImage() {
            return this.packageImage;
        },
        set packageImage(packageImage) {
            this.packageImage = packageImage;
            return this
        },
        get packagePrice() {
            return this.packagePrice;
        },
        set packagePrice(packagePrice) {
            this.packagePrice = packagePrice;
            return this;
        },
        get NoofBooking() {
            return this.NoofBooking;
        },
        set NoofBooking(NoofBooking) {
            this.NoofBooking = NoofBooking;
            return this;
        },
        set description(description) {
            this.description = description;
            return this;
        },
        get description() {
            return description;
        },
        get avarageRating ()
        {
            return avarageRating;
        },
        set avarageRating (avarageRating)
        {
            this.avarageRating = avarageRating;
            return this;
        },
        get ratingCount ()
        {
            return ratingCount;
        },
        set ratingCount (ratingCount)
        {
            this.ratingCount=ratingCount
            return this;
        },
        toString() {
            return JSON.stringify({
                packagecode,
                packagName,
                packagePrice,
                description,
                packageImage,
                No_of_Booking,
                  ratingCount,
                  avarageRating
            })
        }

    }
}
