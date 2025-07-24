import { BlogPost, BlogCategory } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 'career-transition-healthcare-to-tech',
    title: 'From Optometry to Code: My Career Transition Story',
    excerpt: 'The journey from healthcare professional to software developer - challenges, motivations, and key learnings from my career transition.',
    content: `
# From Optometry to Code: My Career Transition Story

## The Decision to Change

After years in optometry, I found myself increasingly drawn to technology and software solutions. The ForexAcuity project became my catalyst for change, showing me the exciting possibilities in software development.

## The Challenges

**Imposter Syndrome**: Starting from scratch in a new field at 30+ felt overwhelming at times.

**Time Management**: Balancing learning with existing responsibilities required careful planning.

**Technical Depth**: Moving from domain expertise to technical expertise meant starting at the bottom again.

## The Learning Path

1. **Python Fundamentals**: Started with basic programming concepts
2. **Web Development**: Learned FastAPI and React
3. **Database Design**: Understanding data modeling and optimization
4. **System Architecture**: How to build scalable applications

## Key Takeaways

- **Domain Knowledge is Valuable**: My healthcare background provides unique perspectives
- **Continuous Learning**: Technology moves fast, constant upskilling is essential
- **Community Matters**: Finding mentors and peers accelerated my progress
- **Projects Over Courses**: Building real applications teaches more than tutorials

## What's Next

Currently pursuing my MSc in Computer Science while actively seeking my first developer role. The journey continues!
    `,
    publishedDate: '2024-12-15',
    author: 'Hakim',
    category: 'career',
    tags: ['career-change', 'healthcare', 'learning', 'motivation'],
    readTime: 8,
    featured: true,
    imageUrl: '/images/blog/career-transition.jpg',
    slug: 'career-transition-healthcare-to-tech'
  },
  {
    id: 'building-forexacuity-lessons-learned',
    title: 'Building ForexAcuity: Lessons from My First Real Project',
    excerpt: 'Technical insights and lessons learned while building a real-time forex trading platform with Python, FastAPI, and React.',
    content: `
# Building ForexAcuity: Lessons from My First Real Project

## Project Overview

ForexAcuity is a real-time forex trading platform that I built to learn modern web development. The project features live market data, technical analysis, and a responsive trading interface.

## Technical Stack

- **Backend**: Python with FastAPI
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL with SQLAlchemy
- **Real-time**: WebSockets for live data
- **Deployment**: Docker containers

## Key Challenges

### 1. Real-time Data Management

Handling live forex data required learning about WebSockets and efficient data streaming.

\`\`\`python
@app.websocket("/ws/market-data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            market_data = await get_latest_market_data()
            await websocket.send_json(market_data)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("Client disconnected")
\`\`\`

### 2. Database Performance

Optimizing queries for financial data with proper indexing and caching strategies.

### 3. Frontend State Management

Managing complex state for trading interface and real-time updates.

## Lessons Learned

1. **Start Small**: Begin with MVP and iterate
2. **Test Early**: Unit tests save time in the long run
3. **Document Everything**: Future you will thank present you
4. **Performance Matters**: Optimize for user experience
5. **Security First**: Never compromise on financial data security

## What I'd Do Differently

- Implement proper error boundaries from the start
- Use TypeScript on backend as well
- Set up CI/CD pipeline earlier
- Write more comprehensive tests

The project taught me more than any tutorial could!
    `,
    publishedDate: '2024-11-28',
    author: 'Hakim',
    category: 'technical',
    tags: ['python', 'fastapi', 'react', 'websockets', 'project'],
    readTime: 12,
    featured: false,
    slug: 'building-forexacuity-lessons-learned'
  },
  {
    id: 'python-to-typescript-journey',
    title: 'From Python to TypeScript: A Developer\'s Journey',
    excerpt: 'Transitioning from Python-first development to embracing TypeScript - the challenges, benefits, and key differences.',
    content: `
# From Python to TypeScript: A Developer's Journey

## The Transition

Starting with Python's dynamic typing and moving to TypeScript's static typing system required a mindset shift.

## Key Differences

### Type Systems
- **Python**: Duck typing, runtime type checking
- **TypeScript**: Static typing, compile-time checking

### Development Experience
- **Python**: Quick prototyping, REPL-driven development
- **TypeScript**: Better IDE support, early error detection

## Benefits of TypeScript

1. **Better IntelliSense**: Autocomplete and refactoring tools
2. **Early Error Detection**: Catch mistakes before runtime
3. **Self-Documenting Code**: Types serve as documentation
4. **Easier Refactoring**: Compiler helps track changes

## Challenges Faced

- Learning complex type definitions
- Generic types and advanced patterns
- Balancing type safety with development speed

## Tips for Python Developers

1. Start with basic types, gradually add complexity
2. Use \`any\` sparingly - defeats the purpose
3. Leverage union types for flexibility
4. Embrace interfaces for object shapes

Both languages have their place in modern development!
    `,
    publishedDate: '2024-11-15',
    author: 'Hakim',
    category: 'technical',
    tags: ['python', 'typescript', 'programming', 'comparison'],
    readTime: 6,
    featured: false,
    slug: 'python-to-typescript-journey'
  },
  {
    id: 'learning-fastapi-comprehensive-guide',
    title: 'Learning FastAPI: A Comprehensive Beginner\'s Guide',
    excerpt: 'Everything I learned about FastAPI while building real applications - from basics to advanced features.',
    content: `
# Learning FastAPI: A Comprehensive Beginner's Guide

## Why FastAPI?

Coming from other Python web frameworks, FastAPI stood out for its:
- Automatic API documentation
- Type hints integration
- High performance
- Modern Python features

## Getting Started

### Basic Setup
\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
\`\`\`

### Request Models
\`\`\`python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    age: int

@app.post("/users/")
async def create_user(user: User):
    return user
\`\`\`

## Advanced Features

### Dependency Injection
\`\`\`python
from fastapi import Depends

def get_current_user():
    return {"user_id": 1}

@app.get("/protected")
async def protected_route(user=Depends(get_current_user)):
    return user
\`\`\`

### Background Tasks
\`\`\`python
from fastapi import BackgroundTasks

def send_email(email: str):
    # Send email logic
    pass

@app.post("/send-notification/")
async def send_notification(
    email: str, 
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_email, email)
    return {"message": "Email sent"}
\`\`\`

## Best Practices

1. **Use Type Hints**: FastAPI shines with proper typing
2. **Organize with Routers**: Split large applications
3. **Handle Errors Gracefully**: Use HTTP exceptions
4. **Document Everything**: FastAPI generates docs automatically
5. **Test Thoroughly**: Use TestClient for API testing

## Common Pitfalls

- Forgetting async/await patterns
- Not handling CORS properly
- Ignoring request validation
- Poor error handling

FastAPI has become my go-to choice for Python APIs!
    `,
    publishedDate: '2024-10-30',
    author: 'Hakim',
    category: 'technical',
    tags: ['fastapi', 'python', 'api', 'tutorial', 'web-development'],
    readTime: 10,
    featured: false,
    slug: 'learning-fastapi-comprehensive-guide'
  },
  {
    id: 'developer-tools-productivity-setup',
    title: 'My Developer Productivity Setup in 2024',
    excerpt: 'The tools, configurations, and workflows that maximize my productivity as a Python/JavaScript developer.',
    content: `
# My Developer Productivity Setup in 2024

## Code Editor: VS Code

### Essential Extensions
- Python
- TypeScript and JavaScript Language Features
- Prettier
- ESLint
- GitLens
- Docker
- REST Client

### Key Settings
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "python.defaultInterpreterPath": "./venv/bin/python"
}
\`\`\`

## Terminal Setup

### Zsh with Oh My Zsh
- Git status in prompt
- Auto-suggestions
- Syntax highlighting

### Essential Aliases
\`\`\`bash
alias gst="git status"
alias gco="git checkout"
alias gcp="git cherry-pick"
alias ..="cd .."
alias ll="ls -la"
\`\`\`

## Python Environment

### Poetry for Dependency Management
\`\`\`bash
poetry new my-project
poetry add fastapi
poetry add --group dev pytest
\`\`\`

### Pre-commit Hooks
\`\`\`yaml
repos:
  - repo: https://github.com/psf/black
    rev: 22.3.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/isort
    rev: 5.10.1
    hooks:
      - id: isort
\`\`\`

## JavaScript/TypeScript

### Node Version Manager
\`\`\`bash
nvm install 18
nvm use 18
\`\`\`

### Package.json Scripts
\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint . --fix",
    "type-check": "tsc --noEmit"
  }
}
\`\`\`

## Database Tools

- **DBeaver**: Universal database client
- **Redis Insight**: Redis management
- **TablePlus**: Lightweight database client

## Productivity Tips

1. **Use Multiple Terminals**: Split terminal for different tasks
2. **Git Aliases**: Speed up common git operations
3. **Code Snippets**: Create templates for common patterns
4. **Keyboard Shortcuts**: Master your editor's shortcuts
5. **Documentation**: Keep notes in Obsidian

## Monitoring and Debugging

- **Sentry**: Error tracking
- **Postman**: API testing
- **Docker Desktop**: Container management

This setup has evolved over months of trial and error!
    `,
    publishedDate: '2024-10-15',
    author: 'Hakim',
    category: 'tools',
    tags: ['productivity', 'tools', 'vscode', 'git', 'docker'],
    readTime: 7,
    featured: false,
    slug: 'developer-tools-productivity-setup'
  },
  {
    id: 'msc-computer-science-journey',
    title: 'Pursuing MSc Computer Science: Mid-Journey Reflections',
    excerpt: 'Six months into my Master\'s degree - the challenges, surprises, and how it complements my practical learning.',
    content: `
# Pursuing MSc Computer Science: Mid-Journey Reflections

## Why I Chose Formal Education

While self-taught skills got me started, I wanted:
- Theoretical foundations
- Structured learning path
- Academic credibility
- Research opportunities

## Course Highlights

### Machine Learning Module
Deep dive into algorithms, mathematics, and theoretical foundations that complement my practical experience.

### Software Engineering
Formal methodologies, design patterns, and large-scale system architecture.

### Research Methods
Learning to approach problems systematically and document findings properly.

## Balancing Theory and Practice

### Advantages of Combined Approach
- Theory explains the "why" behind practical solutions
- Academic rigor improves code quality
- Research skills enhance problem-solving

### Challenges
- Time management between coursework and projects
- Academic pace vs. industry pace
- Theoretical focus vs. practical needs

## Key Learnings

1. **Mathematics Matters**: Understanding the foundations improves intuition
2. **Research Skills**: Systematic approach to learning new topics
3. **Academic Writing**: Clear communication of technical concepts
4. **Peer Learning**: Diverse perspectives from classmates

## Impact on Development Work

- Better algorithm selection and optimization
- Improved system design thinking
- Enhanced debugging and problem-solving
- Greater confidence in technical decisions

## Advice for Others

### Consider MSc If:
- You want theoretical depth
- Career goals require formal credentials
- You enjoy academic challenge
- Time and resources permit

### Skip If:
- Immediate employment is priority
- Self-directed learning works better
- Financial constraints exist
- Industry experience is more valuable

The combination of practical projects and academic study has been invaluable for my growth as a developer.
    `,
    publishedDate: '2024-09-20',
    author: 'Hakim',
    category: 'learning',
    tags: ['education', 'msc', 'computer-science', 'learning', 'career'],
    readTime: 9,
    featured: false,
    slug: 'msc-computer-science-journey'
  }
];

export const blogCategories: BlogCategory[] = [
  {
    id: 'technical',
    name: 'Technical',
    description: 'Deep dives into programming concepts, tutorials, and technical insights',
    count: blogPosts.filter(post => post.category === 'technical').length,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Career transition insights, job search tips, and professional development',
    count: blogPosts.filter(post => post.category === 'career').length,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'learning',
    name: 'Learning',
    description: 'Learning strategies, course reviews, and educational experiences',
    count: blogPosts.filter(post => post.category === 'learning').length,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Developer tools, productivity tips, and workflow optimization',
    count: blogPosts.filter(post => post.category === 'tools').length,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'reflection',
    name: 'Reflection',
    description: 'Personal reflections on the development journey and lessons learned',
    count: blogPosts.filter(post => post.category === 'reflection').length,
    color: 'from-pink-500 to-pink-600'
  }
];

export const allTags = Array.from(
  new Set(blogPosts.flatMap(post => post.tags))
).sort();