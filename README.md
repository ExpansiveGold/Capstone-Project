# Project Proposal
## Project Title:
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

