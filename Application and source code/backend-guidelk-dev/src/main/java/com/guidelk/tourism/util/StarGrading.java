package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StarGrading {
    ONE_STAR(1, "One"),
    TWO_STAR(2, "Two"),
    THREE_STAR(3, "Three"),
    FOUR_STAR(4, "Four"),
    FIVE_STAR(5, "Five"),
    SIX_STAR(6, "Six"),
    SEVEN_STAR(7, "Seven");

    private final Integer starGradingId;
    private final String starGradingDescription;

    StarGrading(Integer starGradingId, String starGradingDescription) {
        this.starGradingId = starGradingId;
        this.starGradingDescription = starGradingDescription;
    }

    public Integer getStarGradingId() {
        return starGradingId;
    }

    public String getStarGradingDescription() {
        return starGradingDescription;
    }

    public static StarGrading findOne(Integer starGradingId) {
        return Arrays.stream(StarGrading.values())
                .filter(x -> x.starGradingId.equals(starGradingId))
                .findFirst()
                .orElse(null);
    }

}
