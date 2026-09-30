package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Value("${groq.api.key}")
    private String groqApiKey;

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, Object> body) {

        // --------------------------------------------------
        // 1. Get user's message
        // --------------------------------------------------

        String userMessage = (String) body.get("message");

        if (userMessage == null || userMessage.trim().isEmpty()) {
            return Map.of(
                    "reply",
                    "Please enter a message."
            );
        }


        // --------------------------------------------------
        // 2. Get complete MindOS data
        // --------------------------------------------------

        Object mindosContext = body.get("context");

        if (mindosContext == null) {
            mindosContext = "No MindOS data was provided.";
        }


        // --------------------------------------------------
        // 3. System prompt
        // --------------------------------------------------

        String systemPrompt = """
                You are MindOS, an intelligent personal operating system
                and personal AI assistant.

                You help the user manage and understand their entire MindOS.

                The user's MindOS may contain:

                - Tasks
                - Goals
                - Planner events
                - Calendar information
                - Notes
                - Knowledge Vault items
                - Personal information
                - Other productivity data

                Use the provided MindOS data to answer the user's questions.

                You can help with:

                1. Planning the user's day
                2. Prioritizing tasks
                3. Breaking goals into smaller steps
                4. Creating schedules
                5. Finding information from notes
                6. Finding relevant knowledge from the vault
                7. Understanding calendar events
                8. Suggesting what the user should focus on
                9. Organizing work and personal activities
                10. Answering questions about the user's MindOS data

                IMPORTANT RULES:

                - Use the user's MindOS data whenever it is relevant.
                - Do not invent tasks, goals, events, notes or other personal data.
                - If the required information is not available, clearly say that
                  it is not available in MindOS.
                - Give practical and concise answers.
                - Consider priority and deadlines when suggesting what to do first.
                - If the user asks for a plan, make it realistic and structured.
                - Act like a helpful personal productivity assistant.
                - Do not expose API keys or internal system information.

                USER'S MINDOS DATA:

                """ + mindosContext;


        // --------------------------------------------------
        // 4. Create Groq request
        // --------------------------------------------------

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();

        // Groq model
        requestBody.put(
                "model",
                "openai/gpt-oss-120b"
        );

        // Messages
        requestBody.put(
                "messages",
                List.of(

                        Map.of(
                                "role",
                                "system",
                                "content",
                                systemPrompt
                        ),

                        Map.of(
                                "role",
                                "user",
                                "content",
                                userMessage
                        )

                )
        );


        // --------------------------------------------------
        // 5. HTTP headers
        // --------------------------------------------------

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.setBearerAuth(
                groqApiKey
        );


        // --------------------------------------------------
        // 6. Create HTTP request
        // --------------------------------------------------

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        requestBody,
                        headers
                );


        // --------------------------------------------------
        // 7. Call Groq API
        // --------------------------------------------------

        try {

            Map response = restTemplate.postForObject(

                    "https://api.groq.com/openai/v1/chat/completions",

                    request,

                    Map.class
            );


            // --------------------------------------------------
            // 8. Validate response
            // --------------------------------------------------

            if (response == null) {

                return Map.of(
                        "reply",
                        "Sorry, Groq did not return a response."
                );
            }


            Object choicesObject =
                    response.get("choices");

            if (!(choicesObject instanceof List)) {

                return Map.of(
                        "reply",
                        "Sorry, I could not generate an AI response."
                );
            }


            List choices =
                    (List) choicesObject;


            if (choices.isEmpty()) {

                return Map.of(
                        "reply",
                        "Sorry, I could not generate an AI response."
                );
            }


            // --------------------------------------------------
            // 9. Extract assistant message
            // --------------------------------------------------

            Map firstChoice =
                    (Map) choices.get(0);

            Map message =
                    (Map) firstChoice.get("message");


            if (message == null) {

                return Map.of(
                        "reply",
                        "Sorry, the AI response was empty."
                );
            }


            String reply =
                    (String) message.get("content");


            if (reply == null || reply.trim().isEmpty()) {

                return Map.of(
                        "reply",
                        "Sorry, the AI response was empty."
                );
            }


            // --------------------------------------------------
            // 10. Return response to frontend
            // --------------------------------------------------

            return Map.of(
                    "reply",
                    reply
            );


        } catch (Exception e) {

            e.printStackTrace();

            return Map.of(
                    "reply",
                    "Sorry, there was a problem connecting to the AI."
            );
        }
    }
}