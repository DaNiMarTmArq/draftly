USE draftly;

-- -------------------------------------------------
-- Categories
-- -------------------------------------------------
INSERT INTO categories (category_name) VALUES
  ('Technology'),
  ('Lifestyle'),
  ('Health & Wellness'),
  ('Travel');

-- -------------------------------------------------
-- Authors
-- -------------------------------------------------
INSERT INTO authors (idauthors, name, email, image_url) VALUES
  ('5a408f33-6349-4acb-a38a-cc1480a97952','Alice Johnson','alice.johnson@example.com','https://example.com/images/alice.jpg'),
  ('5439b6a7-1d4a-4559-aa49-f7af3a693c58','Brian Smith','brian.smith@example.com','https://example.com/images/brian.jpg'),
  ('7116dbc9-9ddd-4086-8fbb-93939fe46bc6','Carla Gomez','carla.gomez@example.com','https://example.com/images/carla.jpg'),
  ('f626df2d-9ff6-4adf-aea8-cf3c3bb83109','David Lee','david.lee@example.com','https://example.com/images/david.jpg'),
  ('5df6bfda-7db0-4acb-b321-47eb5ae4eb55','Eva Müller','eva.mueller@example.com','https://example.com/images/eva.jpg');

-- -------------------------------------------------
-- Posts
-- -------------------------------------------------
INSERT INTO posts (idposts, title, description, author_id, category_id) VALUES
  ('1ba30ade-347e-4d48-a2ab-2e942a52a790','Exploring Serverless Architectures','A short article about exploring serverless architectures.','5a408f33-6349-4acb-a38a-cc1480a97952',1),
  ('4aa7bfc9-bd4d-4551-ae54-c930fc00b3f4','Mindful Morning Routines for Productivity','A short article about mindful morning routines for productivity.','5439b6a7-1d4a-4559-aa49-f7af3a693c58',2),
  ('5e95ab42-4a59-4b86-b05f-bf242827f834','The Beginner''s Guide to HIIT Workouts','A short article about the beginner''s guide to hiit workouts.','7116dbc9-9ddd-4086-8fbb-93939fe46bc6',3),
  ('2e4133b6-fa70-4f47-9273-4198a0594c80','Backpacking Through Patagonia','A short article about backpacking through patagonia.','f626df2d-9ff6-4adf-aea8-cf3c3bb83109',4),
  ('74ac63fc-2275-49f7-94e5-059b5357a5d7','AI Ethics: Balancing Innovation and Responsibility','A short article about ai ethics: balancing innovation and responsibility.','5df6bfda-7db0-4acb-b321-47eb5ae4eb55',1),
  ('17e5c46f-4117-4d9e-97f0-a1d23bb642a0','10 Quick Plant-Based Lunch Recipes','A short article about 10 quick plant-based lunch recipes.','5a408f33-6349-4acb-a38a-cc1480a97952',2),
  ('099f29c3-7703-4313-bf4b-e8ae9c232efd','Remote Work: Building Team Culture Online','A short article about remote work: building team culture online.','5439b6a7-1d4a-4559-aa49-f7af3a693c58',1),
  ('1431e14f-dfa9-4717-bde3-62a0c1e003cb','Why Sleep Matters More Than You Think','A short article about why sleep matters more than you think.','7116dbc9-9ddd-4086-8fbb-93939fe46bc6',3),
  ('79970643-91d1-4cdf-82a0-268fa6a74fe5','Top 7 Budget Travel Destinations in 2025','A short article about top 7 budget travel destinations in 2025.','f626df2d-9ff6-4adf-aea8-cf3c3bb83109',4),
  ('0723d851-ca22-460e-a05e-457c1cae8c1a','Using Go for High-Performance Microservices','A short article about using go for high-performance microservices.','5df6bfda-7db0-4acb-b321-47eb5ae4eb55',1);