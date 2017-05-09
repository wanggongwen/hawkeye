package cn.dceast.mapper;

import cn.dceast.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by wanggw on 17/5/9.
 */
@Mapper
public interface UserMapper {

    List<User> getAllUser();

}
