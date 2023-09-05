package com.yupi.springbootinit.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.yupi.springbootinit.constant.UserConstant.USER_LOGIN_STATE;

/**
 * Created by limi on 2017/10/15.
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        if (request.getSession().getAttribute(USER_LOGIN_STATE) == null) {
            response.sendRedirect("/login");
            return false;
        }
        return true;
    }
}
