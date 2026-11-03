export class BookController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Show the books when the app starts
    this.view.renderBooks(this.model.getBooks());

    // Connect View events to Controller methods
    this.view.onBorrow(this.handleBorrowBook.bind(this));
    this.view.onReset(this.handleReset.bind(this));
  }

  handleBorrowBook(id) {
    const wasBorrowed = this.model.borrowBook(id);

    if (!wasBorrowed) {
      this.view.showBorrowError();
      return;
    }

    this.view.renderBooks(this.model.getBooks());
    this.view.showBorrowSuccess();
  }

  handleReset() {
    this.model.resetBooks();
    this.view.renderBooks(this.model.getBooks());
  }
}
