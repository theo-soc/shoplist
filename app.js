const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const lists = require('./lists').lists;
const items = require('./items').items;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.post('/register', async (req, res) => {
    try{
     const xhr = new XMLHttpRequest();
     xhr.open("POST", "aws.signup");
     const body = JSON.stringify({
	  username: req.body.username,
	  first_name: req.body.first_name,
	  last_name: req.body.last_name,
	  email: req.body.email,
	  password: req.body.password
     });
     xhr.onload = () => {
	 if (xhr.readyState == 4 && xhr.status == 201) {
		console.log(JSON.parse(xhr.responseText));
		res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
	 }else {
		console.log("error: ${xhr.status}");
	 }
     };

   xhr.send(body);

        //let foundUser = users.find((data) => req.body.email === data.email);
        //if (!foundUser) {
        // 
        //    let hashPassword = await bcrypt.hash(req.body.password, 10);
        //
        //    let newUser = {
        //        id: Date.now(),
        //        username: req.body.username,
        //        email: req.body.email,
        //        password: hashPassword,
         //   };
         //   users.push(newUser);
         //   console.log('User list', users);
    
         //   res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        //} else {
        //    res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        //}
    } catch{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
         
            let hashPassword = await bcrypt.hash(req.body.password, 10);
        
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
        //res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
     const xhr = new XMLHttpRequest();
     xhr.open("POST", "aws.login");
     const body = JSON.stringify({
	  username: req.body.username,
	  password: req.body.password
     });
     xhr.onload = () => {
	 if (xhr.readyState == 4 && xhr.status == 201) {
		console.log(JSON.parse(xhr.responseText));
            //res.redirect("./home.html");
	 }else {
		console.log("error: ${xhr.status}");
	 }
     };        
        //let foundUser = users.find((data) => req.body.email === data.email);
        //if (foundUser) {
    
        //    let submittedPass = req.body.password; 
        //    let storedPass = foundUser.password; 
    
        //    const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
        //    if (passwordMatch) {
        //        let usrname = foundUser.username;
        //        res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
        //    } else {
        //        res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
        //    }
        //}
        //else {
        //
        //    let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
        //    await bcrypt.compare(req.body.password, fakePass);
        //
        //    res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        //}
    } catch{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                var resultS = `<header><script>function getList(l){;`;
                resultS = resultS + ` var ll = document.getElementById('LL');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ll.value = l;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;

                resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateList' method='POST'><input type='HIDDEN' name='usrName' value='`+usrname+`'><button type ='submit'>Create List</Button></form><hr><form id='FF' action = '/getList' method='POST'><input type='HIDDEN' name='usrName' value='`+usrname+`'><input type='HIDDEN' id='LL' name='LL' value=''><ol id='lists'>`;

                lists.forEach(function(item){

                  resultS = resultS + `<li><a href='' onClick="getList(\'`+item.listName+`\');return false;">` + item.listName + `</a>`;
                });
                resultS = resultS + "</ol></form></div></body>";

                res.send(resultS);
                
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
        
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
        
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
        res.send("Internal server error");
    }
});



app.post('/getList', async(req,res) =>{
  try{
    //Get list from backend services
      var resultS = `<header><script>function delItem(i){`;
                resultS = resultS + ` var ii = document.getElementById('II');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ii.value = i;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;
     resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><button type ='submit'>Add Item to list</Button></form><hr><form id='FF' action = '/delItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' id='II' name='II' value=''><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><ol id='items'>`;
                let foundList = items.find((data) => req.body.LL === data.listName);
                if(foundList){
                  foundList.items.forEach(function(item){
                    resultS = resultS + `<li>` + item.itemName + `<a href="" onClick="delItem('`+item.itemName+`');return false;">Delete</a>`;
                });
                }
                resultS = resultS + "</ol></form><form action='/GoBackToList' method='POST'><button type ='submit'>Back</button><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'></form></div></body>";

                res.send(resultS);
                
  } catch{
        res.send("Internal server error");
  }
});

app.post('/goCreateList', async(req,res) =>{
  try{
   var resultS = `<form action='/createList' method='POST'><fieldset><label>List Name</label>`;
   resultS = resultS + `<input type ='text' id = 'listName' name='listName' placeholder='My list' required>`;
   resultS= resultS + `<input type ='HIDDEN' id = 'usrName' name='usrName' value='`+req.body.usrName+`'>`;
   resultS= resultS + `<br><br><label>Description</label><textarea id='description' name='description' rows='4' cols='50'>`;
   resultS= resultS + `</textarea><br><br><button type ='reset'>Reset</button><button type ='submit'>Submit</button>`;
   resultS= resultS + `</fieldset></form><form action='/GoBackToList' method='POST'><button type ='submit'>Back</button><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'></form>`;
   res.send(resultS);
    //res.redirect("./createList.html");
  } catch{
        res.send("Internal server error");
  }
});


app.post('/goCreateItem', async(req,res) =>{
  try{
   var resultS = `<div><form action='/createItem' method='POST'><fieldset><label>Item Name</label>`
   resultS= resultS + `<input type ='text' id = 'itemName' name='itemName' placeholder='My Item' required>`;
   resultS= resultS + `<input type ='HIDDEN' id = 'LL' name='LL' value='`+req.body.LL+`'>`;
   resultS= resultS + `<input type ='HIDDEN' id = 'usrName' name='usrName' value='`+req.body.usrName+`'>`;
   resultS= resultS + `<br><br><br><br><button type ='reset'>Reset</button>`;
   resultS= resultS + `<button type ='submit'>Submit</button></fieldset></form><form action='/GoBackToItems' method='POST'><button type ='submit'>Back</button><input type ='HIDDEN' id = 'LL' name='LL' value='`+req.body.LL+`'><input type ='HIDDEN' id = 'usrName' name='usrName' value='`+req.body.usrName+`'></form>`;
   res.send(resultS);
    //res.redirect("./createItem.html");
  } catch{
        res.send("Internal server error");
  }
});

app.post('/goBackToItems', async(req,res) =>{
  try{

      var resultS = `<header><script>function delItem(i){`;
                resultS = resultS + ` var ii = document.getElementById('II');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ii.value = i;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;
     resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrname+`'><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><button type ='submit'>Add Item to list</Button></form><hr><form id='FF' action = '/delItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' id='II' name='II' value=''><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><ol id='items'>`;

                let foundList = items.find((data) => req.body.LL === data.listName);
                if(foundList){ 
                  foundList.items.forEach(function(item){
                    resultS = resultS + `<li>` + item.itemName + `<a href="" onClick="delItem('`+item.itemName+`');return false;">Delete</a>`;
                  });
                }

                resultS = resultS + "</ol></form><form action='/GoBackToList' method='POST'><button type ='submit'>Back</button><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'></form></div></body>";

                res.send(resultS);

  } catch{
        res.send("Internal server error");
  }
});
app.post('/createItem', async(req,res) =>{
   try{
    //Get list from backend services

     var foundList = items.find((data) => req.body.LL === data.listName);

     if (!foundList) { //First Item in list
       let firstItem = {
         id: Date.now(),
         listName : req.body.LL,
         items : []
       }
       items.push(firstItem);

     }

     foundList = items.find((data) => req.body.LL === data.listName);

     let foundItem = foundList.items.find((data) => req.body.itemName === data.itemName);

     if (!foundItem&&foundList) {
       
            let newItem = {
                id: Date.now(),
                itemName: req.body.itemName
            };

            var foundList2 = items.find((data) => req.body.LL === data.listName);
            foundList2.items.push(newItem);
            console.log('New Items', items);

      var resultS = `<header><script>function delItem(i){`;
                resultS = resultS + ` var ii = document.getElementById('II');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ii.value = i;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;
     resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrname+`'><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><button type ='submit'>Add Item to list</Button></form><hr><form id='FF' action = '/delItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' id='II' name='II' value=''><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><ol id='items'>`;

                
                foundList2.items.forEach(function(item){
                  resultS = resultS + `<li>` + item.itemName + `<a href="" onClick="delItem('`+item.itemName+`');return false;">Delete</a>`;
                });
                resultS = resultS + "</ol></form><form action='/GoBackToList' method='POST'><button type ='submit'>Back</button><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'></form></div></body>";

                res.send(resultS);
              } else {
                res.send(`<div>Item Already in List</div>`);
              }  

   } catch{
        res.send("Internal server error");
   }
 
});

app.post('/GoBackToList', async(req,res) =>{
   try{
            var resultS = `<header><script>function getList(l){`;
                resultS = resultS + ` var ll = document.getElementById('LL');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ll.value = l;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;

                resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateList' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><button type ='submit'>Create List</Button></form><hr><form id='FF' action = '/getList' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' id='LL' name='LL' value=''><ol id='lists'>`;

                lists.forEach(function(item){

                  resultS = resultS + `<li><a href='' onClick="getList(\'`+item.listName+`\');return false;">` + item.listName + `</a>`;
                });
                resultS = resultS + "</ol></form></div></body>";

                res.send(resultS);          
            //res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");


   } catch{
        res.send("Internal server error");
   }
});

app.post('/delItem', async(req,res) =>{
   try{
     let foundList = items.find((data) => req.body.LL === data.listName);
     let foundItem = foundList.items.find((data) => req.body.II === data.itemName);
     const index = foundList.items.indexOf(foundItem);
     const x = foundList.items.splice(index,1);
     console.log('New Items', items);

      var resultS = `<header><script>function delItem(i){`;
                resultS = resultS + ` var ii = document.getElementById('II');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ii.value = i;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;
     resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><button type ='submit'>Add Item to list</Button></form><hr><form id='FF' action = '/delItem' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' id='II' name='II' value=''><input type='HIDDEN' name='LL' id='LL' value='`+req.body.LL+`'><ol id='items'>`;
                let foundList2 = items.find((data) => req.body.LL === data.listName);
                if(foundList2){
                  foundList2.items.forEach(function(item){
                    resultS = resultS + `<li>` + item.itemName + `<a href="" onClick="delItem('`+item.itemName+`');return false;">Delete</a>`;
                });
                }
                resultS = resultS + "</ol></form></div></body>";

                res.send(resultS);
     
   } catch{
        res.send("Internal server error");
   }
 
});

app.post('/createList', async(req,res) =>{
   try{
     let foundList = lists.find((data) => req.body.listName === data.listName);
        if (!foundList) {
       
            let newList = {
                id: Date.now(),
                listName: req.body.listName,
                description: req.body.description,
            };
            lists.push(newList);
            console.log('New list', lists);
            var resultS = `<header><script>function getList(l){`;
                resultS = resultS + ` var ll = document.getElementById('LL');`;
                resultS = resultS + ` var ff = document.getElementById('FF');`;
                resultS = resultS + ` ll.value = l;`;
                resultS = resultS + ` ff.submit();`;
                resultS = resultS + `}</script></header>`;

                resultS = resultS + `<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls' crossorigin='anonymous'><body><div align ='center'><form action='/goCreateList' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><button type ='submit'>Create List</Button></form><hr><form id='FF' action = '/getList' method='POST'><input type='HIDDEN' name='usrName' value='`+req.body.usrName+`'><input type='HIDDEN' id='LL' name='LL' value=''><ol id='lists'>`;

                lists.forEach(function(item){

                  resultS = resultS + `<li><a href='' onClick="getList(\'`+item.listName+`\');return false;">` + item.listName + `</a>`;
                });
                resultS = resultS + "</ol></form></div></body>";

                res.send(resultS);          
            //res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>List name already used</h2></div><br><br><div align='center'><a href='./home.html'>Try again</a></div>");
        }
   } catch{
        res.send("Internal server error");
   }
 
});

server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});