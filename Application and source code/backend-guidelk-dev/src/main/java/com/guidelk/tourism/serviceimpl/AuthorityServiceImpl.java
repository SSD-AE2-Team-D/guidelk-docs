package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.*;
import com.guidelk.tourism.repository.AuthorityRepository;
import com.guidelk.tourism.service.AuthorityService;
import com.guidelk.tourism.util.DefaultAuthority;
import com.guidelk.tourism.util.MasterDataStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;
    private final Logger logger = LoggerFactory.getLogger(AuthorityServiceImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public AuthorityServiceImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    public List<Authority> getDefaultAuthorityList() {
        List<Authority> authorityList = new ArrayList<>();
        for (DefaultAuthority defaultAuthority : DefaultAuthority.values()) {
            Authority authority = new Authority();
            authority.setAuthorityName(defaultAuthority.getAuthorityName());
            authorityList.add(authority);
        }
        return authorityList;
    }

    @Override
    public List<Authority> getAuthorityList(String userName, Integer organizationId) {
        List<Authority> authorityList = new ArrayList<>();
        try {
            JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
            QOrganization qOrganization = QOrganization.organization;
            QUser qUser = QUser.user;
            QAuthority qAuthority = QAuthority.authority;
            authorityList = queryFactory.select(qAuthority)
                    .from(qOrganization, qUser, qAuthority)
                    .where(qOrganization.organizationId.eq(organizationId))
                    .where(qUser.userName.eq(userName))
                    .where(qUser.enabled.eq(true))
                    .where(qOrganization.status.eq(MasterDataStatus.APPROVED.getStatusSeq()))
                    .where(qUser.status.eq(MasterDataStatus.APPROVED.getStatusSeq()))
                    .where(qAuthority.status.eq(MasterDataStatus.APPROVED.getStatusSeq()))
                    .fetch();

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return authorityList;
    }

}
