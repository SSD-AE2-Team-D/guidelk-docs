package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Authority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface AuthorityService {
    List<Authority> getDefaultAuthorityList();

    List<Authority> getAuthorityList(String userName, Integer organizationId);


}
