package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.HotelBooking;
import com.guidelk.tourism.service.HotelBookingService;
import com.guidelk.tourism.util.BookingStatus;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.HotelBookingVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("hotelBookings")
public class HotelBookingController {

    private final HotelBookingService hotelBookingService;

    @Autowired
    public HotelBookingController(HotelBookingService hotelBookingService) {
        this.hotelBookingService = hotelBookingService;
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_CREATE')")
    public ResponseEntity createHotelBooking(@Valid @RequestBody HotelBooking hotelBooking) {
        return this.hotelBookingService.createHotelBooking(hotelBooking);
    }

    @PutMapping()
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_UPDATE')")
    public ResponseEntity<HotelBooking> updateHotelBooking(@Valid @RequestBody HotelBooking hotelBooking) {
        return this.hotelBookingService.updateHotelBooking(hotelBooking);
    }

    @PutMapping("/confirm")
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_UPDATE')")
    public ResponseEntity<HotelBooking> confirm(@Valid @RequestBody HotelBooking hotelBooking) {
        return this.hotelBookingService.confirm(hotelBooking);
    }

    @DeleteMapping("{hotelBookingId}")
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_DELETE')")
    public ResponseEntity<HotelBooking> deleteHotelBooking(@PathVariable("hotelBookingId") Integer hotelBookingId) {
        return this.hotelBookingService.deleteHotelBooking(hotelBookingId);
    }

    @PostMapping("/hotelBookingSearch")
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_VIEW')")
    public List<HotelBooking> hotelBookingSearch(@RequestBody HotelBookingVo hotelBookingVo) {
        return this.hotelBookingService.hotelBookingSearch(hotelBookingVo);
    }

    @GetMapping("/getBookingStatusList")
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_VIEW')")
    public List<BookingStatus> getBookingStatusList() {
        return Arrays.asList(BookingStatus.values());
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_operationalActions@booking_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }

}
