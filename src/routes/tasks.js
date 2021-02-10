import {Router} from "express";
import {createTask,getTasks,getOneTask,updateTask,deleteTask,getTasksByProject} from '../controllers/task.controller';
const router = Router();

router.post('/',createTask);
router.get('/',getTasks);
router.get('/:id',getOneTask);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);
router.get('/project/:projectid',getTasksByProject)

export default router;