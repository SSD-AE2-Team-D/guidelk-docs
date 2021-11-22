package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Location;
import com.guidelk.tourism.vo.LocationVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface LocationService {
    ResponseEntity createLocation(Location location);

    ResponseEntity<Location> updateLocation(Location location);

    ResponseEntity<Location> deleteLocation(Integer locationId);

    List<Location> getLocationList();

    List<Location> getLocationDataCountryWise(Integer countryId);

    List<Location> locationSearch(LocationVo locationVo);
}
