Final-Project-_MIC
=========

This repository contains codes and packs for final project in 6150 class.

## Project About

This project is about a web application for movie review and collection website where users can register and login to their account, also search, filter, and view all the movies. Additionally, users can use the map to search theaters near them, and even share movie info on the social media of their choice.

This project uses "mongoDB", "NodeJS" on back end, and "Angular Cli 6" on the front end.


## User Stories
1. Homepage, register, and login:

-- As a new user to the website, I will click the "Register" button and start finishing the steps to register an account for myself.

-- As an old user, I will click the "Login" button and input my email and password to login and start browsing the movies.

-- As an old user who just moved to a new address or changed a new phone number, I can click the "Edit User Info" button and modify my informations.

-- As an old user who wants to set a new password, I can click the "Change Password" button to update my login password.

2. Filtering movies

-- Upon completion of this part of the web app, the users are allowed to either find movies by searching the name of the move directly, or use the navigation bar to filter out the movies from the mongoDB database

-- As a person who go on to this website for the first time and don't know what are the movies out there, I can familiarize myself with with all the movies available under the "All" tag

-- As a person who always has a taste in movie and want to see what are movies out there that suits me, I would filter out movies by selecting horror(genre) to see what are the the horror movies.

-- As a person who wants to check out a movie say recommended by a friend, I would directly search that movie by its name on this app to see the availability and detailed info

-- With this functionality, users will be able to get the first-handed information about the movie industries

3. Viewing movie details

-- After finding the movie that the users interested, they can click the movie, then the website would show more details of the movie they choose, such as directer, stars, rating.

-- As a person who haven't seen the movie and still interested, I can click the heart shape hollow button to put the movie into my collection. Also, after I clicking the button, the hollow button will become a red solid button. After that, I can go to the account where has the collection of the interested movie.

-- As a person who already added the movie into the collection, I can move the movie out of my collection by clicking the solid button, the button will become hollow button. 

-- Users can know more about the movie they are interested and collect them into the list which they can watch afterward.

4. Collection management

--As a person who can login successfully, I can see a button named "Like list" on the top bar, so that I can enter into my collection main page by clicking it.

--As a user who has already, collect any movie, and has in the collection main page, page will show marked movies. 

--As a user who sees the movie list in one collection , I can remove movies by click on"-" button near the movie item, so I can manage my list as my wish.

5. Google Map

--As a user who is trying to see a movie in the theater, I can type in my address in the box and click "Find my location" to see where I am on the map, then I can click "Find theater" button to search the theater which is nearest to me.

6. Search function

--As a user who is a guest or login user, I can see the search button on the left of top bar.I click so I can enter the search page which contains input field and button.

--After I entered the keyword, I click the search button on the right so that I would see the search result on the below.

--As a user who just searched, I can click on the item and go to the detail page.

7. Share 

--As a user who come to this homepage, I can see the share module. if I click on that, I would see the windows to login social media, and then I can comment on the text field and share with my friend in social media, via facebook and twitter.




## Domain model

![Diagram](https://github.com/neu-mis-info6150-fall-2018/final-project-_mic/blob/master/DDD_MIC.svg)


## Quick Start

"# clone the repo"

	"git clone https://github.com/neu-mis-info6150-fall-2018/final-project-_mic.git"
	

"# Setup server with mongoDB"

	"cd dataServer"
	"yarn || npm i"
	"yarn dev || npm run dev"

"# Setup and run Angular UI"

	"cd movieUI"
	"yarn || npm i"
	"yarn dev || npm run dev"


Navigate to http://localhost:4200/ in your browser to start the web


## Acknowledgments

* W3Schools

* Stackoverflow

* EGGJS

* TypeScript

* Angular Cli

------ Creat and update by Xuhang Liu， Zhe Xu，Hsiang-Hua Chen, Yuhuizi Rao -------
