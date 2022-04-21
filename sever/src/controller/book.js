const { book, user, bookmark } = require('../../models')
const fs = require('fs')
const Sequelize = require('sequelize')

module.exports = {
    addBook: async (req, res)=>{
        try {
            const { ...data } = req.body
            console.log(data);
            await book.create({
                ...data,
                pages : parseInt(data.page),
                bookFile : req.files.bookFile[0].filename,
                bookImage : req.files.bookImage[0].filename,
                about : data.desc,
                isbn : data.ISBN
            });

            res.send({
                status: "success",
                message: "Add book finished",
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: "failed",
                message: "Server Error",
            })
        }
    },
    getBook: async (req, res)=>{
        try {
            const { id } = req.params;
        
            let data = await book.findOne({
                where: {
                    id,
                },
                include: {
                    model: user,
                    as: "bookmarkedBy",
                    through: {
                        model: bookmark,
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                attributes: {
                    include : [ 
                        [Sequelize.fn('date_format', Sequelize.col('publicationDate'), '%m %Y'), 'publicationDate']
                    ],
                    exclude: ["createdAt", "updatedAt"],
                },
            })

            data = JSON.parse(JSON.stringify(data))
            data.publicationDate = changePublicationDate(data.publicationDate)
            data.bookImage = process.env.PATH_FILE + "cover/" + data.bookImage
        
            if(data.bookmarkedBy.length > 0){
                for (let index = 0; index < data.bookmarkedBy.length; index++) {
                    if(data.bookmarkedBy[index].id == req.user.id){
                        data.bookmarkedBy = true
                        break
                    }
                }
            }

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
    getBooks: async (req, res)=>{
        try {
            let data = await book.findAll({
                include: {
                    model: user,
                    as: "bookmarkedBy",
                    through: {
                        model: bookmark,
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                attributes: {
                    include : [ 
                        [Sequelize.fn('date_format', Sequelize.col('publicationDate'), '%m %Y'), 'publicationDate']
                    ],
                    exclude: ["createdAt", "updatedAt"],
                },
            })

            data = JSON.parse(JSON.stringify(data))
            data = data.map((datas)=>{
                return {
                    ...datas,
                    publicationDate : changePublicationDate(datas.publicationDate),
                    bookImage : process.env.PATH_FILE + "cover/" + datas.bookImage 
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
    updateBook: async (req, res)=>{
        try {
            const { id } = req.params;
        
            await book.update(req.body, {
                where: {
                    id,
                },
            })
        
            res.send({
                status: "success",
                message: `Update book id: ${id} finished`,
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
    deleteBook: async (req, res)=>{
        try {
            const { id } = req.params;
        
            let data = await book.findOne({
                where: {
                    id
                }
            })

            await book.destroy({
                where: {
                    id,
                },
            })

            fs.unlinkSync('./uploads/' + data.bookFile)
        
            res.send({
                status: "success",
                message: `Delete book id: ${id} finished`,
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

const month = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'Desember'
]

const changePublicationDate = (parameter)=>{
    const split = parameter.split(' ')

    const monthIndex = parseInt(split[0])

    return month[monthIndex - 1] + ' ' + split[1]
}