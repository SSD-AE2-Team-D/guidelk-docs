package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.HotelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelPackageRepository extends JpaRepository<HotelPackage, Integer>, EntityGraphJpaRepository<HotelPackage, Integer>, EntityGraphQuerydslPredicateExecutor<HotelPackage> {
}
