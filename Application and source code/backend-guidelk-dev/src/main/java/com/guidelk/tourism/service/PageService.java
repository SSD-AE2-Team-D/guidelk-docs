package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Authority;
import com.guidelk.tourism.entity.Page;
import com.guidelk.tourism.vo.PageVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public interface PageService {
    ResponseEntity createPage(Page page);

    ResponseEntity<Page> updatePage(Page page);

    ResponseEntity<Page> deletePage(Integer pageId);

    List<Page> getPagesByModule(Integer moduleId, Integer userId);

    List<Page> getPageList();

    List<Page> pageSearch(PageVo pageVo);

    Set<Authority> getAuthoritiesByPageId(Integer pageId);

}
