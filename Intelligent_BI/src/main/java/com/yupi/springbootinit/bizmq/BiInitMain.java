package com.yupi.springbootinit.bizmq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * 用于创建测试程序用到的交换机和队列（只用在程序启动前执行一次）
 */
public class BiInitMain {

    public static void main(String[] args) {
        try {
            ConnectionFactory factory = new ConnectionFactory();
//            factory.setHost("localhost");
            factory.setHost("47.100.114.188");
            factory.setUsername("root");
            factory.setPassword("root");
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            String EXCHANGE_NAME =  BiMqConstant.BI_EXCHANGE_NAME;
            channel.exchangeDeclare(EXCHANGE_NAME, "direct",true);

            // 声明死信交换机
            channel.exchangeDeclare(BiMqConstant.DEAD_EXCHANGE_NAME, "direct",true);

            // 创建死信队列

            channel.queueDeclare(BiMqConstant.DEAD_QUEUE_NAME, true, false, false, null);
            channel.queueBind(BiMqConstant.DEAD_QUEUE_NAME, BiMqConstant.DEAD_EXCHANGE_NAME, BiMqConstant.BI_ROUTING_KEY);

            // 指定死信队列参数
            Map<String, Object> arg = new HashMap<>();
            // 要绑定到哪个交换机
            arg.put("x-dead-letter-exchange", BiMqConstant.DEAD_EXCHANGE_NAME);
            // 指定死信要转发到哪个死信队列
            arg.put("x-dead-letter-routing-key", BiMqConstant.BI_ROUTING_KEY);

//            arg.put("x-message-ttl", 10000);
            Map<String, Object> arg1 = new HashMap<String, Object>();


            // 创建队列，随机分配一个队列名称
            channel.queueDeclare(BiMqConstant.BI_QUEUE_NAME, true, false, false, arg);
            channel.queueBind(BiMqConstant.BI_QUEUE_NAME, EXCHANGE_NAME,  BiMqConstant.BI_ROUTING_KEY);



        } catch (Exception e) {

        }

    }
}
