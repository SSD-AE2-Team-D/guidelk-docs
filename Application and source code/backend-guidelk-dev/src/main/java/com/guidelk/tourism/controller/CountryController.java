package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Country;
import com.guidelk.tourism.service.CountryService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.CountryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("countries")
public class CountryController {
    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_masterInfo@country_CREATE')")
    public ResponseEntity createCountry(@Valid @RequestBody Country country) {
        return this.countryService.createCountry(country);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_masterInfo@country_UPDATE')")
    public ResponseEntity<Country> updateCountry(@Valid @RequestBody Country country) {
        return this.countryService.updateCountry(country);
    }

    @DeleteMapping("{countryId}")
    @PreAuthorize("hasRole('ROLE_masterInfo@country_DELETE')")
    public ResponseEntity<Country> deleteCountry(@PathVariable("countryId") Integer countryId) {
        return this.countryService.deleteCountry(countryId);
    }

    @GetMapping("/getCountryList")
    @PreAuthorize("hasRole('ROLE_masterInfo@country_VIEW')")
    public List<Country> getCountryList() {
        return this.countryService.getCountryList();
    }

    @PostMapping("/countrySearch")
    @PreAuthorize("hasRole('ROLE_masterInfo@country_VIEW')")
    public List<Country> countrySearch(@RequestBody CountryVo countryVo) {
        return this.countryService.countrySearch(countryVo);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_masterInfo@country_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }
}
