import express from 'express';
import controller from '../controllers/systemuserCtrl';

const sysuserRoutes = express.Router();

sysuserRoutes.post('/',  controller.createSystemUser);


export default sysuserRoutes;