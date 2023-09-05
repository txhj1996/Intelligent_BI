package com.yupi.springbootinit.mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

public class MultiConsumerAutoAckWithExcp {

    private static final String TASK_QUEUE_NAME = "multi_queue";

    public static void main(String[] argv) throws Exception {
        // 建立连接
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        final Connection connection = factory.newConnection();

        final Channel channel = connection.createChannel();
        final Channel channel1 = connection.createChannel();
        //两个消费者关联同一个队列
        channel.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);
        channel1.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
//        channel.basicQos(1);
//        channel1.basicQos(1);

        //定义第一个消费者的消费逻辑
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            try {
                // 处理工作
                System.out.println(" [x] Received '" + "编号:" + 0 + ":" + message + "'");
                // 停 20 秒，模拟机器处理能力有限
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                System.out.println(" [x] Received '" + "编号:" + 0 + ":" + message + "'done");
            }
        };

        //定义第二个消费者的消费逻辑
        DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");

            try {
                // 处理工作
                System.out.println(" [x] Received '" + "编号:" + 1 + ":" + message + "'");
                // 停 20 秒，模拟机器处理能力有限
                Thread.sleep(5000);
                int j =  5/0;
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                System.out.println(" [x] Done");
                channel1.basicAck(delivery.getEnvelope().getDeliveryTag(),false);
            }
        };
        // 两个消费者开启消费监听
        channel.basicConsume(TASK_QUEUE_NAME, true, deliverCallback, consumerTag -> {
        });
        channel1.basicConsume(TASK_QUEUE_NAME, true, deliverCallback1, consumerTag -> {
        });
    }
}