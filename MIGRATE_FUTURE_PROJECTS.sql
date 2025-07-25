-- SQL INSERT statements for projects with status 'planning' or 'in-progress'
-- Generated from projects-data.ts

-- Portfolio (status: in-progress)
INSERT INTO projects (
  id,
  slug,
  title,
  description,
  category,
  technologies,
  highlights,
  live_url,
  image_url,
  featured,
  completion_date,
  difficulty,
  status,
  overview,
  problem_statement,
  solution,
  challenges,
  key_learnings,
  future_enhancements,
  order_index
) VALUES (
  gen_random_uuid(),
  'portfolio',
  'DevHakim Portfolio',
  'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
  'personal',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
  ARRAY['Responsive design system', 'Interactive skill and timeline editing', 'localStorage persistence', 'Phase-based implementation'],
  'https://devhakim.com',
  '/images/projects/portfolio-preview.jpg',
  true,
  '2025-01-15',
  'intermediate',
  'in-progress',
  'This portfolio website serves as both a showcase of my technical skills and a living document of my career transition from healthcare to software engineering. Built with modern web technologies and designed with user experience in mind.',
  'As a career changer, I needed a platform that would effectively communicate my story, demonstrate my technical abilities, and provide evidence of my learning journey to potential employers.',
  'I created a comprehensive portfolio with interactive elements, detailed project showcases, learning progress tracking, and a command reference system. The site demonstrates both my technical skills and my systematic approach to learning and documentation.',
  '[
    {
      "title": "Performance with Rich Animations",
      "description": "Balancing engaging animations with fast loading times and smooth performance.",
      "solution": "Used Framer Motion for optimized animations, implemented lazy loading for images, and used code splitting to reduce initial bundle size."
    },
    {
      "title": "Data Persistence Without Backend",
      "description": "Allowing users to customize content and persist changes without a database.",
      "solution": "Implemented localStorage with proper error handling and fallback strategies. Created a robust state management system using Zustand."
    },
    {
      "title": "Mobile-First Responsive Design",
      "description": "Ensuring excellent user experience across all device sizes and orientations.",
      "solution": "Used Tailwind CSS for systematic responsive design, tested extensively on real devices, and implemented touch-friendly interactions."
    }
  ]'::jsonb,
  ARRAY['Next.js App Router provides excellent developer experience and performance', 'TypeScript significantly improves code quality and developer confidence', 'Framer Motion is powerful but requires careful optimization for performance', 'localStorage needs proper error handling for production applications', 'User testing reveals issues that developers often miss', 'Performance budget is important even for portfolio sites'],
  ARRAY['Add blog functionality with MDX support', 'Implement dark mode with system preference detection', 'Add contact form with backend integration', 'Create downloadable resume generator', 'Add visitor analytics and insights', 'Implement progressive web app features'],
  3
);

-- FastAPI Task Manager (status: planning)
INSERT INTO projects (
  id,
  slug,
  title,
  description,
  category,
  technologies,
  highlights,
  live_url,
  image_url,
  featured,
  completion_date,
  difficulty,
  status,
  overview,
  problem_statement,
  solution,
  challenges,
  key_learnings,
  future_enhancements,
  order_index
) VALUES (
  gen_random_uuid(),
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
  '[
    {
      "title": "API Design and Documentation",
      "description": "Creating intuitive API endpoints with comprehensive documentation that serves both developers and end users.",
      "solution": "Leverage FastAPI''s automatic OpenAPI generation, implement proper HTTP status codes, and create detailed endpoint descriptions with examples."
    },
    {
      "title": "Authentication and Security",
      "description": "Implementing secure JWT-based authentication with proper token management and user session handling.",
      "solution": "Plan to use FastAPI''s security utilities, implement proper password hashing, and create middleware for token validation and refresh."
    },
    {
      "title": "Database Design and Relationships",
      "description": "Designing efficient database schema for users, tasks, and potential future features like categories or collaborators.",
      "solution": "Use SQLAlchemy ORM with proper relationship definitions, implement database migrations, and plan for scalable schema evolution."
    }
  ]'::jsonb,
  ARRAY['FastAPI provides excellent developer experience with automatic documentation', 'Pydantic models ensure type safety and data validation', 'Async/await patterns improve API performance for I/O operations', 'Proper API design requires thinking about future extensibility', 'Testing strategies for APIs differ from frontend applications', 'Database migrations and schema evolution require careful planning'],
  ARRAY['Add task categories and tagging system', 'Implement task sharing and collaboration features', 'Add email notifications for task deadlines', 'Create task templates and recurring tasks', 'Add analytics and reporting endpoints', 'Implement rate limiting and API usage tracking'],
  4
);

-- Healthcare Data Management API (status: planning)
INSERT INTO projects (
  id,
  slug,
  title,
  description,
  category,
  technologies,
  highlights,
  live_url,
  image_url,
  featured,
  completion_date,
  difficulty,
  status,
  overview,
  problem_statement,
  solution,
  challenges,
  key_learnings,
  future_enhancements,
  order_index
) VALUES (
  gen_random_uuid(),
  'healthcare-api',
  'Healthcare Data Management API',
  'RESTful API for healthcare data management with secure authentication and HIPAA compliance considerations.',
  'business',
  ARRAY['Django', 'DRF', 'PostgreSQL', 'Redis', 'JWT'],
  ARRAY['HIPAA-compliant data handling patterns', 'Role-based access control system', 'Comprehensive audit trail functionality'],
  NULL,
  '/images/projects/healthcare-api-preview.jpg',
  false,
  '2025-04-01',
  'intermediate',
  'planning',
  'This project plans to create a healthcare data management API that prioritizes security, compliance, and data integrity. Drawing from my healthcare background, it will address real-world needs for patient data management while maintaining strict privacy standards.',
  'Healthcare providers need secure, compliant systems for managing patient data, but many existing solutions are either too expensive or don''t adequately address privacy requirements. There''s a need for a well-designed API that balances functionality with strict security measures.',
  'The planned solution involves building a Django REST Framework API with role-based access control, comprehensive audit logging, and data encryption. The system will implement HIPAA-compliant patterns while maintaining developer-friendly interfaces.',
  '[
    {
      "title": "HIPAA Compliance Implementation",
      "description": "Ensuring all data handling, storage, and transmission meets HIPAA requirements without over-engineering.",
      "solution": "Research and implement industry-standard encryption patterns, create comprehensive audit trails, and design proper access controls with minimal necessary access principles."
    },
    {
      "title": "Role-Based Access Control",
      "description": "Creating flexible permission systems that can handle different healthcare roles (doctors, nurses, administrators) with varying access levels.",
      "solution": "Plan to use Django''s built-in permissions system extended with custom roles, implement object-level permissions, and create middleware for role validation."
    },
    {
      "title": "Data Integrity and Audit Trails",
      "description": "Maintaining complete audit logs for all data access and modifications while ensuring system performance.",
      "solution": "Implement Django signals for automatic audit logging, use Redis for caching frequently accessed audit data, and design efficient query patterns for audit reports."
    }
  ]'::jsonb,
  ARRAY['Healthcare data requires multiple layers of security considerations', 'Django REST Framework provides robust tools for API security', 'Audit logging can significantly impact performance if not designed carefully', 'Role-based access control needs to be flexible yet secure', 'Compliance requirements should drive technical architecture decisions', 'Redis caching strategies are crucial for audit-heavy applications'],
  ARRAY['Add integration with Electronic Health Record (EHR) systems', 'Implement real-time notifications for critical patient updates', 'Add advanced reporting and analytics capabilities', 'Create mobile SDK for healthcare applications', 'Add support for medical device data integration', 'Implement automated compliance checking and reporting'],
  5
);

-- E-commerce Platform MVP (status: planning)
INSERT INTO projects (
  id,
  slug,
  title,
  description,
  category,
  technologies,
  highlights,
  live_url,
  image_url,
  featured,
  completion_date,
  difficulty,
  status,
  overview,
  problem_statement,
  solution,
  challenges,
  key_learnings,
  future_enhancements,
  order_index
) VALUES (
  gen_random_uuid(),
  'ecommerce-platform',
  'E-commerce Platform MVP',
  'A small business e-commerce solution with product catalog, shopping cart, and payment integration.',
  'business',
  ARRAY['Django', 'React', 'Stripe', 'PostgreSQL', 'Redis'],
  ARRAY['Stripe payment integration', 'Inventory management system', 'Order tracking functionality'],
  NULL,
  '/images/projects/ecommerce-preview.jpg',
  false,
  '2025-05-01',
  'intermediate',
  'planning',
  'This project aims to create a complete e-commerce platform tailored for small businesses, focusing on essential features while maintaining simplicity and ease of use. The platform will demonstrate full-stack development skills and business application design.',
  'Small businesses often struggle with expensive e-commerce solutions that include features they don''t need, or simple solutions that lack essential functionality. There''s a need for a balanced approach that provides core e-commerce features without unnecessary complexity.',
  'The planned solution involves creating a Django backend API with a React frontend, integrated with Stripe for payments. The system will focus on product management, order processing, and customer management while maintaining clean, maintainable code architecture.',
  '[
    {
      "title": "Payment Processing Security",
      "description": "Implementing secure payment flows with Stripe while handling edge cases and ensuring PCI compliance.",
      "solution": "Plan to use Stripe''s recommended integration patterns, implement proper error handling for payment failures, and create secure webhook handling for payment confirmations."
    },
    {
      "title": "Inventory Management",
      "description": "Creating a system that accurately tracks inventory across multiple sales channels and prevents overselling.",
      "solution": "Design database schemas with proper locking mechanisms, implement real-time inventory updates, and create alerting systems for low stock situations."
    },
    {
      "title": "Order Fulfillment Workflow",
      "description": "Building a complete order lifecycle from cart to delivery with proper status tracking and notifications.",
      "solution": "Create state machines for order processing, implement email notifications for status updates, and design admin interfaces for order management."
    }
  ]'::jsonb,
  ARRAY['E-commerce applications require careful consideration of data consistency', 'Payment processing involves many edge cases that must be handled properly', 'User experience is crucial for conversion rates in e-commerce', 'Inventory management is more complex than it initially appears', 'Email notifications and order tracking significantly improve customer satisfaction', 'Admin interfaces are as important as customer-facing features'],
  ARRAY['Add multi-vendor marketplace functionality', 'Implement advanced product recommendations', 'Add support for digital product delivery', 'Create mobile app for better user experience', 'Add social media integration for marketing', 'Implement advanced analytics and reporting dashboard'],
  6
);

-- Crypto Price Tracker (status: planning)
INSERT INTO projects (
  id,
  slug,
  title,
  description,
  category,
  technologies,
  highlights,
  live_url,
  image_url,
  featured,
  completion_date,
  difficulty,
  status,
  overview,
  problem_statement,
  solution,
  challenges,
  key_learnings,
  future_enhancements,
  order_index
) VALUES (
  gen_random_uuid(),
  'crypto-tracker',
  'Crypto Price Tracker',
  'Personal cryptocurrency portfolio tracker with real-time price updates and profit/loss calculations.',
  'personal',
  ARRAY['React', 'Node.js', 'Express', 'CoinGecko API', 'Chart.js'],
  ARRAY['Real-time price data integration', 'Portfolio performance analytics', 'Price alert notifications'],
  NULL,
  '/images/projects/crypto-tracker-preview.jpg',
  false,
  '2025-06-01',
  'beginner',
  'planning',
  'This project plans to create a personal cryptocurrency portfolio tracking application that helps users monitor their investments, track performance, and stay informed about market movements. The focus will be on clean data visualization and user-friendly interfaces.',
  'Crypto investors often use multiple exchanges and wallets, making it difficult to get a comprehensive view of their portfolio performance. Existing solutions are either too complex or lack the specific features that individual investors need.',
  'The planned solution involves creating a React application with a Node.js backend that integrates with cryptocurrency APIs to provide real-time pricing data, portfolio tracking, and performance analytics. The system will focus on simplicity and clear data presentation.',
  '[
    {
      "title": "Real-time Data Management",
      "description": "Handling frequent price updates efficiently without overwhelming the user interface or exceeding API rate limits.",
      "solution": "Plan to implement WebSocket connections for real-time updates, use intelligent caching strategies, and create efficient data update mechanisms that only refresh when necessary."
    },
    {
      "title": "Data Visualization",
      "description": "Creating clear, informative charts and graphs that help users understand their portfolio performance and market trends.",
      "solution": "Use Chart.js for creating responsive, interactive charts. Design clean interfaces that highlight important information without overwhelming users with too much data."
    },
    {
      "title": "Portfolio Calculations",
      "description": "Accurately calculating portfolio values, profit/loss, and performance metrics across different cryptocurrencies and time periods.",
      "solution": "Implement robust calculation logic that handles different purchase dates and amounts, create proper data models for tracking transactions, and ensure accuracy in all financial calculations."
    }
  ]'::jsonb,
  ARRAY['Real-time applications require careful consideration of update frequencies', 'Financial calculations demand high precision and thorough testing', 'Data visualization should prioritize clarity over complexity', 'API rate limiting requires intelligent caching and update strategies', 'User experience in financial applications requires trust and reliability', 'Performance optimization is crucial for real-time data applications'],
  ARRAY['Add support for multiple exchanges and wallets', 'Implement advanced portfolio analytics and insights', 'Add news feed integration for market updates', 'Create mobile app for portfolio monitoring on the go', 'Add social features for sharing portfolio performance', 'Implement automated trading integration with exchange APIs'],
  7
);

-- Healthcare AI Assistant (status: planning)
INSERT INTO projects (
  id,
  slug,
  title,
  description,
  category,
  technologies,
  highlights,
  live_url,
  image_url,
  featured,
  completion_date,
  difficulty,
  status,
  overview,
  problem_statement,
  solution,
  challenges,
  key_learnings,
  future_enhancements,
  order_index
) VALUES (
  gen_random_uuid(),
  'healthcare-ai',
  'Healthcare AI Assistant',
  'AI-powered chatbot for basic healthcare information using OpenAI API with healthcare domain knowledge.',
  'learning',
  ARRAY['Python', 'OpenAI API', 'Streamlit', 'LangChain', 'Pinecone'],
  ARRAY['Healthcare-specific knowledge base', 'Conversational AI interface', 'Vector database integration'],
  NULL,
  '/images/projects/ai-chatbot-preview.jpg',
  false,
  '2025-07-01',
  'advanced',
  'planning',
  'This project aims to explore AI applications in healthcare by creating an intelligent assistant that can provide basic health information and guidance. Drawing from my healthcare background, it will focus on responsible AI implementation with proper disclaimers and limitations.',
  'People often seek health information online but struggle to find reliable, accessible sources. While AI can help provide information, it must be implemented responsibly with clear limitations and proper medical disclaimers to avoid providing medical advice.',
  'The planned solution involves creating a Streamlit application powered by OpenAI''s API and LangChain, with a curated healthcare knowledge base stored in Pinecone vector database. The system will provide information while maintaining clear boundaries about what it can and cannot do.',
  '[
    {
      "title": "Responsible AI Implementation",
      "description": "Ensuring the AI provides helpful information while clearly communicating its limitations and avoiding medical advice.",
      "solution": "Plan to implement strict prompt engineering with built-in disclaimers, create content filters for inappropriate medical queries, and design clear UI elements that remind users about limitations."
    },
    {
      "title": "Healthcare Knowledge Curation",
      "description": "Building a reliable knowledge base with accurate, up-to-date healthcare information from trusted sources.",
      "solution": "Research and compile information from reputable medical sources, implement proper citation systems, and create processes for keeping information current and accurate."
    },
    {
      "title": "Vector Database Optimization",
      "description": "Designing efficient vector storage and retrieval systems for healthcare knowledge that provide relevant, contextual responses.",
      "solution": "Plan to use Pinecone for vector storage, experiment with different embedding strategies, and implement relevance scoring to ensure high-quality information retrieval."
    }
  ]'::jsonb,
  ARRAY['AI applications in healthcare require extra responsibility and careful implementation', 'Vector databases open new possibilities for intelligent information retrieval', 'LangChain provides powerful tools for building AI applications', 'Prompt engineering is crucial for reliable AI behavior', 'User interface design for AI applications requires clear communication of capabilities', 'Healthcare AI must balance helpfulness with appropriate limitations'],
  ARRAY['Add multilingual support for broader accessibility', 'Implement more sophisticated medical reasoning capabilities', 'Add integration with wearable device data for personalized insights', 'Create specialized modules for different health conditions', 'Add voice interface for improved accessibility', 'Implement feedback mechanisms for continuous improvement'],
  8
);