## Search

Users can search for questions based off of content contained from the question title or the question body.

<img src="searchPhoto.png" width="250">

This photo displays the search results after searching for the term "get". As you can see the search functionality looks for content contained in the title as well as in the body of each question for a match.

To accomplish this we created custom logic that filters content based off of the input from the user. We established a frontend route for a search which takes in a query from the user input. We then take the user input and create a query that filters through questions finding those that match by keywords. We then return the list of questions that meet this criteria.
