package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.HotelBooking;
import com.guidelk.tourism.vo.HotelBookingVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface HotelBookingService {

    ResponseEntity createHotelBooking(HotelBooking hotelBooking);

    ResponseEntity<HotelBooking> updateHotelBooking(HotelBooking hotelBooking);

    ResponseEntity<HotelBooking> confirm(HotelBooking hotelBooking);

    ResponseEntity<HotelBooking> deleteHotelBooking(Integer hotelBookingId);

    List<HotelBooking> hotelBookingSearch(HotelBookingVo hotelBookingVo);

}
