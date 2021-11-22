package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Country;
import com.guidelk.tourism.entity.QCountry;
import com.guidelk.tourism.repository.CountryRepository;
import com.guidelk.tourism.service.CountryService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.CountryVo;
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
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;
    private final Logger logger = LoggerFactory.getLogger(CountryServiceImpl.class);

    @Autowired
    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public ResponseEntity createCountry(Country country) {
        ResponseEntity responseEntity;
        Country dbCountry = this.countryRepository.findByCountryNameContainsIgnoreCaseAndStatusNot(country.getCountryName(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbCountry != null) {
            responseEntity = new ResponseEntity<>("Duplicate Record", HttpStatus.BAD_REQUEST);
        } else {
            this.countryRepository.save(country);
            responseEntity = new ResponseEntity<>(country, HttpStatus.CREATED);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Country> updateCountry(Country country) {
        ResponseEntity<Country> responseEntity;
        Optional<Country> dbCountry = this.countryRepository.findById(country.getCountryId());
        if (dbCountry.isPresent()) {
            this.countryRepository.save(country);
            responseEntity = new ResponseEntity<>(country, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(country, HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Country> deleteCountry(Integer countryId) {
        Optional<Country> dbCountry = this.countryRepository.findById(countryId);
        ResponseEntity<Country> responseEntity;
        if (dbCountry.isPresent()) {
            dbCountry.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.countryRepository.save(dbCountry.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return responseEntity;
    }

    @Override
    public List<Country> getCountryList() {
        return this.countryRepository.findByStatus(MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public List<Country> countrySearch(CountryVo countryVo) {
        List<Country> countryList = new ArrayList<>();
        try {
            QCountry qCountry = QCountry.country;
            BooleanBuilder builder = new BooleanBuilder();
            if (countryVo.getCountryName() != null) {
                builder.and(qCountry.countryName.containsIgnoreCase(countryVo.getCountryName()));
            }

            if (countryVo.getCountryCode() != null) {
                builder.and(qCountry.countryCode.containsIgnoreCase(countryVo.getCountryCode()));
            }

            if (countryVo.getStatus() != null) {
                builder.and(qCountry.status.eq(countryVo.getStatus()));
            }

            countryList = (List<Country>) this.countryRepository.findAll(builder);

        } catch (Exception e) {
            logger.error("Country Search Error:" + e.getMessage());
        }
        return countryList;

    }
}
