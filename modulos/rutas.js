const express = require('express');
const router = express.Router();
const controlDB = require('../modulos/control');

//---Rutas para Empresas---//
router.post('/empresa/crear', controlDB.crearEmpresa);
router.get('/empresa/leer', controlDB.leerEmpresas);
router.get('/empresa/:id', controlDB.obtenerEmpresaPorId);
router.put('/empresa/editar/:id', controlDB.editarEmpresa); 
router.delete('/empresa/eliminar/:id', controlDB.eliminarEmpresa);

//---Rutas para sucursales---///
router.post('/sucursal/crear', controlDB.crearSucursal);
router.get('/sucursal/leer', controlDB.leerSucursales);
router.put('/sucursal/actualizar/:id', controlDB.actualizarSucursal);
router.delete('/sucursal/eliminar/:id', controlDB.eliminarSucursal);
router.get('/sucursal/:id', controlDB.obtenerSucursalPorId);
router.put('/sucursal/editar/:id', controlDB.editarSucursal);

//---eliminar datos---//
router.delete('/api/empresa/eliminar/:id', controlDB.eliminarEmpresaConSucursales);



module.exports = router;
