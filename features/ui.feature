Feature: UI Feature
    As an automation engineer
    I want to run the UI automation Feature
    So that I can make sure the UI is working as expected

    Background: Login
        Given I am able to login

    @ui @high
    Scenario: Flight search
        When I go to the "Home" page
        And I click on the "FLIGHTS" button on the "Home" page
        And I enter the following details on the "Home" page
            | Field | Value   |
            | Trip  | ONE WAY |
            | From  | DEL     |
            | To    | AMS     |
# | Depart | 2020-06-18 |