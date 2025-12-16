-- Add display_order column to roadmap_entries table
-- This column allows administrators to control the order in which roadmap items appear on the public page
-- Higher numbers appear first (top of the page), lower numbers appear last (bottom of the page)

-- Add the display_order column (defaults to 0 for existing records)
ALTER TABLE roadmap_entries 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create an index for better performance when sorting by display_order
CREATE INDEX IF NOT EXISTS idx_roadmap_entries_display_order ON roadmap_entries(display_order DESC, created_at DESC);

-- Update existing records to have sequential display_order values based on creation date
-- Most recent items get higher numbers (appear first)
WITH ordered_items AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as new_order
  FROM roadmap_entries
)
UPDATE roadmap_entries r
SET display_order = o.new_order
FROM ordered_items o
WHERE r.id = o.id;
