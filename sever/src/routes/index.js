const express = require('express')
const router = express.Router()

//controllers
const {
    register,
    login,
    checkAuth
} = require("../controller/auth")
const {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
} = require("../controller/user")
const { 
    addProfile, 
    getProfile, 
    getProfiles, 
    updateProfile,
    deleteProfile
} = require('../controller/profile')
const { 
    addBook, 
    getBook, 
    getBooks, 
    updateBook,
    deleteBook
} = require('../controller/book')
const { 
    addBookmark, 
    getBookmark, 
    getBookmarks, 
    updateBookmark,
    deleteBookmark
} = require('../controller/bookmark')
const { 
    addTransaction, 
    getTransaction, 
    getTransactions, 
    updateTransaction,
    updateApproveTransaction,
    updateCancelTransaction,
    deleteTransaction
} = require('../controller/transaction')

//middlewares
const {
    auth,
    isAdmin
} = require("../middlewares/auth")
const { 
    uploadBook,
    uploadImage
} = require('../middlewares/uploadFile')

//route
router.post('/register', register)
router.post('/login', login)

router.get('/check-auth', auth, checkAuth)
// router.get('/user', getUsers)
// router.get('/user/:id', getUser)
// router.delete('/user/:id', deleteUser)

router.get('/book', getBooks)
router.get('/book/:id', auth, getBook)
router.post('/book', auth, isAdmin, uploadBook('bookImage', 'bookFile'), addBook)
router.delete('/book/:id', deleteBook)
// router.patch('/book/:id', updateBook)

router.get('/profile', auth, getProfile)

router.get('/bookmark', auth, getBookmarks)
router.post('/bookmark/:id', auth, addBookmark)
router.delete('/bookmark/:idBook', auth, deleteBookmark)

router.get('/transaction', getTransactions)
router.post('/transaction', auth, uploadImage('imageProof'), addTransaction)
router.patch('/transaction-approve/:id', auth, isAdmin, updateApproveTransaction)
router.patch('/transaction-cancel/:id', auth, isAdmin, updateCancelTransaction)
// router.patch('/transaction/:id', auth, isAdmin, updateTransaction)
// router.get('/transaction/:id', getTransaction)

//pakai
// router.get('/user-test', getUsers)
// router.get('/user-test/:id', getUser)
// router.post('/user-test', addUser)
// router.patch('/user-test/:id', updateUser)
// router.delete('/user-test/:id', deleteUser)

// router.get('/profile-test', getProfiles)
// router.get('/profile-test/:id', getProfile)
// router.post('/profile-test', addProfile)
// router.patch('/profile-test/:id', updateProfile)
// router.delete('/profile-test/:id', deleteProfile)

// router.get('/bookmark-test', getBookmarks)
// router.get('/bookmark-test/:id', getBookmark)
// router.patch('/bookmark-test/:id', updateBookmark)

// router.get('/transaction-test', getTransactions)
// router.get('/transaction-test/:id', getTransaction)
// router.post('/transaction-test', auth, addTransaction)
// router.patch('/transaction-test/:id', updateTransaction)
// router.delete('/transaction-test/:id', deleteTransaction)

module.exports = router