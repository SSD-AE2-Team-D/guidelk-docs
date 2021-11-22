package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>, EntityGraphJpaRepository<Location, Integer>, EntityGraphQuerydslPredicateExecutor<Location> {
    Location findByLocationNameAndCountryIdAndStatusNot(String locationName, Integer countryId, Integer status);

    List<Location> findByStatus(Integer status);

    List<Location> findByCountryIdAndStatus(Integer countryId, Integer status);
}
