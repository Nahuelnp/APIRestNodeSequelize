import Project from '../models/projects';
export async function createProject(req, res) {
    const { name, priority, deliverydate, description } = req.body;
    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        })
        if (newProject) {
            res.json({
                messege: "projecto creado correctamente",
                data: newProject
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            messege: "salio todo mal"
        })
    }
};

export async function getProjects(req, res) {
    try {
        const projects = await Project.findAll();
        res.json({
            data: projects
        })
    } catch (error) {
        res.sendStatus(500).json({
            messege: "ocurrio un problema"
        })
    }
};
export async function getOneProject(req, res) {
    const { id } = req.params;
    try {
        const projects = await Project.findOne({
            where: {
                id
            }
        });
        res.json({
            data: projects
        })

    } catch (error) {
        res.sendStatus(500).json({
            messege: "ocurrio un problema"
        })
    }
};

export async function deleteProject(req,res){
    const {id} = req.params
    try {
      const deleteRowCount = await  Project.destroy({
            where:{
                id
            }
        });
        res.json({
            messege: "Projecto eliminado satisfactoriamente",
            count: deleteRowCount
        })
    } catch (error) {
        res.sendStatus(500).json({
            messege:"ocurrio un error"
        })
    }
};

export async function editProject(req,res){
    const {id} = req.params;
    const {name,description,priority,deliverydate} = req.body;
    try {
        const project =  await Project.findAll({
            attributes:['id','name','description','priority','deliverydate'],
            where:{
                id
            }
        });

        if (project.length > 0) {
            project.forEach( async element => {
                await element.update({
                    name,
                    priority,
                    description,
                    deliverydate
                })
            });
            return res.json({
                message: 'Project Updated',
                data: project
            })
        }

    } catch (error) {
        res.sendStatus(500).json({
            message:"ocurrio un problema al actulizar"
        })
    }

};