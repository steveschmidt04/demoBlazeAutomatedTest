## BlazeDemo automated test Framework

## About / Synopsis
This is an automated test framework build using testCafe and Typescript against https://www.demoblaze.com/


## Installation
TestCafe is built upon NodeJS and requires nodeJS to be installed prior to installation of test script.  nodejs can be downloaded from:  https://nodejs.org/en/

To install testCafe and associated project dependencies:
1. ) Clone repository locally
2. ) Navigate to top level project directory
3. ) execute "npm install" command from terminal, this will install a node-modules directory containing the required npm packages.


## Execution
Execution scripts are defined in package.json file and can be added upon as seen fit.  To execute a script, from the terminal execute one of the following commands:

1. ) npm run test:chrome
2. ) npm run test:chrome:headless
3. ) npm run test:ff
4. ) npm run test:edge

## Structure
- Tests are defined in the /tests directory and are associated with individual application areas. 
- I've implemented this using the page object model and have objects associated with tests located in individual classes withing the /pageObjects directory
- I've also utilized functions for commonly used actions, these are located in the /helpers/functions.ts class
- This test suite is driven by data input into two .json data files
    - data.json contains a list of all of the devices present on the site and is used to validate the contents of the homepage main categories
    - shoppingData.json contains a list of device names that are used to identify what devices should be added to the shopping cart in the shoppingCart.ts and checkout.ts test files


## Reporting
This framework utilizes testcafe-reporter-html package and outputs a HTML report of all excuted tests to the /reports directory of the project folder.  Screenshots on failures are also enabled and will be written to the /screenshots directory if failures occur. A sample report is also included in the top level of the project repository.


## Bugs found on https://www.demoblaze.com/
While developing a test suite for this application I found a handful or bugs and questionable behavior.  I've outlined them below:

1. ) I identified continuity issues between Prev/Next buttons on homepage, If a user selects a category and then clicks "next" user is brought results from all categories.  

2. ) The place order buttion is displayed on the cart page, regardless of whether or not items are in the cart.  This should be removed until items are present as it offers no function.

3. ) Only minimal validation is present on payment confirmation model, recommend adding additional validation around credit card and changing freeform entry fields to dropdowns as to limit erroneous data in the database.


## If I had more time
I was able to complete this test suite in the 8 hours allotted, however, I feel that there are several areas in which it could be improved if I were given more time.  

1. ) There are several areas in which I would have liked to create more helper functions for repetitive actions.  This would increase reusability,clean up the code and make it easier to read.

2. ) Clean up implementation of deviceDetails.ts tests, I struggled with the dataSet.forEach function and could not get my data in without re-executing the entire test.  This should be more efficient.  

3. ) Add validation points for images associate with each item

4. ) Implement steps using cucumber for better reusability and client product team understanding. This would be a large undertaking, but I believe beneficial in the long run for re-usability

5. ) Automate testing against the About us video

6. ) Add test coverage for contact us form, footer, and scrolling carousel on the homepage
