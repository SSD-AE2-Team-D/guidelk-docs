package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Module;
import com.guidelk.tourism.service.ModuleService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.ModuleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("modules")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_config@module_CREATE')")
    public ResponseEntity createModule(@Valid @RequestBody Module module) {
        return this.moduleService.createModule(module);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_config@module_UPDATE')")
    public ResponseEntity updateModule(@Valid @RequestBody Module module) {
        return this.moduleService.updateModule(module);
    }

    @DeleteMapping("{moduleId}")
    @PreAuthorize("hasRole('ROLE_config@module_DELETE')")
    public ResponseEntity<Module> deleteModule(@PathVariable("moduleId") Integer moduleId) {
        return this.moduleService.deleteModule(moduleId);
    }

    @PostMapping("/moduleSearch")
    @PreAuthorize("hasRole('ROLE_config@module_VIEW')")
    public List<Module> moduleSearch(@RequestBody ModuleVo moduleVo) {
        return this.moduleService.moduleSearch(moduleVo);
    }

    @GetMapping("/getUserModules")
    @PreAuthorize("hasRole('ROLE_config@module_VIEW')")
    public List<Module> getUserModules(@RequestParam("userName") String userName,
                                            @RequestParam("organizationId") Integer organizationId) {
        return this.moduleService.getUserModules(userName, organizationId);
    }

    @GetMapping("/getUserModuleList")
    @PreAuthorize("hasRole('ROLE_config@module_VIEW')")
    public List<Module> getUserModuleList() {
        return this.moduleService.getUserModuleList();
    }

    @GetMapping("/getModuleData")
    @PreAuthorize("hasRole('ROLE_config@module_VIEW')")
    public Module getModuleData(@RequestParam("moduleId") Integer moduleId) {
        return this.moduleService.getModuleData(moduleId);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_config@module_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }

}
