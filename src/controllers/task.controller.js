import Task from '../models/tasks';

export async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll();
        res.json({
            data: tasks
        })
    } catch (error) {
        res.sendStatus(500).json({
            messege: "ocurrio un problema al mostrar tareas"
        })
    }
}
export async function getOneTask(req, res) {
    const { id } = req.params;
    try {
        let task = await Task.findOne({
            where: {
                id
            }
        })
        res.json({
            data: task
        })
    } catch (error) {
        res.sendStatus(500).json({
            messege: "ocurrio un problema"
        })
    }
}
export async function createTask(req, res) {
    const { name, done, projectid } = req.body
    console.log(req.body)
    try {
        let newTask = await Task.create({
            name,
            done,
            projectid
        });
        if (newTask) {
            res.json({
                messege: "Tarea Creada Correctamente",
                data: newTask
            })
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500).json({
            messege: "no se pudo crear la tarea"
        })
    }
};
export async function updateTask(req, res) {
    const { id } = req.params;
    const { name, done, projectid } = req.body;
    try {
        let taskToUpdate = await Task.findAll({
            attributes: ['id', 'name', 'done', 'projectid'],
            where: {
                id
            }
        });
        if (taskToUpdate.length > 0) {
            taskToUpdate.forEach(async element => {
                await element.update({
                    name,
                    done,
                    projectid
                })
            });
            return res.json({
                message: "tarea actualizada",
                data: taskToUpdate
            })
        }
    } catch (error) {
        res.sendStatus(500).json({
            message: "ocurrio un problema al actulizar"
        })
    }

}
export async function deleteTask(req, res) {
    const { id } = req.params;
    try {
        let deletedRowCount = await Task.destroy({
            where: {
                id
            }
        });
        res.json({
            messege: "Tarea eliminada satisfactoriamente",
            count: deletedRowCount
        })
    } catch (error) {
        res.sendStatus(500).json({
            message: "ocurrio un error"
        })
    }
}
export async function getTasksByProject(req, res) {
    const {projectid} = req.params;
    try {
        const tasks = await Task.findAll({
            where:{
                projectid
            }
        })
        res.json(tasks)
    } catch (error) {
        res.sendStatus(500).json({
            messege: "se produjo un error"
        })
    }
}