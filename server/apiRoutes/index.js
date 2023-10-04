const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))
router.use('/login', require('./login'))

//handles 404 errors
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router