package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.dto.ChatRoom;
import com.ssafy.moa.common.handler.RedisSubscriber;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;

    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    private Map<String, ChannelTopic> openChatTopics;
    private Map<String, ChannelTopic> buddyChatTopics;

    private static final String OPEN_CHAT_ROOMS = "OPEN_CHAT_ROOM";
    private static final String BUDDY_CHAT_ROOMS = "BUDDY_CHAT_ROOM";

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        openChatTopics = new HashMap<>();
        buddyChatTopics = new HashMap<>();
    }

    public List<ChatRoom> findAllRoom(Integer type) {
        if(type == 1) return opsHashChatRoom.values(OPEN_CHAT_ROOMS);
        else return opsHashChatRoom.values(BUDDY_CHAT_ROOMS);
    }

    public ChatRoom findRoomById(Integer type, String id) {
        if(type == 1) return opsHashChatRoom.get(OPEN_CHAT_ROOMS, id);
        else  return opsHashChatRoom.get(BUDDY_CHAT_ROOMS, id);
    }

    public ChatRoom createChatRoom(String roomId, String name) {
        ChatRoom chatRoom = ChatRoom.builder().roomId(roomId).name(name).build();
        opsHashChatRoom.put(OPEN_CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    public ChatRoom createBuddyRoom(String roomId, String name) {
        ChatRoom chatRoom = ChatRoom.builder().roomId(roomId).name(name).build();
        opsHashChatRoom.put(OPEN_CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    public void enterOpenChatRoom(String roomId) {
        String key = "open_chat: " + roomId;
        ChannelTopic topic = openChatTopics.get(key);
        if (topic == null) {
            topic = new ChannelTopic(key);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            openChatTopics.put(key, topic);
        }
    }
    public ChannelTopic getOpenChatTopic(String roomId) {
        return openChatTopics.get(roomId);
    }


    public void enterBuddyChatRoom(String roomId) {
        String key = "buddy: " + roomId;
        ChannelTopic topic = buddyChatTopics.get(key);
        if (topic == null) {
            topic = new ChannelTopic(key);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            buddyChatTopics.put(key, topic);
        }
    }
    public ChannelTopic getBuddyChatTopic(String roomId) {
        String key = "buddy: " + roomId;
        return buddyChatTopics.get(key);
    }

}
