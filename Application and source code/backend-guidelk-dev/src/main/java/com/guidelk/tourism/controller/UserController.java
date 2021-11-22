package com.guidelk.tourism.controller;

import com.guidelk.tourism.entity.Role;
import com.guidelk.tourism.entity.User;
import com.guidelk.tourism.service.UserService;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_config@user_CREATE')")
    public ResponseEntity createUser(@Valid @RequestBody User user) {
        return this.userService.createUser(user);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_config@user_UPDATE')")
    public ResponseEntity updateUser(@Valid @RequestBody User user) {
        return this.userService.updateUser(user);
    }

    @DeleteMapping("{userId}")
    @PreAuthorize("hasRole('ROLE_config@user_DELETE')")
    public ResponseEntity<User> deleteUser(@PathVariable("userId") Integer userId) {
        return this.userService.deleteUser(userId);
    }

    @GetMapping("/getUserData")
    @PreAuthorize("hasRole('ROLE_config@user_VIEW')")
    public User getUserData(@RequestParam("userName") String userName) {
        return this.userService.getUserData(userName);
    }

    @GetMapping(params = "userId")
    @PreAuthorize("hasRole('ROLE_config@user_VIEW')")
    public Set<Role> getRolesByUserId(@RequestParam("userId") Integer userId) {
        return this.userService.getRolesByUserId(userId);
    }

    @PostMapping("/userSearch")
    @PreAuthorize("hasRole('ROLE_config@user_VIEW')")
    public List<User> userSearch(@RequestBody UserVo userVo) {
        return this.userService.userSearch(userVo);
    }

    @GetMapping("/getMasterStatusList")
    @PreAuthorize("hasRole('ROLE_config@user_VIEW')")
    public List<MasterDataStatus> findStatusList(@RequestParam("filter") String filter) {
        return MasterDataStatus.getMasterStatusActionWise(filter);
    }

}
