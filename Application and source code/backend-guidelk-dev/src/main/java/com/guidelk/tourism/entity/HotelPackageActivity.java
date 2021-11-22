package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "hotel_package_activity", schema = "tourism")
public class HotelPackageActivity extends SharedModel {
    private Integer hotelPackageActivityId;
    private String activityName;
    private Integer activityTypeId;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PACKAGE_G1")
    @SequenceGenerator(name = "PAGE_G1", sequenceName = "hotel_package_activity_id", schema = "tourism", allocationSize = 1)
    @Column(name = "hotel_package_activity_id", nullable = false, precision = 0, unique = true)
    public Integer getHotelPackageActivityId() {
        return hotelPackageActivityId;
    }

    public void setHotelPackageActivityId(Integer hotelPackageActivityId) {
        this.hotelPackageActivityId = hotelPackageActivityId;
    }

    @Basic
    @Column(name = "activity_name", nullable = false)
    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    @Basic
    @Column(name = "activity_id", nullable = false)
    public Integer getActivityTypeId() {
        return activityTypeId;
    }

    public void setActivityTypeId(Integer activityTypeId) {
        this.activityTypeId = activityTypeId;
    }

  }
