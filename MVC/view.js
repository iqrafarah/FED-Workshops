export class BookView {
  constructor() {
    this.bookContainer = document.querySelector('.books-container');
    this.resetButton = document.querySelector('.reset-btn');
  }

  renderBooks(books) {
    this.bookContainer.innerHTML = '';

    books.forEach((book) => {
      const bookElement = document.createElement('div');

      bookElement.className = 'w-full max-w-[200px]';

      bookElement.innerHTML = `
                <img
                    class="w-full aspect-[2/3] object-cover rounded-md mb-3"
                    src="${book.thumbnail}"
                    alt="${book.title}"
                >

                <div class="space-y-1">
                    <h3 class="text-sm font-medium leading-tight">
                        ${book.title}
                    </h3>

                    <p class="text-xs text-gray-500">
                        ${book.author}
                    </p>
                </div>

                ${
                  book.isAvailable
                    ? `
                            <button
                                class="borrow-btn mt-3 text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 cursor-pointer"
                                data-id="${book.id}"
                            >
                                Borrow
                            </button>
                        `
                    : `
                            <button
                                class="mt-3 text-xs bg-gray-100 text-gray-400 px-3 py-1.5 rounded-md cursor-not-allowed"
                                disabled
                            >
                                Not available
                            </button>
                        `
                }
            `;

      this.bookContainer.appendChild(bookElement);
    });
  }

  onBorrow(handler) {
    // Detect when a borrow button is clicked
    this.bookContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.borrow-btn');

      if (!button) {
        return;
      }

      const bookId = Number(button.dataset.id);

      handler(bookId);
    });
  }

  onReset(handler) {
    this.resetButton.addEventListener('click', handler);
  }

  showBorrowSuccess() {
    alert('Book borrowed successfully');
  }

  showBorrowError() {
    alert('Failed to borrow book');
  }
}
