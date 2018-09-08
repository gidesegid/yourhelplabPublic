
var express=require('express');
var router=express.Router();
var app=require('express')();
var http=require('http').Server(app);
var unprotected=express.Router()
var nodemailer = require('nodemailer');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var jwt=require('jsonwebtoken');
//var axios = require('axios');
const fs           = require('fs');
const path         = require('path');
const uuid         = require('node-uuid');
const md5  = require('md5');
const sha1 = require('sha1');
var multer = require('multer');
var upload = multer({ dest: './public/userImage' });
var request = require('request');
var cheerio = require('cheerio');
var expressjwt=require('express-jwt');
var secretKey = uuid.v4();
var keys=require('../config/keys');
var stripe=require('stripe')(keys.stripeSecretKey)
var nJwt = require('njwt');
 var publicKey=keys.stripePublishableKey
 router.use(bodyParser.json());
var connection=mysql.createConnection({
    host:'hykrdb.cmsfrokrxjf7.us-west-2.rds.amazonaws.com',
    user:'hlabusr',
    password:'Dui84kdjkf',
    database:'helplab'
    // host:'localhost',
    // user:'yourhelp_gide',
    // password:'wedisegid@123',
    // database:'yourhelp_DB'
});
connection.connect(function(error){
  if(!!error){
    console.log('Error'+error);
  }else{
    console.log('succesfully connected to db');
  }
})
//token verification
    function mytoken(req,res,next){
      var token=req.body.token || req.query.token || req.headers['x-access-token'];
           if (token) {
        // verifies secret and checks exp
            jwt.verify(token,secretKey, function(err, decoded) {
                if (err) { //failed verification.
                   return res.json("failed to verfy")
                }
                req.decoded = decoded;
               next(); //no error, proceed
            });
        } else {
           console.log("you are not allwed"+req)
          return res.redirect('/errors')
        }
    }
    function removeFile(directory,fileName){
       fs.unlink('./public/'+directory+'/'+fileName, function(err) {
        if(err && err.code == 'ENOENT') {
        } else if (err) {
        } else {
        }
      });
    }
      //login
    const myPasswordHash = md5('transport-routerlication');
    var username
    var password
    router.post('/login',function(req,res){
      username=req.body.username;
      password=sha1(req.body.password+'-'+username);

           connection.query("select id,name,username,password,photo,country,livesIn from users where username=? and password=? Limit 1",[username,password],function(error,row,fields){
              if(!!error){
                }else if(row.length>0){
                userdata={}
                userdata.clientId;
                userdata.professionalId;
                 row.forEach(function (row) {
                  userdata.userId=row.id
                  userdata.name=row.name
                  userdata.photo=row.photo;
                  userdata.country=row.country;
                  userdata.livesIn=row.livesIn;
                 })
               // isClient(userdata.userId,callback)
                    isClient(userdata.userId, function(err, result){
                      userdata.clientId=result
                    });

                   hasProfession(userdata.userId, function(err, result){
                        userdata.professionalId=result
                    });
                     userPermission(userdata.userId, function(err, result){
                        userdata.permission=result
                         var  allinfo={
                          userId:userdata.userId,
                          userFullName:userdata.name,
                          photo:userdata.photo,
                          country:userdata.country,
                          livesIn:userdata.livesIn,
                          clientId:userdata.clientId,
                          professionalId:userdata.professionalId,
                          permission:userdata.permission
                         }
                         var claims = {
                          sub:userdata.userId,
                          iss: 'https://jobFinder',
                          permissions: userdata.permission,
                          clientId:userdata.clientId,
                          professionalId:userdata.professionalId,
                          expiresInMinutes: 24
                        }
                        var jwt = nJwt.create(claims,secretKey);
                        token = jwt.compact();
                        res.json({logedIn:true,
                                  result:allinfo,
                                  token:token
                        })
                  });
                }else{
                   res.json({logedIn:false,
                             result:'no',
                             });
                }
            })
      })
      router.get('/login',function(req,res){
        res.render('login.html')
     });
     router.get('/login2',function(req,res){
       res.render('login0.html')
    });
    router.get('/transportHomePage',function(req,res){
      res.render('transportHomePage.html')
    })
      router.get('/googlecf9b74790dd04f49.html',function(req,res){
        res.render('googlecf9b74790dd04f49.html')
     });
     router.get('/paid',function(req,res){
       res.render('paid.html')
    });
    router.get('/workList',function(req,res){
      res.render('workList.html')
   });
       router.get('/',function(req,res){
        res.render('searches.html')
        //res.render('testHome.html')
     });
       router.get('/about',function(req,res){
          res.render('about.html')
       });
       router.get('/contactus',function(req,res){
        res.render('/contactus.html')
       })
       router.get('/salethingsFromHome',function(req,res){
        res.render('/salethingsFromHome.html')
      });
      router.get('/newsFromHome',function(req,res){
       res.render('/newsFromHome.html')
     });
       //saleItemMeasurments.html
       router.get('/saleItemMeasurments',function(req,res){
        res.render('/saleItemMeasurments.html')
       })
       router.get('/test3',function(req,res){
        res.render('/test3.html')
       })
       router.get('/mobileChat',function(req,res){
        res.render('/mobileChat.html')
       })

       router.post('/contactus',function(req,res){
        var name=req.body.name;
        var email=req.body.email;
        var tele=req.body.tele;
        var message=req.body.message;
        var date=Date.now();
         connection.query("insert into contactus(name,email,tele,message,date) values('"+name+"','"+email+"','"+tele+"','"+message+"','"+date+"')",function(error,row,fields){
          if(!!error){
             res.json("There was error while sending")
          }else{
            res.json("Your message has been sendt succesfully.Thank you somuch for contacting us")
          }
         })
       })
    function isAuthenticated(req,res,next){
      if(req.isAuthenticated()){
        next();
      }else{
        next(new Error(401))
      }
    }
    function checkUserInDatabase(data,callback){
       connection.query("select username,password from users where username=? and password=? Limit 1",[data.username,data.password],function(error,row,fields){
              if(!!error){
                // res.json(error)
                }else if(row.length>0){
                   callback(null, row[0].username);
                }else{
                  callback(null,undefined)
                }
        })
    }
        router.get('/home/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('index.html')
                      //res.render('testHome.html')
                     }else{
                        res.redirect('/')
                     }
                  });
           })
           router.get('/userDetails/:userFullName',function(req,res){
                    var data={}
                    data.username=username;
                    data.password=password
                    checkUserInDatabase(data, function(err, result){
                        if(result!==undefined){
                         res.render('userDetails.html')
                        }else{
                           res.redirect('/')
                        }
                     });
              })
      router.get('/dailyLifeHappenings/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('dailyLifeHappenings.html')
                     }else{
                        res.redirect('/')
                     }
                  });
      });
       router.get('/professionalRegistrationForm/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('professionalRegistrationForm.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
       //professionalTransactions
      router.get('/professionalTransactions/:userFullName',function(req,res){
                   var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('professionalTransactions.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
     //findTransport
      router.get('/findTransport/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                     res.render('findTransport.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
        router.get('/clientRegistrationForm/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                     res.render('clientRegistrationForm.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
    //generalproblems
     router.get('/issues/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password;
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                     res.render('issues.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
     router.get('/login2',function(req,res){
       res.render('login2.html')
     })
      //professionalRegistrationForm.html
     router.get('/chatbox/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('chatbox.html')
                     }else{
                        res.redirect('/')
                     }
                  });

     });
      router.get('/admin/permission',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('permission.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
     //thingsToSale
      router.get('/thingsToSale/:userFullName',function(req,res){
                  var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                       res.render('thingsToSale.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
       //notifications
    router.get('/notifications/:userFullName',function(req,res){
                var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('notifications.html')
                     }else{
                        res.redirect('/')
                     }
                  });

     });
    router.get('/cities/:city/:country',function(req,res){
               var city=req.params.city;
               var country=req.params.country
               getCountryId(country,function(error,result){
                  var countryId=result;
                  if(result==undefined){
                  }else{
                    connection.query("select cityName from cities where countryId='"+countryId+"' and cityName like '"+city+"%'",function(error,row,fields){
                     if(!!error){
                       res.json(error)
                     }else{
                       res.json(row)
                     }
                   })
                  }

               })
    })
    router.get('/NetherlandCities/:city',function(req,res){
               var city=req.params.city;
              connection.query("select cityName from cities where  cityName like '"+city+"%'",function(error,row,fields){
               if(!!error){
                 res.json(error)
               }else{
                 res.json(row)
               }
             })

    })
    function getCountryId(country,callback){
        connection.query("select Id from countries where country='"+country+"'",function(error,row,fields){
          if(!!error){
          callback(error,"no country by such id or there was something wrong")
          }else{
            callback(null,row[0].Id)
          }
        })
    }
    router.get('/countries/:country',function(req,res){
      var country=req.params.country
             connection.query("select country from countries where country like '"+country+"%'",function(error,row,fields){
               if(!!error){
                 res.json(error)
               }else{
                 res.json(row)
               }
             })
   })
         //settings
          router.get('/settings/:userFullName',function(req,res){
                 var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('settings.html')
                     }else{
                        res.redirect('/')
                     }
                  });
          });
           //admin
          router.get('/admin/home',function(req,res){
            //res.render('admin.html')
            var data={}
                 data.username=username;
                 data.password=password
                 checkUserInDatabase(data, function(err, result){
                     if(result!==undefined){
                      res.render('admin.html')
                     }else{
                        res.redirect('/')
                     }
                  });
     });
           router.get('/errors',function(req,res){
        res.render('errors.html')
     });

  //loading images
     var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './upload');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
      });

      var upload = multer({ //multer settings
                      storage: storage
                  }).single('file');
      /** API path that will upload the files */
      router.post('/upload', function(req, res) {
          upload(req,res,function(err){
              if(err){
                   res.json({error_code:1,err_desc:err});
                   return;
              }
               res.json({error_code:0,err_desc:null});
          });
      });
      router.post('/getUserInfoForForgetpassword',function(req,res){
        var name=req.body.name;
        var username=req.body.username;
        var email=req.body.email;
        connection.query("select id,name,username,email from users where name=? and username=? and email=?",[name,username,email],function(error,row){
          if(!!error){
            res.json("error")
          }else if(row.length==0){
            res.json("nouser")
          }else{
            res.json(row)
          }
        })
      })
  //update user info
    router.post('/updateUserInfo',mytoken,function(req,res){
      var userId=req.decoded.sub;
      var name=req.body.name;
      var username=req.body.username;
      var email=req.body.email;
      var password=sha1(req.body.password+'-'+username);
      var userBirthDate=req.body.userBirthDate;
      var country=req.body.country;
      var livesIn=req.body.livesIn;
       connection.query("UPDATE users SET name='"+name+"', username='"+username+"', email='"+email+"', password='"+password+"', birthDate='"+userBirthDate+"', country='"+country+"', livesIn='"+livesIn+"'  where id='?'",userId,function(error,row){
            if(!!error){
              res.json(error)
            }else{
              res.json(row)
            }
        })
      })
    router.post('/admin/getPermissions',mytoken,function(req,res){
      var userId=req.decoded.sub;
      var permission=req.decoded.permissions;
      var user=req.body.user;
      if(permission=="admin"){
        if(user=='' || user==null){
          connection.query("select users.name as name,users.id as userId,users.username as username,permissiontable.permission as permission,"+
           "permissiontable.Id as permissionId from users  "+
           "LEFT JOIN permissiontable ON users.id=permissiontable.userId",function(error,row,fields){
             if(!!error){
                 res.json(error)
             }else{
                res.json(row)
             }
           })
        }else{
          connection.query("select users.name as name,users.id as userId,users.username as username,permissiontable.permission as permission,"+
           "permissiontable.Id as permissionId from users  "+
           "LEFT JOIN permissiontable ON users.id=permissiontable.userId where users.name=?",user,function(error,row,fields){
             if(!!error){
                 res.json(error)
             }else{
                res.json(row)
             }
           })
        }

       }else{
        res.json("you are not allowed")
       }

    })
     function isClient(userId,callback){
            connection.query("select Id from clients where userId=?",userId,function(error,row,fields){
                  if(!!error){
                     res.json(error)
                    }else if(row.length>0){
                       callback(null, row[0].Id);
                    }else{
                      callback(null,undefined)
                    }
          })
      }
       function userPermission(userId,callback){
            connection.query("select permissiontable.permission as permission from permissiontable INNER JOIN users ON permissiontable.userId=users.id where permissiontable.userId=? LIMIT 1",userId,function(error,row,fields){
                  if(!!error){
                     res.json(error)
                    }else if(row.length>0){
                       callback(null, row[0].permission);
                    }else{
                      callback(null,undefined)
                    }
          })
      }
  //identify if the user is professional
  function hasProfession(userId,callback){
     connection.query("select Id from professionalstable where userId=?",userId,function(error,row,fields){
            if(!!error){
               res.json(error)
              }else if(row.length>0){
                callback(null,row[0].Id)
              }else{
               callback(null,undefined)
              }
      })
  }

    //post user room
   router.post('/postRoom',mytoken,function(req,res){
    var idUser=req.decoded.sub
    var toUserId=req.body.toUserId
       connection.query("select userroom,photo from users where id=? LIMIT 1",toUserId,function(error,row,fields){
            if(!!error){
             }else{
                res.json(row)
             }

        })
    })
    router.post('/changePassword',function(req,res){
      var id=req.body.id;

      var username=req.body.username;
      var password=sha1(req.body.password+'-'+username);
      connection.query("update users set password='"+password+"' where id=?",id,function(error,result){
        if(!!error){
          res.json("there was error")
        }else{
          res.json("your password has been changed succesfully")
        }
      })
    })
//registering a user
    router.post('/register',function(req,res){
      var name=req.body.name;
      var username=req.body.username;
      var email=req.body.email;
      var password=sha1(req.body.password+'-'+username);
      var gender=req.body.gender;
      var birthDate=req.body.birthDate;
      var country=req.body.country;
      var livesIn=req.body.livesIn;
      if(gender==1){
          var photo="woman"
      }else if(gender==2){
          var photo="man"
      }else{

      }
      sendEmailTo(email,function(error,result){
      })
        var date=Date.now();
       connection.query("insert into users(name,username,email,password,photo,gender,birthDate,registrationDate,country,livesIn)values('"+name+"','"+username+"','"+email+"','"+password+"','"+photo+"','"+gender+"','"+birthDate+"','"+date+"','"+country+"','"+livesIn+"')",function(error,row,fields){
            if(!!error){
                    res.json(error)
                  }else{
                    res.json(row.insertId);

                  }
        })
    })
    function sendEmailTo(email,callback){
      var transporter = nodemailer.createTransport({
          host: 'mail.yourhelplab.com',
          auth: {
              user: 'admin@yourhelplab.com', // Your email id
              pass: 'wedisegid@123' // Your password
          },
          tls:{
            rejectUnauthorized:false
          }
       });
      var text = 'Well come to yourhelplab.com ';
      var mailOptions = {
          from:transporter.options.auth, // sender address
          to: email, // list of receivers
          subject: 'Email Example', // Subject line
          text:text //, // plaintext body
         // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
      };
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
          callback(error,error)
        }else{
          callback(null,"Email has been send succefully")
        }
      })
    }
  //user registration information /userSettings
   router.post('/userSettings',mytoken,function(req,res){
     var userId=req.decoded.sub
      connection.query("select id,name,username,email,password,birthDate,gender,country,livesIn,photo from users where id='?'",userId,function(error,row,fields){
          if(!!error){
                 res.json(error)
                }else{
                   res.json(row);
                }
      })
    })
   //check user name
   router.post('/checkUserName/:username',function(req,res){
     var username=req.params.username
      connection.query("select username from users where username=?",username,function(error,row,fields){
          if(!!error){
                 res.json(error)
                }else{
                   res.json(row);
                }
      })
    })

//profile image upload
    var upload5=multer({dest:'./public/userImage'});
       router.post('/uploadUserProfile1/',upload5.single('file'),uploadInfoToDatabase5);
       function uploadInfoToDatabase5(req,res){
        var userId=req.body.data;
        var file=req.file;
        var fileName=file.filename;
       var fileType=file.mimetype;
       var destination=file.destination;
               connection.query("UPDATE users SET photo='"+fileName+"' WHERE id='"+userId+"'",function(error,row,fields){
                  if(!!error){
                  }else{
                  }
                });
               connection.query("select photo from users where id='"+userId+"'",function(error,row,fields){
                if(!!error){
                 res.json(error)
                }else{
                 res.json(row)
                }
               })
       }
  //insert traveller contact information to passenger table
    router.post('/contactinfo',mytoken,function(req,res){
            var userId=req.decoded.sub;
            var transportChoosed=req.body.transportChoosed;
            var fromPlace=req.body.fromPlace
            var toPlace=req.body.toPlace;
            var date=req.body.date;
            var fromTime=req.body.fromTime
            var registrationDate=Date.now();
            var telephone=req.body.telephone;
            var code=req.body.code;
            var passengerRemarks=req.body.passengerRemarks
            connection.query("insert into passenger(userId,telephone,date,fromTime,fromPlace,toPlace,transportChoosed,code,registrationDate,remarks) values('"+userId+"','"+telephone+"','"+date+"','"+fromTime+"','"+fromPlace+"','"+toPlace+"','"+transportChoosed+"','"+code+"','"+registrationDate+"','"+passengerRemarks+"')",function(error,row,fields){
                if(!!error){
                 res.json(error)
                }else{
                   res.json(row);
                }
              });
      })
//update code of passenger with the transport choosed id
    router.post('/updateCodeOfPassengerWithTransportId',mytoken,function(req,res){
         var passengerId=req.body.id
         var code=req.body.code
         var date=req.body.date;
         var fromPlace=req.body.fromPlace;
         var toPlace=req.body.toPlace;
         var transportChoosed=req.body.transportChoosed;
         var registrationDate=Date.now();
         var fromTime=req.body.fromTime
       connection.query("update passenger SET code='"+code+"',date='"+date+"',fromTime='"+fromTime+"',fromPlace='"+fromPlace+"',toPlace='"+toPlace+"',transportChoosed='"+transportChoosed+"',registrationDate='"+registrationDate+"' where id='?'",passengerId,function(error,row,fields){
        if(!!error){
           res.json(error)
        }else{
              res.json(row);
        }
       })
    })
//insert transport owner information to the transporttype table
      router.post('/transOwnerInfo',mytoken,function(req,res){
            var userId=req.decoded.sub
            var transportChoosed=req.body.transportChoosed;
            var fromPlace=req.body.fromPlace;
            var toPlace=req.body.toPlace;
            var date=req.body.date
            var fromTime=req.body.fromTime
            var toTime=req.body.toTime;
            var numberOfSeats=req.body.numberOfSeats
            var additionalInfo=req.body.additionalInfo
            var telephone=req.body.telephone;
            var registrationDate=Date.now()
            connection.query("insert into transporttype(userId,type,numberOfSeats,date,fromTime,toTime,fromPlace,toPlace,additionalInfo,registrationDate,telephone) values('"+userId+"','"+transportChoosed+"','"+numberOfSeats+"','"+date+"','"+fromTime+"','"+toTime+"','"+fromPlace+"','"+toPlace+"','"+additionalInfo+"','"+registrationDate+"','"+telephone+"')",function(error,row){
                if(!!error){
                 res.json(error)
                }else{
                   res.json(row);
                }
              });
      })
//get transportowner info
      router.post('/getOwnTransportInfo',mytoken,function(req,res){
        var userId=req.decoded.sub;
        connection.query("select id,type,numberOfSeats,freeSeats,date,fromTime,toTime,fromPlace,toPlace,additionalInfo,registrationDate,telephone from transporttype where userId='?'",userId,function(error,row,fields){
          if(!!error){
            res.json(error)
          }else{
            res.json(row)
          }
        })
      })
      router.post('/getPassengerRequests',function(req,res){
        var transportId=req.body.transportId;
        connection.query("select users.name as name,users.photo as photo,webcollections.english as gender, passenger.telephone as telephone,passenger.remarks as remarks,passenger.id as passengerId,passenger.userId as passengerUserId from users inner join passenger on users.id=passenger.userId inner join webcollections on users.gender=webcollections.Id where passenger.approved IS NULL and passenger.code=?",transportId,function(error,row){
          if(!!error){
            res.json(error)
          }else{
            res.json(row)
          }
        })
      })
      router.post('/acceptRequest',mytoken,function(req,res){
        var fromUserId=req.decoded.sub;
        var toUserId=req.body.passengerUserId
        var passengerId=req.body.passengerId;
        var transportId=req.body.transportId;
        var date=Date.now();
        var message="accepted to travell"
        var location="passenger";
        connection.query("update passenger set approved='yes' where id=?",passengerId,function(error,row){
         if(!!error){
         }else{
         }
        })
        connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+location+"')",function(row,error,fields){
          if(!!error){
            }else{
            }
         })
        connection.query("insert into transportrequestsandacceptances(passengerId,transportId,date)values('"+passengerId+"','"+transportId+"','"+date+"')",function(error,row){
         if(!!error){
           res.json("error")
         }else{
           res.json("done")
         }
        })

      })
      router.post('/getAcceptedRequestsData',function(req,res){
        var transportId=req.body.transportId
        connection.query("select passengerviewenglish.name as name,passengerviewenglish.photo as photo,passengerviewenglish.gender as gender,passengerviewenglish.telephone as telephone from transportrequestsandacceptances inner join passengerviewenglish on passengerviewenglish.passengerId=transportrequestsandacceptances.passengerId where transportrequestsandacceptances.transportId=?",transportId,function(error,row){
          if(!!error){
            res.json(error)
          }else{
            res.json(row)
          }
        })
      })
//update transport owenrs
     router.post('/updateTransportOwner',mytoken,function(req,res){
                var userId=req.decoded.sub
                var id=req.body.id;
                var numberOfSeats=req.body.numberOfSeats;
                var fromTime=req.body.fromTime;
                var toTime=req.body.toTime;
                var date=req.body.date
                var fromPlace=req.body.fromPlace
                var toPlace=req.body.toPlace
                var transportChoosed=req.body.transportChoosed;
                var additionalInfo=req.body.additionalInfo;
                var telephone=req.body.telephone;
                //var code=req.body.code
      connection.query("update transporttype SET type='"+transportChoosed+"', date='"+date+"', fromPlace='"+fromPlace+"', toPlace='"+toPlace+"',numberOfSeats='"+numberOfSeats+"',additionalInfo='"+additionalInfo+"',fromTime='"+fromTime+"',toTime='"+toTime+"',telephone='"+telephone+"' where id='?'",id,function(error,row,fields){
        if(!!error){
          res.json(error)
        }else{
          res.json(row);
        }
      })
    })
//look up for transportaion,transportLookUp
  router.post('/transportLookUp',function(req,res){
        var date=req.body.date
        var fromPlace=req.body.fromPlace;
        var toPlace=req.body.toPlace
        var transportChoosed=req.body.transportChoosed
        connection.query("SELECT   date,fromTime,fromPlace, toPlace, COUNT(fromPlace) AS numberOfPeople,transportChoosed FROM   passenger GROUP BY date, fromPlace, toPlace,transportChoosed HAVING   (date ='"+date+"')  AND (fromPlace = '"+fromPlace+"') AND (toPlace = '"+toPlace+"') AND (transportChoosed = '"+transportChoosed+"')",function(error,row,fields){
              if(!!error){
                res.json(error);
              }else{
                res.json(row);
              }
        })
  })
   router.post('/getTransport',function(req,res){
        var date=req.body.date
        var fromPlace=req.body.fromPlace;
        var toPlace=req.body.toPlace
        var transportChoosed=req.body.transportChoosed
        connection.query("select transporttype.id as id,transporttype.userId as userId,transporttype.`type` as type,transporttype.numberOfSeats as numberOfSeats,"+
          "transporttype.fromTime as fromTime,transporttype.toTime as toTime,transporttype.date as date,transporttype.fromPlace as fromPlace,transporttype.toPlace as toPlace,"+
          "transporttype.additionalInfo as additionalInfo,transportfreeseats.freeSeats as freeSeats from transporttype INNER JOIN transportfreeseats ON transporttype.id=transportfreeseats.id"+
          " where transportfreeseats.freeSeats>0  and date ='"+date+"'  AND"+
          " transporttype.fromPlace='"+fromPlace+"' and transporttype.toPlace='"+toPlace+"' and transporttype.type='"+transportChoosed+"'",function(error,row,fields){
            //"date='?' and fromPlace='?' and toPlace='?' and type='?'",[date,cityFrom,cityTo,transportModel]
              if(!!error){
                res.json(error);
              }else{
                res.json(row);
              }
        })
  })
//get My transport Info
    router.post('/getMyInfo',mytoken,function(req,res){
          var userId=req.decoded.sub;
          connection.query("select id,userId,telephone,date,fromPlace,toPlace,transportChoosed,code,approved,remarks,fromTime from passenger where userId='?'",userId,function(error,row,fields){
                if(!!error){
                  res.json(error);
                }else{
                  res.json(row);
                }
          })
    })
    router.post('/getWhoAcceptedMe',function(req,res){
      var passengerId=req.body.passengerId;
      connection.query("select transportviewenglish.transportId as transportId,transportviewenglish.type as type,transportviewenglish.numberOfSeats as numberOfSeats,transportviewenglish.fromTime as fromTime,transportviewenglish.toTime as toTime,"+
      "transportviewenglish.fromPlace as fromPlace,transportviewenglish.date as date,transportviewenglish.toPlace as toPlace,transportviewenglish.additionalInfo as additionalInfo,transportviewenglish.telephone as telephone,transportviewenglish.name as name,transportviewenglish.photo as photo,transportviewenglish.gender as gender from transportrequestsandacceptances "+
      "inner join transportviewenglish on transportviewenglish.transportId=transportrequestsandacceptances.transportId where transportrequestsandacceptances.passengerId=?",passengerId,function(error,row){
        if(!!error){
          res.json(error)
        }else{
          res.json(row)
        }
      })
    })
    router.post('/deletePassenger',mytoken,function(req,res){
      var userId=req.decoded.sub
      var passengerId=req.body.id;
      connection.query("delete from passenger where id='?'",passengerId,function(error,row,fields){
        if(!!error){
          res.json(error)
        }else{
          res.json(row);
        }
      })
    })
//update passenger
     router.post('/updatePassenger',mytoken,function(req,res){
      var userId=req.decoded.sub
      var id=req.body.id;
                var telephone=req.body.telephone
                var date=req.body.date;
                var fromTime=req.body.fromTime;
                var fromPlace=req.body.fromPlace
                var toPlace=req.body.toPlace
                var transportChoosed=req.body.transportChoosed
                var code=req.body.code
                var passengerRemarks=req.body.passengerRemarks;
                var fromTime=req.body.fromTime;
      connection.query("update passenger SET telephone='"+telephone+"', date='"+date+"', fromTime='"+fromTime+"', fromPlace='"+fromPlace+"', toPlace='"+toPlace+"',transportChoosed='"+transportChoosed+"',code='"+code+"',fromTime='"+fromTime+"',remarks='"+passengerRemarks+"' where id='?'",id,function(error,row,fields){
        if(!!error){
          res.json(error)
        }else{
          res.json(row);
        }
      })
    })
//post all ready transports
    router.post('/postTransportsOnUse',mytoken,function(req,res){
          connection.query("select id,type,numberOfSeats,freeSeats,date,fromTime,toTime,fromPlace,toPlace,additionalInfo,code from transporttype",function(error,row,fields){
                if(!!error){
                  res.json(error);
                }else{
                  res.json(row);
                }
          })
    })
//chat rooms
    router.post('/postRooms',mytoken,function(req,res){
          connection.query("select Id,userId,roomName,roomNumber,roomDescription,online from chatrooms",function(error,row,fields){
                if(!!error){
                  res.json(error);
                }else{
                  res.json(row);
                }
          })
    })
    // router.post('/updateRoomOnlineStatus',mytoken,function(req,res){
    //      var userId=req.decoded.sub;
    //   connection.query("update chatrooms set online='yes' where userId='"+userId+"'",function(error,row,fields){
    //     if(!!error){
    //       res.json(error)
    //     }else{
    //       res.json(row)
    //     }
    //   })
    // })
//chat rooms
    router.post('/postUserRoom',mytoken,function(req,res){
         var userId=req.decoded.sub
          connection.query("select Id,userId from chatrooms where userId='"+userId+"'",function(error,row,fields){
                if(!!error){
                  res.json(error);
                }else{
                  res.json(row);
                }
          })
    })
//getUserId
    router.post('/getUserId',mytoken,function(req,res){
         var userId=req.decoded.sub
         res.json(userId)
    })
//check if the userIsOnline
   router.post('/checkOnline',mytoken,function(req,res){
            var userId=req.body.code
           connection.query("select users.userroom as room from transporttype INNER JOIN users ON transporttype.userId=users.id where transporttype.id='?'",userId,function(error,row,fields){
              if(!!error){
                res.json(error)
              }else{
                res.json(row)
              }
           })
   })
//insert client information to the main table needtranslator
      router.post('/clientMainInfo',mytoken,function(req,res){
            var userId=req.decoded.sub
            var tele=req.body.tele
            var lookingFor=req.body.lookingFor;
            var timestamp=Date.now();
            var timeTaken=req.body.timeTaken;
            var workSummary=req.body.workSummary;
            var workDetails=req.body.workDetails;
            var cWorkSituation=req.body.cWorkSituation
            var workCountry=req.body.country;
            var workCity=req.body.livesIn
            var name=req.body.name;
            var url=req.body.url
            var languageKey=req.body.languageKey
            getProfessionId(lookingFor,languageKey,function(error,result){
              if(result==undefined){
              }else{
                var professionId=result
                connection.query("insert into clients(userId,telephone,lookingFor,timestamp,timeTaken,workDetails,situationOfWorkAtThisTime,workCountry,workCity,name,url,workSummary) values('"+userId+"','"+tele+"','"+professionId+"','"+timestamp+"','"+timeTaken+"','"+workDetails+"','"+cWorkSituation+"','"+workCountry+"','"+workCity+"','"+name+"','"+url+"','"+workSummary+"')",function(error,row,fields){
                    if(!!error){
                     res.json(error)
                    }else{
                       res.json(row.insertId);
                    }
                  });
              }

            })

      });
//update client information to the main table needtranslator
      router.post('/updateclientMainInfo',mytoken,function(req,res){
            var clientId=req.body.clientId
            var tele=req.body.tele
            var lookingFor=req.body.lookingFor;
            var timestamp=Date.now();
            var timeTaken=req.body.timeTaken;
            var workSummary=req.body.workSummary
            var workDetails=req.body.workDetails;
            var cWorkSituation=req.body.cWorkSituation
            var workCountry=req.body.country;
            var workCity=req.body.livesIn
            var name=req.body.name;
            var url=req.body.url;
            var languageKey=req.body.languageKey
            getProfessionId(lookingFor,languageKey,function(error,result){
                if(result==undefined){
                    res.json("noProfession");
                }else{
                  var professionId=result
                  connection.query("UPDATE clients SET telephone='"+tele+"',lookingFor='"+professionId+"', timestamp='"+timestamp+"', timeTaken='"+timeTaken+"', workDetails='"+workDetails+"', situationOfWorkAtThisTime='"+cWorkSituation+"',workCountry='"+workCountry+"',workCity='"+workCity+"',name='"+name+"',url='"+url+"',workSummary='"+workSummary+"'  WHERE Id='"+clientId+"'",function(error,row,fields){
                      if(!!error){
                       res.json(error)
                      }else{
                         res.json("updated succesfully");
                      }
                    });
                }
            })

      });
//insert into contacttimerouterointment table in the database
      router.post('/contacttimerouterointment',mytoken,function(req,res){
              var contactId=req.body.contactId;
              var date=req.body.date
              var timeFrom=req.body.ctimeFrom
              var timeTo=req.body.ctimeTo
              var timestamp=Date.now();

            connection.query("insert into contacttimerouterointment(contactId,date,timeFrom,timeTo,timestamp) values('"+contactId+"','"+date+"','"+timeFrom+"','"+timeTo+"','"+timestamp+"')",function(error,row,fields){
              if(!!error){
                 res.json(error)
                }else{
                   res.json(row.insertId);
                }
           });
      })
//update client time routerointment
      router.post('/updatecontacttimerouterointment',mytoken,function(req,res){
                    var Id=req.body.Id
                    var date=req.body.date
                    var timeFrom=req.body.ctimeFrom
                    var timeTo=req.body.ctimeTo
                    var timestamp=Date.now();
            connection.query("UPDATE contacttimerouterointment SET date='"+date+"',timeFrom='"+timeFrom+"',timeTo='"+timeTo+"',timestamp='"+timestamp+"'  WHERE Id='"+Id+"'",function(error,row,fields){
                if(!!error){
                 res.json(error)
                }else{
                   res.json(row.insertId);
                }
              });
      });
//delete client time routerointment
      router.delete('/deleteClientrouterointment',mytoken,function(req,res){
                    var Id=req.decoded.sub
            connection.query("delete from contacttimerouterointment  WHERE Id='"+Id+"'",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                   res.json(row.insertId);
                }
              });
      });

//insert to professionalMonth
      router.post('/professionalMonth',mytoken,function(req,res){
              var contactId=req.body.contactId;
              var fromMonth=req.body.fromMonth;
              var toMonth=req.body.toMonth;
            connection.query("insert into professionalsworkingmonths(contactId,fromMonth,toMonth)values('"+contactId+"','"+fromMonth+"','"+toMonth+"')",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                  res.json(row);
                }
            });
      })
//update to professionalMonth
      router.post('/updateprofessionalMonth',mytoken,function(req,res){
              var contactId=req.body.contactId;
              var fromMonth=req.body.fromMonth;
              var toMonth=req.body.toMonth;
            connection.query("UPDATE professionalsworkingmonths SET  fromMonth='"+fromMonth+"',toMonth='"+toMonth+"' WHERE contactId='"+contactId+"'",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                  res.json(row);
                }
            });
      })
//insert to professionalDate
      router.post('/professionalDate',mytoken,function(req,res){
        var contactId=req.body.contactId
        var fromDate=req.body.fromDate;
        var toDate=req.body.toDate
           connection.query("insert into professionalworkingdate(contactId,fromDate,toDate)values('"+contactId+"','"+fromDate+"','"+toDate+"')",function(error,row,fields){
                    if(!!error){
                      res.json(error)
                    }else{
                      res.json(row);
                    }
              });
      })
//update professional date
      router.post('/updateprofessionalDate',mytoken,function(req,res){
              var contactId=req.body.contactId;
              var fromDate=req.body.fromDate;
              var toDate=req.body.toDate;
            connection.query("UPDATE professionalworkingdate SET  fromDate='"+fromDate+"',toDate='"+toDate+"' WHERE contactId='"+contactId+"'",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                  res.json(row);
                }
            });
      })
//insert to professionalworkstyle
      router.post('/professionworksession',mytoken,function(req,res){
        var contactId=req.body.contactId
        var worksession=req.body.worksession
          connection.query("insert into professionalworksession(contactId,professionalworksin)values('"+contactId+"','"+worksession+"')",function(error,row,fields){
              if(!!error){
                res.json(error)
              }else{
                res.json(row);
              }
          });
      })
//postting client id from needtranslation table
      router.post('/userContactId',mytoken,function(req,res){
        var userId=req.decoded.sub
           connection.query("select Id from clients where userId='"+userId+"'",function(error,row,fields){
                    if(!!error){
                      res.json(error)
                    }else{
                      res.json(row);
                    }
              });
      })
//postting all clients
      router.post('/postAllClients',mytoken,function(req,res){
        var languageKey=req.body.languageKey
        if(languageKey=='EN'){
              connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate from clientinfoviewenglish",function(error,row,fields){
                    if(!!error){
                      res.json(error)
                    }else{
                      res.json(row);
                    }
              });
        }else if(languageKey=='TG'){
          connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate from clientinfoviewtigrina",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                  res.json(row);
                }
          });
        }else if(languageKey=='NL'){
          connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate from clientinfoviewdutch",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                  res.json(row);
                }
          });
        }else{
          connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate from clientinfoviewenglish",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                  res.json(row);
                }
          });
        }

      })
      //client work details
            router.post('/getClientWorkDetails',function(req,res){
              var languageKey=req.body.languageKey
              var id=req.body.id
              if(languageKey=='EN'){
                    connection.query("select workDetails from clientinfoviewenglish where Id=?",id,function(error,row,fields){
                          if(!!error){
                            res.json(error)
                          }else{
                            res.json(row);
                          }
                    });
              }else if(languageKey=='TG'){
                connection.query("select workDetails from clientinfoviewtigrina where Id=?",id,function(error,row,fields){
                      if(!!error){
                        res.json(error)
                      }else{
                        res.json(row);
                      }
                });
              }else if(languageKey=='NL'){
                connection.query("select workDetails from clientinfoviewdutch where Id=?",id,function(error,row,fields){
                      if(!!error){
                        res.json(error)
                      }else{
                        res.json(row);
                      }
                });
              }else{
                connection.query("select workDetails from clientinfoviewenglish where Id=?",id,function(error,row,fields){
                      if(!!error){
                        res.json(error)
                      }else{
                        res.json(row);
                      }
                });
              }

            })
      router.post('/postAllclientsAccordingUserCriteria',mytoken,function(req,res){
                  var userId=req.decoded.sub;
                  var country=req.body.country;
                  var livesIn=req.body.livesIn;
                  var languageKey=req.body.languageKey;
                  if(languageKey==null){
                     connection.query("select Id,userId,userroom,name,city,country,lookingFor,timeTaken,photo from clientinfoviewenglish where country=? or city=?",[country,livesIn],function(error,row,fields){
                        if(!!error){
                            res.json(error)
                        }else{
                            res.json(row)
                        }
                      })
                  }else if(languageKey=='EN'){
                    connection.query("select Id,userId,userroom,name,city,country,lookingFor,timeTaken,photo from clientinfoviewenglish where country=? or city=?",[country,livesIn],function(error,row,fields){
                       if(!!error){
                           res.json(error)
                       }else{
                           res.json(row)
                       }
                     })
                  }else if(languageKey=='TG'){
                    connection.query("select Id,userId,userroom,name,city,country,lookingFor,timeTaken,photo from clientinfoviewtigrina where country=? or city=?",[country,livesIn],function(error,row,fields){
                       if(!!error){
                           res.json(error)
                       }else{
                           res.json(row)
                       }
                     })
                  }else if(languageKey=='NL'){
                    connection.query("select Id,userId,userroom,name,city,country,lookingFor,timeTaken,photo from clientinfoviewdutch where country=? or city=?",[country,livesIn],function(error,row,fields){
                       if(!!error){
                           res.json(error)
                       }else{
                           res.json(row)
                       }
                     })
                  }

      })

//post information of clients who need professionals
       router.post('/postContactId',mytoken,function(req,res){
            var firstName=req.body.firstName
            var lastName=req.body.lastName
            var tele=req.body.tele
            var email=req.body.email
            var remark=req.body.remark
              connection.query("select clients.id from clients where name='?'",firstName,function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                   res.json(row);
                }
              });
        });
//post professions
       router.get('/listOfProfession/:profession/:languageKey',function(req,res){
           var profession=req.params.profession
           var languageKey=req.params.languageKey
           if(languageKey=='EN'){
             connection.query("select english from workprofessionslist where english like '"+profession+"%'",function(error,row,fields){
                 if(!!error){
                  res.json(error)
                 }else{
                    res.json(row);
                 }
               });
           }else if(languageKey=='TG'){
             connection.query("select tigrigna from workprofessionslist where tigrigna like '"+profession+"%'",function(error,row,fields){
                 if(!!error){
                  res.json(error)
                 }else{
                    res.json(row);
                 }
               });
           }else if(languageKey=='NL'){
             connection.query("select dutch from workprofessionslist where dutch like '"+profession+"%'",function(error,row,fields){
                 if(!!error){
                  res.json(error)
                 }else{
                    res.json(row);
                 }
               });
           }else {
             connection.query("select english from workprofessionslist where english like '"+profession+"%'",function(error,row,fields){
                 if(!!error){
                  res.json(error)
                 }else{
                    res.json(row);
                 }
               });
           }

        });
//post worktime type
        router.post('/postWorkTime',mytoken,function(req,res){
            connection.query("select Id,english,tigrigna,dutch from professionalworktimeperiod",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                   res.json(row);
                }
              });
        });

//post worktime type
        router.post('/getAllWorkCategories',mytoken,function(req,res){
            connection.query("select id,category from workcategory",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                   res.json(row);
                }
              });
        });
//sub work category
        router.post('/getSubWorkCategory',mytoken,function(req,res){
          var categoryId=req.body.categoryId
            connection.query("select id,categoryId,work from worksubcategory where categoryId='"+categoryId+"'",function(error,row,fields){
                if(!!error){
                  res.json(error)
                }else{
                   res.json(row);
                }
              });
        });
//post all clients
        router.post('/postAllpassenger',mytoken,function(req,res){
            connection.query("select clients.Id as Id,clients.name as name,clients.email as email,clients.livesIn as livesIn"+
              ",clients.lookingFor as lookingFor,clients.gender as gender,clients.dateOfBirth as dateOfBirth,clients.timeTaken as timeTaken,clients.workDetails as workDetails,"+
              "clients.userId as userId,users.photo as photo from clients INNER JOIN users ON clients.userId=users.id",function(error,row,fields){
                if(!!error){
                 res.json(error)
                }else{
                   res.json(row);
                }
              });
        });
//insert translator information to the professionalstable table
       router.post('/registerProfessional',mytoken,function(req,res){
            var userId=req.decoded.sub
            var tele=req.body.tele
            var remark=req.body.remark
            var profession=req.body.profession
            var professionalWorkSession=req.body.professionalWorkSession
            var timestamp=Date.now();
            var pWorkSituation=req.body.pWorkSituation
            var languageKey=req.body.languageKey;
            getProfessionId(profession,languageKey,function(error,result){
              if(result==undefined){

              }else{
                var professionId=result
                connection.query("insert into professionalstable(userId,telephone,remarks,profession,timestamp,workSession,lookingForJobThisTime) values('"+userId+"','"+tele+"','"+remark+"','"+professionId+"','"+timestamp+"','"+professionalWorkSession+"','"+pWorkSituation+"')",function(error,row,fields){
                        if(!!error){
                          res.json(error)
                        }else{
                           res.json(row.insertId);
                        }
                  });
              }
            })

        });
//update translator information to the professionalstable table
       router.post('/updateprofessionalInfoData',mytoken,function(req,res){
            var professionalId=req.body.professionalId
            var tele=req.body.tele
            var remark=req.body.remark
            var profession=req.body.profession
            var professionalWorkSession=req.body.professionalWorkSession
            var timestamp=Date.now();
            var pWorkSituation=req.body.pWorkSituation;
            var languageKey=req.body.languageKey;
            getProfessionId(profession,languageKey,function(error,result){
              if(result==undefined){

              }else{
                var professionId=result

                connection.query("UPDATE professionalstable SET  telephone='"+tele+"', remarks='"+remark+"', profession='"+professionId+"', timestamp='"+timestamp+"', workSession='"+professionalWorkSession+"', lookingForJobThisTime='"+pWorkSituation+"'  where Id='"+professionalId+"'",function(error,row,fields){
                        if(!!error){
                         res.json(error)
                        }else{
                           res.json(row.insertId);
                        }
                  });
              }
            })

        });
//get webCollections
     router.post('/webCollection',function(req,res){
           var webCollectionId=req.body.webCollectionId
          connection.query("select Id,webCollectionId,english,tigrina,dutch from webcollections where webCollectionId=?",webCollectionId,function(error,row,fields){
            if(!!error){
              res.json(error)
            }else{
              res.json(row)
            }
          })
     })
//post image and data of cheapmarketing
    router.post('/postCheapMarketing',mytoken,function(req,res){
      var userId=req.decoded.sub
      connection.query("select name,price,place,timestamp,fileName from cheapmarketing where userId='"+userId+"'",function(error,row,fields){
        if(!!error){
          res.json(error)
        }else{
          res.json(row);
        }
      })
    })
//upload things to sale...................................................................................
      var uploadsales=multer({dest:'./public/saleThingsImageCollector'});
       router.post('/thingsToSale',uploadsales.single('file'),thingsToBeSold);
       function thingsToBeSold(req,res){
        var userId=req.body.data[0];
        var itemName=req.body.data[1];
        var catagories=req.body.data[2]
        var price=req.body.data[3]
        var unit=req.body.data[4]
        var place=req.body.data[5];
        var telephone=req.body.data[6];
        var description=req.body.data[7];
        var file=req.file;
        var originalFileName=file.originalname;
        var fileName=file.filename;
        var path=file.path;
        var size=file.size;
        var fileType=file.mimetype;
        var date=Date.now();
               connection.query("insert into salethingstable(userId,itemName,price,unit,place,telephone,description,fileType,date,fileName,catagories) values('"+userId+"','"+itemName+"','"+price+"','"+unit+"','"+place+"','"+telephone+"','"+description+"','"+fileType+"','"+date+"','"+fileName+"','"+catagories+"')",function(error,row,fields){
                  if(!!error){
                   res.json(error)
                  }else{
                  res.json(row)
                  }
                });
       }
       router.post('/addItemAmount',function(req,res){
         var itemId=req.body.itemId
         var itemAmount=req.body.itemAmount;
         var size=req.body.size;
         connection.query("insert into salethings_item_amount(itemId,size,amount)values('"+itemId+"','"+size+"','"+itemAmount+"')",function(error,result){
           if(!!error){
           }else{
             res.json("successfully added")
           }
         })
       })
       //upload posts...................................................................................
      var upload2=multer({dest:'./public/posts'});
       router.post('/home',upload2.single('postFile'),post);
       function post(req,res){
        var userId=req.body.userId;
        var postDescription=req.body.postDescription;
        var file=req.file;
        if(file==null){
           var fileName="no file";
           var fileType="no file";
        }else{
           var fileName=file.filename;
           var fileType=file.mimetype;
        }

        var date=Date.now();
               connection.query("insert into posts(postDescription,fileType,fileName,userId,timestamp) values('"+postDescription+"','"+fileType+"','"+fileName+"','"+userId+"','"+date+"')",function(error,row,fields){
                  if(!!error){
                   res.json(error)

                  }else{

                     res.redirect('/home/posted')
                  }
                });
       }
  //postting image and description of the image of posts
   router.post('/postposts',mytoken,function(req,res){
            var userId=req.decoded.sub
            connection.query("select id,posterPhoto,shareDescription,room,userId,posterName,fileName,fileType,date,postDescription,remarks,numberOfLikes,numberOfComments,numberOfShares,sharedPostOwnerUserId,idAtShareTable from postinfo ORDER BY date DESC LIMIT 5 ",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
    //postting image and description of the image of posts
   router.post('/userPostposts',mytoken,function(req,res){
            var userId=req.decoded.sub
            connection.query("select id,posterPhoto,shareDescription,room,userId,posterName,fileName,fileType,date,postDescription,remarks,numberOfLikes,numberOfComments,numberOfShares,sharedPostOwnerUserId,idAtShareTable from postinfo WHERE userId='"+userId+"' ORDER BY date DESC LIMIT 10 ",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
    //get posts one by one;
   router.post('/getPost',mytoken,function(req,res){
            var userId=req.decoded.sub
            var lastId=req.body.lastId
            connection.query("select id,posterPhoto,room,userId,posterName,fileName,fileType,date,postDescription,remarks,numberOfLikes,numberOfComments,numberOfShares,sharedPostOwnerUserId,idAtShareTable from postinfo where id<'?' ORDER BY date DESC LIMIT 5 ",lastId,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
   router.post('/deletePost',mytoken,function(req,res){
           var userId=req.decoded.sub
           var postId=req.body.postId
           var fileName=req.body.fileName;
           var remarks=req.body.remarks;
           var idAtShareTable=req.body.idAtShareTable
           checkPostIdInCommentTable(postId,function(error,result){
              var deletedPostIdFromCommentTable=result;
           })
           checkPostIdInpostlikesandcomments(postId,function(error,result){
             var deletedPostIdFrompostlikesandcomments=result
           })
          connection.query("delete from posts where Id=?",postId,function(error,row,fields){
              if(!!error){
                res.json(error)
              }else{
                var directory="posts"
                 removeFile(directory,fileName)
                res.json("post succesfully deleted")
              }
          })
   })
   router.post('/deleteSharedPost',mytoken,function(req,res){
          var userId=req.decoded.sub
           var postId=req.body.postId
           var fileName=req.body.fileName;
           var remarks=req.body.remarks;
           var idAtShareTable=req.body.idAtShareTable
           checkPostIdInCommentTable(postId,function(error,result){
              var deletedPostIdFromCommentTable=result;
           })
           checkPostIdInpostlikesandcomments(postId,function(error,result){
             var deletedPostIdFrompostlikesandcomments=result
           })
            connection.query("delete from sharetable where id=?",idAtShareTable,function(error,row,fields){
                  if(!!error){
                   // res.json(error)
                  }else{
                    var directory="posts"

                  }
            })
          connection.query("delete from posts where Id=?",postId,function(error,row,fields){
              if(!!error){
                res.json(error)
              }else{
                var directory="posts"
                 //removeFile(directory,fileName)
                res.json("share succesfully deleted")
              }
           })


   })
   function checkPostIdInCommentTable(postId,callback){
      connection.query("delete from commentstable where postId='?'",postId,function(error,row,fields){
           if(!!error){
            callback(error,"there is error in commenttable when deleting the post")
           }else{
            callback(null,"deleted from commenttable table")
           }
      })
   }
    function checkPostIdInpostlikesandcomments(postId,callback){
      connection.query("delete from postlikesandcomments where postId='?'",postId,function(error,row,fields){
           if(!!error){
           callback(error,"there is error in postlikesandcomments table when deleting the post")
           }else{
            callback(null,"deleted from postlikesandcomments table")
           }
      })
   }
  //postting image and description of the image of thingstosale
   router.post('/postpostModal',mytoken,function(req,res){
           // var id=req.params.id
            var id=req.body.id
            connection.query("select id,posterPhoto,posterName,fileName,fileType,date,postDescription,numberOfLikes,numberOfShares,room,userId from postsview where id='"+id+"'",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//postting the salers name
       router.post('/salers',mytoken,function(req,res){
            var name=req.body.name;
            connection.query("select fileName from salethingstable where uploaderName='"+name+"'",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//list of all professionalstable
        router.post('/listOfprofessionals',mytoken,function(req,res){
              var languageKey=req.body.languageKey;
              if(languageKey=='EN'){
                      connection.query("select Id,userId,name,userroom,photo,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewenglish",function(error,row){
                         if(!!error){
                           res.json(error)
                         }else{
                           res.json(row)
                         }
                       })
              }else if(languageKey=='TG'){
                connection.query("select Id,userId,name,userroom,photo,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewtigrina",function(error,row){
                    if(!!error){
                        res.json(error)
                    }else{
                        res.json(row)
                    }
                 })
              }else if(languageKey=='NL'){
                  connection.query("select Id,userId,name,photo,userroom,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewdutch",function(error,row){
                      if(!!error){
                          res.json(error)
                      }else{
                          res.json(row)
                      }
                   })
              }else{
                connection.query("select Id,userId,name,photo,userroom,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewenglish",function(error,row){
                    if(!!error){
                        res.json(error)
                    }else{
                        res.json(row)
                    }
                 })
              }
       })
       //professional motivation
       router.post('/getProfessionalMotivation',function(req,res){
             var languageKey=req.body.languageKey;
             var id=req.body.id
             if(languageKey=='EN'){
                     connection.query("select remarks from professionalsinfoviewenglish where Id=?",id,function(error,row){
                        if(!!error){
                          res.json(error)
                        }else{
                          res.json(row)
                        }
                      })
             }else if(languageKey=='TG'){
               connection.query("select remarks from professionalsinfoviewtigrina where Id=?",id,function(error,row){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                })
             }else if(languageKey=='NL'){
                 connection.query("select remarks from professionalsinfoviewdutch where Id=?",id,function(error,row){
                     if(!!error){
                         res.json(error)
                     }else{
                         res.json(row)
                     }
                  })
             }else{
               connection.query("select remarks from professionalsinfoviewenglish where Id=?",id,function(error,row){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                })
             }
      })
       router.post('/listOfprofessionalsAccordingUserCriteria',mytoken,function(req,res){
           var userId=req.decoded.sub;
           var country=req.body.country;
           var livesIn=req.body.livesIn;
           var languageKey=req.body.languageKey
           if(languageKey=='EN'){
              connection.query("select Id,userId,name,userroom,livesIn,country,genderInEnglish,profession,photo from professionalsinfoviewenglish  where country=? or livesIn=?",[country,livesIn],function(error,row,fields){
                 if(!!error){
                    res.json(error)
                 }else{
                    res.json(row)
                 }
               })
           }else if(languageKey=='TG'){
             connection.query("select Id,userId,name,userroom,livesIn,country,genderInEnglish,profession,photo from professionalsinfoviewtigrina  where country=? or livesIn=?",[country,livesIn],function(error,row,fields){
                if(!!error){
                   res.json(error)
                }else{
                   res.json(row)
                }
              })
           }else if(languageKey=='NL'){
             connection.query("select Id,userId,name,userroom,livesIn,country,genderInEnglish,profession,photo from professionalsinfoviewdutch  where country=? or livesIn=?",[country,livesIn],function(error,row,fields){
                if(!!error){
                   res.json(error)
                }else{
                   res.json(row)
                }
              })
           }else{
             connection.query("select Id,userId,name,userroom,livesIn,country,genderInEnglish,profession,photo from professionalsinfoviewenglish  where country=? or livesIn=?",[country,livesIn],function(error,row,fields){
                if(!!error){
                   res.json(error)
                }else{
                   res.json(row)
                }
              })
           }

       })
       function getProfessionId(profession,languageKey,callback){
         if(languageKey=='EN'){
           connection.query("select Id from workprofessionslist where english=?",profession,function(error,row){
             if(!!error){
               callback(error,"there was error")
             }else{
               callback(null,row[0].Id)
             }
           })
         }else if(languageKey=='TG'){
           connection.query("select Id from workprofessionslist where tigrigna=?",profession,function(error,row){
             if(!!error){
               callback(error,"there was error")
             }else{
               callback(null,row[0].Id)
             }
           })
         }else if(languageKey=='NL'){
           connection.query("select Id from workprofessionslist where dutch=?",profession,function(error,row){
             if(!!error){
               callback(error,"there was error")
             }else{
               callback(null,row[0].Id)
             }
           })
         }else{
           connection.query("select Id from workprofessionslist where english=?",profession,function(error,row){
             if(!!error){
               callback(error,"there was error")
             }else{
               callback(null,row[0].Id)
             }
           })
         }

       }
        router.post('/listOfprofessionalsAccordingUserCriteriaAtHomePage',function(req,res){
           var profession=req.body.profession
           var country=req.body.country;
           var livesIn=req.body.livesIn;
           var languageKey=req.body.languageKey
           if(languageKey=='EN'){
             connection.query("select Id,name,photo,country,livesIn,profession from professionalsinfoviewenglish where profession=? and country=? and livesIn=?",[profession,country,livesIn],function(error,row){
                 if(!!error){
                    res.json(error)
                 }else{
                    res.json(row)
                 }
             })
           }else if(languageKey=='TG'){
             connection.query("select Id,name,photo,country,livesIn,profession from professionalsinfoviewtigrina where profession=? and country=? and livesIn=?",[profession,country,livesIn],function(error,row){
                 if(!!error){
                    res.json(error)
                 }else{
                    res.json(row)
                 }
             })
           }else if(languageKey=='NL'){
             connection.query("select Id,name,photo,country,livesIn,profession from professionalsinfoviewdutch where profession=? and country=? and livesIn=?",[profession,country,livesIn],function(error,row){
                 if(!!error){
                    res.json(error)
                 }else{
                    res.json(row)
                 }
             })
           }else{
             connection.query("select Id,name,photo,country,livesIn,profession from professionalsinfoviewenglish where profession=? and country=? and livesIn=?",[profession,country,livesIn],function(error,row){
                 if(!!error){
                    res.json(error)
                 }else{
                    res.json(row)
                 }
             })
           }
       })
//list of all professionalstable with a profession
         router.post('/listOfprofessionalstableProfession',mytoken,function(req,res){
                 var profession=req.body.profession
             connection.query("select Id,name,profession from professionalstable where profession='"+profession+"'",function(row,error,fields){
                if(!!error){
                    res.json(error)
                }else{
                    res.json(row)
                }
             })
          })
          router.get('/listOfProfession/:profession',function(req,res){
            var profession=req.params.profession

          })
//list of all professionalstable according to their lives
         router.post('/listOfprofessionalstableLivesIn',mytoken,function(req,res){
                 var livesIn=req.body.livesIn
             connection.query("select Id,name,livesIn from professionalstable where livesIn='"+livesIn+"'",function(row,error,fields){
                if(!!error){
                    res.json(error)
                }else{
                    res.json(row)
                }
             })
         })
//list of all professionalstable according to their working session
         router.post('/listOfprofessionalstableWorkingSession',mytoken,function(req,res){
                 var workingSession=req.body.workingSession
             connection.query("select Id,name,professionalworksin from professionalwhoworkspermanently where professionalworksin='"+workingSession+"'",function(row,error,fields){
                if(!!error){
                    res.json(error)
                }else{
                    res.json(row)
                }
             })
         })
//notification from professional to client
       router.post('/notificationFromProfessional',mytoken,function(req,res){
                var fromUserId=req.decoded.sub
                var professionalId=req.decoded.professionalId
                var fromUserFullName=req.body.fromUserFullName;
                var toId=req.body.toId;
                var toName=req.body.toName;
                var notificationMessage=req.body.notificationMessage;
                var date=Date.now();
                var showedByUser=req.body.showedByUser;
            connection.query("insert into notificationtable(fromUserId,fromId,toId,message,timestamp,showedByUser)values('"+fromUserId+"','"+professionalId+"','"+toId+"','"+notificationMessage+"','"+date+"','"+showedByUser+"')",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else if(row.length===null){
                   res.send("NoNotifications")
                }else{
                   res.json(row)
                }
           })
       })

//post number of notification
      router.post('/userNotifications',mytoken,function(req,res){
                 var id=req.decoded.sub;
                 connection.query("select count(notificationtable.toUserId) as numberOfNotifications from notificationtable INNER JOIN users ON notificationtable.toUserId=users.id where  notificationtable.toUserId='"+id+"'  and notificationtable.timestamp >users.lastLogin",function(row,error,fields){
                    if(!!error){
                      res.json(error)
                    }else{
                       res.json(row)
                    }
                })

       })
//post notification
      router.post('/postTheUserNotifications',mytoken,function(req,res){
             var id=req.decoded.sub
              connection.query("select notificationtable.id as Id,notificationtable.fromUserId as fromUserId,users.name as username,users.photo as photo,notificationtable.message as message,notificationtable.timestamp as date,notificationtable.toUserId as toUserId,notificationtable.location as location from notificationtable INNER JOIN users ON notificationtable.fromUserId=users.id  where notificationtable.toUserId='"+id+"' ORDER BY notificationtable.timestamp DESC  LIMIT 5",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//post notification on scrolling
      router.post('/postTheUserNotificationsOnScrolling',mytoken,function(req,res){
             var id=req.decoded.sub
             var lastNotificationId=req.body.lastNotificationId
              connection.query("select notificationtable.id as Id,notificationtable.fromUserId as fromUserId,users.name as username,users.photo as photo,notificationtable.message as message,notificationtable.timestamp as date,notificationtable.toUserId as toUserId,notificationtable.location as location from notificationtable INNER JOIN users ON notificationtable.fromUserId=users.id  where notificationtable.id<'"+lastNotificationId+"'  and  notificationtable.toUserId='"+id+"' ORDER BY notificationtable.timestamp DESC  LIMIT 3",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//get userInfo
       router.post('/userInfo',mytoken,function(req,res){
             var CurrentuserId=req.decoded.sub
             var userIdLookingFor=req.body.userId;
             var location=req.body.location;
             var languageKey=req.body.languageKey;
             if(location=="professional"){
               if(languageKey=='EN'){
                 connection.query("select users.name as name,users.email as email,webcollections.english as gender,"+
                  "workprofessionslist.english as profession,users.livesIn as livesIn,users.country as country,"+
                  "professionalstable.workSession as workSession,professionalstable.remarks as remarks from "+
                  "professionalstable INNER JOIN users ON professionalstable.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=professionalstable.profession where professionalstable.userId="+userIdLookingFor+"",function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
               }else if (languageKey=='TG') {
                 connection.query("select users.name as name,users.email as email,webcollections.tigrina as gender,"+
                  "workprofessionslist.tigrigna as profession,users.livesIn as livesIn,users.country as country,"+
                  "professionalstable.workSession as workSession,professionalstable.remarks as remarks from "+
                  "professionalstable INNER JOIN users ON professionalstable.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=professionalstable.profession where professionalstable.userId="+userIdLookingFor+"",function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
               }else if (languageKey=='NL') {
                 connection.query("select users.name as name,users.email as email,webcollections.dutch as gender,"+
                  "workprofessionslist.dutch as profession,users.livesIn as livesIn,users.country as country,"+
                  "professionalstable.workSession as workSession,professionalstable.remarks as remarks from "+
                  "professionalstable INNER JOIN users ON professionalstable.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=professionalstable.profession where professionalstable.userId="+userIdLookingFor+"",function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
               }else {
                 connection.query("select users.name as name,users.email as email,webcollections.english as gender,"+
                  "workprofessionslist.english as profession,users.livesIn as livesIn,users.country as country,"+
                  "professionalstable.workSession as workSession,professionalstable.remarks as remarks from "+
                  "professionalstable INNER JOIN users ON professionalstable.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=professionalstable.profession where professionalstable.userId="+userIdLookingFor+"",function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
               }
             }else if(location=="client"){
               if (languageKey=='EN') {
                 connection.query("select users.name as name,users.email as email,webcollections.english as gender,"+
                   "workprofessionslist.english as lookingFor,users.livesIn as livesIn,clients.timeTaken as timeTaken,"+
                   "clients.workDetails as workDetails from clients INNER JOIN users ON clients.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=clients.lookingFor  where clients.userId='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }else if (languageKey=='TG') {
                 connection.query("select users.name as name,users.email as email,webcollections.tigrina as gender,"+
                   "workprofessionslist.tigrigna as lookingFor,users.livesIn as livesIn,clients.timeTaken as timeTaken,"+
                   "clients.workDetails as workDetails from clients INNER JOIN users ON clients.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=clients.lookingFor  where clients.userId='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }else if (languageKey=='NL') {
                 connection.query("select users.name as name,users.email as email,webcollections.dutch as gender,"+
                   "workprofessionslist.dutch as lookingFor,users.livesIn as livesIn,clients.timeTaken as timeTaken,"+
                   "clients.workDetails as workDetails from clients INNER JOIN users ON clients.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=clients.lookingFor  where clients.userId='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }else {
                 connection.query("select users.name as name,users.email as email,webcollections.english as gender,"+
                   "workprofessionslist.english as lookingFor,users.livesIn as livesIn,clients.timeTaken as timeTaken,"+
                   "clients.workDetails as workDetails from clients INNER JOIN users ON clients.userId=users.id inner join webcollections on webcollections.id=users.gender inner join workprofessionslist on workprofessionslist.id=clients.lookingFor  where clients.userId='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }
             }else if(location=="normalUser"){
               if (languageKey=='EN') {
                 connection.query("select users.name as name,webcollections.english as gender,users.email as email,"+
                 "users.livesIn as livesIn,users.country as country from users inner join webcollections on webcollections.id=users.gender where users.id='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }else if (languageKey=='TG') {
                 connection.query("select users.name as name,webcollections.tigrina as gender,users.email as email,"+
                 "users.livesIn as livesIn,users.country as country from users inner join webcollections on webcollections.id=users.gender where users.id='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }else if (languageKey=='NL') {
                 connection.query("select users.name as name,webcollections.dutch as gender,users.email as email,"+
                 "users.livesIn as livesIn,users.country as country from users inner join webcollections on webcollections.id=users.gender where users.id='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }else {
                 connection.query("select users.name as name,webcollections.english as gender,users.email as email,"+
                 "users.livesIn as livesIn,users.country as country from users inner join webcollections on webcollections.id=users.gender where users.id='?'",userIdLookingFor,function(error,row,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                 })
               }

             }else if(location=="passenger"){
                connection.query("select telephone,date,fromPlace,toPlace,transportChoosed from passenger where userId='?'",userIdLookingFor,function(error,row,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                })
             }
       })
//post all things to sale
      router.post('/postThingsToSale',function(req,res){
            connection.query("select salethingstable.id as id,salethingstable.userId as userId,salethingstable.itemName as itemName,salethingstable.price as price,salethingstable.description as description,salethingstable.unit as unit,salethingstable.fileName as fileName,webcollections.english as catagories from salethingstable inner join webcollections on webcollections.Id=salethingstable.catagories ",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
       //getSalethingsByItem
       router.post('/getSalethingsByItem',function(req,res){
               var selectedItemId=req.body.selectedCategoryId;
               var languageKey=req.body.languageKey;
               if(languageKey=='TG'){
                 connection.query("select salethingstable.id as id,salethingstable.userId as userId,salethingstable.itemName as itemName,salethingstable.description as description,salethingstable.price as price,salethingstable.unit as unit,salethingstable.fileName as fileName,webcollections.tigrina as catagories from salethingstable inner join webcollections on webcollections.Id=salethingstable.catagories where salethingstable.catagories=?",selectedItemId,function(row,error,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                  })
               }else if(languageKey=='NL'){
                 connection.query("select salethingstable.id as id,salethingstable.description as description,salethingstable.userId as userId,salethingstable.itemName as itemName,salethingstable.price as price,salethingstable.unit as unit,salethingstable.fileName as fileName,webcollections.dutch as catagories from salethingstable inner join webcollections on webcollections.Id=salethingstable.catagories where salethingstable.catagories=?",selectedItemId,function(row,error,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                  })
               }else{
                 connection.query("select salethingstable.id as id,salethingstable.description as description,salethingstable.userId as userId,salethingstable.itemName as itemName,salethingstable.price as price,salethingstable.unit as unit,salethingstable.fileName as fileName,webcollections.english as catagories from salethingstable inner join webcollections on webcollections.Id=salethingstable.catagories where salethingstable.catagories=?",selectedItemId,function(row,error,fields){
                   if(!!error){
                       res.json(error)
                   }else{
                       res.json(row)
                   }
                  })
               }

        })
       router.post('/getSaleItemById',function(req,res){
         var saleItemId=req.body.saleItemId;
         connection.query("select id,itemName,price,unit,fileName,catagories from salethingstable  where id=?",saleItemId,function(row,error,fields){
           if(!!error){
               res.json(error)
           }else{
               res.json(row)
           }
          })
       })
       router.post('/getDetailsInfoOfItemForSale',function(req,res){
         var saleItemId=req.body.saleItemId;
         connection.query("select size,amount from salethings_item_amount where itemId=?",saleItemId,function(row,error,fields){
           if(!!error){
               res.json(error)
           }else{
               res.json(row)
           }
          })
       })
      //post details of  things to sale
      router.post('/detailsOfThingsToBuy',function(req,res){
            var id=req.body.id;
            connection.query("select id,userId,itemName,price,unit,fileName from salethingstable   where id='?'",id,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//post all things to sale
      router.post('/postThingsForSaleOnHomePage',function(req,res){
            connection.query("select id,userId,price,place,description,date,fileName,catagories from salethingstable",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//delete thingstosal
        router.post('/deleteThingsToSale',mytoken,function(req,res){
          var id=req.body.id;
          var fileName=req.body.fileName
          connection.query("delete from salethingstable where id=?",id,function(error,row,fields){
            if(!!error){
                 res.json(error)
            }else{
              var directory="saleThingsImageCollector";
                 removeFile(directory,fileName)
              res.json(row)
            }
          })
        })
//post all news
      router.post('/allNews',function(req,res){
        var historyType=req.body.historyType;
            connection.query("select posterInfoId,newsTextId,userId,newsprovidername,newsprovidertele,uploaderPhoto,postedTime,title,subTitle,"+
              "news,fileName,fileType from newsview where historyType=? ORDER BY postedTime DESC  limit 5",historyType,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
      //post all news
      router.post('/allNewsAtHomePage',function(req,res){
        var historyType=req.body.historyType;

          connection.query("select posterInfoId,newsTextId,userId,newsprovidername,newsprovidertele,uploaderPhoto,postedTime,title,subTitle,"+
              "news,fileName,fileType from newsview where historyType=? ORDER BY postedTime DESC  limit 5",historyType,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
       //news by title
       router.post('/getNewsByTitle',function(req,res){
         var title=req.body.title
           connection.query("select posterInfoId,newsTextId,userId,newsprovidername,newsprovidertele,uploaderPhoto,postedTime,title,subTitle,"+
               "news,fileName,fileType from newsview where title=?",title,function(row,error,fields){
               if(!!error){
                   res.json(error)
               }else{
                   res.json(row)
               }
              })
       })
//post all news
      router.post('/allNewsRandombly',function(req,res){

            connection.query("select posterInfoId,newsTextId,userId,newsprovidername,newsprovidertele,uploaderPhoto,postedTime,title,subTitle,"+
              "news,fileName,fileType from newsview ORDER BY postedTime DESC  limit 10",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//post all news titles
      router.post('/allNewsTitles',function(req,res){
            var historyType=req.body.historyType
            connection.query("select titleId,userId,newsprovidername,newsprovidertele,uploaderPhoto,postedTime,title,subTitle from newsview where historyType='"+historyType+"' ORDER BY postedTime DESC",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//post sub titles
      router.post('/getSubTitles',mytoken,function(req,res){
            var mainTitleId=req.body.titleId
            connection.query("select newssubtitle.newsSubTitle as subTitle from newssubtitle INNER JOIN newstitle ON newssubtitle.newsMainTitleId=newstitle.id where newstitle.id=?",mainTitleId,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })
//delete news
      router.post('/deleteNews',mytoken,function(req,res){
        var id=req.body.id;
        var fileName=req.body.fileName
         var directory="newsImage"
         removeFile(directory,fileName)
            connection.query("delete from newsproviderinfo where id=?",id,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
      })
//post client  details
      router.post('/postDetailsOfContact',mytoken,function(req,res){
            var id=req.body.id;
            connection.query("select name,email,livesIn,lookingFor,workDetails from clients  WHERE   Id = '?'",id,function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
       })

//insert computer maintenace information to the computer maintenance table in the database
       router.post('/issues',mytoken,function(req,res){
             var userId=req.decoded.sub
             var name=req.body.name;
             var problemType=req.body.problemType;
             var livesIn=req.body.livesIn
             var problem=req.body.problem;
             var problemCouldBeSolvedBy=req.body.problemCouldBeSolvedBy
             var date=Date.now()
         connection.query("insert into generalproblems(userId,name,problemType,livesIn,problem,problemCouldBeSolvedBy,timestamp)values('"+userId+"','"+name+"','"+problemType+"','"+livesIn+"','"+problem+"','"+problemCouldBeSolvedBy+"','"+date+"')",function(row,error,fields){
          if(!!error){
              res.json(error)
          }else{
              res.json("succesfully inserted")
          }
         })
       })
//get issues
        router.post('/getIssues',mytoken,function(req,res){
         connection.query("select generalproblems.id as id,generalproblems.problem as problem,"+
                "generalproblems.timestamp as timestamp,generalproblems.problemType as problemType,users.id as userId,users.name as username,users.photo as photo"+
                " from generalproblems INNER JOIN users ON generalproblems.userId=users.id  ORDER BY generalproblems.timestamp DESC Limit 10",function(row,error,fields){
          if(!!error){
              res.json(error)
          }else{
              res.json(row)
          }
         })
       })
//insert suggestions for a problems
           router.post('/generalProblemSuggestion',mytoken,function(req,res){
                 var userId=req.decoded.sub
                 var problemId=req.body.problemId;
                 var suggestion=req.body.suggestion;
                 var date=Date.now()
                 connection.query("insert into generalproblemsuggestions(userId,generalProblemId,suggestion,timestamp)values('"+userId+"','"+problemId+"','"+suggestion+"','"+date+"')",function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
           })
//look suggestions of a problem
           router.post('/lookSuggestions',mytoken,function(req,res){
                 var userId=req.decoded.sub
                 var problemId=req.body.problemId;
                 connection.query("select suggestionId,suggesterUserId,generalProblemId,suggestion,suggestionTime,"+
                  "suggesterUsername,suggesterPhoto,replyId,replyerUserId suggestionIdAtReply,reply,timeReplied,"+
                  "replyerName,replyerPhoto from generalproblemsuggestionandrepliesview where generalProblemId='?' GROUP BY suggestionId ORDER BY suggestionTime",problemId,function(error,row,fields){
                    if(!!error){
                       res.json(error)
                    }else{
                       res.json(row)
                    }
                })
           })
//insert reply suggestions for a problems
           router.post('/replySuggestion',mytoken,function(req,res){
                 var userId=req.decoded.sub
                 var suggestionId=req.body.suggestionId;
                 var message=req.body.message;
                 var date=Date.now()
                 connection.query("insert into generalproblemsreply(userId,generalproblemsuggestionsId,reply,timestamp)values('"+userId+"','"+suggestionId+"','"+message+"','"+date+"')",function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
           })
//get reply suggestions for a problems
           router.post('/getReplies',mytoken,function(req,res){
            var suggestionId=req.body.suggestionId;
                 connection.query("select generalproblemsreply.id as generalproblemsreplyId,users.id as userId,users.name as replyerName,users.photo as photo,generalproblemsreply.generalproblemsuggestionsId as generalproblemsuggestionsId ,"+
                  "generalproblemsreply.reply as reply,generalproblemsreply.timestamp as date from generalproblemsreply "+
                  " INNER JOIN users ON generalproblemsreply.userId=users.id where generalproblemsreply.generalproblemsuggestionsId='?' ORDER BY generalproblemsreply.timestamp ASC",suggestionId,function(row,error,fields){
                  if(!!error){
                      res.json(error)
                  }else{
                      res.json(row)
                  }
                 })
           })
//news
           router.post('/newsMainTitle',mytoken,function(req,res){
                 var userId=req.decoded.sub
                 var newsTextId=req.body.newsTextId;
                 var newsMainTitle=req.body.newsMainTitle
                 newsMainTitle=newsMainTitle.replace("'","\\'");
             connection.query("insert into newstitle(newsMainTitle,newsTextId)values('"+newsMainTitle+"','"+newsTextId+"')",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
           })
//news file upload ...................................................................................
      var newsFileUpload=multer({dest:'./public/newsImage'});
       router.post('/newsFileUploader',newsFileUpload.single('myFile'),newsFileUploadToDatabase);
       function newsFileUploadToDatabase(req,res){
            var subTitleId=req.body.subTitleId;
             var file=req.file;
            var fileName=file.filename;
            var fileType=file.mimetype;
            var fileSize=file.size;
              connection.query("insert into newsimage(subtitleId,fileName,fileType) values('"+subTitleId+"','"+fileName+"','"+fileType+"')",function(error,row,fields){
                if(!!error){
                 res.json(error)
                }else{
                  res.redirect('/jobFinder/dailyLifeHappenings/:succesfullyLoaded')
                }
              });
       }
            router.post('/newsSubTitles',mytoken,function(req,res){
                 var userId=req.decoded.sub
                 var newsSubTitle=req.body.newsSubTitle;
                 newsSubTitle=newsSubTitle.replace("'","\\'");
                 var newsMainTitleId=req.body.newsMainTitleId;
             connection.query("insert into newssubtitle(newsSubTitle,newsMainTitleId)values('"+newsSubTitle+"','"+newsMainTitleId+"')",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
           })
//main news
             router.post('/mainNews',mytoken,function(req,res){
                 var userId=req.decoded.sub
                 var newsText=req.body.newsText;
                 newsText=newsText.replace("'","\\'");
                 var newsProviderId=req.body.newsProviderId;
               connection.query("insert into newstext(newsText,newsProviderId)values('"+newsText+"','"+newsProviderId+"')",function(row,error,fields){
                if(!!error){
                    res.json(error)
                }else{
                    res.json(row)
                    
                }
               })
             })
// newsUploaderInfo
             router.post('/newsUploaderInfo',mytoken,function(req,res){
                  var userId=req.decoded.sub
                  var newsprovidername=req.body.newsprovidername
                  var newsprovidertele=req.body.newsprovidertele
                  var historyType=req.body.historyType;
                  var date=Date.now()
             connection.query("insert into newsproviderinfo(userId,newsprovidername,newsprovidertele,historyType,timestamp)values('"+userId+"','"+newsprovidername+"','"+newsprovidertele+"','"+historyType+"','"+date+"')",function(row,error,fields){
              if(!!error){
                  res.json(error)
              }else{
                  res.json(row)
              }
             })
           })
//post number of messages
           router.post('/postNumberOfMessages',mytoken,function(req,res){
                 var id=req.decoded.sub
                 connection.query("select count(messagetable.toUserId) as numberOfMessages from messagetable INNER JOIN users ON messagetable.toUserId=users.id where messagetable.toUserId='"+id+"'  and messagetable.timestamp >users.lastLogin",function(row,error,fields){
                    if(!!error){
                        res.json(error)
                    }else{
                       res.json(row)
                    }
                 })
           })
//post messages
            router.post('/postNotificationMessages',mytoken,function(req,res){
                   var id=req.decoded.sub
                   connection.query("SELECT   messagetable.Id as Id,messagetable.toUserId as toUserId,messagetable.fromUserId as fromUserId,messagetable.message as message,messagetable.timestamp as date,messagetable.location as location,users.name as username,users.photo as photo"+
                    " FROM     messagetable INNER JOIN users ON messagetable.fromUserId=users.id"+
                    " WHERE    (messagetable.toUserId, messagetable.fromUserId, messagetable.timestamp) IN ("+
                    " SELECT   messagetable.toUserId, messagetable.fromUserId, MAX(messagetable.timestamp)"+
                    " FROM     messagetable WHERE    messagetable.toUserId='?'"+
                    " GROUP BY messagetable.toUserId, messagetable.fromUserId)"+
                    " ORDER BY messagetable.timestamp DESC limit 5",id,function(row,error,fields){
                      if(!!error){
                          res.json(error)
                        }else{
                           res.json(row)
                        }
                    })
           })
//post messages on scrolling
            router.post('/postMessagesOnScrolling',mytoken,function(req,res){
                   var id=req.decoded.sub
                   var lastMessageId=req.body.lastMessageId
                   connection.query("select messagetable.Id as Id,messagetable.fromUserId as fromUserId,users.name as username,users.photo as photo,messagetable.timestamp as date,messagetable.message as message,messagetable.toUserId as toUserId,messagetable.location as location from messagetable INNER JOIN users ON messagetable.fromUserId=users.id  where  messagetable.Id<'"+lastMessageId+"' and  messagetable.toUserId='?' ORDER BY messagetable.timestamp DESC LIMIT 3",id,function(row,error,fields){
                      if(!!error){
                          res.json(error)
                        }else{
                           res.json(row)
                        }
                    })
           })
            //
//getMessagesThatHadWithMe
            router.post('/getMessagesThatHadWithMe',mytoken,function(req,res){
                   var fromUserId=req.decoded.sub;
                   var toUserId=req.body.toUserId;
                   connection.query("(select users.name as name,users.photo as photo,messagetable.message as message,"+
                    " messagetable.timestamp as date from messagetable INNER JOIN users ON messagetable.fromUserId=users.id"+
                    " where messagetable.fromUserId='"+fromUserId+"' and messagetable.toUserId='"+toUserId+"') UNION (select users.name as name,"+
                    "users.photo as photo,messagetable.message as message, messagetable.timestamp as date from messagetable "+
                    "INNER JOIN users ON messagetable.fromUserId=users.id where messagetable.fromUserId='"+toUserId+"' and"+
                    " messagetable.toUserId='"+fromUserId+"') ORDER BY date desc LIMIT 10",function(row,error,fields){
                      if(!!error){
                          res.json(error)
                     }else{
                           res.json(row)
                        }
                    })
           })
//post all messages belong to a user
            router.post('/postAllMessages',mytoken,function(req,res){
                  var id=req.decoded.sub;
                  connection.query("select messagetable.Id as Id,messagetable.fromUserId as fromUserId,users.name as fromUserName,users.photo as senderPhoto,messagetable.timestamp as date,messagetable.location as location from messagetable INNER JOIN users ON messagetable.fromUserId=users.id  where  messagetable.toUserId='?' GROUP BY messagetable.fromUserId",id,function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//share post
            router.post('/sharePost',mytoken,function(req,res){
                  var currentUserId=req.decoded.sub;
                  var ownerUserId=req.body.postOwnerUserId;
                  var postId=req.body.postId;
                  var date=Date.now();
                  var sharedescription=req.body.sharedescription;
                  connection.query("insert into sharetable(userId,ownerUserId,postId,date,description)values('"+currentUserId+"','"+ownerUserId+"','"+postId+"','"+date+"','"+sharedescription+"')",function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//insert shared post in posts
           router.post('/sharePostInPosts',mytoken,function(req,res){
                  var currentUserId=req.decoded.sub;
                  var ownerUserId=req.body.postOwnerUserId;
                  var postId=req.body.postId;
                  var userId=req.decoded.sub;
                   var description= req.body.description
                   var fileType=req.body.fileType;
                   var fileName=req.body.fileName;
                   var firstPosterName=req.body.firstPosterName;
                   var sharedescription=req.body.sharedescription
                   if(fileType=="image/jpeg"){
                     var remarks="shared "+firstPosterName+"s photo"
                   }else if(fileType=="video/mp4"){
                    var remarks="shared "+firstPosterName+"s vidio"
                   }else{
                    var remarks="shared "+firstPosterName+"s post"
                   }
                  var date=Date.now();
                 connection.query("insert into posts(postDescription,fileType,fileName,userId,timestamp,remarks,shareDescription) values('"+description+"','"+fileType+"','"+fileName+"','"+userId+"','"+date+"','"+remarks+"','"+sharedescription+"')",function(error,row,fields){
                  if(!!error){
                   res.json(error)
                  }else{
                     res.redirect('/jobFinder/home')
                  }
                });
           })

//number of friend requests
            router.post('/numberOfFriendRequest',mytoken,function(req,res){
                var id=req.decoded.sub
               connection.query("select count(friendrequests.toUserId) as numberOfFriendRequests from friendrequests INNER JOIN users ON friendrequests.toUserId=users.id where friendrequests.toUserId='"+id+"'  and friendrequests.date >users.lastLogin",function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//friend requests
            router.post('/friendRequests',mytoken,function(req,res){
                var id=req.decoded.sub
               connection.query("select friendrequests.Id as Id,friendrequests.userId as fromUserId,friendrequests.toUserId as toUserId,friendrequests.location as location,users.userroom as userroom,users.name as username,users.photo as photo,friendrequests.date as date from friendrequests INNER JOIN users ON friendrequests.userId=users.id where  toUserId='?' and friendrequests.isFriendNow is null ORDER BY friendrequests.date  limit 7",id,function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//friend requests on scrolling
            router.post('/friendRequestsOnScrolling',mytoken,function(req,res){
                var id=req.decoded.sub
                var lastFriendRequestId=req.body.lastFriendRequestId;
               connection.query("select friendRequests.Id as Id,friendRequests.userId as fromUserId,friendRequests.toUserId as toUserId,friendRequests.location as location,users.userroom as userroom,users.name as username,users.photo as photo,friendRequests.date as date from friendrequests INNER JOIN users ON friendrequests.userId=users.id where  friendRequests.Id<'"+lastNotificationId+"' and toUserId='?' and friendrequests.isFriendNow is null ORDER BY friendRequests.date limit 5",id,function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//ok confirmition of friend request
            router.post('/okFriendRequest',mytoken,function(req,res){
                var fromUserId=req.decoded.sub
                var toUserId=req.body.toUserId;
                var id=req.body.id
                var message="has accepted you."
                var date=Date.now();
               connection.query("update friendrequests SET isFriendNow='yes' where Id='?'",id,function(row,error,fields){
                if(!!error){
                    //res.json(error)
                  }else{
                    // res.json(row)
                  }
               })
               connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"')",function(row,error,fields){
                 if(!!error){
                   }else{
                   }
                })
           })
//no confirmition of friend request
            router.post('/noFriendRequest',mytoken,function(req,res){
                var fromUserId=req.decoded.sub;
                var toUserId=req.body.toUserId;
                var id=req.body.id
                var date=Date.now();
                var message="did not accept your friend request"
               connection.query("update friendrequests SET isFriendNow='no' where Id='?'",id,function(row,error,fields){
                if(!!error){
                    //res.json(error)
                  }else{
                     //res.json(row)
                  }
               })
               connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"')",function(row,error,fields){
                 if(!!error){
                   }else{
                   }
                })
           })
//insert friend requests
            router.post('/insertFriendRequests',mytoken,function(req,res){
                var userId=req.decoded.sub
                var toUserId=req.body.toUserId;
                var location=req.body.userIs
                var date=Date.now();
                var message="Friend Request"
               connection.query("insert into friendrequests(userId,toUserId,date,message,location)values('"+userId+"','"+toUserId+"','"+date+"','"+message+"','"+location+"')",function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json({rowresult:row,
                               userId:userId})
                  }
               })
           })
//post computer maintenance info
            router.post('/postProblemsIssues',mytoken,function(req,res){
              var problemType=req.body.problemType
               connection.query("select generalproblems.id as id,generalproblems.problem as problem,"+
                "generalproblems.timestamp as timestamp,generalproblems.problemType as problemType,users.id as userId,users.name as username,users.photo as photo"+
                " from generalproblems INNER JOIN users ON generalproblems.userId=users.id WHERE generalproblems.problemType='"+problemType+"' ORDER BY generalproblems.timestamp DESC limit 10",function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//delete computer problem info
            router.post('/deleteProblem',mytoken,function(req,res){
              var id=req.body.id
               connection.query("delete from generalproblems where id='"+id+"'",function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })

//post messages that sended to the current user
            router.post('/postMessageFrom',mytoken,function(req,res){
                var fromId=req.body.fromId
                var toId=req.body.toId;
               connection.query("select fromId,fromIdName,toId,toIdName,message from messagetable where fromId='"+fromId+"' AND toId='"+toId+"'",function(row,error,fields){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
           })
//post data from professional  main table
    router.post('/professionalMainTable',mytoken,function(req,res){
        var professionalId=req.decoded.professionalId
        var languageKey=req.body.languageKey;
        if(languageKey==null){
             connection.query("select professionalstable.Id as Id,users.name as name,users.email as email,users.userroom as userroom,professionalstable.telephone as telephone,"+
              "professionalstable.remarks as remarks,workprofessionslist.english as profession,professionalstable.profession as professionId,"+
              "webcollections.english as workSession,professionalstable.workSession as workSessionId,users.birthDate as dateOfBirth,users.gender as gender,"+
              "professionalsworksituation.english as lookingForJobThisTime,professionalstable.lookingForJobThisTime as lookingForJobThisTimeId  from professionalstable"+
              " INNER JOIN users ON professionalstable.userId=users.id INNER JOIN webcollections ON"+
              " webcollections.Id=professionalstable.workSession INNER JOIN professionalsworksituation "+
              "ON professionalstable.userId=professionalsworksituation.userId INNER JOIN workprofessionslist ON workprofessionslist.Id=professionalstable.profession   where professionalstable.Id='"+professionalId+"'",function(row,error,fields){
              if(!!error){
                  res.json(error)
                }else{
                   res.json(row)
                }
             })
        }else if(languageKey=='EN'){
             connection.query("select professionalstable.Id as Id,users.name as name,users.email as email,users.userroom as userroom,professionalstable.telephone as telephone,"+
              "professionalstable.remarks as remarks,workprofessionslist.english as profession,professionalstable.profession as professionId,"+
              "webcollections.english as workSession,professionalstable.workSession as workSessionId,users.birthDate as dateOfBirth,users.gender as gender,"+
              "professionalsworksituation.english as lookingForJobThisTime,professionalstable.lookingForJobThisTime as lookingForJobThisTimeId  from professionalstable"+
              " INNER JOIN users ON professionalstable.userId=users.id INNER JOIN webcollections ON"+
              " webcollections.Id=professionalstable.workSession INNER JOIN professionalsworksituation "+
              "ON professionalstable.userId=professionalsworksituation.userId INNER JOIN workprofessionslist ON workprofessionslist.Id=professionalstable.profession   where professionalstable.Id='"+professionalId+"'",function(row,error,fields){
              if(!!error){
                  res.json(error)
                }else{
                   res.json(row)
                }
             })
        }else if(languageKey=='TG'){
          connection.query("select professionalstable.Id as Id,users.name as name,users.email as email,users.userroom as userroom,professionalstable.telephone as telephone,"+
              "professionalstable.remarks as remarks,workprofessionslist.tigrigna as profession,professionalstable.profession as professionId,"+
              "webcollections.tigrina as workSession,professionalstable.workSession as workSessionId,users.birthDate as dateOfBirth,users.gender as gender,"+
              "professionalsworksituation.tigrina as lookingForJobThisTime,professionalstable.lookingForJobThisTime as lookingForJobThisTimeId  from professionalstable"+
              " INNER JOIN users ON professionalstable.userId=users.id INNER JOIN webcollections ON"+
              " webcollections.Id=professionalstable.workSession INNER JOIN professionalsworksituation "+
              "ON professionalstable.userId=professionalsworksituation.userId INNER JOIN workprofessionslist ON workprofessionslist.Id=professionalstable.profession   where professionalstable.Id='"+professionalId+"'",function(row,error,fields){
              if(!!error){
                  res.json(error)
                }else{
                   res.json(row)
                }
             })

        }else if(languageKey=='NL'){
               connection.query("select professionalstable.Id as Id,users.name as name,users.email as email,users.userroom as userroom,professionalstable.telephone as telephone,"+
              "professionalstable.remarks as remarks,workprofessionslist.dutch as profession,professionalstable.profession as professionId,"+
              "webcollections.dutch as workSession,professionalstable.workSession as workSessionId,users.birthDate as dateOfBirth,users.gender as gender,"+
              "professionalsworksituation.dutch as lookingForJobThisTime,professionalstable.lookingForJobThisTime as lookingForJobThisTimeId  from professionalstable"+
              " INNER JOIN users ON professionalstable.userId=users.id INNER JOIN webcollections ON"+
              " webcollections.Id=professionalstable.workSession INNER JOIN professionalsworksituation "+
              "ON professionalstable.userId=professionalsworksituation.userId INNER JOIN workprofessionslist ON workprofessionslist.Id=professionalstable.profession   where professionalstable.Id='"+professionalId+"'",function(row,error,fields){
              if(!!error){
                  res.json(error)
                }else{
                   res.json(row)
                }
             })
        }

   })

//post client working period in date from needtranslation
    router.post('/postClientMainTableData',mytoken,function(req,res){
        var clientId=req.decoded.clientId
        var languageKey=req.body.languageKey;
        if(languageKey=='EN'){
             connection.query("select clients.Id as Id,users.userroom as userroom,clients.telephone as telephone,"+
                "workprofessionslist.english as lookingFor,clients.lookingFor as lookingForIdInClient,clients.timeTaken as timeTaken,clients.workDetails as workDetails,clients.workSummary as workSummary,"+
                "webcollections.english as situationOfWorkAtThisTime,clients.situationOfWorkAtThisTime as situationOfWorkAtThisTimeIdInClients,clients.workCountry as workCountry,"+
                "clients.workCity as workCity,clients.name as name,clients.url as url from clients INNER JOIN users ON clients.userId=users.id INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor INNER JOIN webcollections ON webcollections.Id=clients.situationOfWorkAtThisTime where clients.Id=?",clientId,function(error,row){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
        }else if(languageKey=='TG'){
             connection.query("select clients.Id as Id,users.userroom as userroom,clients.telephone as telephone,"+
                "workprofessionslist.tigrigna as lookingFor,clients.lookingFor as lookingForIdInClient,clients.timeTaken as timeTaken,clients.workDetails as workDetails,clients.workSummary as workSummary,"+
                "webcollections.tigrina as situationOfWorkAtThisTime,clients.situationOfWorkAtThisTime as situationOfWorkAtThisTimeIdInClients,clients.workCountry as workCountry,"+
                "clients.workCity as workCity,clients.name as name,clients.url as url from clients INNER JOIN users ON clients.userId=users.id INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor INNER JOIN webcollections ON webcollections.Id=clients.situationOfWorkAtThisTime where clients.Id=?",clientId,function(error,row){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
        }else if(languageKey=='NL'){
               connection.query("select clients.Id as Id,users.userroom as userroom,clients.telephone as telephone,"+
                "workprofessionslist.dutch as lookingFor,clients.lookingFor as lookingForIdInClient,clients.timeTaken as timeTaken,clients.workDetails as workDetails,clients.workSummary as workSummary,"+
                "webcollections.dutch as situationOfWorkAtThisTime,clients.situationOfWorkAtThisTime as situationOfWorkAtThisTimeIdInClients,clients.workCountry as workCountry,"+
                "clients.workCity as workCity,clients.name as name,clients.url as url from clients INNER JOIN users ON clients.userId=users.id INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor INNER JOIN webcollections ON webcollections.Id=clients.situationOfWorkAtThisTime where clients.Id=?",clientId,function(error,row){
                if(!!error){
                    res.json(error)
                  }else{
                     res.json(row)
                  }
               })
        }else{
           connection.query("select clients.Id as Id,users.userroom as userroom,clients.telephone as telephone,"+
            "workprofessionslist.english as lookingFor,clients.lookingFor as lookingForIdInClient,clients.timeTaken as timeTaken,clients.workDetails as workDetails,clients.workSummary as workSummary,"+
            "webcollections.english as situationOfWorkAtThisTime,clients.situationOfWorkAtThisTime as situationOfWorkAtThisTimeIdInClients,clients.workCountry as workCountry,"+
            "clients.workCity as workCity,clients.name as name,clients.url as url from clients INNER JOIN users ON clients.userId=users.id INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor INNER JOIN webcollections ON webcollections.Id=clients.situationOfWorkAtThisTime where clients.Id=?",clientId,function(error,row){
            if(!!error){
                res.json(error)
              }else{
                 res.json(row)
              }
           })
        }

   })
    //check if the user is client or professional
    router.post('/checkIfUserIsClientOrProfessional',mytoken,function(req,res){
              var clientId=req.decoded.clientId;
              var professionalId=req.decoded.professionalId;
              var permissions=req.decoded.permissions;

              if(clientId==undefined && professionalId!==undefined){
                 res.json({'userIs':'professional','professionalId':professionalId,'permission':permissions,'userId':req.decoded.sub})
              }else if(professionalId==undefined && clientId!==undefined){
                 res.json({'userIs':'client','clientId':clientId,'permission':permissions,'userId':req.decoded.sub})
              }else if(clientId==undefined && professionalId==undefined){
                res.json({'userIs':'normalUser','userId':req.decoded.sub,'permission':permissions})
              }
    })

//insert like information
    router.post('/likeInfo',mytoken,function(req,res){
          var userId=req.decoded.sub;
          var postId=req.body.postId;
          var liked='yes';
          var comments=req.body.comments;
            var timestamp=Date.now();
            var location=req.body.userIs
       connection.query("insert into postlikesandcomments(userId,postId,liked,comment,timestamp,location)values('"+userId+"','"+postId+"','"+liked+"','"+comments+"','"+timestamp+"','"+location+"')",function(row,error,fields){
        if(!!error){
            res.json(error)
          }else{
             res.json(row)
          }
       })
   })
//insert comment information to posts table
    router.post('/commentInfo',mytoken,function(req,res){
          var userId=req.decoded.sub
          var postId=req.body.postId;
          var comments=req.body.comments;
          var timestamp=Date.now();
          var location=req.body.userIs
       connection.query("insert into commentstable(postId,userId,comment,timestamp,location)values('"+postId+"','"+userId+"','"+comments+"','"+timestamp+"','"+location+"')",function(row,error,fields){
        if(!!error){
            res.json(error)
          }else{
             res.json(row)
          }
       })
   })
//post likes and comments
    router.post('/postComment',mytoken,function(req,res){
      var postId=req.body.id;
       connection.query("select commentstable.postId as postId,commentstable.`comment` as comment,commentstable.timestamp as date,users.photo as userPhoto,users.name as name,commentstable.timestamp as timestamp,commentstable.userId as userId from commentstable INNER JOIN users ON commentstable.userId=users.id where postId='"+postId+"'",function(row,error,fields){
        if(!!error){
            res.json(error);
          }else{
            res.json(row);
          }
       })
    })
//ADMIN WORKS----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//passengers
    router.post('/allPassengers',mytoken,function(req,res){
      var permissions=req.decoded.permissions
      var passengers=req.body.passengers;
      if(permissions=='admin'){
          if(passengers==''|| passengers==null){
               connection.query("select id,userId,telephone,date,fromTime,fromPlace,toPlace,transportChoosed,code,approved from passenger",function(error,row,fields){
                     if(error){
                      res.json(error)
                     }else{
                      res.json(row);
                     }
             })
          }else{
            connection.query("select id,userId,telephone,date,fromPlace,toPlace,transportChoosed,code,approved from passenger where telephone=?",passengers,function(error,row,fields){
                     if(error){
                      res.json(error)
                     }else{
                      res.json(row);
                     }
              })
          }

      }else{
        res.json("not allowed")
      }

    })
    //passengers train
    router.post('/allTrainPassengers',mytoken,function(req,res){
       var permissions=req.decoded.permissions
      if(permissions=='admin'){
        connection.query("select id,userId,telephone,date,fromPlace,toPlace,transportChoosed,code,approved from passenger where transportChoosed='Train'",function(error,row,fields){
                   if(error){
                    res.json(error)
                   }else{
                    res.json(row);
                   }
        })
      }else{
        res.json("not allowed")
      }
    })
    //transport owners
    router.post('/allTransportOwners',mytoken,function(req,res){
       var permissions=req.decoded.permissions
       var transportOwner=req.body.transportOwner
      if(permissions=='admin'){
        if(transportOwner=='' || transportOwner==null){
          connection.query("select * from transporttype",function(error,row,fields){
                     if(error){
                      res.json(error)
                     }else{
                      res.json(row);
                     }
          })
        }else{
          connection.query("select * from transporttype where fromPlace=?",transportOwner,function(error,row,fields){
                     if(error){
                      res.json(error)
                     }else{
                      res.json(row);
                     }
          })
        }

      }else{
        res.json("not allowed")
      }
    })
  //users
   router.post('/getAllusersToAdminPage',mytoken,function(req,res){
       var permissions=req.decoded.permissions
       var users=req.body.users;
     if(permissions=='admin'){
       if(users=='' || users==null){
         connection.query("select users.id as id,users.name as name,users.username as username,users.email as email,"+
           "users.photo as photo,users.lastLogin as lastLogin,users.userroom as userroom,permissiontable.permission as permission,"+
           "users.gender as gender,users.birthDate as birthDate,users.registrationDate as registrationDate,users.country as country,users.livesIn as livesIn from users LEFT JOIN permissiontable "+
           " ON users.id=permissiontable.userId",function(error,row,fields){
                    if(error){
                     res.json(error);
                    }else{
                     res.json(row);
                    }
         })
       }else{
         connection.query("select users.id as id,users.name as name,users.username as username,users.email as email,"+
           "users.photo as photo,users.lastLogin as lastLogin,users.userroom as userroom,permissiontable.permission as permission,"+
           "users.gender as gender,users.birthDate as birthDate,users.registrationDate as registrationDate,users.country as country,users.livesIn as livesIn from users LEFT JOIN permissiontable "+
           " ON users.id=permissiontable.userId where users.name=?",users,function(error,row,fields){
                    if(error){
                     res.json(error);
                    }else{
                     res.json(row);
                    }
         })
       }

      }else{
        res.json("not allowed")
      }
    })
   router.post('/adminDeleteUser',mytoken,function(req,res){
         var id=req.body.userIdToBeDeleted;
        connection.query("delete from users where id='?'",id,function(error,row,fields){
                   if(error){
                    res.json(error)
                   }else{
                    res.json(row);
                   }
        })
    })
//post rooms
   router.post('/adminpostUsersRoom',function(req,res){
      var permissions=req.decoded.permissions
      if(permissions=='admin'){
        connection.query("select * from chatrooms",function(error,row,fields){
                   if(error){
                    res.json(error)
                   }else{
                    res.json(row);
                   }
        })
      }else{
        res.json("not allowed")
      }
    })
  //delete room
   router.post('/adminDeleteRoom',function(req,res){
         var id=req.body.id;
        connection.query("delete from chatrooms where Id='?'",id,function(error,row,fields){
                   if(error){
                    res.json(error)
                   }else{
                    res.json(row);
                   }
        })
    })
   //post clients
   router.post('/adminpostClients',mytoken,function(req,res){
          var userId=req.decoded.sub;
          var permissions=req.decoded.permissions
          var client=req.body.client
      if(permissions=='admin'){
        if(client=='' || client==null){
          connection.query("select Id,userId,telephone,lookingFor,timestamp,timeTaken,workDetails,situationOfWorkAtThisTime from clients",function(error,row,fields){
                     if(error){
                      res.json(error)
                     }else{
                      res.json(row);
                     }
          })
        }else{
          connection.query("select Id,userId,telephone,lookingFor,timestamp,timeTaken,workDetails,situationOfWorkAtThisTime from clients where telephone=?",client,function(error,row,fields){
                     if(error){
                      res.json(error)
                     }else{
                      res.json(row);
                     }
          })
        }

      }else{
        res.json("not allowed")
      }
    })
  //delete clientm
   router.post('/adminDeleteClient',mytoken,function(req,res){
         var userId=req.decoded.sub;
         var id=req.body.clientId;
        connection.query("delete from clients where Id='?'",id,function(error,row,fields){
                   if(error){
                    res.json(error)
                   }else{
                    res.json(row);
                   }
        })
    })
    //delete profession
   router.post('/adminDeleteProfessional',mytoken,function(req,res){
         var userId=req.decoded.sub;
         var id=req.body.professionalId;
        connection.query("delete from professionalstable where Id='?'",id,function(error,row,fields){
                   if(error){
                    res.json(error)
                   }else{
                    res.json(row);
                   }
        })
    })
    router.post('/getCurrentUserId',mytoken,function(req,res){
       var userId=req.decoded.sub;
       res.json(userId)
    })
    router.post('/deleteTransportOwners',mytoken,function(req,res){
      var userId=req.decoded.sub;
      var transportOwnerId=req.body.transportOwnerId
      connection.query("delete from transporttype where id='?'",transportOwnerId,function(error,row,fields){
        if(!!error){
          res.json("there was error while deleting")
        }else{
          res.json("deleted succesfully")
        }
      })
    })
  router.post('/deletePassengers',mytoken,function(req,res){
    var userId=req.decoded.sub;
    var passengerId=req.body.passengerId
    connection.query("delete from passenger where id='?'",passengerId,function(error,row,fields){
      if(!!error){
        res.json("there was error while deleting")
      }else{
        res.json("deleted succesfully")
      }
    })
  })
  router.post('/adminProfessionals',mytoken,function(req,res){
     var permissions=req.decoded.permissions
     var professional=req.body.professinal;
      if(permissions=='admin'){
        if(professional==''|| professional==null){
          connection.query("select * from professionalstable",function(error,row,fields){
            if(!!error){
              res.json("error while searching professionals")
            }else{
              res.json(row)
            }
          })
        }else{
          connection.query("select * from professionalstable where telephone=?",professinal,function(error,row,fields){
            if(!!error){
              res.json("error while searching professionals")
            }else{
              res.json(row)
            }
          })
        }

        }else{
          res.json("not allowed")
        }
  })
  router.post('/addPermission',mytoken,function(req,res){
       var permissionAssigner=req.decoded.sub;
       var userId=req.body.userId;
       var permission=req.body.permission;
       var date=Date.now();
      connection.query("insert into permissiontable(userId,permission,permissionAssignerId,assigningDate)values('"+userId+"','"+permission+"','"+permissionAssigner+"','"+date+"')",function(error,row,fields){
        if(!!error){
          res.json(error)
        }else{
          res.json(row);
        }
      })
  })
  router.post('/updatePermission',mytoken,function(req,res){
       var permissionAssigner=req.decoded.sub;
       var userId=req.body.userId;
       var permission=req.body.permission;
       var permissionId=req.body.permissionId
       var date=Date.now();
      connection.query("update  permissiontable SET permission='"+permission+"', permissionAssignerId='"+permissionAssigner+"',assigningDate='"+date+"' where Id='?'",permissionId,function(error,row,fields){
        if(!!error){
          res.json(error)
        }else{
          res.json(row);
        }
      })
  })
  // function result(url){
  //         request(url, function(error, response, html){
  //             if(!error){
  //                 var $ = cheerio.load(html);
  //                   var title, summary, days,href;
  //                   var json = { title : "", summary : "", days : "", href : ""};
  //                  $('.row').filter(function(){
  //                   var data=$(this);
  //                   title=data.children().first().text();
  //                   //summary=data.children().last().text();
  //                   summary=$('.snip').children('.summary').text();
  //                   days=$('.result-link-bar').children('.date').text();
  //                    //href = $("a") // Get all <a> tag
  //                    // .map((index, element) => $(element).attr("href")) // For each tag, return attribute 'href'
  //                    // .get();
  //                   json.title=title;
  //                   json.summary=summary;
  //                   json.days=days;
  //                  // console.log(json);
  //                  return json
  //                  })
  //             }
  //           })
  //     }
      function englishProfessionName(workRequest,callback){
          if(workRequest.languageKey=='TG'){
            connection.query("select english from workprofessionslist where tigrigna=?",workRequest.profession,function(error,row){
              if(!!error){
                callback(error,"there was error")
              }else{
                callback(null,row[0].english)
              }
            })
          }else if(workRequest.languageKey=='NL'){
            connection.query("select english from workprofessionslist where dutch=?",workRequest.profession,function(error,row){
              if(!!error){
                callback(error,"there was error")
              }else{
                callback(null,row[0].english)
              }
            })
          }else{
            callback(null,workRequest.profession)
          }
      }
      router.post('/insertExternalData',function(req,res){
        var country=req.body.country;
        var what=req.body.profession;
        var location=req.body.livesIn;
        var languageKey=req.body.languageKey
        var workRequest={}
        workRequest.country=country;
        workRequest.profession=what;
        workRequest.city=location
        workRequest.languageKey=languageKey;
        connection.query("select workCity,registeredDate from clientsFromExternal where workCity=?",location,function(error,row){
          if(!!error){
          }else if(row.length==0){
              englishProfessionName(workRequest,function(error,result){
                var workRequest2={}
                if(country=='Netherlands'){
                  workRequest2.dot='.nl'
                }else if(country=='United Kingdom'){
                  workRequest2.dot='.co.uk'
                }else{
                  workRequest2.dot='.com'
                }
                workRequest2.work=result;
                workRequest2.city=location
                getExternalWorkInfo(workRequest2,function(error,result2){
                })
                res.json("data is inserted")
              })
          }else{
            res.json("there is data already")
          }
        })
      })
      router.post('/getjob',function(req,res){
           var country=req.body.country;
           var what=req.body.profession;
           var location=req.body.livesIn;
           var languageKey=req.body.languageKey
           var workRequest={}
           workRequest.country=country;
           workRequest.profession=what;
           workRequest.city=location
           workRequest.languageKey=languageKey;
           getProfessionId(what,languageKey,function(error,result){
             if(result==undefined){
             }else{
               var professionId=result;
               if(languageKey=='EN'){
                     connection.query("select clients.Id as Id,clients.workCountry as workCountry,clients.workCity as workCity,workprofessionslist.english as lookingFor,clients.name as name,clients.url as url,clients.workSummary as summary from clients  INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor where  clients.lookingFor=? and clients.workCountry=? and clients.workCity=?",[professionId,country,location],function(error,row,fields){
                        if(!!error){
                             res.json(error)
                        }else{
                          res.json(row)
                        }
                       })
               }else if(languageKey=='TG'){
                   connection.query("select clients.Id as Id,clients.workCountry as workCountry,clients.workCity as workCity,clients.workDetails as wordDetails,workprofessionslist.tigrigna as lookingFor,clients.name as name,clients.url as url,clients.workSummary as summary from clients  INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor where  clients.lookingFor=? and clients.workCountry=? and clients.workCity=?",[professionId,country,location],function(error,row,fields){
                      if(!!error){
                           res.json(error)
                      }else{
                        res.json(row)
                      }
                     })
               }else if(languageKey=='NL'){
                  connection.query("select clients.Id as Id,clients.workCountry as workCountry,clients.workCity as workCity,clients.workDetails as wordDetails,workprofessionslist.dutch as lookingFor,clients.name as name,clients.url as url,clients.workSummary as summary from clients  INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor where  clients.lookingFor=? and clients.workCountry=? and clients.workCity=?",[professionId,country,location],function(error,row,fields){
                    if(!!error){
                         res.json(error)
                    }else{
                      res.json(row)
                    }
                   })
               }else{
                  connection.query("select clients.Id as Id,clients.workCountry as workCountry,clients.workCity as workCity,clients.workDetails as wordDetails,workprofessionslist.english as lookingFor,clients.name as name,clients.url as url,clients.workSummary as summary from clients  INNER JOIN workprofessionslist ON workprofessionslist.Id=clients.lookingFor where  clients.lookingFor=? and clients.workCountry=? and clients.workCity=?",[professionId,country,location],function(error,row,fields){
                    if(!!error){
                         res.json(error)
                    }else{
                      res.json(row)
                    }
                   })
               }
             }

           })
      })
     var upload4=multer({dest:'./public'});
     router.post('/thingsToSale1',upload4.single('myFile'),uploadInfoToDatabase4);
     function uploadInfoToDatabase4(req,res){
       var firstName=req.body.firstName;
       // var middelName=req.body.middelName;
       var surName=req.body.surName;
       var name=firstName+' '+surName;
       var country=req.body.customerCountry;
       var city=req.body.city;
       var postCode=req.body.postCode;
       var street=req.body.street;
       var houseNumber=req.body.houseNumber;
       var telephone=req.body.telephone;
       var email=req.body.email;
       var items=req.body.items
       var date=Date.now();
       var totalAmount=req.body.totalAmount
       var boughtThings=JSON.parse(req.body.boughtThings)
       var data={}
       data.name=name;
       data.country=country;
       data.city=city;
       data.postCode=postCode;
       data.street=street;
       data.houseNumber=houseNumber;
       data.telephone=telephone;
       data.email=email;
        data.date=Date.now();
   const amount=totalAmount;
      stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
      }).then(customer=>stripe.charges.create({
        amount,
        description:'web developemtb ebook',
        currency:'usd',
        customer:customer.id
      })).then(charge=>
          addCustomerToDatabase(data,function(error,result){
              var customerId=result
              for(key in boughtThings){
                  var id=boughtThings[key].id;
                  var itemId=boughtThings[key].itemId;
                  var numberOfItems=boughtThings[key].numberOfItems;
                  connection.query("insert into soldItems(customerId,idAtSaleThingsTable,itemIdAtItemQuantity,numberOfItemsSold)values('"+customerId+"','"+id+"','"+itemId+"','"+numberOfItems+"')",function(error,row){
                    if(!!error){
                    }else{
                    }
                  })
               }
          }),
      res.redirect('/paied.html'));
    }
     function addCustomerToDatabase(data,callback){
       connection.query("insert into salethingscustomer(name,country,city,postCode,street,houseNumber,telephone,email,date)values('"+data.name+"','"+data.country+"','"+data.city+"','"+data.postCode+"','"+data.street+"','"+data.houseNumber+"','"+data.telephone+"','"+data.email+"','"+data.date+"')",function(error,row,fields){
         if(!!error){
          callback(error,"there was error while inserting customer information")
         }else{

          callback(null,row.insertId)
         }
       })
     }
     function checkPrice(id,callback){
       connection.query("select price from salethingstable where id='?'",id,function(error,row){
         if(!!error){
           callback(error,"there was error")
         }else{
           callback(null,row[0].price)
         }
       })
     }

    //  function checkAmountOfTheItem(itemId,callback){
    //    connection.query("select amount from salethings_item_amount where Id='?'",itemId,function(error,row){
    //      if(!!error){
    //        callback(error,"there was error")
    //      }else{
    //        callback(null,row[0].amount)
    //      }
    //  })
   //}
//get publish key
 router.get('/getPublishKey',function(req,res){
     res.json(publicKey)
 })
 var io=require('socket.io')(http);

     router.get('/getWord/:fromLanguageId/:word/:toLanguageId',function(req,res){
        var fromLanguageId=req.params.fromLanguageId;
        var word=req.params.word
        var toLanguageId=req.params.toLanguageId
        io.on('connection',function(socket){
        })
        connection.query("select word from collectedwords where wordValueId IN (select wordValueId from collectedwords  where word='"+word+"' and language_id='"+fromLanguageId+"') and language_Id='"+toLanguageId+"' group by word",function(error,row,fields){
        if(!!error){
          console.log(error)
        }else{
          console.log(row)
           res.json(row);
        }
      })
     })
     router.get('/getRelatedWords/:fromLanguageId/:word/:toLanguageId',function(req,res){
        var fromLanguageId=req.params.fromLanguageId;
        var word=req.params.word
        var toLanguageId=req.params.toLanguageId
        connection.query("select word from collectedwords  where language_id='"+fromLanguageId+"' and word like '%"+word+"%' group by word",function(error,row,fields){
        if(!!error){
        }else{
           res.json(row);
        }
      })
    })
    function checkIdInProfessionaltable(id,languageKey,callback){
              if(languageKey=='EN'){
                        connection.query("select Id,userId,name,remarks,userroom,photo,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewenglish where userId=?",id,function(error,row){
                           if(!!error){
                             callback(error,error)
                           }else{
                             callback(null,row)
                           }
                         })
                }else if(languageKey=='TG'){
                  connection.query("select Id,userId,name,userroom,remarks,photo,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewtigrina where userId=?",id,function(error,row){
                    if(!!error){
                      callback(error,error)
                    }else{
                      callback(null,row)
                    }
                   })
                }else if(languageKey=='NL'){
                    connection.query("select Id,userId,name,photo,userroom,remarks,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewdutch where userId=?",id,function(error,row){
                      if(!!error){
                        callback(error,error)
                      }else{
                        callback(null,row)
                      }
                     })
                }else{
                  connection.query("select Id,userId,name,photo,userroom,remarks,genderInEnglish,country,livesIn,birthDate,profession from professionalsinfoviewenglish where userId=?",id,function(error,row){
                      if(!!error){
                        callback(error,error)
                      }else{
                        callback(null,row)
                      }
                   })
                }

    }
    function checkIdInClientTable(id,languageKey,callback){
      if(languageKey=='EN'){
             connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate,workDetails from clientinfoviewenglish where userId=?",id,function(error,row,fields){
               if(!!error){
                 callback(error,error)
               }else{
                 callback(null,row)
               }
             });
       }else if(languageKey=='TG'){
         connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate,workDetails from clientinfoviewtigrina where userId=?",id,function(error,row,fields){
             if(!!error){
               callback(error,error)
             }else{
               callback(null,row)
             }
         });
       }else if(languageKey=='NL'){
         connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate,workDetails from clientinfoviewdutch where userId=?",id,function(error,row,fields){
             if(!!error){
               callback(error,error)
             }else{
               callback(null,row)
             }
         });
       }else{
         connection.query("select Id,userId,name,timeTaken,country,city,url,username,photo,lookingFor,englishGender,birthDate,workDetails from clientinfoviewenglish where userId=?",id,function(error,row,fields){
             if(!!error){
               callback(error,error)
             }else{
               callback(null,row)
             }
         });
       }
    }
    function checkIdInPassengers(id,callback){
      connection.query("select id,userId,telephone,date,fromPlace,toPlace,transportChoosed,code,approved from passenger where userId=?",id,function(error,row,fields){
          if(!!error){
            callback(error,error)
          }else{
            callback(null,row)
          }
        })
    }
    function checkIdInTransportOwners(id,callback){
      connection.query("select * from transporttype where userId=?",id,function(error,row,fields){
          if(!!error){
            callback(error,error)
          }else{
            callback(null,row)
          }
      })
    }
    function checkIdInUsers(id,languageKey,callback){
      if(languageKey=='EN'){
        connection.query("select users.name as name,users.photo as photo,webcollections.english as gender,users.country as country,users.livesIn as livesIn,users.email as email from users inner join webcollections on webcollections.Id=users.gender where users.id=?",id,function(error,row,fields){
            if(!!error){
              callback(error,error)
            }else{
              callback(null,row)
            }
        })
      }else if (languageKey=='TG') {
        connection.query("select users.name as name,users.photo as photo,webcollections.tigrina as gender,users.country as country,users.livesIn as livesIn,users.email as email from users inner join webcollections on webcollections.Id=users.gender where users.id=?",id,function(error,row,fields){
            if(!!error){
              callback(error,error)
            }else{
              callback(null,row)
            }
        })
      }else if (languageKey=='NL') {
        connection.query("select users.name as name,users.photo as photo,webcollections.dutch as gender,users.country as country,users.livesIn as livesIn,users.email as email from users inner join webcollections on webcollections.Id=users.gender where users.id=?",id,function(error,row,fields){
            if(!!error){
              callback(error,error)
            }else{
              callback(null,row)
            }
        })
      }else {
        connection.query("select users.name as name,users.photo as photo,webcollections.english as gender,users.country as country,users.livesIn as livesIn,users.email as email from users inner join webcollections on webcollections.Id=users.gender where users.id=?",id,function(error,row,fields){
            if(!!error){
              callback(error,error)
            }else{
              callback(null,row)
            }
        })
      }
    }
router.post('/checkWhoIsThisUser',function(req,res){
  var id=req.body.id;
  var languageKey=req.body.languageKey;
  var userInfo={}
  checkIdInProfessionaltable(id,languageKey,function(error,result){
    userInfo.profession=result
  });
  checkIdInClientTable(id,languageKey,function(error,result){
    userInfo.client=result
    });
  checkIdInPassengers(id,function(error,result){
    userInfo.passenger=result;
    });
    checkIdInTransportOwners(id,function(error,result){
      userInfo.owner=result;
    })
    checkIdInUsers(id,languageKey,function(error,result){
      userInfo.users=result;
      res.json(userInfo)
    })
})
router.post('/getExternalWorks',function(req,res){
  var country=req.body.country;
  var what=req.body.profession;
  var location=req.body.livesIn;
  var languageKey=req.body.languageKey
  var workRequest={}
  workRequest.profession=what;
  workRequest.city=location
  workRequest.languageKey=languageKey;
  englishProfessionName(workRequest,function(error,result){
    var workRequest2={}
    if(country=='Netherlands'){
      workRequest2.dot='.nl'
    }else if(country=='United Kingdom'){
      workRequest2.dot='.co.uk'
    }else{
      workRequest2.dot='.com'
    }
    workRequest2.work=result;
    workRequest2.city=location
    connection.query("select id,companyName,linkId,lookingForProfession,workCity,summary,date,websiteLink from clientsFromExternal WHERE workCity=?",location,function(error,row){
          if(!!error){
          }else{
              res.json(row)
          }
      })
  })
})
router.post('/getClientWorkDetailsExternalData',function(req,res){
  var id=req.body.id;
  var linkId=req.body.linkId;
  var websiteLink=req.body.websiteLink+'&vjk='+linkId
  getWorkDetails(websiteLink,function(error,result){
  })
})
//function getWorkDetails(url,callback){
//var url3="https://www.indeed.nl/vacatures?q=computer%20engineer%20&l=Nijmegen&vjk=c35d44600a2b5c97"
  // request("https://www.indeed.nl/vacatures?q=computer%20engineer%20&l=Nijmegen&vjk=c35d44600a2b5c97",function(err,resp,html){
  //     var $=cheerio.load(html);
  //     $('#auxCol div #vjs-desc').filter(function(data){
  //        var title=$(this).text().trim();
  //        console.log(title)
  //     })
  // });
//}
function getNewExternalDataFromDatabase(location,callback){
  connection.query("select id,companyName,linkId,lookingForProfession,workCity,summary,date,websiteLink from clientsFromExternal WHERE workCity=?",location,function(error,row){
      if(!!error){
      }else{
          callback(null,row)
      }
   })
}
function getExternalWorkInfo(workRequest,callback){
  var baseUrl='https://www.indeed';
  var urlDot=workRequest.dot;
  var work=workRequest.work;
  var workCity=workRequest.city;
  var url=baseUrl+urlDot+'/jobs?q='+work+'&l='+workCity
  var jobInfoArray=[]
  var jobInfo={title:'',linkId:'',name:'',workCity:'',summary:'',date:''}
  //var url="https://www.indeed.nl/jobs?q=php&l=Nijmegen"
  request(url,function(err,resp,body){
       var $=cheerio.load(body);
      $('.result').each(function() {
           var linkId=$(this)[0].attribs['data-jk'];
           $(this).find('h2').each(function() {
               var title=$(this).text().trim();
               //var link = $(this).children('a').attr('href');
               jobInfo.title=title;
               jobInfo.linkId=linkId;
           });
           $(this).find('.company').each(function() {
               var company=$(this).text().trim();
               jobInfo.name=company
           });
           $(this).find('.location').each(function() {
               var location=$(this).text().trim();
               jobInfo.workCity=location
           });
           $(this).find('div table td div .summary').each(function(summary) {
               summary=$(this).text().trim();
               jobInfo.summary=summary
           });
             $(this).find('div table td div div .date').filter(function(date){
                 date=$(this).text().trim();
                 jobInfo.date=date
             })
          connection.query("insert into clientsFromExternal(companyName,linkId,lookingForProfession,workCity,summary,date,websiteLink,profession,registeredDate)values('"+jobInfo.name+"','"+jobInfo.linkId+"','"+jobInfo.title+"','"+jobInfo.workCity+"','"+jobInfo.summary+"','"+jobInfo.date+"','"+url+"','"+work+"','"+Date.now()+"')",function(error,row){
              if(!!error){
               }else{
                callback(null,row)
               }
           })
       });

   })

}
router.get('/dictionaryTranslatorWebSiteChecker',function(req,res){
  res.json("yes")
})
router.get('/getAllWorkList',function(req,res){
  connection.query("select Id,english,tigrigna from workprofessionslist",function(error,row){
    if(!!error){
    }else{
      res.json(row);
    }
  })
})
router.post('/updateWorkProfessionList',function(req,res){
  var Id=req.body.Id;
  var tigrignaProfession=req.body.translatedTigrignaProfession;
  connection.query("update workprofessionslist set tigrigna='"+tigrignaProfession+"' where Id=?",Id,function(error,row){
    if(!!error){
    }else{
      res.json(row);
    }
  })
})
router.post('/deleteExternalDataInfo',function(req,res){
  connection.query("delete from clientsFromExternal",function(error,row){
    if(!!error){
     
    }else{
      res.json("done")
    }
  })
})
router.post('/getContacts',function(req,res){
  connection.query("select * from contactus",function(error,row){
    if(!!error){
     
    }else{
      res.json(row)
    }
  })
})
router.post('/getAirTravel',function(req,res){
  connection.query("select * from airTravel",function(error,row){
    if(!!error){
     
    }else{
      res.json(row)
    }
  })
})
router.post('/getMoneyTransfer',function(req,res){
  connection.query("select * from moneyTransfer",function(error,row){
    if(!!error){
    }else{
      res.json(row)
    }
  })
})
router.post('/deleteContactInfo',function(req,res){
  var id=req.body.id;
  connection.query("delete from contactus where id=?",id,function(error,row){
    if(!!error){
    }else{
      res.json("done")
    }
  })
})
router.post('/deleteAirTravel',function(req,res){
  var id=req.body.id;
  connection.query("delete from airTravel where id=?",id,function(error,row){
    if(!!error){
    }else{
      res.json("done")
    }
  })
})
router.post('/deleteMoneyTransfer',function(req,res){
  var id=req.body.id;
  connection.query("delete from moneyTransfer where id=?",id,function(error,row){
    if(!!error){
    }else{
      res.json("done")
    }
  })
})

//})
module.exports=router;
     //module.exports={protected:router,unprotected:unprotected};
