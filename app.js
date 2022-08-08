// // const http = require('http');
// // const {readFileSync} = require('fs');
// // const home = readFileSync('./navbar-app/index.html')
// // const logo = readFileSync('./navbar-app/logo.svg')
// // const Styles = readFileSync('./navbar-app/styles.css')
// // const javaScript = readFileSync('./navbar-app/browser-app.js')

// // const server = http.createServer((req,res) => {
// //     if (req.url == '/')
// //     {
// //         res.writeHead(200, { "content-type": "text/html" });
// //         // res.write("Home Page");
// //         // console.log(home);
// //         res.write(home);
// //         res.end();
        
// //         }
// //     else if (req.url == '/logo.svg')
// //     {
// //         res.writeHead(200, { "content-type": "image/svg+xml" });
// //         // res.write("Home Page");
// //         // console.log(home);
// //         res.write(logo);
// //         res.end();
        
// //         }
// //     else if (req.url == '/styles.css')
// //     {
// //         res.writeHead(200, { "content-type": "text/css" });
// //         res.write(Styles);
// //         res.end();
        
// //         }
// //     else if (req.url == '/browser-app.js')
// //     {
// //         res.writeHead(200, { "content-type": "text/javascript" });
// //         // res.write("Home Page");
// //         // console.log(home);
// //         res.write(javaScript);
// //         res.end();
        
// //         }

// //     else if (req.url == '/about')
// //     {
// //         res.write("About Page")
// //         res.end();
// //     }
    
// //     else {
// //         res.writeHead(404).end("404 Cant find the Resources")
// //     }
// // })


// // server.listen(9000, () =>{
// //     console.log("Server is listening on Port 9000");
// // })


// // ---------------- USING EXPRESS---------------------------


// const express = require('express');
// const app = express();
// // const path =require('path')


// // const HomePath = path.resolve("./navbar-app/index.html");


// // app.use('/', express.static('./public'));

// // middlware to read JSON data which is coming to Req.body;
// app.use(express.json());



// const ProductRoute =require('./Routes/product')
    
   
// app.use("/api/products", ProductRoute);


// app.all("*", (req, res) => {
//     res.status(404).send("404.. ! Go back to <a href='/'>Home Page</a> ");
// })

// app.listen(9000, () => {
//     console.log("Server is Running on Port 5000");
// });


// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------


            // ----------------------- MongoDB------------------------

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Blog=require('./Model/blog')




// ConnectionString to Connect to MongoDB
const connectionString="mongodb+srv://NewUser:pakistan123@cluster0.xdefv.mongodb.net/FirstDatabse?retryWrites=true&w=majority"

// this is Asynchornos so it returns promise which we will check this way
mongoose.connect(connectionString).then((result) => {
    // console.log("Connected To Databse");
    // we want to listen request only when we are connected to Database so
    app.listen(8000, () => {
        console.log("Connected To Db and Server is listening on Port 8000");
    })
})
    .catch((err) => {
    console.log(err);
})

// if you see any deprecation warning do this otherwise if u still dont than thats fine as well
// mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopolgy:true});


// NOW we have to create a Model and Schema in a Folder.


//  >>>>>>>>>>>>>>>>>>>>>>>>> ONE WAY >>>>>>>>>>>>>>>>>>>>>>>>>>>>

// to add a Document
// app.get('/add-Blog', (req, res) => {
//     // when we create an instance of modal that is basically a document
//     const blog = new Blog({
//         title: "Third Blog",
//         snippet: "Blog about Technology",
//         body:"Read more about my Technology Blog"
//     })

//     blog.save().then((result) => {
//         res.send(result);
//     })
//         .catch((error) => {
//         console.log(error);
//     })
// })

// // to retrieve all blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//         res.json(result)
//         })
//         .catch((error) => {
//         console.log(error);
//     })
// })

// // to get Single BLog by ID
// app.get('/Single-Blog-By-Id/', (req, res) => {
//         Blog.findById("62dd61d3397bb2074659176b")
//           .then((result) => {
//             res.json(result);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
    
// })
// // to get Single BLog by Title
// app.get("/Single-Blog-By-title/:title", (req, res) => {
//   const { title } = req.params;
//   if (title) {
//     Blog.findOne({ title: title })
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } else {
//    res.send("404..! You Did not Provide the Title")
//   }
// });

// can also Redirect
// app.get('/', (req, res) => {
//     res.redirect('/Blogs')
// })

// app.get('/Blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//         res.status(200).json(result)
//         })
//         .catch((error) => {
//         console.log(error);
//     })
// })

const path=require('path')

app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./Form/index.html'))  
 
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
        res.json(result)
        })
        .catch((error) => {
        console.log(error);
    })
})

app.post('/blogs', (req, res) => {
    // console.log("Post",req.body);
    const abc = new Blog(req.body)

    abc.save().then((result) => {
        res.redirect('/blogs')
    })
        .catch((err) => {
        console.log(err);
    })
})