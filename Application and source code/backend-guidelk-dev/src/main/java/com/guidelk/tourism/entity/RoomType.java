package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "room_type", schema = "tourism")
public class RoomType extends SharedModel {
    private Integer roomTypeId;
    private String roomType;
    private String roomTypeDescription;

    private Set<RoomFeature> roomFeatures = new HashSet<>();

    private Integer hotelId;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ROOM_TYPE_G1")
    @SequenceGenerator(name = "ROOM_TYPE_G1", sequenceName = "room_type_id", schema = "tourism", allocationSize = 1)
    @Column(name = "room_type_id", nullable = false, precision = 0, unique = true)
    public Integer getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(Integer roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    @Basic
    @Column(name = "room_type", nullable = false)
    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    @Basic
    @Column(name = "room_type_description")
    public String getRoomTypeDescription() {
        return roomTypeDescription;
    }

    public void setRoomTypeDescription(String roomTypeDescription) {
        this.roomTypeDescription = roomTypeDescription;
    }

    @Basic
    @Column(name = "hotel_id")
    public Integer getHotelId() {
        return hotelId;
    }

    public void setHotelId(Integer hotelId) {
        this.hotelId = hotelId;
    }

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "room_type_id")
    @Where(clause = "status=2")
    public Set<RoomFeature> getRoomFeatures() {
        return roomFeatures;
    }

    public void setRoomFeatures(Set<RoomFeature> roomFeatures) {
        this.roomFeatures = roomFeatures;
    }
}
