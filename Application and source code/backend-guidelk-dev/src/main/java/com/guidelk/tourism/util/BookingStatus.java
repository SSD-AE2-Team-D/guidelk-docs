package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum BookingStatus {

    PENDING(1, "Pending"),
    CONFIRM(2, "Confirm"),
    CANCEL(3, "Cancel ");

    private final Integer bookingStatusId;
    private final String bookingStatusDescription;

    BookingStatus(Integer bookingStatusId, String bookingStatusDescription) {
        this.bookingStatusId = bookingStatusId;
        this.bookingStatusDescription = bookingStatusDescription;
    }

    public Integer getBookingStatusId() {
        return bookingStatusId;
    }

    public String getBookingStatusDescription() {
        return bookingStatusDescription;
    }

    public static BookingStatus findOne(Integer bookingStatusId) {
        return Arrays.stream(BookingStatus.values())
                .filter(x -> x.bookingStatusId.equals(bookingStatusId))
                .findFirst()
                .orElse(null);
    }
}
