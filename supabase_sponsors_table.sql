-- Create sponsors table
CREATE TABLE IF NOT EXISTS public.sponsors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    logo_url TEXT,
    image_url TEXT,
    website_url TEXT,
    category TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_sponsors_category ON public.sponsors(category);

-- Create index on display_order for faster sorting
CREATE INDEX IF NOT EXISTS idx_sponsors_display_order ON public.sponsors(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Policy: Allow everyone to read sponsors (public page)
CREATE POLICY "Allow public read access to sponsors"
    ON public.sponsors
    FOR SELECT
    TO public
    USING (true);

-- Policy: Only authenticated users can insert sponsors
CREATE POLICY "Allow authenticated users to insert sponsors"
    ON public.sponsors
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Only authenticated users can update sponsors
CREATE POLICY "Allow authenticated users to update sponsors"
    ON public.sponsors
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy: Only authenticated users can delete sponsors
CREATE POLICY "Allow authenticated users to delete sponsors"
    ON public.sponsors
    FOR DELETE
    TO authenticated
    USING (true);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.sponsors
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert some example sponsors for testing (optional)
-- You can remove these after testing or keep them as initial data
INSERT INTO public.sponsors (name, description, category, display_order, logo_url, image_url, website_url) VALUES
    (
        'Exemple Entreprise Aéronautique',
        'Entreprise innovante dans le domaine de l''aéronautique durable, partenaire pionnier du projet GAIA.',
        'Entreprises Aéronautiques',
        1,
        NULL,
        NULL,
        'https://example.com'
    ),
    (
        'Exemple Jardinerie',
        'Jardinerie spécialisée dans les produits écologiques et la reforestation, fournisseur officiel de seedballs pour GAIA.',
        'Jardineries & Reforestation',
        2,
        NULL,
        NULL,
        'https://example.com'
    ),
    (
        'Exemple Collectivité',
        'Collectivité locale engagée dans le développement durable et la protection de l''environnement.',
        'Collectivités Locales',
        3,
        NULL,
        NULL,
        'https://example.com'
    )
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.sponsors IS 'Table storing information about project sponsors and partners';
COMMENT ON COLUMN public.sponsors.name IS 'Name of the sponsor/partner organization';
COMMENT ON COLUMN public.sponsors.description IS 'Description of the sponsor and their contribution';
COMMENT ON COLUMN public.sponsors.logo_url IS 'URL to the sponsor logo image';
COMMENT ON COLUMN public.sponsors.image_url IS 'URL to a promotional image for the sponsor';
COMMENT ON COLUMN public.sponsors.website_url IS 'URL to the sponsor website';
COMMENT ON COLUMN public.sponsors.category IS 'Category of the sponsor (e.g., Entreprises Aéronautiques)';
COMMENT ON COLUMN public.sponsors.display_order IS 'Order in which sponsors should be displayed (lower numbers first)';
