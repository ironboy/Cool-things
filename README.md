This is an example of how we can log data about users when they make http requests, i.e. visits different pages and resources (images, rest-routes etc) on our site.

Have a look at:
1. The file **backend/logger.js** and the file **frontend/log-helper.js** to see how the code that creates logs
2. The console output in the terminal (the data that is been logged).
3. The log files that will be created in the **logs** folder.


**Note:** This also an example of a modern site that does not perform hard page reloads for different pages, instead the frontend uses JavaScript to show different pages depending on the URL/route. 

Because of this we need to have a frontend JavaScript reporting to the backend when the user goes to a new page...