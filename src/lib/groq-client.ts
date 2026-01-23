// Groq API client for Gaia AI chatbot using Supabase Edge Functions
import { supabase } from './s3-direct';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class GroqService {
  private readonly edgeFunctionUrl: string;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('VITE_SUPABASE_URL is not defined in environment variables');
    }
    
    // Construct the Edge Function URL
    this.edgeFunctionUrl = `${supabaseUrl}/functions/v1/gaia-chat`;
  }

  /**
   * Stream a chat completion from Groq API via Supabase Edge Function
   * @param messages - Array of chat messages
   * @param onChunk - Callback function called for each chunk of text
   * @returns Promise that resolves when streaming is complete
   */
  async streamChatCompletion(
    messages: ChatMessage[],
    onChunk: (text: string) => void
  ): Promise<void> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(this.edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body available');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete SSE messages
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            
            if (data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              // Skip invalid JSON
              console.warn('Failed to parse SSE data:', data);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming chat completion:', error);
      throw error;
    }
  }

  /**
   * Generate a non-streaming chat completion (fallback)
   * @param messages - Array of chat messages
   * @returns Promise with the complete response
   */
  async getChatCompletion(messages: ChatMessage[]): Promise<string> {
    let fullResponse = '';
    
    await this.streamChatCompletion(messages, (chunk) => {
      fullResponse += chunk;
    });
    
    return fullResponse;
  }
}

// Export singleton instance
export const groqService = new GroqService();
