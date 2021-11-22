package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Page;
import com.guidelk.tourism.entity.QRole;
import com.guidelk.tourism.entity.Role;
import com.guidelk.tourism.repository.RoleRepository;
import com.guidelk.tourism.service.RoleService;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.RoleVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createRole(Role role) {
        ResponseEntity responseEntity;
        Role dbRole = this.roleRepository.findByRoleNameContainsIgnoreCaseAndStatusNot(role.getRoleName(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbRole != null) {
            responseEntity = new ResponseEntity<>("Duplicate Record", HttpStatus.BAD_REQUEST);
        } else {
            this.roleRepository.save(role);
            responseEntity = new ResponseEntity<>(role, HttpStatus.CREATED);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity updateRole(Role role) {
        Optional<Role> dbRole = this.roleRepository.findById(role.getRoleId());
        ResponseEntity responseEntity;
        if (dbRole.isPresent()) {
            if (dbRole.get().equals(role)) {
                responseEntity = new ResponseEntity<>(dbRole.get(), HttpStatus.NOT_MODIFIED);
            } else {
                this.roleRepository.save(role);
                responseEntity = new ResponseEntity<>(role, HttpStatus.CREATED);
            }
        } else {
            responseEntity = new ResponseEntity<>("Record not found !!!", HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Role> deleteRole(Integer roleId) {
        Optional<Role> dbRole = this.roleRepository.findById(roleId);
        ResponseEntity<Role> responseEntity;
        if (dbRole.isPresent()) {
            dbRole.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            dbRole.get().setPages(null);
            this.roleRepository.save(dbRole.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public Set<Page> getPagesByRoleId(Integer roleId) {
        return this.roleRepository.findById(roleId).get().getPages();
    }

    @Override
    public List<Role> getRoleList() {
        return this.roleRepository.findByStatus(MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public List<Role> roleSearch(RoleVo roleVo) {
        List<Role> roleList = new ArrayList<>();
        try {
            QRole qRole = QRole.role;
            BooleanBuilder builder = new BooleanBuilder();
            if (roleVo.getRoleName() != null) {
                builder.and(qRole.roleName.containsIgnoreCase(roleVo.getRoleName()));
            }
            if (roleVo.getStatus() != null) {
                builder.and(qRole.status.eq(roleVo.getStatus()));
            }
            if (roleVo.getCreatedFromDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(roleVo.getCreatedFromDate(), 23, 59, 59);
                builder.and(qRole.createdDate.after(createdToDate));
            }
            if (roleVo.getCreatedToDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(roleVo.getCreatedToDate(), 23, 59, 59);
                builder.and(qRole.createdDate.before(createdToDate));
            }
            roleList = (List<Role>) this.roleRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Role Search Error:" + e.getMessage());
        }
        return roleList;
    }
}
