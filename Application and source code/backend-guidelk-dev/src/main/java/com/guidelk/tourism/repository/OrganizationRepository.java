package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Integer>, EntityGraphJpaRepository<Organization, Integer>, EntityGraphQuerydslPredicateExecutor<Organization> {
    Organization findByOrganizationNameContainsIgnoreCaseAndStatusNot(String orgName, Integer status);
}
