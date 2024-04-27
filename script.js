const mongoose=require('mongoose');
const brypt=require('bcrypt');
const bdy=require('body-parser');
const app=require('express')();
app.use(bdy.urlencoded({extended:true}));
let convert_hash=(pass)=>{
    let xx=brypt.hashSync(pass,10);
    return xx;
}


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/page/index.html')
})
app.post('/user_save',(req,res)=>{
    let msg=req.body.name
    let password=req.body.password
    mongoose.connect("mongodb://localhost:27017/bubt")
    .then(()=>{
    const Sch=new mongoose.Schema({name:String,pass:String})
    const mod=mongoose.model('user',Sch,'user')
    const obj=new mod({name:msg,pass:convert_hash(password)})
    obj.save()
    .then(()=>res.send('Inserted'))
    .catch(err=>console.log(err))
})
.catch(err=>console.log(err))
    
})
app.listen(3040,()=>{
    console.log('Listening...')
})