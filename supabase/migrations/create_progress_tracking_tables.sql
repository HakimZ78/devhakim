-- Create progress categories table
CREATE TABLE IF NOT EXISTS progress_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create progress items table
CREATE TABLE IF NOT EXISTS progress_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES progress_categories(id) ON DELETE CASCADE,
  skill VARCHAR(255) NOT NULL,
  current_level INTEGER DEFAULT 0 CHECK (current_level >= 0 AND current_level <= 100),
  target_level INTEGER DEFAULT 100 CHECK (target_level >= 0 AND target_level <= 100),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  evidence TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_progress_items_category_id ON progress_items(category_id);
CREATE INDEX idx_progress_categories_order ON progress_categories(order_index);
CREATE INDEX idx_progress_items_order ON progress_items(order_index);

-- Enable Row Level Security
ALTER TABLE progress_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read progress categories" ON progress_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read progress items" ON progress_items
  FOR SELECT USING (true);

-- Create update triggers for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_progress_categories
  BEFORE UPDATE ON progress_categories
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_progress_items
  BEFORE UPDATE ON progress_items
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();