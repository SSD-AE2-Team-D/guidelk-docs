package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum GenderType {

    MALE(1, "Male"),
    FEMALE(2, "Female");

    private final Integer genderTypeId;
    private final String genderDescription;

    GenderType(Integer genderTypeId, String genderDescription) {
        this.genderTypeId = genderTypeId;
        this.genderDescription = genderDescription;
    }

    public Integer getGenderTypeId() {
        return genderTypeId;
    }

    public String getGenderDescription() {
        return genderDescription;
    }

    public static GenderType findOne(Integer genderTypeId) {
        return Arrays.stream(GenderType.values())
                .filter(x -> x.genderTypeId.equals(genderTypeId))
                .findFirst()
                .orElse(null);
    }

}
