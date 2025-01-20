/**
 * Made  by rayen.
 * Date: 20/01/2025.
 * Time: 09:17.
 * Project Name : chat.
 */

package com.rayen.chat.chat;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {

    private String content;
    private String sender;
    private MessageType type;
}
