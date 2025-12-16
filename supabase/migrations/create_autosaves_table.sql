-- Create autosaves table for storing temporary drafts
-- This table stores autosaved content for various entity types (roadmap, documentation, tasks, sponsors)
-- Autosaves are automatically cleaned up when content is published/saved

CREATE TABLE IF NOT EXISTS autosaves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('roadmap', 'documentation', 'task', 'sponsor')),
  entity_id TEXT,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Unique constraint: one autosave per user per entity
  -- NULLS NOT DISTINCT ensures that multiple NULL entity_ids are treated as the same value
  UNIQUE NULLS NOT DISTINCT (entity_type, entity_id, user_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_autosaves_user_entity ON autosaves(user_id, entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_autosaves_updated_at ON autosaves(updated_at);

-- Enable Row Level Security
ALTER TABLE autosaves ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own autosaves
CREATE POLICY "Users can view their own autosaves"
  ON autosaves FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own autosaves"
  ON autosaves FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own autosaves"
  ON autosaves FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own autosaves"
  ON autosaves FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_autosaves_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on every update
CREATE TRIGGER trigger_autosaves_updated_at
  BEFORE UPDATE ON autosaves
  FOR EACH ROW
  EXECUTE FUNCTION update_autosaves_updated_at();

-- Optional: Function to clean up old autosaves (older than 7 days)
CREATE OR REPLACE FUNCTION cleanup_old_autosaves()
RETURNS void AS $$
BEGIN
  DELETE FROM autosaves
  WHERE updated_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Note: To run the cleanup function periodically, you can use pg_cron or a scheduled job
-- Example: SELECT cleanup_old_autosaves();
