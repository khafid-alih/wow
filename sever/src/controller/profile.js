const { profile, user } = require('../../models');
const fs = require('fs')

module.exports = {
    addProfile: async (req, res)=>{
        try {
            const { ...data } = req.body
            await profile.create({
                ...data,
                image : req.file.filename
            });

            res.send({
                status: "success",
                message: "Add profile finished",
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    getProfile: async (req, res)=>{
        try {
            const { id } = req.user;

            let data = await profile.findOne({
                where: {
                    idUser : id,
                },
                include: {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
            
            if(data){
                data = JSON.parse(JSON.stringify(data))
                data.image = 'http://localhost:5000/uploads/' + data.image
        
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
    getProfiles: async (req, res)=>{
        try {
            let data = await profile.findAll({
                include: {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
                attributes: {
                    exclude: [ "createdAt", "updatedAt"],
                },
            })

            data = JSON.parse(JSON.stringify(data))
            data = data.map((datas)=>{
                return {
                    ...datas,
                    image : 'http://localhost:5000/uploads/' + datas.image
                }

            })
        
            res.send({
                status: "success",
                data: {
                    profile: data,
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
    updateProfile: async (req, res)=>{
        try {
            const { id } = req.params;
        
            await profile.update(req.body, {
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Update profile id: ${id} finished`,
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
    deleteProfile: async (req, res)=>{
        try {
            const { id } = req.params;
        
            let data = await profile.findOne({
                where: {
                    id
                }
            })

            await profile.destroy({
                where: {
                    id,
                },
            })

            fs.unlinkSync('./uploads/' + data.image)
        
            res.send({
                status: "success",
                message: `Delete profil id: ${id} finished`,
                data: {},
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