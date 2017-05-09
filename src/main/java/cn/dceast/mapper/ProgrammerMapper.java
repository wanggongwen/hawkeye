package cn.dceast.mapper;

import cn.dceast.model.Programmer;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

/**
 * Created by wanggw on 17/5/9.
 */
@Mapper
public interface ProgrammerMapper {
    @Insert("insert into programmer(name,base,tel,level,entryDate) values(#{name},#{base},#{tel},#{level},#{entryDate})")
    void add(Programmer programmer);

    @Delete("delete from programmer where id = #{id}")
    void deleteById(Integer id);

    @Update("update programmer set level = #{level} where id = #{id}")
    void updateById(Map<String, Object> map);

    @Select("select * from programmer")
    List<Programmer> selectAll();

}
