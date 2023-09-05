package com.anryg.bigdata;

import redis.clients.jedis.Jedis;

public class Client {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("hadoop102", 6379);
//        Jedis jedis = new Jedis("*", 6379);

        System.out.println(jedis.ping());
    }
}
