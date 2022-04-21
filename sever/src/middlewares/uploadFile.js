// import package here
const multer = require('multer')

exports.uploadBook = (imageFile, bookFile) => {
  // code here
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname == imageFile){
        cb(null, "uploads/cover")
      }else{
        cb(null, "uploads/book")
      }
    },
    filename: function (req, file, cb) {
      if(file.fieldname == imageFile){
        cb(null, 'cover' + '-' + Date.now() + '-' + file.originalname.replace(/\s/g, ""))
      }else{
        cb(null, 'book' + '-' + Date.now() + '-' + file.originalname.replace(/\s/g, ""))
      }
    }
  })

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === bookFile) {
      if (!file.originalname.match(/\.(epub)$/)) {
        req.fileValidationError = {
          message: "Only epub files are allowed!"
        }
        return cb(new Error("Only epub files are allowed!"), false)
      }
    }
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!"
        }
        return cb(new Error("Only image files are allowed!"), false)
      }
    }
    cb(null, true)
  }

  const sizeInMB = 100
  const maxSize = sizeInMB * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).fields(
    [ 
      { 
        name: imageFile, 
        maxCount: 1 
      },
      { 
        name: bookFile, 
        maxCount: 1 
      },
    ]
  )

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }
      
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select file to upload"
        })
      }
      
      if (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10 MB"
          })
        }
        return res.status(400).send(err)
      }

      return next()
    })
  }
};

exports.uploadImage = (imageFile) => {
  // code here
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname == "imageProof"){
        cb(null, "uploads/transaction")
      }else{
        cb(null, "uploads/profile")
      }
    },
    filename: function (req, file, cb) {
      if(file.fieldname == imageFile){
        cb(null, 'proof' + '-' + Date.now() + '-' + file.originalname.replace(/\s/g, ""))
      }else{
        cb(null, 'photo' + '-' + Date.now() + '-' + file.originalname.replace(/\s/g, ""))
      }
    }
  })

  const fileFilter = function (req, file, cb) {
    // "image.pdf"
    // <input type="file">
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!"
        }
        return cb(new Error("Only image files are allowed!"), false)
      }
    }
    cb(null, true)
  }

  const sizeInMB = 10000
  const maxSize = sizeInMB * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).single(imageFile)

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }

      if (!req.file && !err) {
        return res.status(400).send({
          message: "Please select file to upload"
        })
      }

      if (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10 MB"
          })
        }
        return res.status(400).send(err)
      }

      return next()
    })
  }
};