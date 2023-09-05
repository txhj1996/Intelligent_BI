package com.yupi.springbootinit.mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class TtlProducerWithQueue {
	// 定义队列名称为"ttl_queue"
    private final static String QUEUE_NAME = "ttl_queue";

    public static void main(String[] argv) throws Exception {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        // 建立连接、创建频道
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {

            // 消息虽然可以重复声明,必须指定相同的参数,在消费者的创建队列要指定过期时间,
            // 后面要放args,在生产者你又想重新创建队列，又不指定参数，那肯定会有问题，
            // 所以要把这里的创建队列注释掉。
            // channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            // 创建队列，指定消息过期参数
//            Map<String, Object> args = new HashMap<String, Object>();
//            // 设置消息过期时间为5秒
//            args.put("x-message-ttl", 5000);
//            // 创建队列，并传入队列名称、是否持久化、是否私有、是否自动删除，args 指定参数
//            channel.queueDeclare(QUEUE_NAME, false, false, false, args);
            // 发送消息
            for (int i = 0; i < 10; i++) {
                String message = "Hello World!";
                // 使用默认的交换机，将消息发送到指定队列
                channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
                System.out.println(" [x] Sent '" + message + "'");
            }
        }
    }
}