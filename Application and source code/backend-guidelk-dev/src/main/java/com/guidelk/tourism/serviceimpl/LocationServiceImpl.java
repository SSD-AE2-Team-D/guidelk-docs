package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Country;
import com.guidelk.tourism.entity.Location;
import com.guidelk.tourism.entity.QLocation;
import com.guidelk.tourism.repository.LocationRepository;
import com.guidelk.tourism.service.LocationService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.LocationVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;
    private final Logger logger = LoggerFactory.getLogger(LocationServiceImpl.class);


    @Autowired
    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public ResponseEntity createLocation(Location location) {
        ResponseEntity responseEntity;
        Location dbLocation = this.locationRepository.findByLocationNameAndCountryIdAndStatusNot(location.getLocationName(), location.getCountryId(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbLocation != null) {
            responseEntity = new ResponseEntity<>("Duplicate Record", HttpStatus.BAD_REQUEST);
        } else {
            this.locationRepository.save(location);
            responseEntity = new ResponseEntity<>(location, HttpStatus.CREATED);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Location> updateLocation(Location location) {
        ResponseEntity<Location> responseEntity;
        Optional<Location> dbLocation = this.locationRepository.findById(location.getLocationId());
        if (dbLocation.isPresent()) {
            this.locationRepository.save(location);
            responseEntity = new ResponseEntity<>(location, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(location, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Location> deleteLocation(Integer locationId) {
        Optional<Location> dbLocation = this.locationRepository.findById(locationId);
        ResponseEntity<Location> responseEntity;
        if (dbLocation.isPresent()) {
            dbLocation.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.locationRepository.save(dbLocation.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return responseEntity;
    }

    @Override
    public List<Location> getLocationList() {
        return this.locationRepository.findByStatus(MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public List<Location> getLocationDataCountryWise(Integer countryId) {
        return this.locationRepository.findByCountryIdAndStatus(countryId, MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public List<Location> locationSearch(LocationVo locationVo) {
        List<Location> locationList = new ArrayList<>();
        try {
            QLocation qLocation = QLocation.location;
            BooleanBuilder builder = new BooleanBuilder();

            if (locationVo.getLocationName() != null) {
                builder.and(qLocation.locationName.containsIgnoreCase(locationVo.getLocationName()));
            }

            if (locationVo.getLocationCode() != null) {
                builder.and(qLocation.locationCode.containsIgnoreCase(locationVo.getLocationCode()));
            }

            if (locationVo.getCountryId() != null) {
                builder.and(qLocation.countryId.eq(locationVo.getCountryId()));
            }

            if (locationVo.getStatus() != null) {
                builder.and(qLocation.status.eq(locationVo.getStatus()));
            }

            locationList = (List<Location>) this.locationRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Location Search Error:", e.getMessage());
        }

        return locationList;

    }
}
