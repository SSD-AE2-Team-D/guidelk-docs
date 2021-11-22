package com.guidelk.tourism.serviceimpl;


import com.guidelk.tourism.entity.QUser;
import com.guidelk.tourism.entity.Role;
import com.guidelk.tourism.entity.User;
import com.guidelk.tourism.repository.UserRepository;
import com.guidelk.tourism.service.UserService;
import com.guidelk.tourism.util.DateUtil;
import com.guidelk.tourism.util.MasterDataStatus;
import com.guidelk.tourism.vo.UserVo;
import com.querydsl.core.BooleanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(AuthorityServiceImpl.class);

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ResponseEntity createUser(User user) {
        ResponseEntity responseEntity;
        User dbUser = this.userRepository.findByUserNameContainsIgnoreCaseAndStatusNot(user.getUserName(), MasterDataStatus.DELETED.getStatusSeq());
        User dbUserEmail = this.userRepository.findByEmailContainsIgnoreCaseAndStatusNot(user.getEmail(), MasterDataStatus.DELETED.getStatusSeq());
        if (dbUser != null) {
            responseEntity = new ResponseEntity<>("Username already exist", HttpStatus.BAD_REQUEST);
        } else if (dbUserEmail != null) {
            responseEntity = new ResponseEntity<>("Email already exist", HttpStatus.BAD_REQUEST);
        } else {
            String originalPassword = user.getPassword().trim();
            String password = "{bcrypt}" + BCrypt.hashpw(originalPassword, BCrypt.gensalt());
            user.setPassword(password);
            user.setUserName(user.getUserName().trim());
            user.setEmail(user.getEmail().toLowerCase().trim());
            this.userRepository.save(user);
            responseEntity = new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity updateUser(User user) {
        ResponseEntity responseEntity;
        Optional<User> dbUser = this.userRepository.findById(user.getUserId());
        if (dbUser.isPresent()) {
            if (dbUser.get().equals(user)) {
                responseEntity = new ResponseEntity<>(dbUser.get(), HttpStatus.NOT_MODIFIED);
            } else {
                this.userRepository.save(user);
                responseEntity = new ResponseEntity<>(user, HttpStatus.CREATED);
            }
        } else {
            responseEntity = new ResponseEntity<>("Record not found", HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }

    @Override
    @Transactional
    public ResponseEntity<User> deleteUser(Integer userId) {
        Optional<User> dbUser = this.userRepository.findById(userId);
        ResponseEntity<User> responseEntity;
        if (dbUser.isPresent()) {
            dbUser.get().setStatus(MasterDataStatus.DELETED.getStatusSeq());
            dbUser.get().setRoles(null);
            this.userRepository.save(dbUser.get());
            responseEntity = new ResponseEntity<>(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @Override
    public User getUserData(String userName) {
        return this.userRepository.findByUserNameIgnoreCase(userName);
    }

    @Override
    public Set<Role> getRolesByUserId(Integer userId) {
        return this.userRepository.findById(userId).get().getRoles();
    }

    @Override
    public List<User> userSearch(UserVo userVo) {
        List<User> userList = new ArrayList<>();
        try {
            QUser qUser = QUser.user;
            BooleanBuilder builder = new BooleanBuilder();
            builder.and(qUser.organizationId.eq(userVo.getOrganizationId()));
            if (userVo.getUserName() != null) {
                builder.and(qUser.userName.containsIgnoreCase(userVo.getUserName()));
            }
            if (userVo.getStatus() != null) {
                builder.and(qUser.status.eq(userVo.getStatus()));
            }
            if (userVo.getCreatedFromDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(userVo.getCreatedFromDate(), 23, 59, 59);
                builder.and(qUser.createdDate.after(createdToDate));
            }
            if (userVo.getCreatedToDate() != null) {
                Date createdToDate = DateUtil.setTimeToDate(userVo.getCreatedToDate(), 23, 59, 59);
                builder.and(qUser.createdDate.before(createdToDate));
            }
            userList = (List<User>) this.userRepository.findAll(builder);
        } catch (Exception e) {
            logger.error("User Search Error", e.getMessage());
        }
        return userList;
    }


}
