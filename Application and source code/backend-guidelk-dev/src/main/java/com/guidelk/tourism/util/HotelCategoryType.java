package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum HotelCategoryType {
    STAR(1, "Star"),
    OTHER(2, "Other");

    private final Integer categoryId;
    private final String categoryDescription;

    HotelCategoryType(Integer categoryId, String categoryDescription) {
        this.categoryId = categoryId;
        this.categoryDescription = categoryDescription;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public static HotelCategoryType findOne(Integer categoryId) {
        return Arrays.stream(HotelCategoryType.values())
                .filter(x -> x.categoryId.equals(categoryId))
                .findFirst()
                .orElse(null);
    }

}
