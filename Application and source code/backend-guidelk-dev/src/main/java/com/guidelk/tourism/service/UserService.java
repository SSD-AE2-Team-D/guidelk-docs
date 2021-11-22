package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.Role;
import com.guidelk.tourism.entity.User;
import com.guidelk.tourism.vo.UserVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public interface UserService {
    ResponseEntity createUser(User user);

    ResponseEntity updateUser(User user);

    ResponseEntity<User> deleteUser(Integer userId);

    User getUserData(String userName);

    Set<Role> getRolesByUserId(Integer userId);

    List<User> userSearch(UserVo userVo);
}
