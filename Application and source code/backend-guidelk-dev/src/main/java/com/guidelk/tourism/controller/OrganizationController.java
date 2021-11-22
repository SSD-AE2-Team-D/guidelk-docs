package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Organization;
import com.guidelk.tourism.service.OrganizationService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.OrganizationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    @Autowired
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_config@organization_CREATE')")
    public ResponseEntity createOrganization(@Valid @RequestBody Organization organization) {
        return this.organizationService.createOrganization(organization);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_config@organization_UPDATE')")
    public ResponseEntity updateOrganization(@Valid @RequestBody Organization organization) {
        return this.organizationService.updateOrganization(organization);
    }

    @DeleteMapping("{organizationId}")
    @PreAuthorize("hasRole('ROLE_config@organization_DELETE')")
    public ResponseEntity<Organization> deleteOrganization(@PathVariable("organizationId") Integer organizationId) {
        return this.organizationService.deleteOrganization(organizationId);
    }

    @PostMapping("/organizationSearch")
    @PreAuthorize("hasRole('ROLE_config@organization_VIEW')")
    public List<Organization> organizationSearch(@RequestBody OrganizationVo organizationVo) {
        return this.organizationService.organizationSearch(organizationVo);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_config@organization_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }

}
