package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Hotel;
import com.guidelk.tourism.entity.RoomFeature;
import com.guidelk.tourism.entity.RoomType;
import com.guidelk.tourism.service.HotelService;
import com.guidelk.tourism.util.*;
import com.guidelk.tourism.vo.HotelVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("hotels")
public class HotelController {
    private final HotelService hotelService;

    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_CREATE')")
    public ResponseEntity createHotel(@Valid @RequestBody Hotel hotel) {
        return this.hotelService.createHotel(hotel);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_UPDATE')")
    public ResponseEntity<Hotel> updateHotel(@Valid @RequestBody Hotel hotel) {
        return this.hotelService.updateHotel(hotel);
    }

    @DeleteMapping("{hotelId}")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_DELETE')")
    public ResponseEntity<Hotel> deleteHotel(@PathVariable("hotelId") Integer hotelId) {
        return this.hotelService.deleteHotel(hotelId);
    }

    @PutMapping("{roomTypeId}")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_DELETE')")
    public ResponseEntity<RoomType> deleteRoomTypeLineItem(@PathVariable("roomTypeId") Integer roomTypeId) {
        return this.hotelService.deleteRoomTypeLineItem(roomTypeId);
    }

    @GetMapping("/getHotelList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public List<Hotel> getHotelList(@RequestParam("organizationId") Integer organizationId) {
        return this.hotelService.getHotelList(organizationId);
    }

    @GetMapping("/getRoomTypeListHotelWise")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public Set<RoomType> getRoomTypeListHotelWise(@RequestParam("hotelId") Integer hotelId) {
        return this.hotelService.getRoomTypeListHotelWise(hotelId);
    }

    @GetMapping("/getHotelCategoryTypeList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public List<HotelCategoryType> getHotelCategoryTypeList() {
        return Arrays.asList(HotelCategoryType.values());
    }

    @GetMapping("/getStarGradingList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public List<StarGrading> getStarGradingList() {
        return Arrays.asList(StarGrading.values());
    }

    @GetMapping("/getRoomFeatureTypeList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public List<RoomFeatureType> getRoomFeatureTypeList() {
        return Arrays.asList(RoomFeatureType.values());
    }

    @PostMapping("/hotelSearch")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public List<Hotel> hotelSearch(@RequestBody HotelVo hotelVo) {
        return this.hotelService.hotelSearch(hotelVo);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_operationalInfo@hotel_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }
}
