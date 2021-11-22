package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum HotelPackageActivityType {
    HIKING(1, "Hiking"),
    DIVING(2, "Diving"),
    CYCLING(3, "Cycling"),
    SNORKELLING(4, "Snorkelling");

    private final Integer activityTypeId;
    private final String activityDescription;

    HotelPackageActivityType(Integer activityTypeId, String activityDescription) {
        this.activityTypeId = activityTypeId;
        this.activityDescription = activityDescription;
    }

    public Integer getActivityTypeId() {
        return activityTypeId;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public static HotelPackageActivityType findOne(Integer activityTypeId) {
        return Arrays.stream(HotelPackageActivityType.values())
                .filter(x -> x.activityTypeId.equals(activityTypeId))
                .findFirst()
                .orElse(null);
    }
}
