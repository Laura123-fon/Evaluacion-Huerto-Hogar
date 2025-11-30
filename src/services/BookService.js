import api from '../api/AxiosConfig';

class BookService {
  getAllBooks() {
    return api.get('/books');
  }

  getBookById(id) {
    return api.get(`/books/${id}`);
  }

  createBook(book) {
    return api.post('/books', book);
  }

  updateBook(id, book) {
    return api.put(`/books/${id}`, book);
  }

  deleteBook(id) {
    return api.delete(`/books/${id}`);
  }
}

export default new BookService();
