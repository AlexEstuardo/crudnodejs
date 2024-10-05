///-----------Registrar Empresa-----------//
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form-crear-empresa').addEventListener('submit', function (event) {
        event.preventDefault();
        const empresa = {
            idEmpresa: document.getElementById('idEmpresa').value,
            nombre: document.getElementById('nombre').value,
            direccion: document.getElementById('direccion').value,
            direccionfacturacion: document.getElementById('direccionfacturacion').value,
            representantelegal: document.getElementById('representantelegal').value,
            telefono: document.getElementById('telefono').value,
            correoelectronico: document.getElementById('correoelectronico').value,
            codigopostal: document.getElementById('codigopostal').value,
            estado: document.getElementById('estado').value,
            principal: document.getElementById('principal').value,
            adiciono: document.getElementById('adiciono').value,
        };

        fetch('/api/empresa/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empresa),
        })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => console.error('Error:', error));
    });
});

///-----------Registrar Sucursal-----------//
document.getElementById('form-crear-sucursal').addEventListener('submit', function (event) {
    event.preventDefault();
    const sucursal = {
        idSucursal: document.getElementById('idSucursal').value,
        idEmpresa: document.getElementById('idEmpresa').value,
        descripcion: document.getElementById('descripcion').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        encargado: document.getElementById('encargado').value,
        estado: document.getElementById('estado').value,
    };

    fetch('/api/sucursal/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sucursal),
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => console.error('Error:', error));
});

///---------Editar Empresa---------//
console.log();
function cargarDatosEmpresa(idEmpresa) {
    fetch(`/api/empresa/${idEmpresa}`)
        .then(response => response.json())
        .then(empresa => {
            document.getElementById('idEmpresa').value = empresa.idEmpresa;
            document.getElementById('nombre').value = empresa.nombre;
            document.getElementById('direccion').value = empresa.direccion;
            document.getElementById('direccionfacturacion').value = empresa.direccionfacturacion;
            document.getElementById('representantelegal').value = empresa.representantelegal;
            document.getElementById('telefono').value = empresa.telefono;
            document.getElementById('correoelectronico').value = empresa.correoelectronico;
            document.getElementById('codigopostal').value = empresa.codigopostal;
            document.getElementById('estado').value = empresa.estado;
            document.getElementById('principal').value = empresa.principal;
            document.getElementById('adiciono').value = empresa.adiciono;
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('form-editar-empresa').addEventListener('submit', function (event) {
    event.preventDefault();
    const empresa = {
        idEmpresa: document.getElementById('idEmpresa').value,
        nombre: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        direccionfacturacion: document.getElementById('direccionfacturacion').value,
        representantelegal: document.getElementById('representantelegal').value,
        telefono: document.getElementById('telefono').value,
        correoelectronico: document.getElementById('correoelectronico').value,
        codigopostal: document.getElementById('codigopostal').value,
        estado: document.getElementById('estado').value,
        principal: document.getElementById('principal').value,
    };

    fetch(`/api/empresa/editar/${empresa.idEmpresa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(empresa),
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => console.error('Error:', error));
});

///---------Editar Sucursal---------//
function cargarDatosSucursal(idSucursal) {
    fetch(`/api/sucursal/${idSucursal}`)
        .then(response => response.json())
        .then(sucursal => {
            document.getElementById('idSucursal').value = sucursal.idSucursal;
            document.getElementById('idEmpresa').value = sucursal.idEmpresa;
            document.getElementById('descripcion').value = sucursal.descripcion;
            document.getElementById('direccion').value = sucursal.direccion;
            document.getElementById('telefono').value = sucursal.telefono;
            document.getElementById('encargado').value = sucursal.encargado;
            document.getElementById('estado').value = sucursal.estado;
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('form-editar-sucursal').addEventListener('submit', function (event) {
    event.preventDefault();
    const sucursal = {
        idSucursal: document.getElementById('idSucursal').value,
        idEmpresa: document.getElementById('idEmpresa').value,
        descripcion: document.getElementById('descripcion').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        encargado: document.getElementById('encargado').value,
        estado: document.getElementById('estado').value,
    };

    fetch(`/api/sucursal/editar/${sucursal.idSucursal}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sucursal),
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => console.error('Error:', error));
});

//--------Eliminar Empresa y Sucursal--------//
function cargarEmpresas() {
    fetch('/api/empresas')
        .then(response => response.json())
        .then(data => {
            const selectEmpresa = document.getElementById('select-empresa');
            data.forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa.idEmpresa;
                option.textContent = `${empresa.idEmpresa} - ${empresa.nombre}`;
                selectEmpresa.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar empresas:', error));
}

function cargarSucursalesParaEliminar() {
    const idEmpresa = document.getElementById('select-empresa').value;
    if (!idEmpresa) {
        alert('Por favor, seleccione una empresa.');
        return;
    }

    fetch(`/api/empresa/${idEmpresa}`)
        .then(response => response.json())
        .then(empresa => {
            const tablaEmpresa = document.getElementById('tabla-empresa').getElementsByTagName('tbody')[0];
            tablaEmpresa.innerHTML = `
                <tr>
                    <td>${empresa.idEmpresa}</td>
                    <td>${empresa.nombre}</td>
                    <td>${empresa.direccion}</td>
                </tr>
            `;
        })
        .catch(error => console.error('Error al cargar la empresa:', error));

    fetch(`/api/sucursales/${idEmpresa}`)
        .then(response => response.json())
        .then(data => {
            const tablaSucursales = document.getElementById('tabla-sucursales').getElementsByTagName('tbody')[0];
            tablaSucursales.innerHTML = '';
            data.forEach(sucursal => {
                const fila = tablaSucursales.insertRow();
                fila.innerHTML = `
                    <td>${sucursal.idSucursal}</td>
                    <td>${sucursal.descripcion}</td>
                `;
            });
        })
        .catch(error => console.error('Error al cargar las sucursales:', error));
}

function eliminarEmpresaConSucursales() {
    const idEmpresa = document.getElementById('select-empresa').value;
    if (!idEmpresa) {
        alert('Por favor, seleccione una empresa para eliminar.');
        return;
    }

    if (confirm(`¿Estás seguro de que deseas eliminar la empresa con ID ${idEmpresa} y todas sus sucursales?`)) {
        fetch(`/api/empresa/eliminar/${idEmpresa}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            cargarEmpresas(); 
            document.getElementById('tabla-empresa').getElementsByTagName('tbody')[0].innerHTML = '';
            document.getElementById('tabla-sucursales').getElementsByTagName('tbody')[0].innerHTML = ''; 
        })
        .catch(error => console.error('Error al eliminar la empresa y sus sucursales:', error));
    }
}

window.onload = function() {
    cargarEmpresas();
};
