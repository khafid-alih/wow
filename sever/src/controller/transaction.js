const { user, transaction } = require('../../models')
const cron = require('node-cron')
const Op = require('Sequelize').Op

module.exports = {
    addTransaction: async (req, res)=>{
        try {
            await transaction.create({
                idUser : req.user.id,
                transferProof : req.file.filename,
                remainingActive: 0,
                userStatus: "not active",
                paymentStatus: "pending"
            });

            res.send({
                status: "success",
                message: "Add transaction finished",
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    getTransaction: async (req, res)=>{
        try {
            const { id } = req.params;
        
            let data = await transaction.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: user,
                        as: "user",
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: user,
                        as: "admin",
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"],
                        },
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
        
            res.send({
                status: "success",
                data: {
                    transaction: data,
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
    getTransactions: async (req, res)=>{
        try {
            let data = await transaction.findAll({
                include: [
                    {
                        model: user,
                        as: "user",
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: user,
                        as: "admin",
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"],
                        },
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            data = JSON.parse(JSON.stringify(data))
            data = data.map((datas)=>{
                return {
                    ...datas,
                    transferProof : process.env.PATH_FILE + "transaction/" + datas.transferProof
                }
            })
        
            res.send({
                status: "success",
                data: data,
            })
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    updateTransaction: async (req, res)=>{
        try {
            const { id } = req.params;

            await transaction.update({
                remainingActive: 30,
                userStatus: "active",
                paymentStatus: "approved",
                idAdmin: req.user.id,
            }, {
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Update transaction id: ${id} finished`,
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
    updateApproveTransaction: async (req, res)=>{
        try {
            const { id } = req.params;
            console.log("hit ini");

            await transaction.update({
                paymentStatus: "approved",
                userStatus: "active",
                remainingActive: 30,
                idAdmin: req.user.id,
            }, {
                where: {
                    id,
                },
            })

            //delete 
        
            res.send({
                status: "success",
                message: `Update transaction id: ${id} finished`,
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    updateCancelTransaction: async (req, res)=>{
        try {
            console.log("hit itu");
            const { id } = req.params;

            await transaction.update({
                paymentStatus: "cancel",
                idAdmin: req.user.id,
            }, {
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Update transaction id: ${id} finished`,
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    deleteTransaction: async (req, res)=>{
        try {
            const { id } = req.params;
        
            await transaction.destroy({
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Delete transaction id: ${id} finished`,
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

let a = 0
cron.schedule(' * 12 * * *', async () => {
    console.log(++a + ' running a task every a half of hour');
    try {
        const dataTransaction = await transaction.findAll({
            where : {
                paymentStatus : 'approved'
            },
            attributes : ['remainingActive', 'id']
        })
        dataTransaction.map(async (data)=>{
            if(data.remainingActive == 0){
                await transaction.update({
                    paymentStatus : "expired",
                    userStatus : "not active"
                },{
                    where: {
                        id : data.id
                    }
                })
            }else{
                await transaction.update({
                    remainingActive : data.remainingActive - 1
                },{
                    where: {
                        id : data.id
                    }
                })
            }
        })
    } catch (error) {
        console.log(err);
    }

});