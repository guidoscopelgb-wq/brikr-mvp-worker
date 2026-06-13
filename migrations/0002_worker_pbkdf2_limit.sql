UPDATE users
SET
  password_hash = 'KniAETeyP5BGMObgwJ-7MAnx55S2u3Db7XbZFuf0PLw',
  password_iterations = 100000,
  updated_at = CURRENT_TIMESTAMP
WHERE id = 'user-owner' AND password_iterations = 150000;
