package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, EntityGraphJpaRepository<User, Integer>, EntityGraphQuerydslPredicateExecutor<User> {
    User findByUserNameContainsIgnoreCaseAndStatusNot(String userName, Integer status);

    User findByEmailContainsIgnoreCaseAndStatusNot(String email, Integer status);

    User findByUserNameIgnoreCase(String userName);

    User findByUserNameIgnoreCaseAndEnabled(String userName, Boolean enabled);

    User findByUserNameAndOrganizationId(String userName, Integer organizationId);
}
