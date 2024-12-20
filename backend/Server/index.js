const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const multer = require('multer') 
const app = express();
const port = 5000;
const {verification,storage,checkPassword,checkEmail} = require('./Functions/middlewares.js')
const {Login,SignUp,UpdateProfile,ChangePassword,AccountDelete,AddProduct,UpdateProduct,DeleteProduct,AllProducts,YourProducts,ProductBuying,Approving,GetQuery,GetSamples,YourBoughtProducts,reviewSystem,GetChat,addChat,FileUpload} = require('./Functions/Endpoints.js')
const cors = require('cors')

const upload = multer({ storage: storage })

dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/Functions/Database/Uploads', express.static('Functions/Database/Uploads')); 

const mongoURI = process.env.MongoDbURL
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => { 
    console.log('Error connecting to MongoDB', err);
  });
  
app.post('/SignUp' ,checkPassword,checkEmail, SignUp); 
app.post('/Login' , Login); 
app.post('/UpdateProfile' , verification , UpdateProfile); 
app.post('/ChangePassword' , verification , ChangePassword); 
app.post('/AccountDelete'  , AccountDelete);    
app.post('/AddProduct' , verification , AddProduct); 
app.post('/UpdateProduct' , verification , UpdateProduct); 
app.post('/DeleteProduct' , verification , DeleteProduct); 
app.post('/AllProducts' , verification , AllProducts);
app.post('/YourProducts' , verification , YourProducts);
app.post('/ProductBuying' , verification , ProductBuying);
app.post('/Approving/:id/:time/:chatid' , verification , Approving);
app.post('/example/:que',GetSamples)
app.post('/query', GetQuery) 
app.post('/YourBoughtProducts',verification,YourBoughtProducts);
app.post('/review',verification,reviewSystem) 
app.post('/getChat',verification,GetChat) 
app.post('/sendChat',verification,addChat) 
app.post('/addImage',upload.single('image'),FileUpload) 



app.listen(port ,()=>{
    console.log("Server Working Fine on Port "+port);
})
   