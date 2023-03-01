const express = require('express')
const server = express()
const router = require('./router')
const PORT = process.env.PORT || 3000


const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

con.connect(error=> !error ? console.log('The database is connected...') : console.log('ERROR", error'))

server.get('/api', (req, res)=> {
    res.json({
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Customers': `http://localhost:${PORT}/api/customer`,
        'All Films': `http://localhost:${PORT}/api/film`
    })
})

// all route => just one route
server.get('/api/:table', (req,res)=> {
    const table = req.params.table
    // console.log(table)

    let sql

    if (table === 'actor') {
        sql = 'select * from actor order by last_name, first_name;'
    } else {
        sql = `select * from ${table}`
    }

    con.query(
        sql, 
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/:table/:id', (req, res)=> {
    const table = req.params.table
    const id = req.params.id

    // console.log(table, id)

    con.query(
        `select * from ${table} where ${table}_id = ${id};`,
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})


server.set('view engine', 'ejs')
server.use('/', router)

server.listen(PORT, ()=> {
    console.log(`Port ${PORT} and starboard`)
})