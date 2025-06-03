@ui
Feature: Login functionality

  Scenario: Successful login
    Given I open the login page
    When I enter "admin" credentials
    Then I should see the dashboard

  Scenario: Successful login1
    Given I open the login page
    When I enter "admin" credentials
    Then I should not see the dashboard
