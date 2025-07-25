-- Add the missing learning_strategy and learning_method columns to skill_focus table

ALTER TABLE skill_focus 
ADD COLUMN IF NOT EXISTS learning_strategy TEXT,
ADD COLUMN IF NOT EXISTS learning_method TEXT;