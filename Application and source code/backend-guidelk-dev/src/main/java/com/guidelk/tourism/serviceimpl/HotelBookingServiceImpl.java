package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.HotelBooking;
import com.guidelk.tourism.entity.HotelPackage;
import com.guidelk.tourism.entity.QHotelBooking;
import com.guidelk.tourism.repository.HotelBookingRepository;
import com.guidelk.tourism.repository.HotelPackageRepository;
import com.guidelk.tourism.service.HotelBookingService;
import com.guidelk.tourism.util.BookingNumberGenerator;
import com.guidelk.tourism.util.BookingStatus;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.HotelBookingVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class HotelBookingServiceImpl implements HotelBookingService {
    private final HotelBookingRepository hotelBookingRepository;
    private final HotelPackageRepository hotelPackageRepository;
    private final BookingNumberGenerator bookingNumberGenerator;
    private final Logger logger = LoggerFactory.getLogger(HotelBookingServiceImpl.class);


    @Autowired
    public HotelBookingServiceImpl(HotelBookingRepository hotelBookingRepository,
                                   HotelPackageRepository hotelPackageRepository,
                                   BookingNumberGenerator bookingNumberGenerator) {
        this.hotelBookingRepository = hotelBookingRepository;
        this.hotelPackageRepository = hotelPackageRepository;
        this.bookingNumberGenerator = bookingNumberGenerator;
    }

    @Override
    @Transactional
    public ResponseEntity createHotelBooking(HotelBooking hotelBooking) {
        ResponseEntity responseEntity;
        hotelBooking.setBookingStatus(BookingStatus.PENDING.getBookingStatusId());
        hotelBooking.setBookingNumber(this.bookingNumberGenerator.generateRefNo("BK"));
        this.hotelBookingRepository.save(hotelBooking);
        this.updateAvailabilityCount(hotelBooking);
        responseEntity = new ResponseEntity<>(hotelBooking, HttpStatus.CREATED);
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<HotelBooking> updateHotelBooking(HotelBooking hotelBooking) {
        ResponseEntity<HotelBooking> responseEntity;
        Optional<HotelBooking> dbHotelBooking = this.hotelBookingRepository.findById(hotelBooking.getHotelBookingId());
        if (dbHotelBooking.isPresent()) {
            this.hotelBookingRepository.save(hotelBooking);
            if (hotelBooking.getRoomCount() > dbHotelBooking.get().getRoomCount()) {
                this.updateAvailabilityCount(hotelBooking);
            } else {
                int count = dbHotelBooking.get().getRoomCount() - hotelBooking.getRoomCount();
                this.removeUpdateAvailabilityCount(hotelBooking, count);
            }
            responseEntity = new ResponseEntity<>(hotelBooking, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(hotelBooking, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<HotelBooking> confirm(HotelBooking hotelBooking) {
        ResponseEntity<HotelBooking> responseEntity;
        Optional<HotelBooking> dbHotelBooking = this.hotelBookingRepository.findById(hotelBooking.getHotelBookingId());
        if (dbHotelBooking.isPresent()) {
            dbHotelBooking.get().setBookingStatus(BookingStatus.CONFIRM.getBookingStatusId());
            this.hotelBookingRepository.save(dbHotelBooking.get());
            responseEntity = new ResponseEntity<>(dbHotelBooking.get(), HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(hotelBooking, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<HotelBooking> deleteHotelBooking(Integer hotelBookingId) {
        ResponseEntity<HotelBooking> responseEntity;
        Optional<HotelBooking> dbHotelBooking = this.hotelBookingRepository.findById(hotelBookingId);
        if (dbHotelBooking.isPresent()) {
            dbHotelBooking.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.hotelBookingRepository.save(dbHotelBooking.get());
            this.removeUpdateAvailabilityCount(dbHotelBooking.get(), dbHotelBooking.get().getRoomCount());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return responseEntity;
    }

    @Override
    public List<HotelBooking> hotelBookingSearch(HotelBookingVo hotelBookingVo) {
        List<HotelBooking> hotelBookingList = new ArrayList<>();
        try {
            QHotelBooking qHotelBooking = QHotelBooking.hotelBooking;
            BooleanBuilder builder = new BooleanBuilder();

            builder.and(qHotelBooking.organizationId.eq(hotelBookingVo.getOrganizationId()));
            if (hotelBookingVo.getBookingNumber() != null) {
                builder.and(qHotelBooking.bookingNumber.containsIgnoreCase(hotelBookingVo.getBookingNumber()));
            }
            if (hotelBookingVo.getCustomerId() != null) {
                builder.and(qHotelBooking.customerId.eq(hotelBookingVo.getCustomerId()));
            }
            if (hotelBookingVo.getHotelId() != null) {
                builder.and(qHotelBooking.hotelPackage.hotelId.eq(hotelBookingVo.getHotelId()));
            }
            if (hotelBookingVo.getRoomTypeId() != null) {
                builder.and(qHotelBooking.hotelPackage.roomTypeId.eq(hotelBookingVo.getRoomTypeId()));
            }
            if (hotelBookingVo.getActivityTypeId() != null) {
                builder.and(qHotelBooking.hotelPackage.hotelPackageActivities.any().activityTypeId.eq(hotelBookingVo.getActivityTypeId()));
            }
            if (hotelBookingVo.getBookingStatus() != null) {
                builder.and(qHotelBooking.bookingStatus.eq(hotelBookingVo.getBookingStatus()));
            }
            if (hotelBookingVo.getCheckInDate() != null) {
                Date checkInDate = DateUtil.setTimeToDate(hotelBookingVo.getCheckInDate(), 23, 59, 59);
                builder.and(qHotelBooking.checkInDate.after(checkInDate));
            }
            if (hotelBookingVo.getCheckOutDate() != null) {
                Date checkOutDate = DateUtil.setTimeToDate(hotelBookingVo.getCheckOutDate(), 23, 59, 59);
                builder.and(qHotelBooking.checkOutDate.before(checkOutDate));
            }
            if (hotelBookingVo.getStatus() != null) {
                builder.and(qHotelBooking.status.eq(hotelBookingVo.getStatus()));
            }
            hotelBookingList = (List<HotelBooking>) this.hotelBookingRepository.findAll(builder);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hotelBookingList;
    }

    public void updateAvailabilityCount(HotelBooking hotelBooking) {
        HotelPackage dbHotelPackage = this.hotelPackageRepository.findById(hotelBooking.getHotelPackageId()).get();
        Integer availabilityCount = dbHotelPackage.getAvailabilityCount() - hotelBooking.getRoomCount();
        dbHotelPackage.setAvailabilityCount(availabilityCount);
        this.hotelPackageRepository.save(dbHotelPackage);

    }

    public void removeUpdateAvailabilityCount(HotelBooking hotelBooking, int count) {
        HotelPackage dbHotelPackage = this.hotelPackageRepository.findById(hotelBooking.getHotelPackageId()).get();
        Integer availabilityCount = dbHotelPackage.getAvailabilityCount() + count;
        dbHotelPackage.setAvailabilityCount(availabilityCount);
        this.hotelPackageRepository.save(dbHotelPackage);
    }
}
