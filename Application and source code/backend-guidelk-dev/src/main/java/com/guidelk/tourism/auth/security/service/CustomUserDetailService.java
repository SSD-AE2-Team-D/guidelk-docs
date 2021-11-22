package com.guidelk.tourism.auth.security.service;

import com.guidelk.tourism.entity.Authority;
import com.guidelk.tourism.entity.User;
import com.guidelk.tourism.repository.UserRepository;
import com.guidelk.tourism.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthorityService authorityService;

    @Autowired
    public CustomUserDetailService(UserRepository userRepository,
                                   AuthorityService authorityService) {
        this.userRepository = userRepository;
        this.authorityService = authorityService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUserNameIgnoreCaseAndEnabled(username, true);
        this.grantedAuthorities(user);
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new ArrayList<>());
    }

    public Set<GrantedAuthority> grantedAuthorities(User user) {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        List<Authority> authorities = this.authorityService.getAuthorityList(user.getUserName(), user.getOrganizationId());
        for (Authority authority : authorities) {
            grantedAuthorities.add(new SimpleGrantedAuthority(authority.getAuthorityName()));
        }
        return grantedAuthorities;
    }

}
