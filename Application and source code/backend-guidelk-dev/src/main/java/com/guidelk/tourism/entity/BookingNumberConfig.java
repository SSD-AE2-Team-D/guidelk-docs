package com.guidelk.tourism.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
@Table(name = "booking_no_config", schema = "tourism")
public class BookingNumberConfig extends SharedModel {
    private Integer numberConfigId;
    private String prefix;
    private Integer nextNo;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOOKING_NO_CONFIG_G1")
    @SequenceGenerator(name = "BOOKING_NO_CONFIG_G1", sequenceName = "number_config_id", schema = "tourism", allocationSize = 1)
    @Column(name = "number_config_id", nullable = false, precision = 0, unique = true)
    public Integer getNumberConfigId() {
        return numberConfigId;
    }

    public void setNumberConfigId(Integer numberConfigId) {
        this.numberConfigId = numberConfigId;
    }

    @Basic
    @Column(name = "prefix", nullable = false)
    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Basic
    @Column(name = "next_no", nullable = false)
    public Integer getNextNo() {
        return nextNo;
    }

    public void setNextNo(Integer nextNo) {
        this.nextNo = nextNo;
    }
}
