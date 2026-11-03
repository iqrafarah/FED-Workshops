import { BookModel } from './model.js';
import { BookView } from './view.js';
import { BookController } from './controller.js';

// Default book data
const books = [
  {
    id: 1,
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    type: 'Fiction',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg',
    isAvailable: true,
  },
  {
    id: 2,
    title: 'Six of Crows',
    author: 'Leigh Bardugo',
    type: 'Fantasy',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9781250076960-L.jpg',
    isAvailable: true,
  },
  {
    id: 3,
    title: 'Atomic Habits',
    author: 'James Clear',
    type: 'Self Development',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    isAvailable: true,
  },
  {
    id: 4,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    type: 'Fiction',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg',
    isAvailable: true,
  },
  {
    id: 5,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    type: 'Fiction',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
    isAvailable: true,
  },
];

// Create and connect the MVC parts
const model = new BookModel(books);
const view = new BookView();
new BookController(model, view);
