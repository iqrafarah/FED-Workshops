const STORAGE_KEY = 'library-books';

export class BookModel {
  constructor(books) {
    // Save a copy so the books can be reset later
    this.initialBooks = structuredClone(books);

    // Load saved books from localStorage if they exist
    const savedBooks = localStorage.getItem(STORAGE_KEY);

    this.books = savedBooks ? JSON.parse(savedBooks) : structuredClone(books);
  }

  getBooks() {
    return this.books;
  }

  findBookById(id) {
    return this.books.find((book) => book.id === id) ?? null;
  }

  borrowBook(id) {
    const book = this.findBookById(id);

    // Stop if the book does not exist or is already borrowed
    if (!book || !book.isAvailable) {
      return false;
    }

    book.isAvailable = false;

    // Save the new state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));

    return true;
  }

  resetBooks() {
    // Reset books back to their original state
    localStorage.removeItem(STORAGE_KEY);
    this.books = structuredClone(this.initialBooks);
  }
}
