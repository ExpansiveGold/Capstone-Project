# Project Proposal
## Project Title
  *	Online Chess App

##	Problem Statement:
  *	Problem: Many users want to easily play chess with friends.

##	Brief Overview of the Application’s Functionality:
  *	The app will allow users to:
    *	Play an online match with a friend.
    *	See history of matches
    *	Rewatch played matches
    *	Watch famous matches between Pro Chess players
    *	Solve chess problems
    	
##	Technology Stack:
  *	Frontend:
    *	React.js for UI components.
    *	React Router for navigation.
    *	Styling: CSS and Bootstrap.
  *	Backend:
    *	NodeJs + Express
    *	Axios for Frontend integration
    *	Socket.IO for Realtime input from the user to play the game
    *	API: CRUD for user and admin interactions
  *	Version Control: GitHub.
    
##	Features to be Implemented:
  *	Chess Game:
    *	Make a move
    * Check if a move is valid
    * Check game state and define if it the game ended.
  *	Play an online match with a friend:
    *	Allow two people to connect through a code and play a match against each other.
  *	History of matches: 
    *	Display all the matches played by a specific player with some details (end state [win, loss, draw], color played, date, match length, opponent name).
    *	Search a match by details (end state [win, loss, draw], color played, date, opponent name)
  *	Rewatch played matches: 
    *	Allow user to select from one match in the history to replay move by move.
  *	Watch famous matches: 
    *	Like rewatch played match but for famous matches between Pro players.
  *	Solve problems: 
    *	Give user a specific board to play to win/gain advantage
  *	Admin Dashboard:
    *	Add famous match and its players
    *	Add problems to solve
    *	Ban/revoke banned users

# API Contract
## Login Page
POST /create_account

## USER PROFILE
### Configurations
GET /profile/:id  
POST /profile/:id/change_password  
DELETE /profile/:id/delete_account  

### Friend List [CRUD]
GET /profile/:id/friends_list  
POST /profile/:id/friends_list/add  
DELETE /profile/:id/friends_list/remove/:id  

### History
GET /profile/:id/history

### Match Rewatch
GET /match/rewatch/:id[match]

## ADMIN PROFILE
GET /profile/admin

### User List [CRUD]
GET /profile/admin/users/list  
POST /profile/admin/users/add  
POST /profile/admin/users/ban/:id  
DELETE /profile/admin/users/delete_account/:id

### Add Historic Matches [CRUD]
GET /profile/admin/historic_matches  
POST /profile/admin/historic_matches/add  
GET /profile/admin/historic_matches/edit/:id  
POST /profile/admin/historic_matches/edit/:id  
DELETE /profile/admin/historic_matches/:id

### Add Puzzle [CRUD]
GET /profile/admin/puzzles  
POST /profile/admin/puzzles/add  
GET /profile/admin/puzzles/edit/:id  
POST /profile/admin/puzzles/edit/:id  
DELETE /profile/admin/puzzles/:id

# Database
   MongoDB
   
## Tables
## Users
   | name | email | password | isAdmin | isBanned | creationDate |
   | ---- | ----- | -------- | ------- | -------- | -------------|
   | char | email | char(hash) | bool | bool | date |
   
## Matches
   | White | Black | Moves | Result | Date | Place |
   | ---- | ----- | -------- | ------- | -------- | -------------|
   | char | char | array | char | date | char |
   hash: [hash of all columns]
   
   
   
