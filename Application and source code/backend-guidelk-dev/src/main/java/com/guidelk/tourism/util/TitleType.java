package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TitleType {

    MR(1, "Mr"),
    MRS(2, "Mrs"),
    MISS(3, "Miss"),
    DR(4, "Dr");

    private final Integer titleTypeId;
    private final String titleDescription;

    TitleType(Integer titleTypeId, String titleDescription) {
        this.titleTypeId = titleTypeId;
        this.titleDescription = titleDescription;
    }

    public Integer getTitleTypeId() {
        return titleTypeId;
    }

    public String getTitleDescription() {
        return titleDescription;
    }

    public static TitleType findOne(Integer titleTypeId) {
        return Arrays.stream(TitleType.values())
                .filter(x -> x.titleTypeId.equals(titleTypeId))
                .findFirst()
                .orElse(null);
    }

}
