package com.ssafy.moa.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 메세지 송수신 처리하는 부분
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // sub로 보내면 프론트에 데이터 전달
        config.enableSimpleBroker("/sub");
        // pub로 데이터 받으면 pub를 제외한 URI를 @MessageMapping에 매핑
        config.setApplicationDestinationPrefixes("/pub");
    }

    // 서버와 처음 연결되는 부분
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOrigins("*")
                .withSockJS();
    }

}
