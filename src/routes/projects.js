import {Router} from "express";
import {createProject,getProjects,getOneProject,deleteProject,editProject} from '../controllers/project.controller'

const router = Router();
router.post('/',createProject);
router.get('/',getProjects)
router.get('/:id',getOneProject)
router.delete('/:id',deleteProject)
router.put('/:id',editProject)

export default router;