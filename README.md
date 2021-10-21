# GitHub Coding Test

_This project was bootstrapped with create-react-app_

## Scripts

In the project directory, you can run:

`yarn`  - to install the necessary node_modules

`yarn start`  - to run the project

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Summary of what was done

1. Build a Github client showing the latest changes for a developer
2. Add ability to do a simple search across their changes
3. Finally, give the option to mark as Read Later, and give the ability to see these items later


### 1
- Octokit was used to handle all the interactions with Github
- I am using personal access tokens to authenticate as it simplified the process a bit, so that a login page didn't have to be built and secured.
  - The tokens can be created [here](https://github.com/settings/tokens) for your gitHub account for testing
    - Tick the 'repo' option
- _I did look into GitHub's OAuth, but decided against it for this project. OAuth would probably be the ideal option in the real world though_
- GitHub only allows fetching commits per repository
- Therefore, I first fetch all repos the authenticated user has worked on and provide those as a dropdown for the user to select


### 2
- I expected to be able to search using GitHub's API/octokit, but it seems like it does not support searching by commit messages
- Therefore, the user can select how many commits they would like to retrieve at once, and a search box is provided to filter through the result received from GitHub


### 3
- Ideally this data would be persisted to a database, ready for retrieval even after the website is closed.
  
  - Storing the user's id as a reference so that different users can login and out and receive only their saved commits
  
- For this project it was stored locally on the user's device

  

### by Bernd Gevers