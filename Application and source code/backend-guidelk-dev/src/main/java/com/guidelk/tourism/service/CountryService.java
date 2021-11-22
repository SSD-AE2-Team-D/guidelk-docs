package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Country;
import com.guidelk.tourism.vo.CountryVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CountryService {
    ResponseEntity createCountry(Country country);

    ResponseEntity<Country> updateCountry(Country country);

    ResponseEntity<Country> deleteCountry(Integer countryId);

    List<Country> getCountryList();

    List<Country> countrySearch(CountryVo countryVo);
}
