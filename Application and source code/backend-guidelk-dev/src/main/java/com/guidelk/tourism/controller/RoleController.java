package com.guidelk.tourism.controller;


import com.guidelk.tourism.entity.Page;
import com.guidelk.tourism.entity.Role;
import com.guidelk.tourism.service.RoleService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.RoleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("roles")
public class RoleController {
    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_config@role_CREATE')")
    public ResponseEntity createRole(@Valid @RequestBody Role role) {
        return this.roleService.createRole(role);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_config@role_UPDATE')")
    public ResponseEntity updateRole(@Valid @RequestBody Role role) {
        return this.roleService.updateRole(role);
    }

    @DeleteMapping("{roleId}")
    @PreAuthorize("hasRole('ROLE_config@role_DELETE')")
    public ResponseEntity<Role> deleteRole(@PathVariable("roleId") Integer roleId) {
        return this.roleService.deleteRole(roleId);
    }

    @GetMapping("/getRoleList")
    @PreAuthorize("hasRole('ROLE_config@role_VIEW')")
    public List<Role> getRoleList() {
        return this.roleService.getRoleList();
    }

    @PostMapping("/roleSearch")
    @PreAuthorize("hasRole('ROLE_config@role_VIEW')")
    public List<Role> roleSearch(@RequestBody RoleVo roleVo) {
        return this.roleService.roleSearch(roleVo);
    }

    @GetMapping(params = "roleId")
    @PreAuthorize("hasRole('ROLE_config@role_VIEW')")
    public Set<Page> getPagesByRoleId(@RequestParam("roleId") Integer roleId) {
        return this.roleService.getPagesByRoleId(roleId);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_config@role_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }

}
