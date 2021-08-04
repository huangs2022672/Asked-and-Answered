# <p align="center"><img src="assets/logo.JPG" width="250"></p>

![Asked & Answered](assets/questions.JPG)

Asked & Answered is a platform to connect students with instructors for streamlining questions and answers. Built using the MERN stack (MongoDB, Express, React, Node), students can post questions/issues in the application. Instructors are primarily responsible for responding to and resolving questions. All users can view and contribute to questions. Users can search all previous questions and solutions.

# <p align="center"> [Link to the Live Site!](https://asked-and-answered.herokuapp.com) </p>


## Splash/Landing page and User Auth

<img src="./assets/splash.png">

* Upon visting Asked and Answers, users have to sign in to gain access to the homepage.
* Users can choose to sign in as an Instructor or as a Student, each account has its own unique functionalities and privileges (In-dept details below in Questions & Answers sections)
* Only students will be able to sign up for new accounts, Instructor accounts are created by the admins (us developers)
* Login page validates and rendor error messages when recevied invalid credentials


## Questions
Under the questions route, both instructors and student users have access to tabs that filter questions by their status
* Unassigned - fetches all questions that have not yet been assigned by an instructor
* Pending - displays all questions that have been assigned, but not yet resolved
* Resolved - shows all resolved questions
* My Tab
  * for students this is a list of all questions they have submitted
  * for instructors this is a list of all questions they are assigned to

![tabs](assets/tabs.JPG)

Clicking on a question splits the page with the questions gallery on the left and the selected question and associated answers on the right.

![split page](assets/split_page.JPG)

### Students
* can submit questions by entering a title and description and clicking the airplane icon.
*

### Instructors
Intructors do not have this option.



## Search

Users can search for questions based off of content contained from the question title or the question body.

<img src="./assets/searchPhoto.png" width="950">

This photo displays the search results after searching for the term "get". As you can see the search functionality looks for content contained in the title as well as in the body of each question for a match.

To accomplish this we created custom logic that filters content based off of the input from the user. We established a frontend route for a search which takes in a query from the user input. We then take the user input and create a query that filters through questions finding those that match by keywords. We then return the list of questions that meet this criteria.
