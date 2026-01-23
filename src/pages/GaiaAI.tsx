import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Bot, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { groqService, type ChatMessage as ChatMessageType } from '@/lib/groq-client';
import { gaiaContextService } from '@/lib/gaia-context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GaiaAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isStreaming]);

  const handleSendMessage = async (userMessage: string) => {
    if (!context) {
      toast.error('Le contexte n\'est pas encore chargé. Veuillez patienter.');
      return;
    }

    // Add user message
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
      // Build messages array for API
      const chatMessages: ChatMessageType[] = [
        {
          role: 'system',
          content: `Tu es Gaia AI, un assistant virtuel intelligent spécialisé dans le Projet Gaia du Lycée Saint Joseph à Dijon. 

Voici le contexte complet du projet que tu dois utiliser pour répondre aux questions:

${context}

Règles importantes:
- Réponds toujours en français
- Sois précis et utilise les informations du contexte fourni
- Si une information n'est pas dans le contexte, dis-le clairement
- Sois concis mais informatif
- Tu peux utiliser des listes et des points pour structurer tes réponses
- Sois amical et professionnel`
        },
        // Add conversation history (last 5 messages to avoid token limits)
        ...messages.slice(-5).map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      // Create a temporary message for streaming
      const assistantMsgId = (Date.now() + 1).toString();

      await groqService.streamChatCompletion(chatMessages, (chunk) => {
        streamingMessageRef.current += chunk;
        
        // Update the streaming message
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
      toast.success('Réponse reçue !');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      toast.error('Erreur lors de la communication avec Gaia AI');
      
      // Remove the streaming message if error occurred
      setMessages((prev) => prev.filter((m) => m.role !== 'assistant' || m.content));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    streamingMessageRef.current = '';
    toast.success('Conversation effacée');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    Gaia AI
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Assistant intelligent du Projet Gaia
                  </p>
                </div>
              </div>
            </div>
            
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Effacer
              </Button>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Chat Card */}
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle>Chat</CardTitle>
              <CardDescription>
                Posez vos questions sur le Projet Gaia, sa documentation, la roadmap et toutes les informations du projet.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea ref={scrollAreaRef} className="h-[500px] p-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Bot className="h-16 w-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Bienvenue sur Gaia AI !</p>
                    <p className="text-sm mt-2 max-w-md">
                      Je suis là pour vous aider avec toutes vos questions sur le Projet Gaia. 
                      Demandez-moi des informations sur la documentation, la roadmap, les fonctionnalités, 
                      ou n'importe quel aspect du projet.
                    </p>
                    {!context && (
                      <p className="text-sm mt-4 text-yellow-600">
                        Chargement du contexte...
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        role={message.role}
                        content={message.content}
                        isStreaming={isStreaming && message.id === messages[messages.length - 1]?.id}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={isLoading || !context}
                  placeholder={
                    !context
                      ? 'Chargement du contexte...'
                      : 'Posez une question sur le Projet Gaia...'
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">À propos de Gaia AI</p>
                  <p>
                    Gaia AI a accès à toute la documentation et la roadmap du Projet Gaia. 
                    Les réponses sont générées à partir des informations disponibles dans la base de données du projet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GaiaAI;
