# Bookapp for FinalProject

## User Stories

### 1. Separate Pages

As the user I want to be able to switch between the pages "Homepage", "Search", and "Profile"
so that I can navigate the App easier

To-Do

- Navigation Link: Homepage
- Navigation Link: Search
- Navigation Link: Profile

- Data fetching needs to happen in pages/\_app
- Homepage: pages/index.js
- Search: pages/search/ index.js
- Profile: pages/profile/index.js
- Create Navigation component that renders the Links to the pages
- Create Layout component that renders Navigation component
- Render Layout component in pages/\_app

### 2. Search for books

As the user I want to be able to search for books, based on name or author
so that I can find out a book to read next

To-Do

- Create Searchbar component and render in pages/search/ index.js
- Render an overview of the searched book
- Create component BookOverview

### 3. Bookdetails

As the user I want to be able to click on a book and get a detailed information about the book (author, published date, summary, genre, add to list button, mark as read)
so that I can learn everything about the book

To-Do

- Create Bookdetails component
  - Bookprops (author, published, summary, genre)
- Create pages/book/[slug] that renders the component Bookdetails
- Use slug to find and display Bookdetails
- Clicking on the books shows the Bookdetails
- Back Button is displayed
- Add to list Button is displayed
- Mark as read button is displayed

### 4. Homepage

As the user I want to see random book recommendations on the Homepage
so that I can discover new books

To-Do

- 4 random books are being displayed
  - Write a function to display 4 random books
- Create a component RandomBooks
  - props: name, author

### 5. Booklists

As the user I want to see and create booklists
so that I can save books that I like

To-Do

- Create a component for OverviewBooklist
- Create a component for Booklist
  - Render the books that have been added to that list (BookOverview Component that have been added to a list)

### 6. Profile

As the user I want to be able to see my profilepage
so that I have an overview of my booklists and can access them

To-Do

- Create a component Profile
  - that renders Information about the user, the name and the booklist Component
- Render OverviewBooklist
- When clicking on a list it shows component Booklist
