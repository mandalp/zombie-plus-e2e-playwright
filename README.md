# Zombie Plus E2E Testing Project

## About

This project is part of the Playwright course from [QAXperience](https://qaxperience.com) and was developed to demonstrate automated end-to-end tests using the Playwright tool. The project focuses on functional and web automation tests for the Zombie Plus application, applying software quality best practices with database integration and API testing.

### AI-Generated TV Shows Module

The TV Shows test suite was generated using Generative AI (Cascade AI Assistant), which significantly accelerated the initial development process. However, this approach presented unique challenges that required extensive manual adjustments and debugging:

**Key Learnings from AI-Assisted Test Development:**

- **Initial Speed vs. Refinement Time**: While AI generated the initial test structure quickly, the debugging and refinement process still required significant effort due to:
  - Incorrect selectors and element locators
  - Differences between expected and actual application behavior
  - API integration issues, especially around field naming and multipart payloads
  - Test isolation challenges during parallel execution

- **Playwright's Debugging Power**: The framework was invaluable for identifying and resolving issues through:
  - Detailed error messages and stack traces
  - Visual debugging with screenshots, videos, and traces
  - Network request monitoring
  - Element inspection capabilities

- **Parallel Execution Challenges**: Playwright's parallel execution provides strong runtime benefits, but requires careful attention to:
  - Test data isolation between workers
  - Database state management
  - Race conditions in setup and teardown
  - Shared resource conflicts

**Critical Insight**: The AI-generated code provided a strong starting point, but human expertise was essential for understanding the real application behavior, identifying edge cases, and improving test reliability. The combination of AI assistance, human judgment, and Playwright's debugging tools resulted in an efficient development workflow.

## Technologies

- **Playwright** (^1.58.2) - End-to-end test automation framework
- **Node.js** - JavaScript runtime environment
- **@faker-js/faker** (^10.4.0) - Fake test data generation
- **PostgreSQL** (^8.20.0) - Database integration for testing
- **@types/node** (^25.5.0) - TypeScript definitions for Node.js

## How to Run

### Prerequisites

- Node.js installed
- NPM or Yarn
- PostgreSQL database running on localhost:5432 with database 'zombieplus'

### Install Dependencies

```bash
npm install
```

### Running Tests

To run all tests:
```bash
npx playwright test
```

To run tests in headed mode (with graphical interface):
```bash
npx playwright test --headed
```

To run tests on a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

To view the HTML test report:
```bash
npx playwright show-report
```

### GitHub Actions CI/CD

This project includes automated E2E testing with GitHub Actions that runs the complete application stack.

#### Workflow Features

- **Automatic Execution**: Runs on push and pull requests to `main` branch
- **Full Stack**: Starts PostgreSQL, API, and Web application
- **Service Health**: Waits for services to be ready before running tests
- **Parallel Execution**: Runs tests with single worker to avoid database conflicts
- **Artifact Upload**: Always uploads test results, reports, and application logs

#### Workflow Steps

1. **Setup**: Ubuntu latest with Node.js 18
2. **Database**: PostgreSQL 15 container with health checks
3. **Dependencies**: Installs app, API, and test dependencies
4. **Browsers**: Installs Playwright browsers with system dependencies
5. **Application**: Starts API (`npm run dev`) and Web (`npm run dev`) services
6. **Health Check**: Waits for `localhost:3333` and `localhost:3000` to be ready
7. **Tests**: Runs E2E tests with `--workers=1`
8. **Artifacts**: Uploads `playwright-report`, `test-results`, and application logs

#### Viewing Test Results

1. Go to **Actions** tab in your GitHub repository
2. Click on the workflow run
3. Download artifacts:
   - **playwright-report**: HTML test report with screenshots and traces
   - **test-results**: Individual test artifacts (screenshots, videos)
   - **api-logs**: API server logs
   - **web-logs**: Web server logs

#### Local Development

To run tests locally:

```bash
# Start the application
cd zombieplus/api && npm run dev &
cd zombieplus/web && npm run dev &

# Run tests
npm test
```

#### Workflow Badge

![E2E Tests](https://github.com/qaxperience-education/zombieplus-playwright/actions/workflows/e2e.yml/badge.svg)

### Project Structure

```
tests/
  e2e/                  # End-to-end test specifications
    leads.spec.js       # Lead management tests
    login.spec.js       # Authentication tests
    movies.spec.js      # Movie management tests
    tvshows.spec.js     # TV Shows management tests (AI-generated)
  support/              # Support files and configurations
    actions/            # Page Object Model actions
      Components.js     # Reusable component actions
      Leads.js          # Lead-specific actions
      Login.js          # Login-specific actions
      Movies.js         # Movie-specific actions
      TVShows.js        # TV Shows-specific actions (AI-generated)
    api/                # API integration helpers
      index.js          # API request utilities (Leads, Movies, TV Shows)
    fixtures/           # Test data fixtures
      covers/           # Image assets for test data
        movies/         # Movie cover images
        tvshows/        # TV Shows cover images
      movies.json       # Movie test data
      tvshows.json      # TV Shows test data (AI-generated)
    database.js         # Database connection and SQL execution
    index.js            # Test setup and custom fixtures
```

### Test Coverage

The project includes comprehensive test coverage for:

- **Authentication**: Login validation, credential testing
- **Lead Management**: 
  - Public registration via UI with validation
  - Admin management with CRUD operations
  - Search functionality by email
  - Duplicate prevention and data validation
- **Movie Management**: CRUD operations, search, featured content
- **TV Shows Management**: Complete CRUD with seasons field, search, validation (AI-generated)

**TV Shows Test Suite Features:**
- Complete CRUD operations via UI and API
- Season-specific field validation (numeric input)
- Search functionality with multiple results
- Featured content verification
- Duplicate prevention
- Blank field validation
- Database isolation for test reliability

**Leads Test Suite Features:**
- Public registration with form validation
- Admin management with full CRUD operations
- Search functionality by email
- Data validation and duplicate prevention
- API integration for test data setup
- Database isolation for test reliability

## About the Author

**Amanda Lopes**
QA Engineer with experience in functional, exploratory, UI and API testing, focused on automation, test strategy, and delivering high-quality software through reliable and maintainable test solutions.

**LinkedIn:** https://www.linkedin.com/in/mandalps
