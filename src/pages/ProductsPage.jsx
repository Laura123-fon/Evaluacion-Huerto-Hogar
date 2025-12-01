import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Cambiado el import del servicio
import ProductService from '../services/ProductService'; 
import { useAuth } from '../context/AuthContext';

// 2. Renombrado el componente
export default function ProductsPage() {
  // 3. Cambiado el estado de libros a productos
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  // 3. Cambiado el estado de edición
  const [editingProduct, setEditingProduct] = useState(null); 
  
  // Asumiendo que usas 'title' y 'author' en tu Producto, si no, cámbialos aquí:
  // Ejemplo: { name: '', price: '' }
  const [formData, setFormData] = useState({ title: '', author: '' }); 
  
  const navigate = useNavigate();
  // Se mantienen los imports de Auth Context, lo cual es CORRECTO
  const { logout, username, role, isAdmin } = useAuth();

  useEffect(() => {
    loadProducts(); // 4. Llamada a cargar productos
  }, []);

  // 4. Renombrado el cargador de datos
  const loadProducts = () => {
    setLoading(true);
    ProductService.getAllProducts() // 5. Uso del nuevo método
      .then(res => setProducts(res.data))
      .catch(err => {
        setError('Error al cargar productos'); // 6. Alerta adaptada
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 🔒 SOLO ADMIN: Crear producto
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      ProductService.createProduct(formData); // 5. Uso del nuevo método
      setFormData({ title: '', author: '' });
      setShowForm(false);
      loadProducts();
    } catch (err) {
      alert('Error al crear producto'); // 6. Alerta adaptada
      console.error(err);
    }
  };

  // 🔒 SOLO ADMIN: Actualizar producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // 5. Uso del nuevo método y del estado de edición renombrado
      ProductService.updateProduct(editingProduct.id, formData); 
      setFormData({ title: '', author: '' });
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      alert('Error al actualizar producto'); // 6. Alerta adaptada
      console.error(err);
    }
  };

  // 🔒 SOLO ADMIN: Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return; // 6. Alerta adaptada
    
    try {
      ProductService.deleteProduct(id); // 5. Uso del nuevo método
      loadProducts();
    } catch (err) {
      alert('Error al eliminar producto'); // 6. Alerta adaptada
      console.error(err);
    }
  };

  // 3. Cambiado el parámetro y la variable de estado
  const startEdit = (product) => { 
    setEditingProduct(product);
    setFormData({ title: product.title, author: product.author });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
    setFormData({ title: '', author: '' });
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px'
      }}>
        {/* 7. Cambiado el título */}
        <h1>🌱 Catálogo de Productos</h1>
        <div>
          <span style={{ 
            marginRight: '15px', 
            padding: '5px 10px',
            backgroundColor: isAdmin ? '#28a745' : '#007bff',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {role} - {username}
          </span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* 🔒 SOLO ADMIN: Botón para agregar */}
      {isAdmin && !showForm && !editingProduct && (
        <button 
          onClick={() => setShowForm(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ➕ Agregar Producto
        </button>
      )}

      {/* 🔒 SOLO ADMIN: Formulario */}
      {isAdmin && (showForm || editingProduct) && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {/* 7. Cambiado el título del formulario */}
          <h3>{editingProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h3> 
          <form onSubmit={editingProduct ? handleUpdate : handleCreate}>
            {/* 8. Los campos del formulario (Título/Autor) deben cambiarse por los de tu Producto (Ej: Nombre/Precio) */}
            <div style={{ marginBottom: '15px' }}>
              <label>Título (Nombre del Producto):</label> 
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Autor (Detalle del Producto):</label> 
              <input 
                type="text" 
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <button 
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {editingProduct ? 'Actualizar' : 'Crear'}
            </button>
            <button 
              type="button"
              onClick={cancelEdit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Lista de productos */}
      <div>
        {products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Nombre</th> {/* 7. Cambiado */}
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Detalle</th> {/* 7. Cambiado */}
                {isAdmin && (
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map(product => ( // 3. Iteración de products
                <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{product.id}</td>
                  <td style={{ padding: '10px' }}><strong>{product.title}</strong></td> {/* Si usas 'name', cambia .title por .name */}
                  <td style={{ padding: '10px' }}>{product.author}</td> {/* Si usas 'price' o 'description', cambia .author */}
                  {isAdmin && (
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => startEdit(product)} // 3. Uso del nuevo parámetro
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#ffc107',
                          color: 'black',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '5px'
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}