package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer>, EntityGraphJpaRepository<Module, Integer>, EntityGraphQuerydslPredicateExecutor<Module> {

    Module findByModuleNameContainsIgnoreCaseAndStatusNot(String moduleName, Integer status);

    Module findByModuleCodeContainsIgnoreCaseAndStatusNot(String moduleCode, Integer status);

    List<Module> findByStatus(Integer status);
}
