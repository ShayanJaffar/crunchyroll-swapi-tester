# Testing the Star Wars API (SWAPI)

This program tests some of the endpoints available in the Star Wars API

## Setup

This program uses Playwright as a framework for running the tests. Make sure to have NPM, Node and Playwright installed.

```bash
node -v
npm -v
npx playwright --version
```
If Playwright is not installed, install it using the following command:

```bash
npm i @playwright/test
```

If browsers are not properly installed, you can run the following command:

```bash
npx playwright install
```

## Usage

From the root directory of the project, you can run the following command to run all the tests:

```bash
npx playwright test
```

To see all the test cases as an HTML report run:

```bash
npx playwright show-report
```

## Notes

In an effort to parameterize some of the tests, some constant fields were created and exported from 'constants.ts'.

Given more time, I would have liked to create functions for all the major endpoints that could pass in the API inputs and the expected outputs as parameters.

I have also only used the People, Films, and Starships enpoints. I could extend similar tests to Planets, Species, and Vehicles but have chosen not to for the sake of time and avoiding redundancy.
