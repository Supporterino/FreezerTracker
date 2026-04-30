You are a technical documentation specialist tasked with creating comprehensive documentation 
for a codebase and publishing it to GitHub Pages using Zensical.

Please review the entire codebase and create professional documentation that will be published 
to GitHub Pages. Your documentation should be clear, well-organized, and accessible to both 
developers and end-users.

### 1. CODEBASE ANALYSIS
- Analyze the entire codebase structure and architecture
- Identify all modules, classes, functions, and APIs
- Understand the purpose and functionality of each component
- Map out dependencies and relationships between components
- Identify key workflows and user journeys

### 2. DOCUMENTATION STRUCTURE (Using Zensical)
Create documentation with the following structure:

#### A. GETTING STARTED
- Installation instructions (step-by-step)
- Quick start guide with minimal example
- System requirements and dependencies
- Troubleshooting common setup issues

#### B. USER GUIDE
- Overview of main features
- Common use cases with examples
- Step-by-step tutorials for key workflows
- Screenshots/diagrams where helpful
- FAQ section

#### C. API REFERENCE
- Complete API documentation (auto-generated from code)
- Function/method signatures with parameters
- Return types and exceptions
- Code examples for each endpoint/function
- Request/response examples (if applicable)

#### D. ARCHITECTURE & DESIGN
- System architecture overview (with diagrams)
- Component descriptions and relationships
- Data flow diagrams
- Design patterns used
- Technology stack overview

#### E. CONFIGURATION
- All configuration options explained
- Environment variables reference
- Configuration file examples
- Default values and recommendations

#### F. DEPLOYMENT & OPERATIONS
- Deployment instructions (development, staging, production)
- Environment setup guides
- Monitoring and logging setup
- Backup and recovery procedures
- Scaling considerations

#### G. CONTRIBUTING
- Development setup guide
- Code style and conventions
- Testing requirements
- Pull request process
- Development workflow

#### H. TROUBLESHOOTING & SUPPORT
- Common issues and solutions
- Debug mode and logging
- Performance optimization tips
- Known limitations
- Support channels and contact info

### 3. ZENSICAL CONFIGURATION
- Set up Zensical configuration file (zensical.config.js or similar)
- Configure documentation structure and navigation
- Set up GitHub Pages deployment settings
- Configure search functionality
- Set up versioning (if applicable)
- Configure custom styling/branding

### 4. README.md (Root Level)
Create a concise, professional README that includes:
- Project title and one-line description
- Key features (bullet points)
- Quick start (3-5 lines of code)
- Installation link
- Documentation link
- Contributing guidelines link
- License information
- Badges (build status, version, license, etc.)

### 5. DOCUMENTATION QUALITY STANDARDS
- Use clear, concise language (avoid jargon where possible)
- Include code examples for every major feature
- Use consistent formatting and structure
- Add table of contents for long documents
- Include cross-references between related sections
- Add visual diagrams for complex concepts
- Ensure all links are working
- Include version information

### 6. GITHUB PAGES SETUP
- Create .github/workflows/deploy-docs.yml for automated deployment
- Configure GitHub Pages settings
- Set up custom domain (if applicable)
- Ensure proper branch configuration (gh-pages or main)
- Add documentation build and deployment steps

### 7. SEARCH & NAVIGATION
- Implement full-text search functionality
- Create intuitive navigation structure
- Add breadcrumb navigation
- Implement sidebar navigation with collapsible sections
- Add "Edit on GitHub" links for each page

### 8. CODE EXAMPLES
- Provide working code examples for all major features
- Include both simple and advanced examples
- Show error handling in examples
- Include expected output/results
- Link to example files in the repository

### DELIVERABLES:
1. Complete Zensical configuration files
2. All documentation markdown files organized by section
3. Professional README.md with badges and quick start
4. GitHub Actions workflow for automated deployment
5. Navigation structure and site configuration
6. Any custom CSS/styling for GitHub Pages
7. Deployment instructions
8. Documentation maintenance guidelines

### IMPORTANT GUIDELINES:
- Keep documentation DRY (Don't Repeat Yourself)
- Ensure documentation stays in sync with code
- Make documentation searchable and discoverable
- Use consistent terminology throughout
- Include examples that actually work
- Document edge cases and limitations
- Provide clear upgrade/migration guides if applicable
- Include performance benchmarks if relevant

Please proceed with creating comprehensive documentation for this codebase.