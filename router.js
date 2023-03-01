const express = require('express')
const router = express.Router()

router.use(express.static('public'))

// 1. import filmRoutes
const filmRoutes = require('./routes/filmRoutes')

// 2. build filmRoutes
// 3. build pages/film.ejs & pages/film_single.ejs

// 4. use film routes
router.use('/film', filmRoutes)

// actor routes
const actorRoutes = require('./routes/actorRoutes')
router.use('/actor', actorRoutes)

// customer routes
const customerRoutes = require('./routes/customerRoutes')
router.use('/customer', customerRoutes)


router.get('/', (req, res)=> {
    res.render('pages/home', {
        title:'Home',
        name: 'Sakila Home Page'
    })
})

router.get('*', (req, res)=> {
    if(req.url == 'favicon.ico/') {
        res.end()
    } else {
        res.send('<h1> 404 EROR THIS PAGE DOES NOT EXIST </h1>')
    }
})

module.exports = router