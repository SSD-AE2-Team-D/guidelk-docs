package com.guidelk.tourism.repository;

import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphJpaRepository;
import com.cosium.spring.data.jpa.entity.graph.repository.EntityGraphQuerydslPredicateExecutor;
import com.guidelk.tourism.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer>, EntityGraphJpaRepository<Authority, Integer>, EntityGraphQuerydslPredicateExecutor<Authority> {

    @Query(value="select auth\n" +
            "from tourism.organization org,\n" +
            "     tourism.user u,\n" +
            "     tourism.role r,\n" +
            "     tourism.page pg,\n" +
            "     tourism.authority auth,\n" +
            "     tourism.module modu,\n" +
            "     public.organization_modules orgMod,\n" +
            "     public.user_roles us,\n" +
            "     public.role_pages rp,\n" +
            "     public.page_authorities pa\n" +
            "where org.organization_id = u.organization_id\n" +
            "  and org.organization_id = orgMod.organization_id\n" +
            "  and modu.module_id = orgMod.module_id\n" +
            "  and u.user_id = us.user_id\n" +
            "  and r.role_id = us.role_id\n" +
            "  and pg.page_id = rp.page_id\n" +
            "  and r.role_id = rp.role_id\n" +
            "  and auth.authority_id = pa.authority_id\n" +
            "  and pg.page_id = pa.page_id\n" +
            "  and org.status <> 0\n" +
            "  and u.status <> 0\n" +
            "  and org.status <> 0\n" +
            "  and r.status <> 0\n" +
            "  and pg.status <> 0\n" +
            "  and auth.status <> 0\n" +
            "  and  u.enabled = true\n" +
            "  and u.username = ?1\n" +
            "  and org.organization_id = ?2", nativeQuery = true)
    List<Authority> getAuthorityList(String userName, Integer organizationId);

    Authority findByAuthorityNameAndStatus(String name , Integer status);

}
