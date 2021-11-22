package com.guidelk.tourism.repository;

import com.guidelk.tourism.entity.RoomFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomFeatureRepository extends JpaRepository<RoomFeature, Integer> {
}
