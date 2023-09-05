package com.yupi.springbootinit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/chart/sync/analysis")
    public String analyse(){
        return "analysis_sync";
    }

    @GetMapping("/chart/pool/analysis")
    public String analyse1() {
        return "analysis_pool";
    }

    @GetMapping("/chart/mq/analysis")
    public String analyse2() {
        return "analysis_mq";
    }

//    @GetMapping("/myChart")
//    public String toCharPage() {
//        return "myChart";
//    }

    @GetMapping("/bi/index")
    public String index1(){
        return "biindex";
    }

    @GetMapping("/")
    public String login(){
        return "login";
    }

    @GetMapping("/register")
    public String toRegister(){
        return "register";
    }

    @GetMapping("/login")
    public String toLogin() {
        return "login";
    }
}
