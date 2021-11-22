package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer>, EntityGraphJpaRepository<Hotel, Integer>, EntityGraphQuerydslPredicateExecutor<Hotel> {
    Hotel findByHotelNameContainsIgnoreCaseAndAddressBook_CountryIdAndStatusNot(String hotelName, Integer countryId, Integer status);

    List<Hotel> findByOrganizationIdAndStatus(Integer organizationId, Integer status);
}
