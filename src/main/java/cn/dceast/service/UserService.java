package cn.dceast.service;

import cn.dceast.mapper.UserMapper;
import cn.dceast.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by root on 16-11-21.
 * Transactional:optionally support for @Transactional
 */
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    @Transactional(readOnly = true)
    public List<User> getAllUser() {
        return userMapper.getAllUser();
    }
}
