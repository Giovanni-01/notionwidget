'use client';
import React, { useState, useEffect } from 'react';

// Estilos constantes
const styles = {
    container: {
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
        maxWidth: '600px',
        margin: '20px auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#0071e3',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        outline: 'none'
    },
    pilarContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: '#f5f5f7',
        borderRadius: '12px',
        transition: 'all 0.2s ease'
    },
    pilarNombre: {
        width: '140px',
        fontSize: '15px',
        fontWeight: '500',
        color: '#1d1d1f'
    },
    inputNombre: {
        width: '130px',
        padding: '8px',
        border: '1px solid #d2d2d7',
        borderRadius: '8px',
        fontSize: '15px',
        marginRight: '10px',
        outline: 'none'
    },
    cuadradosContainer: {
        display: 'flex',
        gap: '8px'
    },
    cuadrado: {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '2px solid transparent'
    },
    deleteButton: {
        marginLeft: '12px',
        padding: '6px 10px',
        backgroundColor: '#ff3b30',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        fontSize: '12px',
        cursor: 'pointer'
    },
    addButton: {
        backgroundColor: '#f5f5f7',
        color: '#0071e3',
        border: '2px solid #0071e3',
        padding: '10px 20px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: '12px'
    }
};

const ProgressPanel = () => {
    const [pilares, setPilares] = useState([]);
    const [editMode, setEditMode] = useState(false);

    // Cargar datos al inicio
    useEffect(() => {
        // Intentar obtener datos de localStorage
        const savedData = localStorage.getItem('pilaresData');
        if (savedData) {
            setPilares(JSON.parse(savedData));
        } else {
            // Datos por defecto
            const defaultPilares = [
                { nombre: "Pilar 1", completado: 0 },
                { nombre: "Pilar 2", completado: 0 },
                { nombre: "Pilar 3", completado: 0 }
            ];
            setPilares(defaultPilares);
            localStorage.setItem('pilaresData', JSON.stringify(defaultPilares));
        }
    }, []);

    // Función para añadir nuevo pilar
    const agregarPilar = () => {
        const nuevosPilares = [...pilares, { 
            nombre: `Pilar ${pilares.length + 1}`, 
            completado: 0 
        }];
        setPilares(nuevosPilares);
        localStorage.setItem('pilaresData', JSON.stringify(nuevosPilares));
    };

    // Función para eliminar pilar
    const eliminarPilar = (index) => {
        const nuevosPilares = pilares.filter((_, i) => i !== index);
        setPilares(nuevosPilares);
        localStorage.setItem('pilaresData', JSON.stringify(nuevosPilares));
    };

    // Función para editar nombre del pilar
    const editarNombrePilar = (index, nuevoNombre) => {
        const nuevosPilares = [...pilares];
        nuevosPilares[index].nombre = nuevoNombre;
        setPilares(nuevosPilares);
        localStorage.setItem('pilaresData', JSON.stringify(nuevosPilares));
    };

    // Función para actualizar progreso
    const actualizarProgreso = (pilarIndex, cuadradoIndex) => {
        const nuevosPilares = [...pilares];
        nuevosPilares[pilarIndex].completado = cuadradoIndex + 1;
        setPilares(nuevosPilares);
        localStorage.setItem('pilaresData', JSON.stringify(nuevosPilares));
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ margin: 0, color: '#1d1d1f', fontSize: '24px' }}>Panel de Progreso</h2>
                <button 
                    onClick={() => setEditMode(!editMode)}
                    style={styles.button}
                >
                    {editMode ? 'Guardar Cambios' : 'Editar Pilares'}
                </button>
            </div>

            {pilares.map((pilar, pilarIndex) => (
                <div key={pilarIndex} style={styles.pilarContainer}>
                    {editMode ? (
                        <input
                            value={pilar.nombre}
                            onChange={(e) => editarNombrePilar(pilarIndex, e.target.value)}
                            style={styles.inputNombre}
                            placeholder="Nombre del pilar"
                        />
                    ) : (
                        <div style={styles.pilarNombre}>{pilar.nombre}</div>
                    )}
                    <div style={styles.cuadradosContainer}>
                        {[...Array(5)].map((_, cuadradoIndex) => (
                            <div
                                key={cuadradoIndex}
                                onClick={() => actualizarProgreso(pilarIndex, cuadradoIndex)}
                                style={{
                                    ...styles.cuadrado,
                                    backgroundColor: cuadradoIndex < pilar.completado ? '#34c759' : '#ffffff',
                                    border: `2px solid ${cuadradoIndex < pilar.completado ? '#34c759' : '#d2d2d7'}`,
                                    transform: cuadradoIndex < pilar.completado ? 'scale(1.05)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>
                    {editMode && (
                        <button 
                            onClick={() => eliminarPilar(pilarIndex)}
                            style={styles.deleteButton}
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            ))}
            
            {editMode && (
                <button 
                    onClick={agregarPilar}
                    style={styles.addButton}
                >
                    + Añadir Nuevo Pilar
                </button>
            )}
        </div>
    );
};

export default ProgressPanel;
