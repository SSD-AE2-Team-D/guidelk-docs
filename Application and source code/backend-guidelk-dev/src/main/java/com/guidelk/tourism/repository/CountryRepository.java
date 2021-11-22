package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer>, EntityGraphJpaRepository<Country, Integer>, EntityGraphQuerydslPredicateExecutor<Country> {
    Country findByCountryNameContainsIgnoreCaseAndStatusNot(String countryName, Integer status);

    List<Country> findByStatus(Integer status);
}
