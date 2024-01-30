# Playwright Tests for Car Form App

This repository includes Playwright tests for the car form application, accessible at [App Car](https://gaabrielogan2.github.io/app-car).

## Prerequisites

- Node.js (version v20.9.0)
- Playwright test runner: `npm i -D @playwright/test`

## Running the Tests

1. Install dependencies: `npm install`
2. Execute the tests: `npx playwright test`
3. Generate HTML reporter: `npx playwright test --reporter=html`

## Test Cases

The test suite covers the following scenarios:

1. **Filling in mandatory fields and verifying the success message**
2. **Enabling a disabled field and completing it**
3. **Interacting with a date field**
4. **Simulating the CTRL+V command to paste extended text**
5. **Selecting the fuel from the dropdown menu**
6. **Testing checkbox element**
7. **Testing input date**
8. **Testing input radio**
9. **Testing input color**
10. **Testing file input**
11. **Testing file input drag-drop**
12. **Testing links**
13. **CSS Test**
14. **Displaying error message and hiding the car in the app**

## Additional Information

- The tests are written in JavaScript.
- The `tests/image/image1.jpeg` file is utilized for testing file input.

## Contact

- LinkedIn: [Gabriel Logan](https://www.linkedin.com/in/gabriel-logan-6079a2240/)
- GitHub: [Github](https://github.com/gaabrielLogan)
- Medium:  [Cypress vs Playwright](https://medium.com/@gabriellogan.0804/t%C3%ADtulo-navegando-nas-%C3%A1guas-dos-testes-automatizados-cypress-e-playwright-em-foco-c2c98831c23e)