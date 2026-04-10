# Zombie Plus E2E Testing Project

## About

This project is part of the Playwright course from [QAXperience](https://qaxperience.com) and was developed to demonstrate automated end-to-end tests using the Playwright tool. The project focuses on functional and web automation tests for the Zombie Plus application, applying software quality best practices with database integration and API testing.

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

### Project Structure

```
tests/
  e2e/                  # End-to-end test specifications
    leads.spec.js       # Lead management tests
    login.spec.js       # Authentication tests
    movies.spec.js      # Movie management tests
  support/              # Support files and configurations
    actions/            # Page Object Model actions
      Components.js     # Reusable component actions
      Leads.js          # Lead-specific actions
      Login.js          # Login-specific actions
      Movies.js         # Movie-specific actions
    api/                # API integration helpers
      index.js          # API request utilities
    fixtures/           # Test data fixtures
    database.js         # Database connection and SQL execution
    index.js            # Test setup and custom fixtures
```

## About the Author

**Amanda Lopes**
QA Engineer with experience in functional, exploratory, UI and API testing, focused on automation, test strategy, and delivering high-quality software through reliable and maintainable test solutions.

**LinkedIn:** https://www.linkedin.com/in/mandalps
