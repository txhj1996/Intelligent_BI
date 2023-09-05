package com.yupi.springbootinit.mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class SingleProducer {

    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("47.100.114.188");
        factory.setUsername("root");
        factory.setPassword("root");
//        factory.setPort();

        // 建立连接、创建频道
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            // 创建消息队列
            /*

queue – the name of the queue durable – true if we are declaring a durable queue (the queue will survive a server restart) exclusive – true if we are declaring an exclusive queue (restricted to this connection) autoDelete – true if we are declaring an autodelete queue (server will delete it when no longer in use) arguments – other properties (construction arguments) for the queue
             */
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            // 发送消息
            String message = "Hello World!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}