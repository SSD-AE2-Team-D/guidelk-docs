package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum DefaultAuthority {
    CREATE("CREATE"),
    VIEW("VIEW"),
    UPDATE("UPDATE"),
    DELETE("DELETE");

    private String authorityName;

    DefaultAuthority(String authorityName) {
        this.authorityName = authorityName;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }
}
