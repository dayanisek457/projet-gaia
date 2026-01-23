import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { groqService, type ChatMessage as ChatMessageType } from '@/lib/groq-client';
import { gaiaContextService } from '@/lib/gaia-context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MarkdownMessage = ({ content }: { content: string }) => (
  <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  </div>
);

const ChatMessageBubble = ({ 
  role, 
  content, 
  isStreaming = false 
}: { 
  role: 'user' | 'assistant'; 
  content: string; 
  isStreaming?: boolean;
}) => {
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-3 mb-4', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full shadow-md',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {isUser ? (
          <span className="text-xs font-bold">V</span>
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          'rounded-2xl px-4 py-3 max-w-[80%] shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="text-sm">
            <MarkdownMessage content={content} />
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse rounded" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [context, setContext] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const streamingMessageRef = useRef<string>('');

  // Load context on mount
  useEffect(() => {
    const loadContext = async () => {
      try {
        const ctx = await gaiaContextService.buildContext();
        setContext(ctx);
      } catch (err) {
        console.error('Failed to load context:', err);
        setError('Impossible de charger le contexte du projet. Veuillez réessayer.');
      }
    };

    loadContext();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current && isOpen) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isStreaming, isOpen]);

  const handleSendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || !context) {
      if (!context) {
        toast.error('Le contexte n\'est pas encore chargé');
      }
      return;
    }

    setInput('');
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);
    streamingMessageRef.current = '';

    try {
      const chatMessages: ChatMessageType[] = [
        {
          role: 'system',
          content: `Tu es Gaia AI, un assistant virtuel expert du Projet Gaia du Lycée Saint Joseph à Dijon. 

Contexte complet:
${context}

Règles importantes:
- Réponds TOUJOURS en français
- Sois précis et utilise les informations du contexte
- Si une info n'est pas dans le contexte, dis-le clairement
- Sois concis mais complet (3-5 phrases max sauf si détails demandés)
- Structure tes réponses avec des listes à puces si pertinent
- N'utilise PAS de titres markdown (# ou ##) dans tes réponses
- Tu peux utiliser le gras (**texte**) et les listes (- item) pour structurer
- Sois amical et professionnel`
        },
        ...messages.slice(-4).map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const assistantMsgId = (Date.now() + 1).toString();

      await groqService.streamChatCompletion(chatMessages, (chunk) => {
        streamingMessageRef.current += chunk;
        
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== assistantMsgId);
          return [
            ...filtered,
            {
              id: assistantMsgId,
              role: 'assistant',
              content: streamingMessageRef.current,
              timestamp: new Date(),
            },
          ];
        });
      });

      setIsStreaming(false);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      toast.error('Erreur de communication');
      setMessages((prev) => prev.filter((m) => m.role !== 'assistant' || m.content));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 bg-gradient-to-r from-primary to-secondary"
        title="Ouvrir Gaia AI"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-80 shadow-2xl border-2 border-primary/20">
          <CardHeader className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Gaia AI</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-[420px] h-[600px] shadow-2xl border-2 border-primary/20 flex flex-col">
        <CardHeader className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Gaia AI</CardTitle>
                <CardDescription className="text-xs">
                  {context ? 'Assistant intelligent' : 'Chargement...'}
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
          {error && (
            <Alert variant="destructive" className="m-4 mb-0">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mb-3 opacity-50" />
                <p className="text-sm font-medium">Bonjour ! Je suis Gaia AI</p>
                <p className="text-xs mt-2 max-w-xs">
                  Posez-moi des questions sur le Projet Gaia, sa documentation ou sa roadmap.
                </p>
              </div>
            ) : (
              <div>
                {messages.map((message) => (
                  <ChatMessageBubble
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    isStreaming={
                      isStreaming &&
                      message.role === 'assistant' &&
                      message.id === messages[messages.length - 1]?.id
                    }
                  />
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="border-t p-4 flex-shrink-0 bg-background">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={!context ? 'Chargement...' : 'Votre question...'}
                disabled={isLoading || !context}
                rows={2}
                className="resize-none text-sm"
                lang="fr"
                spellCheck={true}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !context || !input.trim()}
                size="icon"
                className="h-full w-10 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
