const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000
const fetch = (...args)=> import('node-fetch').then(({default: fetch})=> fetch(...args))

router.get('/', (req,res) => {
    const url = `http://localhost:${PORT}/api/customer`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/customer', {
                title: 'Customers',
                name: 'Customer Census',
                data
            })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/customer/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/customer_single', {
                title: `${data.first_name} ${data.last_name}`,
                name: 'Wendigo Blockbuster',
                data
            })
        })
})

module.exports = router