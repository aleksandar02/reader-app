# Reader App

Reader App is a web app that allows users to easily track and manage books they are reading.

At the start, the user has a 'Default' collection containing all his books and 'Completed' collection\
containing only books read by the user.

#### Note: I added some mock data. You can delete those :)

## How to start the project

In the project directory, you can run:

### `$ git clone {the url to the GitHub repo}`

This clones the repository.

`cd` into the new folder and type

### `$ npm install`

This installs the required dependencies.

### `$ npm start`

To run the project.

## Technologies used

- React
- Redux
- MUI
- API for searching books: [Open Library API](https://openlibrary.org/developers/api)

## Features

Book:

- Add New Books
- Delete Book
- Search [Open Library API](https://openlibrary.org/developers/api) for the Book
- Add Book to Collection
- Remove Book from Collection
- Track Book status (To read, Reading, Done)

Collection:

- View Collection
- Search Collection
- Create/Delete Collection

Note:

- Add Note on Book
- Remove Note
