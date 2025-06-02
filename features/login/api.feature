@get-api
Feature: API testing

Scenario: API testing
  Given get all data from api 
  Then verify the response code is '200'
  