package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.HotelPackage;
import com.guidelk.tourism.entity.PackageFeedback;
import com.guidelk.tourism.vo.HotelPackageVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface HotelPackageService {
    ResponseEntity createHotelPackage(HotelPackage hotelPackage);

    ResponseEntity feedback(PackageFeedback packageFeedback);

    ResponseEntity<HotelPackage> updateHotelPackage(HotelPackage hotelPackage);

    ResponseEntity<HotelPackage> deleteHotelPackage(Integer hotelPackageId);

    List<PackageFeedback> viewFeedBack(Integer packageId);

    List<HotelPackage> hotelPackageSearch(HotelPackageVo hotelPackageVo);

}
