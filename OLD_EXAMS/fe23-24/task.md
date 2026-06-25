# Final Exam 2023/2024 programming task

You need to create a simple Node.js MVC web application that uses the Express framework for route management and EJS for
view rendering. The application allows users to add, view, and delete movies.

The project structure is as follows:

```
movie-app/
├── public/css
│ └── site.css
├── routes/
│ └── movie.routes.js
│ └── home.routes.js
├── views/
│ ├── home.ejs
│ ├── addMovie.ejs
│ ├── movieList.ejs
├── package.json
└── server.js
```

You need to implement the functionalities demonstrated in the video `zi-demo.mp4` (attached). The implementation of the
repository is optional (separately or in the controller).

The following routes need to be implemented:

```
'/' - fetch home page
'/movies' - fetch movie list
'/movies/add' - fetch form to add a new movie
'/movies/add' - add a new movie
'/movies/delete/:id' - delete a movie
```

The application needs to be styled according to the demonstration video, the colors are as follows:

- Card title text and button background `#4a90e2`.
- Page background (body) `#f4f4f9`
- Button hover background `#357ab8`
- Button text and card background `#fff`
- Movie description border `#ddd`

Technical Notes:

- Since you are on a restricted network, the attached project skeleton contains `express`, `express-session`, and
  `ejs` (`helloworld.zip`)
- The project structure is not prescribed (e.g., whether you will have a routes folder or not, etc.)
- The URL structure is not prescribed; you can make it the same as in the demo or not
- The application must listen on port `8080` and must be able to start with `node server.js`

Task Submission:

1. Write a comment in the text field about what was (not) done
2. Attach a zip of the project WITHOUT the `node_modules` directory
    - MAKE SURE to check that you have attached the file, and definitely verify it afterwards in the review.
    - Later complaints (files) will not be acknowledged!

Note: Before uploading, you need to delete the `node_modules` directory.
