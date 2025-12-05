import api from '../api/AxiosConfig';

class ProductService {
  getAllProducts() {
     return api.get("/products/getAllProducts");

  }

  getProductById(id) {
    return api.get(`/products/${id}`);
  }

  createProduct(product) {
    return api.post('/products', product);
  }

  updateProduct(id, product) {
    return api.put(`/products/${id}`, product);
  }

  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }
}

export default new ProductService();