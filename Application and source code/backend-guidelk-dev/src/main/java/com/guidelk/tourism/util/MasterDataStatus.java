package com.guidelk.tourism.util;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum MasterDataStatus {
    DELETED(0, "Deleted"),
    OPEN(1, "Open"),
    APPROVED(2, "Approved"),
    CLOSED(3, "Closed");

    private final Integer statusSeq;
    private final String status;

    MasterDataStatus(Integer statusSeq, String status) {
        this.statusSeq = statusSeq;
        this.status = status;
    }

    public Integer getStatusSeq() {
        return statusSeq;
    }

    public String getStatus() {
        return status;
    }

    public static MasterDataStatus findOne(Integer statusSeq) {
        return Arrays.stream(MasterDataStatus.values())
                .filter(x -> x.statusSeq.equals(statusSeq))
                .findFirst()
                .orElse(null);
    }

    public static List<MasterDataStatus> getMasterStatusActionWise(String filter) {
        MasterDataStatus[] masterDataStatuses = MasterDataStatus.values();
        List<MasterDataStatus> statusList = new ArrayList<>();
        for (MasterDataStatus status : masterDataStatuses) {
            if (filter.equals("CREATE")) {
                if(status.getStatusSeq().equals(1)|| status.getStatusSeq().equals(2)){
                    statusList.add(status);
                }
            }else {
                statusList.add(status);
            }
        }
        return statusList;
    }
}
