package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Page;
import com.guidelk.tourism.entity.Role;
import com.guidelk.tourism.vo.RoleVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public interface RoleService {

    ResponseEntity createRole(Role role);

    ResponseEntity updateRole(Role role);

    ResponseEntity<Role> deleteRole(Integer roleId);

    Set<Page> getPagesByRoleId(Integer roleId);

    List<Role> getRoleList();

    List<Role> roleSearch(RoleVo roleVo);

}
