@get-api @api
Feature: API testing

  Scenario: API testing
    Given get all data from api
    Then verify the response code is '200'

  Scenario: API testing
    Given get all data from api
    Then verify the response code is '400'

  Scenario: API testing2
    Given get all data from api
    Then verify the response code is '500'

  Scenario: API testing3
    Given get all data from api
    Then verify the response code is '700'
