package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Organization;
import com.guidelk.tourism.entity.QOrganization;
import com.guidelk.tourism.repository.OrganizationRepository;
import com.guidelk.tourism.service.OrganizationService;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.OrganizationVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final Logger logger = LoggerFactory.getLogger(OrganizationServiceImpl.class);

    @Autowired
    public OrganizationServiceImpl(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createOrganization(Organization organization) {
        ResponseEntity responseEntity;
        Organization dbOrganization = this.organizationRepository.findByOrganizationNameContainsIgnoreCaseAndStatusNot(organization.getOrganizationName(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbOrganization != null) {
            responseEntity = new ResponseEntity<>("Organization already exist", HttpStatus.BAD_REQUEST);
        } else {
            if (organization.getAddressBook() != null) {
                organization.getAddressBook().setStatus(MasterDataStatus.APPROVED.getStatusSeq());
            }
            this.organizationRepository.save(organization);
            responseEntity = new ResponseEntity<>(organization, HttpStatus.CREATED);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity updateOrganization(Organization organization) {
        ResponseEntity responseEntity;
        Optional<Organization> dbOrganization = this.organizationRepository.findById(organization.getOrganizationId());
        if (dbOrganization.isPresent()) {
            if (!dbOrganization.get().getOrganizationName().equals(organization.getOrganizationName())) {
                Organization organizationNameValidation = this.organizationRepository.findByOrganizationNameContainsIgnoreCaseAndStatusNot(organization.getOrganizationName(), MasterDataStatus.DELETED.getStatusSeq());
                if (organizationNameValidation != null) {
                    responseEntity = new ResponseEntity<>("Organization already exist", HttpStatus.BAD_REQUEST);
                } else {
                    this.organizationRepository.save(organization);
                    responseEntity = new ResponseEntity<>(organization, HttpStatus.CREATED);
                }
            } else {
                this.organizationRepository.save(organization);
                responseEntity = new ResponseEntity<>(organization, HttpStatus.CREATED);
            }
        } else {
            responseEntity = new ResponseEntity<>("Organization not found", HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Organization> deleteOrganization(Integer organizationId) {
        Optional<Organization> dbOrganization = this.organizationRepository.findById(organizationId);
        ResponseEntity<Organization> responseEntity;
        if (dbOrganization.isPresent()) {
            dbOrganization.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            dbOrganization.get().getAddressBook().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.organizationRepository.save(dbOrganization.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public List<Organization> organizationSearch(OrganizationVo organizationVo) {
        List<Organization> organizationList = new ArrayList<>();
        try {
            QOrganization qOrganization = QOrganization.organization;
            BooleanBuilder builder = new BooleanBuilder();
            if (organizationVo.getOrganizationName() != null) {
                builder.and(qOrganization.organizationName.containsIgnoreCase(organizationVo.getOrganizationName()));
            }
            if (organizationVo.getStatus() != null) {
                builder.and(qOrganization.status.eq(organizationVo.getStatus()));
            }
            if (organizationVo.getCreatedFromDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(organizationVo.getCreatedFromDate(), 23, 59, 59);
                builder.and(qOrganization.createdDate.after(createdToDate));
            }
            if (organizationVo.getCreatedToDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(organizationVo.getCreatedToDate(), 23, 59, 59);
                builder.and(qOrganization.createdDate.before(createdToDate));
            }
            organizationList = (List<Organization>) this.organizationRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Role Search Error:" + e.getMessage());
        }
        return organizationList;
    }
}
