package cn.dceast.controller;

import cn.dceast.model.Programmer;
import cn.dceast.service.ProgrammerService;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wanggw on 17/5/9.
 */
@Controller
@RequestMapping("/programmer")
public class ProgrammerController {

    @Autowired
    private ProgrammerService programmerService;


    @RequestMapping(value = "/list")
    public String getAllProgrammer(ModelMap map, HttpServletRequest request){

        map.put("programmers", programmerService.selectAll());

        return "programmer/list";
    }

}
