function mostrarFormulario(tipo) {
    if (tipo === 'empresa') {
        window.location.href = './forms/RegistroEmpresa.html';
    } else if (tipo === 'sucursal') {
        window.location.href = './forms/RegistroSucursal.html';
    } else if (tipo === 'home') {
        window.location.href = 'index.html';
    } else if (tipo === 'editar-empresa') {
        window.location.href = './forms/EditarEmpresa.html';
    } else if (tipo === 'editar-sucursal') {
        window.location.href = './forms/EditarSucursal.html';
    }
}

function eliminar() {
    window.location.href = './forms/Eliminar.html';
}

function cargarDatos() {
    fetch('/api/empresa/leer')
        .then(response => response.json())
        .then(data => {
            const tablaEmpresas = document.querySelector('#tabla-empresas tbody');
            tablaEmpresas.innerHTML = '';
            data.forEach(empresa => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${empresa.idEmpresa}</td>
                    <td>${empresa.nombre}</td>
                    <td>${empresa.direccion}</td>
                    <td>${empresa.direccionfacturacion}</td>
                    <td>${empresa.representantelegal}</td>
                    <td>${empresa.telefono}</td>
                    <td>${empresa.correoelectronico}</td>
                    <td>${empresa.codigopostal}</td>
                    <td>${empresa.estado}</td>
                    <td>${empresa.principal}</td>
                    <td>${empresa.adiciono}</td>
                    <td>${empresa.fechaadicion}</td>
                `;
                tablaEmpresas.appendChild(row);
            });
        })
        .catch(error => console.error('Error cargando empresas:', error));

    fetch('/api/sucursal/leer')
        .then(response => response.json())
        .then(data => {
            const tablaSucursales = document.querySelector('#tabla-sucursales tbody');
            tablaSucursales.innerHTML = '';
            data.forEach(sucursal => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sucursal.idSucursal}</td>
                    <td>${sucursal.idEmpresa}</td>
                    <td>${sucursal.descripcion}</td>
                    <td>${sucursal.estado}</td>
                `;
                tablaSucursales.appendChild(row);
            });
        })
        .catch(error => console.error('Error cargando sucursales:', error));
}

window.onload = cargarDatos;