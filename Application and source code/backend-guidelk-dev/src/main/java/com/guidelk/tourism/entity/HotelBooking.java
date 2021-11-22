package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.guidelk.tourism.util.BookingStatus;
import com.guidelk.tourism.util.StarGrading;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "hotel_booking", schema = "tourism")
public class HotelBooking extends SharedModel {
    private Integer hotelBookingId;
    private String bookingNumber;
    private Date checkInDate;
    private Date checkOutDate;
    private Integer hotelId;
    private Integer hotelPackageId;
    private Integer adultCount;
    private Integer childCount;
    private Integer roomCount;
    private Double total;
    private Integer bookingStatus;
    private Integer customerId;
    private Integer organizationId;

    private Customer customer;
    private Hotel hotel;
    private HotelPackage hotelPackage;

    private String bookingStatusDescription;


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HOTEL_BOOKING_G1")
    @SequenceGenerator(name = "HOTEL_BOOKING_G1", sequenceName = "hotel_booking_id", schema = "tourism", allocationSize = 1)
    @Column(name = "hotel_booking_id", nullable = false, precision = 0, unique = true)
    public Integer getHotelBookingId() {
        return hotelBookingId;
    }

    public void setHotelBookingId(Integer hotelBookingId) {
        this.hotelBookingId = hotelBookingId;
    }

    @Basic
    @Column(name = "booking_number", nullable = false)
    public String getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }

    @Basic
    @Column(name = "check_in_date", nullable = false)
    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    @Basic
    @Column(name = "check_out_date", nullable = false)
    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    @Basic
    @Column(name = "hotel_id", nullable = false)
    public Integer getHotelId() {
        return hotelId;
    }

    public void setHotelId(Integer hotelId) {
        this.hotelId = hotelId;
    }

    @Basic
    @Column(name = "adult_count", nullable = false)
    public Integer getAdultCount() {
        return adultCount;
    }


    public void setAdultCount(Integer adultCount) {
        this.adultCount = adultCount;
    }

    @Basic
    @Column(name = "child_count", nullable = false)
    public Integer getChildCount() {
        return childCount;
    }

    public void setChildCount(Integer childCount) {
        this.childCount = childCount;
    }

    @Basic
    @Column(name = "room_count", nullable = false)
    public Integer getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(Integer roomCount) {
        this.roomCount = roomCount;
    }

    @Basic
    @Column(name = "total", nullable = false)
    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    @Basic
    @Column(name = "booking_status", nullable = false)
    public Integer getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
        if (bookingStatus != null) {
            this.setBookingStatusDescription(BookingStatus.findOne(bookingStatus).getBookingStatusDescription());
        }
    }

    @Basic
    @Column(name = "customer_id", nullable = false)
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    @Basic
    @Column(name = "hotel_package_id", nullable = false)
    public Integer getHotelPackageId() {
        return hotelPackageId;
    }

    public void setHotelPackageId(Integer hotelPackageId) {
        this.hotelPackageId = hotelPackageId;
    }

    @Basic
    @Column(name = "organization_id", nullable = false)
    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @OneToOne(cascade = {CascadeType.PERSIST}, fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", insertable = false, updatable = false)
    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    @OneToOne(cascade = {CascadeType.PERSIST}, fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_package_id", insertable = false, updatable = false)
    public HotelPackage getHotelPackage() {
        return hotelPackage;
    }

    public void setHotelPackage(HotelPackage hotelPackage) {
        this.hotelPackage = hotelPackage;
    }

    @Transient
    public String getBookingStatusDescription() {
        return bookingStatusDescription;
    }

    public void setBookingStatusDescription(String bookingStatusDescription) {
        this.bookingStatusDescription = bookingStatusDescription;
    }
}
