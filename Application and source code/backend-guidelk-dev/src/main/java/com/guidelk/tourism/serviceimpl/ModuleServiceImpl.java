package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.Module;
import com.guidelk.tourism.entity.Page;
import com.guidelk.tourism.entity.QModule;
import com.guidelk.tourism.entity.User;
import com.guidelk.tourism.repository.ModuleRepository;
import com.guidelk.tourism.repository.UserRepository;
import com.guidelk.tourism.service.ModuleService;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.util.ReusableSpecific;
import com.guidelk.tourism.vo.ModuleVo;
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
import java.util.stream.Collectors;

@Service
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(ModuleServiceImpl.class);

    @Autowired
    public ModuleServiceImpl(ModuleRepository moduleRepository,
                             UserRepository userRepository) {
        this.moduleRepository = moduleRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createModule(Module module) {
        ResponseEntity responseEntity;
        Module dbModuleName = this.moduleRepository.findByModuleNameContainsIgnoreCaseAndStatusNot(module.getModuleName(), MasterDataStatus.DELETED.getStatusSeq());
        Module dbModuleCode = this.moduleRepository.findByModuleCodeContainsIgnoreCaseAndStatusNot(module.getModuleCode(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbModuleName != null) {
            responseEntity = new ResponseEntity<>("Module name already exist", HttpStatus.CONFLICT);
        } else if (dbModuleCode != null) {
            responseEntity = new ResponseEntity<>("Module code already exist", HttpStatus.BAD_REQUEST);
        } else {
            this.moduleRepository.save(module);
            responseEntity = new ResponseEntity<>(module, HttpStatus.CREATED);

        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity updateModule(Module module) {
        ResponseEntity responseEntity;
        Optional<Module> dbModule = this.moduleRepository.findById(module.getModuleId());
        if (dbModule.isPresent()) {
            if (!dbModule.get().getModuleName().equals(module.getModuleName())) {
                Module dbModuleName = this.moduleRepository.findByModuleNameContainsIgnoreCaseAndStatusNot(module.getModuleName(), MasterDataStatus.DELETED.getStatusSeq());
                if (dbModuleName != null) {
                    responseEntity = new ResponseEntity<>("Module name already exist", HttpStatus.BAD_REQUEST);
                } else {
                    if (!dbModule.get().getModuleCode().equals(module.getModuleCode())) {
                        Module dbModuleCode = this.moduleRepository.findByModuleCodeContainsIgnoreCaseAndStatusNot(module.getModuleCode(), MasterDataStatus.DELETED.getStatusSeq());
                        if (dbModuleCode != null) {
                            responseEntity = new ResponseEntity<>("Module code already exist", HttpStatus.BAD_REQUEST);
                        } else {
                            this.moduleRepository.save(module);
                            responseEntity = new ResponseEntity<>(module, HttpStatus.CREATED);
                        }
                    } else {
                        this.moduleRepository.save(module);
                        responseEntity = new ResponseEntity<>(module, HttpStatus.CREATED);
                    }
                }
            } else {
                if (!dbModule.get().getModuleCode().equals(module.getModuleCode())) {
                    Module dbModuleCode = this.moduleRepository.findByModuleCodeContainsIgnoreCaseAndStatusNot(module.getModuleCode(), MasterDataStatus.DELETED.getStatusSeq());
                    if (dbModuleCode != null) {
                        responseEntity = new ResponseEntity<>("Module code already exist", HttpStatus.BAD_REQUEST);
                    } else {
                        this.moduleRepository.save(module);
                        responseEntity = new ResponseEntity<>(module, HttpStatus.CREATED);
                    }
                } else {
                    this.moduleRepository.save(module);
                    responseEntity = new ResponseEntity<>(module, HttpStatus.CREATED);
                }
            }
        } else {
            responseEntity = new ResponseEntity<>("Record no found", HttpStatus.BAD_REQUEST);

        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Module> deleteModule(Integer moduleId) {
        Optional<Module> dbModule = this.moduleRepository.findById(moduleId);
        ResponseEntity<Module> responseEntity;
        if (dbModule.isPresent()) {
            dbModule.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.moduleRepository.save(dbModule.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public List<Module> getUserModules(String userName, Integer organizationId) {
        List<Module> modules = new ArrayList<>();
        List<Page> pages = new ArrayList<>();
        try {
            User user = this.userRepository.findByUserNameAndOrganizationId(userName, organizationId);
            user.getRoles().forEach(role -> pages.addAll(role.getPages()));
            pages.forEach(page -> modules.add(page.getModule()));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return modules.stream().filter(ReusableSpecific.distinctByKey(Module::getModuleName)).collect(Collectors.toList());
    }

    @Override
    public Module getModuleData(Integer moduleId) {
        return this.moduleRepository.findById(moduleId).get();
    }

    @Override
    public List<Module> getUserModuleList() {
        return this.moduleRepository.findByStatus(MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public List<Module> moduleSearch(ModuleVo moduleVo) {
        List<Module> moduleList = new ArrayList<>();
        try {
            QModule qModule = QModule.module;
            BooleanBuilder builder = new BooleanBuilder();
            builder.and(qModule.organizationId.eq(moduleVo.getOrganizationId()));
            if (moduleVo.getModuleName() != null) {
                builder.and(qModule.moduleName.containsIgnoreCase(moduleVo.getModuleName()));
            }
            if (moduleVo.getModuleCode() != null) {
                builder.and(qModule.moduleCode.containsIgnoreCase(moduleVo.getModuleCode()));
            }
            if (moduleVo.getStatus() != null) {
                builder.and(qModule.status.eq(moduleVo.getStatus()));
            }
            if (moduleVo.getCreatedFromDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(moduleVo.getCreatedFromDate(), 23, 59, 59);
                builder.and(qModule.createdDate.after(createdToDate));
            }
            if (moduleVo.getCreatedToDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(moduleVo.getCreatedToDate(), 23, 59, 59);
                builder.and(qModule.createdDate.before(createdToDate));
            }
            moduleList = (List<Module>) this.moduleRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Module Search Error:" + e.getMessage());
        }
        return moduleList;
    }
}
