/**
 * Made  by rayen.
 * Date: 20/01/2025.
 * Time: 09:12.
 * Project Name : chat.
 */

package com.rayen.chat.config;

import com.rayen.chat.chat.ChatMessage;
import com.rayen.chat.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagetemplate;

    @EventListener
    public void handleWebSocketDisconnectedListener(
            SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        if(username != null) {
            log.info("user disconnected: {} " , username);
            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .sender(username)
                    .build();
            messagetemplate.convertAndSend("/topic/public", chatMessage);
        }

    }

}
