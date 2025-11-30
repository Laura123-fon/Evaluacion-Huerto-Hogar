import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';
import { useAuth } from '../context/AuthContext';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '' });
  
  const navigate = useNavigate();
  const { logout, username, role, isAdmin } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    setLoading(true);
    BookService.getAllBooks()
      .then(res => setBooks(res.data))
      .catch(err => {
        setError('Error al cargar libros');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 🔒 SOLO ADMIN: Crear libro
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await BookService.createBook(formData);
      setFormData({ title: '', author: '' });
      setShowForm(false);
      loadBooks();
    } catch (err) {
      alert('Error al crear libro');
      console.error(err);
    }
  };

  // 🔒 SOLO ADMIN: Actualizar libro
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await BookService.updateBook(editingBook.id, formData);
      setFormData({ title: '', author: '' });
      setEditingBook(null);
      loadBooks();
    } catch (err) {
      alert('Error al actualizar libro');
      console.error(err);
    }
  };

  // 🔒 SOLO ADMIN: Eliminar libro
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este libro?')) return;
    
    try {
      await BookService.deleteBook(id);
      loadBooks();
    } catch (err) {
      alert('Error al eliminar libro');
      console.error(err);
    }
  };

  const startEdit = (book) => {
    setEditingBook(book);
    setFormData({ title: book.title, author: book.author });
  };

  const cancelEdit = () => {
    setEditingBook(null);
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
        <h1>📚 Biblioteca</h1>
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
      {isAdmin && !showForm && !editingBook && (
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
          ➕ Agregar Libro
        </button>
      )}

      {/* 🔒 SOLO ADMIN: Formulario */}
      {isAdmin && (showForm || editingBook) && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>{editingBook ? '✏️ Editar Libro' : '➕ Nuevo Libro'}</h3>
          <form onSubmit={editingBook ? handleUpdate : handleCreate}>
            <div style={{ marginBottom: '15px' }}>
              <label>Título:</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Autor:</label>
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
              {editingBook ? 'Actualizar' : 'Crear'}
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

      {/* Lista de libros */}
      <div>
        {books.length === 0 ? (
          <p>No hay libros disponibles</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Título</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Autor</th>
                {isAdmin && (
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{book.id}</td>
                  <td style={{ padding: '10px' }}><strong>{book.title}</strong></td>
                  <td style={{ padding: '10px' }}>{book.author}</td>
                  {isAdmin && (
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => startEdit(book)}
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
                        onClick={() => handleDelete(book.id)}
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

