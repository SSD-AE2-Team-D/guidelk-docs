package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Module;
import com.guidelk.tourism.vo.ModuleVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ModuleService {
    ResponseEntity createModule(Module module);

    ResponseEntity updateModule(Module module);

    ResponseEntity<Module> deleteModule(Integer moduleId);

    List<Module> moduleSearch(ModuleVo moduleVo);

    List<Module> getUserModules(String userName, Integer organizationId);

    Module getModuleData(Integer moduleId);

    List<Module> getUserModuleList();
}
