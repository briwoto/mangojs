Feature: Testing API
    Writing description is optional
    As a demo user
    I want to run API cases
    So that I can verify APIs

    Background: Getting auth token
        Given I am able to login

    @api @high
    Scenario: Create user
        When I create the following user
            | Field | Value    |
            | name  | John Doe |
            | job   | Tester   |
        Then a user should be created with the following details
            | Field | Value    |
            | name  | John Doe |
            | job   | Tester   |