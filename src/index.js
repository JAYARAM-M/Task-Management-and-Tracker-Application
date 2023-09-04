const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const collection=require("./mongodb")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
const secretKey = '82481';
const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    try {
      const checking = await LogInCollection.findOne({ name: req.body.name });
      
      if (checking) {
        res.send("User details already exist");
      } else 
      {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword

        };
        
        //await LogInCollection.create(data);
       // res.send("User registered successfully");
     //  res.render('signup', { message: 'User registered successfully' })
         const createdUser = await LogInCollection.create(data);
          const token = jwt.sign({ id: createdUser._id }, secretKey);
          res.render('login', { message: 'User registered successfully' })
          //res.status(201).json({ token });
      // res.render('login')
      }
    } catch (error) {
      res.send("An error occurred "+error);
    }
 

  
});


app.post('/login', async (req, res) => {

    try {
        console.log("entered received")
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (!check) {
          res.send("User not found");
        
        }

        else 
        {
          const passwordMatch = await bcrypt.compare(req.body.password, check.password);
          if(passwordMatch)
          {
            const token = jwt.sign({ id: passwordMatch._id }, secretKey);
            res.render('home', { message: 'Logged In Successfully' })
          
          }
          else 
          {
            res.send('Incorrect password');
          }
          //  res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }


    } 
    
    catch (e) {

        res.send("wrong details "+e)
        

    }


})

app.get('/protected', authenticate, (req, res) => {
  res.send('This is a protected route');
});



app.listen(port, () => {
    console.log('port connected');
})
