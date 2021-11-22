package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "room_feature", schema = "tourism")
public class RoomFeature extends SharedModel {
    private Integer roomFeatureId;
    private Integer featureTypeId;
    private String feature;
    private String featureDescription;

    private Integer roomTypeId;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ROOM_FEATURE_G1")
    @SequenceGenerator(name = "ROOM_FEATURE_G1", sequenceName = "room_type_id", schema = "tourism", allocationSize = 1)
    @Column(name = "room_feature_id", nullable = false, precision = 0, unique = true)
    public Integer getRoomFeatureId() {
        return roomFeatureId;
    }

    public void setRoomFeatureId(Integer roomFeatureId) {
        this.roomFeatureId = roomFeatureId;
    }

    @Basic
    @Column(name = "feature_type_id", nullable = false)
    public Integer getFeatureTypeId() {
        return featureTypeId;
    }

    public void setFeatureTypeId(Integer featureTypeId) {
        this.featureTypeId = featureTypeId;
    }

    @Basic
    @Column(name = "feature", nullable = false)
    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }

    @Basic
    @Column(name = "feature_description")
    public String getFeatureDescription() {
        return featureDescription;
    }

    public void setFeatureDescription(String featureDescription) {
        this.featureDescription = featureDescription;
    }

    @Basic
    @Column(name = "room_type_id")
    public Integer getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(Integer roomTypeId) {
        this.roomTypeId = roomTypeId;
    }
}
