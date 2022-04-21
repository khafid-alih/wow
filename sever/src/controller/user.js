const { user, profile, book, bookmark } = require('../../models')


module.exports = {
    addUser: async (req, res)=>{
        try {
            await user.create(req.body);

            res.send({
                status: "success",
                message: "Add user finished",
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    getUser: async (req, res)=>{
        try {
            const { id } = req.params;
        
            const data = await user.findOne({
                where: {
                    id,
                },
                include: {
                    model: profile,
                    as: "profile",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"],
                    },
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"],
                },
            })
        
            res.send({
                status: "success",
                data: {
                    user: data,
                },
            })
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    getUsers: async (req, res)=>{
        try {
            const data = await user.findAll({
                include: [
                    {
                        model: profile,
                        as: "profile",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "idUser"],
                        },
                    },
                    {
                        model: book,
                        as: "markedBook",
                        through: {
                            model: bookmark,
                            as: "bridge",
                            attributes: [],
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    }
                ],
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"],
                },
            })
        
            res.send({
                status: "success",
                data: {
                    user: data,
                },
            })
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    updateUser: async (req, res)=>{
        try {
            const { id } = req.params;
        
            await user.update(req.body, {
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Update user id: ${id} finished`,
                data: req.body,
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    deleteUser: async (req, res)=>{
        try {
            const { id } = req.params;
        
            await user.destroy({
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Delete user id: ${id} finished`,
                data: req.body,
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: "failed",
                message: "Server Error",
            });
        }
    }
}