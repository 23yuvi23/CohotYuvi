middleware 
node ke saath ek dikkat hai ki agar control ek baar bhi kisi middleware par gaya to control khud se agle route/middleware par nahi jaayega, use agle par lejaane ke liye aapko push karna padega aur ye push kahlaayega next ko chalaana

```js
app.use(function (req, res, next) {

    next();

});
```

### request response next

req mein saara data hota hai aane waale user ki request ki taraf ka, jaise ki uski location, device info and other
things, 
res mein controls hote hai jinke basis pe hum server se response bhej paate hai
next is just push so our request move to the next thing which should be executed

## Dynamic routing 
aisa koi bhi route jiska eak hissa same rehta hai and kuch hissa baar baar change hota hai iske liye aap eak dynamic route bana sakte ho 

facebook.com/yuvi
facebook.com/renu
facebook.com/riyu

so bs last part change hora so we use dynamic routing here 

so we can build a parameter 
facebook.com/:kuchBhi        : ka matlab iski jagah kuch bhi aa sakta hai 


## points Route parameters
- to make any route dynamic you can use : at the place where you want to make it dynamic and to access there value use req.params
- browser se koi data bheja to vo request mai jayega 
- hum jo data bhejte hai vo res mai hoga hamesa 
- url mai jab bhi aapke paas aisa pattern ho

/profile/:username                      //ye : ho is : ki value access krne ke liye humko params mai milega bec : is symbol ka name hai params 
so we will access like this    req.params.username

```js
app.get('/profile/:username',(req,res)=>{
    res.send(`hello from ${req.params.username}`)
})
```                   


## Tempelate engines  => ye ek style of markup se convert karkek apko html dete hai 
html ke paas super power nahi hai calculation karne ki so we use ejs 
- ejs is html but in backend name is called ejs 
- ejs is html with superpowers
- aur bhi hote hai engines eg  pug,jade

- need kyu hai ejs ki because direcs js ke andar express mai html likhna bahut ajeeb ho jata hai  to ejs use krte hai 
- so backend mai hum html ka advance version ejs use krte hai 

## To setup ejs steps 
1. ejs install   ```npm install ejs```
2. configure ejs  ```app.set("view engine","ejs")```  //is line ko apne script js mai kisi bhi route se pehle place krdo middleware ke jese 
3. ek `views` folder banao
4. usme ejs files banao         //index.ejs
5. send ki jagah render karo    //res.send  -->>   res.render
6. render karte wakt make sure aap views folder ke andar wali hi koi file ka naam likho and us render function mai `.ejs` mention na kare

7.      ```js
            app.get('/', (req, res) => {
            res.render('index')
            })
        ```

8. tum decide kar sakte ho ki render karte wakt page mai konsi cheej kya ban jaye 

eg 

```js

app.get('/', (req, res) => {
  res.render('index', {age:12})  // yha mai chata hu age jha pr bhi likha ho vha 12 aa jaye likha hua 
})

```

9. but iske liye html mai bhi thoda changes karne honge 


```ejs
<body>
    <h1>
        hello i am ejs jo html jaisa dikhta hu pr hu nahi html <%= age%>           //<%= age%>   aisa likho tab hi vo value change hogi usme jisme tum karna chate ho
    </h1>
</body>
```

## Static files 
images,styleshhet,frontend setup karna 

## To setup static files

1. create a folder called public
2. create three folders inside it, images, stylesheets,
javascripts
3. configure the express static in script.js
4. understand the path


## error handling in expressjs
```js
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

```