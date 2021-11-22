package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Organization;
import com.guidelk.tourism.vo.OrganizationVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface OrganizationService {
    ResponseEntity createOrganization(Organization organization);

    ResponseEntity updateOrganization(Organization organization);

    ResponseEntity<Organization> deleteOrganization(Integer organizationId);

    List<Organization> organizationSearch(OrganizationVo organizationVo);
}
