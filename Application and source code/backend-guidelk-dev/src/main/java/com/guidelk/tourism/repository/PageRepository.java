package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer>, EntityGraphJpaRepository<Page, Integer>, EntityGraphQuerydslPredicateExecutor<Page> {

    Page findByPageNameContainsIgnoreCaseAndStatusNot(String pageName, Integer status);

    List<Page> findByStatus(Integer status);
}
