-- Insert only projects that don't already exist (check by slug)
-- This prevents duplicate key errors

-- 1. FastAPI Task Manager (Planning)
INSERT INTO projects (
  slug, title, description, category, technologies, highlights,
  live_url, image_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, challenges, key_learnings,
  future_enhancements, order_index
)
SELECT 
  'fastapi-task-manager',
  'FastAPI Task Manager',
  'A RESTful task management API built with FastAPI, featuring user authentication, task CRUD operations, and data validation.',
  'learning',
  ARRAY['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Pydantic', 'JWT'],
  ARRAY['OpenAPI documentation generation', 'Async database operations', 'Comprehensive test coverage'],
  NULL,
  '/images/projects/task-manager-preview.jpg',
  false,
  '2025-03-01',
  'beginner',
  'planning',
  'This project aims to build a robust task management API using FastAPI, focusing on modern Python development practices and API design principles. The project will serve as a foundation for learning advanced backend concepts and API development.',
  'Many task management solutions are either too complex for simple use cases or lack proper API design. This project addresses the need for a clean, well-documented API that follows RESTful principles and modern authentication patterns.',
  'The planned solution involves creating a FastAPI application with user authentication, CRUD operations for tasks, proper data validation using Pydantic models, and comprehensive API documentation. The focus will be on code quality, testing, and following Python best practices.',
  '[{"title": "API Design and Documentation", "description": "Creating intuitive API endpoints with comprehensive documentation that serves both developers and end users.", "solution": "Utilize FastAPI''s automatic OpenAPI generation and create detailed endpoint descriptions with example requests and responses."}, {"title": "Authentication Implementation", "description": "Implementing secure JWT-based authentication while keeping the API accessible for testing.", "solution": "Create a flexible authentication system with proper token management and optional authentication for certain endpoints."}, {"title": "Database Design", "description": "Designing a scalable database schema that supports future features without major refactoring.", "solution": "Use SQLAlchemy with migrations to create a flexible schema that can evolve with the application."}]'::jsonb,
  ARRAY['FastAPI framework fundamentals', 'Async programming in Python', 'API design best practices', 'JWT authentication patterns', 'SQLAlchemy ORM usage'],
  ARRAY['WebSocket support for real-time updates', 'Task sharing and collaboration features', 'Email notifications', 'Advanced filtering and search', 'Rate limiting and caching'],
  4
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'fastapi-task-manager');

-- 2. Healthcare Data Management API (Planning)
INSERT INTO projects (
  slug, title, description, category, technologies, highlights,
  live_url, image_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, challenges, key_learnings,
  future_enhancements, order_index
)
SELECT
  'healthcare-data-api',
  'Healthcare Data Management API',
  'A HIPAA-compliant healthcare data management system focusing on patient records, appointment scheduling, and secure data handling.',
  'business',
  ARRAY['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'JWT'],
  ARRAY['HIPAA compliance features', 'Encrypted data storage', 'Audit logging system', 'Role-based access control'],
  NULL,
  '/images/projects/healthcare-api-preview.jpg',
  false,
  '2025-04-01',
  'intermediate',
  'planning',
  'This project plans to create a healthcare data management API that prioritizes security, compliance, and data integrity. Drawing from my healthcare background, it will address real-world needs for patient data management while maintaining strict privacy standards.',
  'Healthcare providers need secure, compliant systems for managing patient data, but many existing solutions are either too expensive or don''t adequately address privacy requirements. There''s a need for a well-designed API that balances functionality with strict security measures.',
  'The solution will involve building a Node.js/Express API with MongoDB for flexible document storage, implementing encryption at rest and in transit, comprehensive audit logging, and role-based access control. The system will be designed with HIPAA compliance in mind from the ground up.',
  '[{"title": "HIPAA Compliance", "description": "Ensuring all aspects of the system meet HIPAA requirements for patient data handling.", "solution": "Implement comprehensive encryption, access controls, audit logging, and data retention policies according to HIPAA guidelines."}, {"title": "Data Security", "description": "Protecting sensitive patient information from unauthorized access or breaches.", "solution": "Use industry-standard encryption, implement proper authentication and authorization, and regular security audits."}, {"title": "Performance at Scale", "description": "Maintaining fast response times as the dataset grows with thousands of patient records.", "solution": "Implement efficient database indexing, caching strategies with Redis, and pagination for large datasets."}]'::jsonb,
  ARRAY['Healthcare data regulations', 'Security best practices', 'MongoDB schema design', 'Audit logging systems', 'RBAC implementation'],
  ARRAY['FHIR standard compliance', 'Integration with existing EHR systems', 'Advanced analytics dashboard', 'Mobile app support', 'Automated compliance reporting'],
  5
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'healthcare-data-api');

-- 3. E-commerce Platform MVP (Planning)
INSERT INTO projects (
  slug, title, description, category, technologies, highlights,
  live_url, image_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, challenges, key_learnings,
  future_enhancements, order_index
)
SELECT
  'ecommerce-platform',
  'E-commerce Platform for Small Business',
  'A complete e-commerce solution built with Next.js and Stripe, featuring product management, cart functionality, and secure payments.',
  'business',
  ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma'],
  ARRAY['Stripe payment integration', 'Admin dashboard', 'Inventory management', 'Mobile-responsive design'],
  NULL,
  '/images/projects/ecommerce-preview.jpg',
  false,
  '2025-05-01',
  'intermediate',
  'planning',
  'This project aims to create a complete e-commerce platform tailored for small businesses, focusing on essential features while maintaining simplicity and ease of use. The platform will demonstrate full-stack development skills and business application design.',
  'Small businesses often struggle with expensive e-commerce solutions that include features they don''t need, or simple solutions that lack essential functionality. There''s a need for a balanced approach that provides core e-commerce features without unnecessary complexity.',
  'The planned solution includes a Next.js frontend with TypeScript for type safety, PostgreSQL for reliable data storage, Stripe for secure payment processing, and an intuitive admin dashboard for business owners to manage their products and orders efficiently.',
  '[{"title": "Payment Integration", "description": "Implementing secure payment processing while maintaining PCI compliance.", "solution": "Use Stripe''s hosted checkout to handle sensitive payment data securely without storing it on our servers."}, {"title": "Inventory Management", "description": "Creating a system that accurately tracks stock levels across multiple product variants.", "solution": "Implement real-time inventory tracking with PostgreSQL transactions to prevent overselling."}, {"title": "Performance Optimization", "description": "Ensuring fast page loads even with hundreds of products and images.", "solution": "Implement image optimization, lazy loading, and efficient database queries with proper indexing."}]'::jsonb,
  ARRAY['Payment gateway integration', 'E-commerce best practices', 'Inventory system design', 'Admin panel development', 'PostgreSQL optimization'],
  ARRAY['Multi-vendor support', 'Advanced analytics', 'Email marketing integration', 'Loyalty program', 'International shipping'],
  6
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'ecommerce-platform');

-- 4. Crypto Price Tracker (Planning)
INSERT INTO projects (
  slug, title, description, category, technologies, highlights,
  live_url, image_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, challenges, key_learnings,
  future_enhancements, order_index
)
SELECT
  'crypto-tracker',
  'Cryptocurrency Portfolio Tracker',
  'A real-time cryptocurrency portfolio tracking application with price alerts, portfolio analytics, and market data visualization.',
  'fintech',
  ARRAY['React', 'Node.js', 'WebSockets', 'Redis', 'Chart.js', 'CoinGecko API'],
  ARRAY['Real-time price updates', 'Portfolio performance analytics', 'Price alert system', 'Interactive charts'],
  NULL,
  '/images/projects/crypto-tracker-preview.jpg',
  false,
  '2025-06-01',
  'beginner',
  'planning',
  'This project plans to create a personal cryptocurrency portfolio tracking application that helps users monitor their investments, track performance, and stay informed about market movements. The focus will be on clean data visualization and user-friendly interfaces.',
  'Crypto investors often use multiple exchanges and wallets, making it difficult to get a comprehensive view of their portfolio performance. Existing solutions are either too complex or lack the specific features that individual investors need.',
  'The solution will include real-time price tracking using WebSocket connections, portfolio analytics with performance metrics, customizable price alerts, and interactive charts for visualizing market trends. The application will aggregate data from multiple sources for accuracy.',
  '[{"title": "Real-time Data Handling", "description": "Managing continuous streams of price data without overwhelming the system.", "solution": "Implement efficient WebSocket connections with rate limiting and data aggregation to prevent excessive API calls."}, {"title": "Data Accuracy", "description": "Ensuring price data accuracy when aggregating from multiple sources.", "solution": "Implement a weighted average system for price data and fallback mechanisms for API failures."}, {"title": "Performance Visualization", "description": "Creating meaningful visualizations that help users understand their portfolio performance.", "solution": "Use Chart.js to create interactive, responsive charts with customizable time ranges and metrics."}]'::jsonb,
  ARRAY['WebSocket implementation', 'Real-time data processing', 'Chart.js visualization', 'API integration patterns', 'Redis caching strategies'],
  ARRAY['Mobile app version', 'Tax reporting features', 'DeFi integration', 'Social features', 'Automated trading strategies'],
  7
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'crypto-tracker');

-- 5. Healthcare AI Assistant (Planning)
INSERT INTO projects (
  slug, title, description, category, technologies, highlights,
  live_url, image_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, challenges, key_learnings,
  future_enhancements, order_index
)
SELECT
  'healthcare-ai-assistant',
  'AI-Powered Healthcare Information Assistant',
  'An intelligent chatbot providing reliable health information, symptom checking, and healthcare guidance with appropriate disclaimers.',
  'personal',
  ARRAY['Python', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'Redis', 'Docker'],
  ARRAY['Natural language processing', 'Medical knowledge base', 'Disclaimer system', 'Conversation history'],
  NULL,
  '/images/projects/ai-chatbot-preview.jpg',
  false,
  '2025-07-01',
  'advanced',
  'planning',
  'This project aims to explore AI applications in healthcare by creating an intelligent assistant that can provide basic health information and guidance. Drawing from my healthcare background, it will focus on responsible AI implementation with proper disclaimers and limitations.',
  'People often seek health information online but struggle to find reliable, accessible sources. While AI can help provide information, it must be implemented responsibly with clear limitations and proper medical disclaimers to avoid providing medical advice.',
  'The solution will use OpenAI''s GPT models with careful prompt engineering to provide helpful health information while clearly stating limitations. It will include a curated medical knowledge base, conversation history for context, and prominent disclaimers about not replacing professional medical advice.',
  '[{"title": "Ethical AI Implementation", "description": "Ensuring the AI provides helpful information without crossing into medical advice territory.", "solution": "Implement strict prompt engineering, clear disclaimers, and limitations on the types of questions the AI will answer."}, {"title": "Information Accuracy", "description": "Maintaining accurate and up-to-date health information in the knowledge base.", "solution": "Regular updates from trusted medical sources and verification processes for all information in the system."}, {"title": "User Safety", "description": "Protecting users from potentially harmful misinformation or delayed medical care.", "solution": "Implement emergency detection to direct users to appropriate medical services when serious symptoms are mentioned."}]'::jsonb,
  ARRAY['Responsible AI practices', 'Prompt engineering', 'Healthcare regulations', 'Knowledge base design', 'Ethical considerations'],
  ARRAY['Multi-language support', 'Voice interface', 'Integration with health devices', 'Personalized health tips', 'Telehealth integration'],
  8
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'healthcare-ai-assistant');

-- Update the DevHakim Portfolio project if it exists (change status to in-progress)
UPDATE projects 
SET status = 'in-progress',
    description = 'A comprehensive portfolio website showcasing my journey from healthcare professional to software engineer, featuring interactive project showcases and a complete admin system.',
    overview = 'This portfolio website serves as both a showcase of my technical skills and a living document of my career transition from healthcare to software engineering. Built with modern web technologies and designed with user experience in mind.',
    updated_at = now()
WHERE slug = 'portfolio';