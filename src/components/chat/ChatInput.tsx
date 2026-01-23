import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSend, 
  disabled = false, 
  placeholder = 'Posez une question sur le Projet Gaia...' 
}: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="resize-none min-h-[40px] max-h-[200px]"
        lang="fr"
        spellCheck={true}
      />
      <Button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        size="icon"
        className="h-10 w-10"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
