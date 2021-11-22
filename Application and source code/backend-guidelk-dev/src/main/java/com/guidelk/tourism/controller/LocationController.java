package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Location;
import com.guidelk.tourism.service.LocationService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.LocationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("locations")
public class LocationController {
    
    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_masterInfo@location_CREATE')")
    public ResponseEntity createLocation(@Valid @RequestBody Location location) {
        return this.locationService.createLocation(location);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_masterInfo@location_UPDATE')")
    public ResponseEntity<Location> updateLocation(@Valid @RequestBody Location location) {
        return this.locationService.updateLocation(location);
    }

    @DeleteMapping("{locationId}")
    @PreAuthorize("hasRole('ROLE_masterInfo@location_DELETE')")
    public ResponseEntity<Location> deleteLocation(@PathVariable("locationId") Integer locationId) {
        return this.locationService.deleteLocation(locationId);
    }

    @GetMapping("/getLocationList")
    @PreAuthorize("hasRole('ROLE_masterInfo@location_VIEW')")
    public List<Location> getLocationList() {
        return this.locationService.getLocationList();
    }

    @GetMapping("/getLocationDataCountryWise")
    @PreAuthorize("hasRole('ROLE_masterInfo@location_VIEW')")
    public List<Location> getLocationDataCountryWise(@RequestParam("countryId") Integer countryId) {
        return this.locationService.getLocationDataCountryWise(countryId);
    }

    @PostMapping("/locationSearch")
    @PreAuthorize("hasRole('ROLE_masterInfo@location_VIEW')")
    public List<Location> locationSearch(@RequestBody LocationVo locationVo) {
        return this.locationService.locationSearch(locationVo);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_masterInfo@location_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }
}

