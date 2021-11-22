package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum RoomFeatureType {

    AC(1, "Ac"),
    NON_AC(2, "Non Ac"),
    WIFI(3, "WiFi"),
    TV(4, "Tv"),
    MINI_BAR(4, "Mini Bar"),
    BATH(5, "Bath"),
    JACUZZIS(6, "Jacuzzis");

    private final Integer featureTypeId;
    private final String featureDescription;

    RoomFeatureType(Integer featureTypeId, String featureDescription) {
        this.featureTypeId = featureTypeId;
        this.featureDescription = featureDescription;
    }

    public Integer getFeatureTypeId() {
        return featureTypeId;
    }

    public String getFeatureDescription() {
        return featureDescription;
    }
}
