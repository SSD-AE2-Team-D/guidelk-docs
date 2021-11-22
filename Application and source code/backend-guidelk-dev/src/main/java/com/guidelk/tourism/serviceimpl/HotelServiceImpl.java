package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Hotel;
import com.guidelk.tourism.entity.QHotel;
import com.guidelk.tourism.entity.RoomType;
import com.guidelk.tourism.repository.HotelRepository;
import com.guidelk.tourism.repository.RoomTypeRepository;
import com.guidelk.tourism.service.HotelService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.HotelVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HotelServiceImpl implements HotelService {
    private final HotelRepository hotelRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final Logger logger = LoggerFactory.getLogger(HotelServiceImpl.class);

    @Autowired
    public HotelServiceImpl(HotelRepository hotelRepository,
                            RoomTypeRepository roomTypeRepository) {
        this.hotelRepository = hotelRepository;
        this.roomTypeRepository = roomTypeRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createHotel(Hotel hotel) {
        ResponseEntity responseEntity;
        Hotel dbHotel = this.hotelRepository.findByHotelNameContainsIgnoreCaseAndAddressBook_CountryIdAndStatusNot(hotel.getHotelName(), hotel.getAddressBook().getCountryId(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbHotel != null) {
            responseEntity = new ResponseEntity<>("Hotel already exist", HttpStatus.BAD_REQUEST);
        } else {
            if (hotel.getAddressBook() != null) {
                hotel.getAddressBook().setStatus(MasterDataStatus.APPROVED.getStatusSeq());
            }

            if (!hotel.getRoomTypes().isEmpty()) {
                hotel.getRoomTypes().forEach(roomType -> roomType.setStatus(hotel.getStatus()));
                hotel.getRoomTypes().forEach(roomType -> roomType.getRoomFeatures().forEach(roomFeature -> roomFeature.setStatus(hotel.getStatus())));
            }
            this.hotelRepository.save(hotel);
            responseEntity = new ResponseEntity<>(hotel, HttpStatus.CREATED);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Hotel> updateHotel(Hotel hotel) {
        ResponseEntity<Hotel> responseEntity;
        Optional<Hotel> dbHotel = this.hotelRepository.findById(hotel.getHotelId());
        if (dbHotel.isPresent()) {
            if (!hotel.getRoomTypes().isEmpty()) {
                hotel.getRoomTypes().forEach(roomType -> roomType.setStatus(hotel.getStatus()));
                hotel.getRoomTypes().forEach(roomType -> roomType.getRoomFeatures().forEach(roomFeature -> roomFeature.setStatus(hotel.getStatus())));
            }

            this.hotelRepository.save(hotel);
            responseEntity = new ResponseEntity<>(hotel, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(hotel, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Hotel> deleteHotel(Integer hotelId) {
        ResponseEntity<Hotel> responseEntity;
        Optional<Hotel> dbHotel = this.hotelRepository.findById(hotelId);
        if (dbHotel.isPresent()) {
            if (!dbHotel.get().getRoomTypes().isEmpty()) {
                dbHotel.get().getRoomTypes().forEach(roomType -> roomType.setStatus(MasterDataStatus.DELETED.getStatusSeq()));
                dbHotel.get().getRoomTypes().forEach(roomType -> roomType.getRoomFeatures().forEach(roomFeature -> roomFeature.setStatus(MasterDataStatus.DELETED.getStatusSeq())));
            }
            dbHotel.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            dbHotel.get().getAddressBook().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.hotelRepository.save(dbHotel.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<RoomType> deleteRoomTypeLineItem(Integer roomTypeId) {
        ResponseEntity<RoomType> responseEntity;
        Optional<RoomType> dbRoomType = this.roomTypeRepository.findById(roomTypeId);
        if (dbRoomType.isPresent()) {
            dbRoomType.get().getRoomFeatures().forEach(roomFeature -> roomFeature.setStatus(MasterDataStatus.DELETED.getStatusSeq()));
            dbRoomType.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.roomTypeRepository.save(dbRoomType.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public List<Hotel> getHotelList(Integer organizationId) {
        return this.hotelRepository.findByOrganizationIdAndStatus(organizationId, MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public Set<RoomType> getRoomTypeListHotelWise(Integer hotelId) {
        return this.hotelRepository.findById(hotelId).get().getRoomTypes();
    }

    @Override
    public List<Hotel> hotelSearch(HotelVo hotelVo) {
        List<Hotel> hotelList = new ArrayList<>();
        try {
            QHotel qHotel = QHotel.hotel;
            BooleanBuilder builder = new BooleanBuilder();
            builder.and(qHotel.organizationId.eq(hotelVo.getOrganizationId()));

            if (hotelVo.getHotelName() != null) {
                builder.and(qHotel.hotelName.containsIgnoreCase(hotelVo.getHotelName()));
            }
            if (hotelVo.getCategoryId() != null) {
                builder.and(qHotel.categoryId.eq(hotelVo.getCategoryId()));
            }
            if (hotelVo.getStarGradingId() != null) {
                builder.and(qHotel.starGradingId.eq(hotelVo.getStarGradingId()));
            }
            if (hotelVo.getCountryId() != null) {
                builder.and(qHotel.addressBook.countryId.eq(hotelVo.getCountryId()));
            }
            if (hotelVo.getLocationId() != null) {
                builder.and(qHotel.addressBook.locationId.eq(hotelVo.getLocationId()));
            }
            if (hotelVo.getStatus() != null) {
                builder.and(qHotel.status.eq(hotelVo.getStatus()));
            }
            hotelList = (List<Hotel>) this.hotelRepository.findAll(builder);
        } catch (Exception e) {
           logger.error("Hotel Search Error", e.getMessage());
        }
        return hotelList;

    }
}
