package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.guidelk.tourism.util.CustomerType;
import com.guidelk.tourism.util.HotelCategoryType;
import com.guidelk.tourism.util.StarGrading;
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
@Table(name = "hotel", schema = "tourism")
public class Hotel extends SharedModel {
    private Integer hotelId;
    private String hotelName;
    private Integer categoryId;
    private Integer starGradingId;
    private Integer roomCount;
    private Date dateOfStart;
    private Integer organizationId;
    private String hotelDescription;
    private Integer addressBookId;

    private AddressBook addressBook;

    private Set<RoomType> roomTypes = new HashSet<>();

    private String categoryDescription;
    private String starGradingDescription;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HOTEL_G1")
    @SequenceGenerator(name = "HOTEL_G1", sequenceName = "hotel_id", schema = "tourism", allocationSize = 1)
    @Column(name = "hotel_id", nullable = false, precision = 0, unique = true)
    public Integer getHotelId() {
        return hotelId;
    }

    public void setHotelId(Integer hotelId) {
        this.hotelId = hotelId;
    }

    @Basic
    @Column(name = "hotel_name", nullable = false)
    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    @Basic
    @Column(name = "category_id", nullable = false)
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
        if (categoryId != null) {
            this.setCategoryDescription(HotelCategoryType.findOne(categoryId).getCategoryDescription());
        }
    }

    @Basic
    @Column(name = "star_grading_id")
    public Integer getStarGradingId() {
        return starGradingId;
    }

    public void setStarGradingId(Integer starGradingId) {
        this.starGradingId = starGradingId;
        if (starGradingId != null) {
            this.setStarGradingDescription(StarGrading.findOne(starGradingId).getStarGradingDescription());
        }
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
    @Column(name = "date_of_start", nullable = false)
    public Date getDateOfStart() {
        return dateOfStart;
    }

    public void setDateOfStart(Date dateOfStart) {
        this.dateOfStart = dateOfStart;
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
    @Column(name = "hotel_description")
    public String getHotelDescription() {
        return hotelDescription;
    }

    public void setHotelDescription(String hotelDescription) {
        this.hotelDescription = hotelDescription;
    }

    @Transient
    public Integer getAddressBookId() {
        return addressBookId;
    }

    public void setAddressBookId(Integer addressBookId) {
        this.addressBookId = addressBookId;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_book_id")
    public AddressBook getAddressBook() {
        return addressBook;
    }

    public void setAddressBook(AddressBook addressBook) {
        this.addressBook = addressBook;
    }

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "hotel_id")
    @Where(clause = "status=2")
    public Set<RoomType> getRoomTypes() {
        return roomTypes;
    }

    public void setRoomTypes(Set<RoomType> roomTypes) {
        this.roomTypes = roomTypes;
    }

    @Transient
    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    @Transient
    public String getStarGradingDescription() {
        return starGradingDescription;
    }

    public void setStarGradingDescription(String starGradingDescription) {
        this.starGradingDescription = starGradingDescription;
    }
}
