const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000
const fetch = (...args)=> import('node-fetch').then(({default: fetch})=> fetch(...args))

router.get('/', (req,res) => {
    const url = `http://localhost:${PORT}/api/actor`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/actor', {
                title: 'Actors',
                name: 'Actor Catalogue',
                data
            })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/actor/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/actor_single', {
                title: `${data.first_name} ${data.last_name}`,
                name: `${data.first_name} ${data.last_name}`,
                data
            })
        })
})

module.exports = router