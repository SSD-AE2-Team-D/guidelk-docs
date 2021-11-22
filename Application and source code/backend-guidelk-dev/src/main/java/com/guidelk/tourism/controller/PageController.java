package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Authority;
import com.guidelk.tourism.entity.Page;
import com.guidelk.tourism.service.PageService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.PageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("pages")
public class PageController {

    private final PageService pageService;

    @Autowired
    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_config@page_CREATE')")
    public ResponseEntity createPage(@Valid @RequestBody Page page) {
        return this.pageService.createPage(page);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_config@page_UPDATE')")
    public ResponseEntity<Page> updatePage(@Valid @RequestBody Page page) {
        return this.pageService.updatePage(page);
    }

    @DeleteMapping("{pageId}")
    @PreAuthorize("hasRole('ROLE_config@page_DELETE')")
    public ResponseEntity<Page> deletePage(@PathVariable("pageId") Integer pageId) {
        return this.pageService.deletePage(pageId);
    }

    @GetMapping("/getPageList")
    @PreAuthorize("hasRole('ROLE_config@page_VIEW')")
    public List<Page> getPageList() {
        return this.pageService.getPageList();
    }

    @PostMapping("/pageSearch")
    @PreAuthorize("hasRole('ROLE_config@page_VIEW')")
    public List<Page> pageSearch(@RequestBody PageVo pageVo) {
        return this.pageService.pageSearch(pageVo);
    }

    @GetMapping("/getPagesByModule")
    @PreAuthorize("hasRole('ROLE_config@page_VIEW')")
    public List<Page> getPagesByModule(@RequestParam("moduleId") Integer moduleId,
                                       @RequestParam("userId") Integer userId) {
        return this.pageService.getPagesByModule(moduleId,userId);
    }

    @GetMapping(params = "pageId")
    @PreAuthorize("hasRole('ROLE_config@page_VIEW')")
    public Set<Authority> getAuthoritiesByPageId(@RequestParam("pageId") Integer pageId) {
        return this.pageService.getAuthoritiesByPageId(pageId);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_config@page_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }

}
