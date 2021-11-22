package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "hotel_package", schema = "tourism")
public class HotelPackage extends SharedModel {
    private Integer hotelPackageId;
    private String packageName;
    private Integer hotelId;
    private Integer roomTypeId;
    private String description;
    private Date startDate;
    private Date endDate;
    private Double amount;
    private Integer availabilityCount;
    private Integer organizationId;

    private Set<HotelPackageActivity> hotelPackageActivities = new HashSet<>();

    private Hotel hotel;
    private RoomType roomType;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PACKAGE_G1")
    @SequenceGenerator(name = "PACKAGE_G1", sequenceName = "hotel_package_id", schema = "tourism", allocationSize = 1)
    @Column(name = "hotel_package_id", nullable = false, precision = 0, unique = true)
    public Integer getHotelPackageId() {
        return hotelPackageId;
    }

    public void setHotelPackageId(Integer hotelPackageId) {
        this.hotelPackageId = hotelPackageId;
    }

    @Basic
    @Column(name = "package_name", nullable = false)
    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    @Basic
    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "start_date", nullable = false)
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Basic
    @Column(name = "end_date", nullable = false)
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Basic
    @Column(name = "organization_id", nullable = false)
    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
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
    @Column(name = "room_type_id", nullable = false)
    public Integer getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(Integer roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    @Basic
    @Column(name = "amount", nullable = false)
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "availability_count", nullable = false)
    public Integer getAvailabilityCount() {
        return availabilityCount;
    }

    public void setAvailabilityCount(Integer availabilityCount) {
        this.availabilityCount = availabilityCount;
    }

    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", insertable = false, updatable = false)
    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_type_id", insertable = false, updatable = false)
    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_package_id")
    @Where(clause = "status=2")
    public Set<HotelPackageActivity> getHotelPackageActivities() {
        return hotelPackageActivities;
    }

    public void setHotelPackageActivities(Set<HotelPackageActivity> hotelPackageActivities) {
        this.hotelPackageActivities = hotelPackageActivities;
    }
}
