import { useEffect, useRef, useCallback } from 'react';
import { autosaveService } from '@/lib/supabase-autosave';

interface UseAutosaveOptions {
  entityType: 'roadmap' | 'documentation' | 'task' | 'sponsor';
  entityId: string | null;
  content: string;
  enabled?: boolean;
  onAutosave?: () => void;
  interval?: number; // in milliseconds, default 15000 (15 seconds)
}

/**
 * Hook to automatically save content at regular intervals
 * @param options Configuration options for autosave
 * @returns Object with saveNow and clearAutosave functions
 */
export const useAutosave = ({
  entityType,
  entityId,
  content,
  enabled = true,
  onAutosave,
  interval = 15000, // 15 seconds by default
}: UseAutosaveOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedContentRef = useRef<string>('');
  const isSavingRef = useRef<boolean>(false);

  const saveNow = useCallback(async () => {
    // Don't save if already saving or if content hasn't changed
    if (isSavingRef.current || content === lastSavedContentRef.current) {
      return;
    }

    // Don't save empty content
    if (!content || content.trim().length === 0) {
      return;
    }

    try {
      isSavingRef.current = true;
      
      const result = await autosaveService.saveAutosave({
        entity_type: entityType,
        entity_id: entityId,
        content: content,
      });

      if (result) {
        lastSavedContentRef.current = content;
        onAutosave?.();
        // Silent autosave - no toast notification to avoid interrupting the user
        console.log('Autosave successful:', entityType, entityId);
      }
    } catch (error) {
      console.error('Autosave error:', error);
      // Only show error toast if it's critical
    } finally {
      isSavingRef.current = false;
    }
  }, [entityType, entityId, content, onAutosave]);

  const clearAutosave = useCallback(async () => {
    // Clear the timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Delete the autosave from database
    try {
      await autosaveService.deleteAutosave(entityType, entityId);
      lastSavedContentRef.current = '';
      console.log('Autosave cleared:', entityType, entityId);
    } catch (error) {
      console.error('Error clearing autosave:', error);
    }
  }, [entityType, entityId]);

  const loadAutosave = useCallback(async () => {
    try {
      const autosave = await autosaveService.getAutosave(entityType, entityId);
      return autosave?.content || null;
    } catch (error) {
      console.error('Error loading autosave:', error);
      return null;
    }
  }, [entityType, entityId]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up new autosave timeout
    timeoutRef.current = setTimeout(() => {
      saveNow();
    }, interval);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, enabled, interval, saveNow]);

  return {
    saveNow,
    clearAutosave,
    loadAutosave,
  };
};
