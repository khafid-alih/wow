const { bookmark, user, book } = require('../../models')


module.exports = {
    addBookmark: async (req, res)=>{
        try {

            console.log(req.params.id);
            await bookmark.create({
                idUser : req.user.id,
                idBook : req.params.id
            });

            res.send({
                status: "success",
                message: "Add bookmark finished",
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    getBookmark: async (req, res)=>{
        try {
            const { id } = req.params;
        
            const data = await bookmark.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: user,
                        as: "user",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: book,
                        as: "book",
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
                    bookmark: data,
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
    getBookmarks: async (req, res)=>{
        try {
            const { id } = req.user

            const data = await bookmark.findAll({
                where: {
                    idUser : id,
                },
                include:{
                    model: book,
                    as: "book",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    }
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })

            if (data) {
                return res.send({
                    status: "success",
                    data: data,
                })
            }else{
                return res.send({
                    status: "success",
                    data: null,
                })
            }
        
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    updateBookmark: async (req, res)=>{
        try {
            const { id } = req.params;
        
            await bookmark.update(req.body, {
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Update bookmark id: ${id} finished`,
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
    deleteBookmark: async (req, res)=>{
        try {
            const { idBook } = req.params;
        
            await bookmark.destroy({
                where: {
                    idBook,
                    idUser : req.user.id
                },
            })
        
            res.send({
                status: "success",
                message: `Delete bookmark id: ${id} finished`,
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