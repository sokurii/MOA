package com.ssafy.moa.common.handler;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moa.api.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            log.info("publishMessage: " + publishMessage);
            ChatMessage roomMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
            log.info("RoomMessage: " +roomMessage.toString());
            if(roomMessage.getRoomType() == 1) messagingTemplate.convertAndSend("/sub/chat/buddy/" + roomMessage.getRoomId(), roomMessage);
            else messagingTemplate.convertAndSend("/sub/chat/open-chat/" + roomMessage.getRoomId(), roomMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
