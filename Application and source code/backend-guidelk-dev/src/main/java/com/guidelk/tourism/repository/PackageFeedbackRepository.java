package com.guidelk.tourism.repository;

import com.guidelk.tourism.entity.PackageFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageFeedbackRepository extends JpaRepository<PackageFeedback, Integer> {

    List<PackageFeedback> findByPackageId(Integer packageId);
}
