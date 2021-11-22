package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> , EntityGraphJpaRepository<Role, Integer>, EntityGraphQuerydslPredicateExecutor<Role> {
    Role findByRoleNameContainsIgnoreCaseAndStatusNot(String role, Integer status);

    List<Role> findByStatus(Integer status);
}
