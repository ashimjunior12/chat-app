const express = require("express")
const {getStats} = require('../controllers/statsController')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getStats)

module.exports = router;