const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000
const fetch = (...args)=> import('node-fetch').then(({default: fetch})=> fetch(...args))

//All films
router.get('/', (req, res)=>{
    const url = `http://localhost:${PORT}/api/film`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/film', {
                title: 'Films',
                name: 'Our Films',
                data
            })
        })
})

// Single film
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/film/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/film_single', {
                title: `${data.title}`,
                name: `${data.title}`,
                data
            })
        })
})

module.exports = router