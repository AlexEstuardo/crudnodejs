const db = require('../modulos/config'); // Configuración de la base de datos

// Crear empresa
exports.crearEmpresa = (req, res) => {
  const { idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono } = req.body;
  const query = `
    INSERT INTO gen_empresas (idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono], (err, result) => {
    if (err) throw err;
    res.send('Empresa creada');
  });
};

// Leer empresas
exports.leerEmpresas = (req, res) => {
  const query = 'SELECT * FROM gen_empresas';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Actualizar empresa
exports.actualizarEmpresa = (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal } = req.body;
  const query = `
    UPDATE gen_empresas 
    SET nombre = ?, direccion = ?, direccionfacturacion = ?, representantelegal = ?, telefono = ?, correoelectronico = ?, codigopostal = ?, estado = ?, principal = ?
    WHERE idEmpresa = ?
  `;
  db.query(query, [nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, id], (err, result) => {
    if (err) throw err;
    res.send('Empresa actualizada');
  });
};

// Controlador para obtener datos de una empresa por ID
exports.obtenerEmpresaPorId = (req, res) => {
  const query = 'SELECT * FROM gen_empresas WHERE idEmpresa = ?';
  db.query(query, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
  });
};

// Controlador para editar una empresa
exports.editarEmpresa = (req, res) => {
  const empresa = req.body;
  const query = `
      UPDATE gen_empresas SET 
      nombre = ?, direccion = ?, direccionfacturacion = ?, 
      representantelegal = ?, telefono = ?, correoelectronico = ?, 
      codigopostal = ?, estado = ?, principal = ? 
      WHERE idEmpresa = ?`;

  db.query(query, [
      empresa.nombre, empresa.direccion, empresa.direccionfacturacion,
      empresa.representantelegal, empresa.telefono, empresa.correoelectronico,
      empresa.codigopostal, empresa.estado, empresa.principal, empresa.idEmpresa
  ], (err, results) => {
      if (err) throw err;
      res.send('Empresa actualizada correctamente');
  });
};


// Eliminar empresa
exports.eliminarEmpresa = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM gen_empresas WHERE idEmpresa = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Empresa eliminada');
  });
};

//--------------------------------------------------
// Crear sucursal
exports.crearSucursal = (req, res) => {
    const { idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
    const query = `
      INSERT INTO inv_sucursales (idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado], (err, result) => {
      if (err) throw err;
      res.send('Sucursal creada');
    });
  };
  
  // Leer sucursales
  exports.leerSucursales = (req, res) => {
    const query = 'SELECT * FROM inv_sucursales';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  };
  
  // Actualizar sucursal
  exports.actualizarSucursal = (req, res) => {
    const { id } = req.params;
    const { idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
    const query = `
      UPDATE inv_sucursales 
      SET idEmpresa = ?, descripcion = ?, direccion = ?, telefono = ?, encargado = ?, estado = ?
      WHERE idSucursal = ?
    `;
    db.query(query, [idEmpresa, descripcion, direccion, telefono, encargado, estado, id], (err, result) => {
      if (err) throw err;
      res.send('Sucursal actualizada');
    });
  };
  
  // Eliminar sucursal
  exports.eliminarSucursal = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM inv_sucursales WHERE idSucursal = ?';
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      res.send('Sucursal eliminada');
    });
  };
  
  exports.obtenerSucursalPorId = (req, res) => {
    const query = 'SELECT * FROM inv_sucursales WHERE idSucursal = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

// Controlador para editar una sucursal
exports.editarSucursal = (req, res) => {
    const sucursal = req.body;
    const query = `
        UPDATE inv_sucursales SET 
        idEmpresa = ?, descripcion = ?, direccion = ?, 
        telefono = ?, encargado = ?, estado = ? 
        WHERE idSucursal = ?`;

    db.query(query, [
        sucursal.idEmpresa, sucursal.descripcion, sucursal.direccion,
        sucursal.telefono, sucursal.encargado, sucursal.estado, sucursal.idSucursal
    ], (err, results) => {
        if (err) throw err;
        res.send('Sucursal actualizada correctamente');
    });
};

exports.obtenerEmpresaPorId = (req, res) => {
  const idEmpresa = req.params.id;
  const query = 'SELECT * FROM gen_empresas WHERE idEmpresa = ?';

  db.query(query, [idEmpresa], (err, result) => {
      if (err) throw err;
      res.json(result[0]);
  });
};

exports.obtenerSucursalesPorEmpresa = (req, res) => {
  const idEmpresa = req.params.idEmpresa;
  const query = 'SELECT * FROM inv_sucursales WHERE idEmpresa = ?';

  db.query(query, [idEmpresa], (err, results) => {
      if (err) throw err;
      res.json(results);
  });
};

// Eliminar una empresa y sus sucursales
exports.eliminarEmpresaConSucursales = (req, res) => {
  const idEmpresa = req.params.id;

  const queryEliminarSucursales = 'DELETE FROM inv_sucursales WHERE idEmpresa = ?';
  db.query(queryEliminarSucursales, [idEmpresa], (err, result) => {
      if (err) throw err;

      const queryEliminarEmpresa = 'DELETE FROM gen_empresas WHERE idEmpresa = ?';
      db.query(queryEliminarEmpresa, [idEmpresa], (err, result) => {
          if (err) throw err;
          res.send(`Empresa con ID ${idEmpresa} y todas sus sucursales han sido eliminadas.`);
      });
  });
};