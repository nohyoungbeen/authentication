const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) // bodyParser
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const db = [{ id: "admin", password: "1111", name: "홍길동", color:'black', save_id:'on'}]


app.get('/', (req, res) => {
    const { id, password, save_id } = req.cookies;
    if (id === db[0].id && password === db[0].password) {
        res.redirect("/home")
    }else{
        if(save_id == "on"){
            res.render("index",{id: db[0].id, save_id : db[0].save_id})
        }else{
            res.render("index",{id:""})
        }           
    }
})

app.post('/login', (req, res) => {
    const { id, password, save_id, color} = req.body;
    if (id === db[0].id && password === db[0].password) {
        if(save_id == "on") {
            res.cookie("save_id",save_id);
        }else{
            res.cookie("save_id",false)
        }
        res.cookie("color",color)
        res.cookie("id", id)
        res.cookie("password", password)
        res.redirect("/home")
    } else {
        res.redirect("/")
    }
  })

  app.get("/logout", (req, res) => {
    res.clearCookie("id") 
    res.clearCookie("password")
    res.redirect("/")
})

  app.get("/home", (req, res) => {
    const { id, password , color} = req.cookies;
    if (id === db[0].id && password === db[0].password) {
        res.render("home",{name: db[0].name, color : color});
    } else {
        res.redirect("/");
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})