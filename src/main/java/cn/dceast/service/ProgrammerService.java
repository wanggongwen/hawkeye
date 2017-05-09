package cn.dceast.service;

import cn.dceast.mapper.ProgrammerMapper;
import cn.dceast.model.Programmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;

import java.util.List;
import java.util.Map;

/**
 * Created by zhengm on 2016/11/23.
 */
@Service
public class ProgrammerService {

    @Autowired
    private ProgrammerMapper programmerMapper;


    public List<Programmer> selectAll() {
        return programmerMapper.selectAll();
    }
}
