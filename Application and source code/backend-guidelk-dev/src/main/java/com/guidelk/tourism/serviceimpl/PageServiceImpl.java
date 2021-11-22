package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.entity.*;
import com.guidelk.tourism.repository.AuthorityRepository;
import com.guidelk.tourism.repository.ModuleRepository;
import com.guidelk.tourism.repository.PageRepository;
import com.guidelk.tourism.repository.UserRepository;
import com.guidelk.tourism.service.PageService;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.PageVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PageServiceImpl implements PageService {

    private final PageRepository pageRepository;
    private final ModuleRepository moduleRepository;
    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(PageServiceImpl.class);

    @Autowired
    public PageServiceImpl(PageRepository pageRepository,
                           ModuleRepository moduleRepository,
                           AuthorityRepository authorityRepository,
                           UserRepository userRepository) {
        this.pageRepository = pageRepository;
        this.moduleRepository = moduleRepository;
        this.authorityRepository = authorityRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createPage(Page page) {
        ResponseEntity responseEntity;
        Page dbPage = this.pageRepository.findByPageNameContainsIgnoreCaseAndStatusNot(page.getPageName(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbPage != null) {
            responseEntity = new ResponseEntity<>("Duplicate Record", HttpStatus.BAD_REQUEST);
        } else {
            Optional<Module> module = this.moduleRepository.findById(page.getModuleId());
            for (Authority authority : page.getAuthorities()) {
                authority.setStatus(MasterDataStatus.APPROVED.getStatusSeq());
                authority.setAuthorityName("ROLE_" + module.get().getUrlPattern() + "@" + page.getUrlPattern() + "_" + authority.getAuthorityName());
                authority.setDescription(page.getPageName().concat(" ").concat("Authority"));
            }
            this.pageRepository.save(page);
            responseEntity = new ResponseEntity<>(page, HttpStatus.CREATED);
        }

        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Page> updatePage(Page page) {
        ResponseEntity<Page> responseEntity;
        Optional<Page> dbPage = this.pageRepository.findById(page.getPageId());
        Optional<Module> module = this.moduleRepository.findById(page.getModuleId());
        if (dbPage.isPresent()) {
            if (dbPage.get().getAuthorities().size() > 0) {
                for (Authority authority : page.getAuthorities()) {
                    Authority dbAuthority = this.authorityRepository.findByAuthorityNameAndStatus(authority.getAuthorityName(), MasterDataStatus.APPROVED.getStatusSeq());
                    if (dbAuthority == null) {
                        authority.setStatus(MasterDataStatus.APPROVED.getStatusSeq());
                        authority.setAuthorityName("ROLE_" + module.get().getUrlPattern() + "@" + page.getUrlPattern() + "_" + authority.getAuthorityName());
                        authority.setDescription(page.getPageName().concat(" ").concat("Authority"));
                        page.getAuthorities().add(authority);
                    }
                }
            } else {
                for (Authority authority : page.getAuthorities()) {
                    authority.setStatus(MasterDataStatus.APPROVED.getStatusSeq());
                    authority.setAuthorityName("ROLE_" + module.get().getUrlPattern() + "@" + page.getUrlPattern() + "_" + authority.getAuthorityName());
                    authority.setDescription(page.getPageName().concat(" ").concat("Authority"));
                }
            }

            this.pageRepository.save(page);
            responseEntity = new ResponseEntity<>(page, HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(page, HttpStatus.NOT_FOUND);

        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<Page> deletePage(Integer pageId) {
        Optional<Page> dbPage = this.pageRepository.findById(pageId);
        ResponseEntity<Page> responseEntity;
        if (dbPage.isPresent()) {
            for (Authority authority : dbPage.get().getAuthorities()) {
                authority.setStatus(MasterDataStatus.DELETED.getStatusSeq());
            }
            dbPage.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            this.pageRepository.save(dbPage.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return responseEntity;
    }

    @Override
    public List<Page> getPagesByModule(Integer moduleId, Integer userId) {
        List<Page> pages = new ArrayList<>();
        try {
            pages = this.userRepository.findById(userId).get().getRoles()
                    .stream().flatMap(role -> role.getPages().stream())
                    .filter(page -> page.getModuleId().equals(moduleId)
                            && page.getStatus().equals(MasterDataStatus.APPROVED.getStatusSeq()))
                    .sorted(Comparator.comparingInt(Page::getOrderIndex))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return pages;
    }

    @Override
    public List<Page> getPageList() {
        return this.pageRepository.findByStatus(MasterDataStatus.APPROVED.getStatusSeq());
    }

    @Override
    public Set<Authority> getAuthoritiesByPageId(Integer pageId) {
        return this.pageRepository.findById(pageId).get().getAuthorities();
    }

    @Override
    public List<Page> pageSearch(PageVo pageVo) {
        List<Page> pageList = new ArrayList<>();
        try {
            QPage qPage = QPage.page;
            BooleanBuilder builder = new BooleanBuilder();
            if (pageVo.getPageName() != null) {
                builder.and(qPage.pageName.containsIgnoreCase(pageVo.getPageName()));
            }
            if (pageVo.getModuleId() != null) {
                builder.and(qPage.moduleId.eq(pageVo.getModuleId()));
            }
            if (pageVo.getStatus() != null) {
                builder.and(qPage.status.eq(pageVo.getStatus()));
            }
            if (pageVo.getCreatedFromDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(pageVo.getCreatedFromDate(), 23, 59, 59);
                builder.and(qPage.createdDate.after(createdToDate));
            }
            if (pageVo.getCreatedToDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(pageVo.getCreatedToDate(), 23, 59, 59);
                builder.and(qPage.createdDate.before(createdToDate));
            }
            pageList = (List<Page>) this.pageRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("Page Search Error:" + e.getMessage());
        }
        return pageList;
    }

}
