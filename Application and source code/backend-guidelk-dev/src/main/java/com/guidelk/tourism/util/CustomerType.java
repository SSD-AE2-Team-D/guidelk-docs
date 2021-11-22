package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CustomerType {

    LOCAL(1, "Local"),
    OVERSEAS(2, "Overseas ");

    private final Integer customerTypeId;
    private final String customerDescription;

    CustomerType(Integer customerTypeId, String customerDescription) {
        this.customerTypeId = customerTypeId;
        this.customerDescription = customerDescription;
    }

    public Integer getCustomerTypeId() {
        return customerTypeId;
    }

    public String getCustomerDescription() {
        return customerDescription;
    }

    public static CustomerType findOne(Integer customerTypeId) {
        return Arrays.stream(CustomerType.values())
                .filter(x -> x.customerTypeId.equals(customerTypeId))
                .findFirst()
                .orElse(null);
    }
}
