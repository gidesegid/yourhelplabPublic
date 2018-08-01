var express=require('express');
var io = require("socket.io");
var usernames = {};
var rooms = [];
var mysql=require('mysql');
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
  }else{
  }
})
var usernames = {};
var rooms = [];
var onlineUsers=[];
var privateusernames = {};
var privaterooms = [];
var publicRoom=[]
var members={}
var allMembers=[];
var commenRoom=001;
module.exports = function(io) {
  io.on('connection', function (socket) {    
//public chatroomm
    function addUserToRoom(){
         socket.on('adduser', function (data) {
            var username = data.username;
            var room = data.room;
            members.username=data.username;
            members.room=data.room;
            members.room.user=data.username
            if (rooms.indexOf(room) != -1) {
                allMembers.push({'userId':data.userId,'username':username,'room':room})
                socket.username = username;
                socket.room = room;
                usernames[username] = username;
                socket.join(room);
                if(data.languageKey=='EN'){
                  socket.emit('infoToAuser', 'SERVER', 'You are connected. Start chatting');
                  socket.broadcast.to(room).emit('infoToAllUserInRoom', 'info-To-All-Users', username + ' has connected to this room');
                    var membersOfRoom = allMembers.filter(function( obj ) {
                    return obj.room == room;
                  });
                 io.sockets.in(socket.room).emit('addRoomMember',membersOfRoom);
                }else if(data.languageKey=='TG'){
                  socket.emit('infoToAuser', 'SERVER', 'ርክብ ጌርካ ኣለኻ መልእኽትኻ ክትሰድድ ትኽእል ኢካ');
                  socket.broadcast.to(room).emit('infoToAllUserInRoom', 'SERVER', username);
                    var membersOfRoom = allMembers.filter(function( obj ) {
                    return obj.room == room;
                  });
                 io.sockets.in(socket.room).emit('addRoomMember',membersOfRoom);
                }else if(data.languageKey=='NL'){
                  socket.emit('infoToAuser', 'SERVER', 'Je bent verbonden. Begin met chatten');
                  socket.broadcast.to(room).emit('infoToAllUserInRoom', 'SERVER', username);
                   var membersOfRoom = allMembers.filter(function( obj ){
                    return obj.room == room;
                  });
                  io.sockets.in(socket.room).emit('addRoomMember',membersOfRoom);
                }else {
                  socket.emit('infoToAuser', 'SERVER', 'You are connected. Start chatting');
                  socket.broadcast.to(room).emit('infoToAllUserInRoom', 'SERVER', username);
                   var membersOfRoom = allMembers.filter(function( obj ) {
                    return obj.room == room;
                  });
                 io.sockets.in(socket.room).emit('addRoomMember',membersOfRoom);
                }
            }else{
                socket.emit('updatechat', 'SERVER', 'not connected yet.');
            }
          connection.query("update chatrooms set numberOfMembersAtThisTime='"+membersOfRoom.length+"' where roomNumber='"+data.room+"'",function(error,row,fields){
            if(!!error){
            }else{
            }
          })

        });
    }
    addUserToRoom();
    function createRoom(){
         socket.on('createroom', function (data) {
            var new_room = ("" + Math.random()).substring(2, 7);
            rooms.push(new_room);
            data.room = new_room;
             connection.query("insert into chatrooms(userId,roomName,roomNumber,roomDescription)values('"+data.userId+"','"+data.roomName+"','"+new_room+"','"+data.roomDescription+"')",function(error,row,fields){
                if(!!error){
                }else{
                }
              })
            socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
            socket.emit('roomcreated', data);
       });
    }
    createRoom();
  function getRooms(){
        connection.query("select Id,userId,roomName,roomNumber,roomDescription,online,numberOfMembersAtThisTime from chatrooms",function(error,row,fields){
            if(!!error){
            }else{
                   row.forEach(function (row) {
                   var room=row.roomNumber;
                   var userIds=JSON.stringify(row.userId, null, 2);
                   rooms.push(room)
                   var roomData={};
                   roomData.Id=row.Id;
                   roomData.userId=row.userId;
                   roomData.roomName=row.roomName;
                   roomData.roomNumber=row.roomNumber;
                   roomData.roomDescription=row.roomDescription;
                   roomData.numberOfMembersAtThisTime=row.numberOfMembersAtThisTime
                   socket.emit('roomsInfo', roomData);
                });
            }
        })
  }
  getRooms();
  function sendMessage(){
     socket.on('sendchat', function (data) {
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });
   }
   sendMessage();
     function disconnect(){
         socket.on('disconnectuser', function (data) {
         var disconnectedUser={'userId':data.userId,'username':data.username,'room':data.room}
            var index = allMembers.reduce(function(searchIndex, item, index){
              if(item.userId === disconnectedUser.userId) {
                searchIndex = index;
              }
              return searchIndex;
            }, null);
           allMembers.splice(index,1);
               var memebersOfRoom = allMembers.filter(function( obj ) {
                  return obj.room == data.room;
                });
               //console.log("number of memebers in "+data.room+" now is "+memebersOfRoom.length)
            delete usernames[socket.username];
            io.sockets.emit('updateusers', usernames);
            if (socket.username !== undefined) {
               if(data.languageKey=='EN'){
                 socket.broadcast.emit('userDisconnected', 'SERVER', socket.username);
                  io.sockets.in(socket.room).emit('addRoomMember',memebersOfRoom);
                 socket.leave(socket.room);
               }else if(data.languageKey=='TG'){
                 socket.broadcast.emit('userDisconnected', 'SERVER', socket.username);
                  io.sockets.in(socket.room).emit('addRoomMember',memebersOfRoom);
                 socket.leave(socket.room);
               }else if(data.languageKey=='NG'){
                 socket.broadcast.emit('userDisconnected', 'SERVER', socket.username);
                  io.sockets.in(socket.room).emit('addRoomMember',memebersOfRoom);
                 socket.leave(socket.room);
               }else {
                 socket.broadcast.emit('userDisconnected', 'SERVER', socket.username);
                  io.sockets.in(socket.room).emit('addRoomMember',memebersOfRoom);
                 socket.leave(socket.room);
               }

            }
            //make chat room offline
            connection.query("update chatrooms set numberOfMembersAtThisTime='"+memebersOfRoom.length+"' where roomNumber='"+data.room+"'",function(error,row,fields){
               if(!!error){
               }else{
               }
            })
        });
     }
   disconnect();
//private chatt....................................................................................................
   function addUserToPrivateRoom(){
            socket.on('addprivateuser', function (data) {
              var username = data.username;
              var room = data.room;
              if (privaterooms.indexOf(room) != -1) {
                  socket.username = username;
                  socket.room = room;
                  privateusernames[username] = username;
                  socket.join(room);
              } else {
                  socket.emit('updateprivatechat', 'SERVER', 'Client is offline now, But message has been send to him.');
              }

            });
   }
   addUserToPrivateRoom();
    function createPrivateRoom(){
         socket.on('createprivateroom', function (data) {
            var userRoom=("" + Math.random()).substring(2, 7);;
            var username=data.username
            publicRoom.push(commenRoom);
            privaterooms.push(userRoom)
            socket.join(commenRoom);
            socket.join(userRoom)
            privateusernames[username] =username;
            socket.emit('roomNumber', userRoom);
            onlineUsers.push({username:data.username,userId:data.userId,photo:data.photo})
            var a=onlineUsers
            var b = uniqBy(a, JSON.stringify)
            connection.query("UPDATE users SET userroom='"+userRoom+"' where id='"+data.userId+"'",function(error,row,fields){
              if(!!error){
              }else{
              }
           })
           io.sockets.in(commenRoom).emit('onlineUsers',b);
       });
    }
    var clientAndSupplierRoom=[];
    var clientAndSupplierUsers={}
    function removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
    //remove duplicates in onlineusers array
    function uniqBy(a, key) {
      var seen = {};
      return a.filter(function(item) {
          var k = key(item);
          return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      })
     }
   createPrivateRoom();
   function sendPrivateMessage(){

         socket.on('chatWithSupplier',function(data){
           connection.query("select userroom from users where id=?",data.toUserId,function(error,row){
             if(!!error){
               if(data.languageKey=='EN'){
                 socket.emit('errorOnConnection',{message:"there was error on connection",online:'no',server:"server:thanks for using this"})
               }else if(data.languageKey=='TG'){
                 socket.emit('errorOnConnection',{message:"ገለ ጸገም ተፈጢሩ ኣሎ ስለዚ ከምባሓዱሽ ፈትኑ",online:'no',server:"server:thanks for using this"})
               }else if(data.languageKey=='NL'){
               socket.emit('errorOnConnection',{message:"er was een fout bij de verbinding",online:'no',server:"server:thanks for using this"})
               }else {
                 socket.emit('errorOnConnection',{message:"there was error on connection",online:'no',server:"server:thanks for using this"})
               }
             }else if(row[0].userroom==''){
               if(data.languageKey=='EN'){
                 socket.emit('userIsNotOnline',{message:"supplier is not online now but ofcourse will be within 5 minutes",online:'no',server:"server:thanks for using this"})
               }else if(data.languageKey=='TG'){
                 socket.emit('userIsNotOnline',{message:"ሸያጣይ ኣብዚ እዋን ዚ ኣብ መስመር የሎን ግን ድሕሪ 5 ደቓይቕ ክኣቱ ኢዩ ",online:'no',server:"server:thanks for using this"})
               }else if(data.languageKey=='NL'){
                 socket.emit('userIsNotOnline',{message:"leverancier is nu niet online maar zal natuurlijk binnen 5 minuten zijn",online:'no',server:"server:thanks for using this"})
               }else {
                 socket.emit('userIsNotOnline',{message:"supplier is not online now but ofcourse will be within 5 minutes",online:'no',server:"server:thanks for using this"})
               }
             }else if(row[0].userroom!==''){
               if(data.languageKey=='EN'){
                 socket.emit('userIsOnlineNow',{message:"supplier is online now",online:'yes',server:"server:thanks for using this",supplierRoom:row[0].userroom})
               }else if(data.languageKey=='TG'){
                 socket.emit('userIsOnlineNow',{message:"ሸያጢ እብ መስመር ኣሎ ክምልሰልኩም እዩ ንእሽቶይ ዓቅሊ ክሳብ ዝምልስ",online:'yes',server:"server:thanks for using this",supplierRoom:row[0].userroom})
               }else if(data.languageKey=='NL'){
                 socket.emit('userIsOnlineNow',{message:"leverancier is nu online",online:'yes',server:"server:thanks for using this",supplierRoom:row[0].userroom})
               }else {
                 socket.emit('userIsOnlineNow',{message:"supplier is online now",online:'yes',server:"server:thanks for using this",supplierRoom:row[0].userroom})
               }
             }
           })
         })
         socket.on('handShakingMessageFromClientToSupplier',function(data){
           console.log("supplier rooom")
           //var id = socket.io.engine.id
           console.log(data.supplierRoom);
           io.sockets.in(data.supplierRoom).emit('sendHandShakingMessageFromClientToSupplier',{message:'Hello from client',saleItemId:data.saleItemId,supplierRoom:data.supplierRoom,socketId:socket.id,languageKey:data.languageKey})
         })
         socket.on('helloClient',function(data){
           io.sockets.in(data.clientSocket).emit('sendHandShakingMessageFromSupplierToClient',{message:data.message,username:data.username,supplierSocketId:socket.id,clientSocketId:data.clientSocket})
           io.sockets.in(socket.id).emit('sendHandShakingMessageFromSupplierToClient',{message:"messege has been send to cliet",username:data.username,supplierSocketId:socket.id,clientSocketId:data.clientSocket})
         })
         socket.on('startConversationBtwClientAndSupplier',function(data){
            var info={}
            console.log("start conversatio btw client and supplier")
            console.log(socket)
            info.supplierRoom=data.supplierRoom
            info.clientSocketId=data.clientSocketId
            info.supplierSocketId=data.supplierSocketId;
           io.sockets.in(data.supplierSocketId).emit('messageFromClientOrSupplier',{message:data.message,username:data.username})
           io.sockets.in(data.clientSocketId).emit('messageFromClientOrSupplier',{message:data.message,username:data.username})
         })

         socket.on('SendMessage',function(data){
           console.log("from mobile message");
           console.log(data);
         })
     socket.on('sendprivatechat', function (data){
                var fromUserId=data.fromUserId;
                var toUserId=data.toUserId;
                var location=data.userIs;
                var date=Date.now();
                var message=data.message;
            io.sockets.in(data.room).emit('updateprivatechat',socket.username, data.message,data.fromUserFullName,data.photo,data.toUserId);
            socket.emit('updateprivatechat',socket.username, data.message,data.fromUserFullName,data.photo,data.toUserId);
              if(message=="Friend Request"){
                 socket.emit('updateprivatechat',socket.username, data.message);
               connection.query("insert into friendrequests(userId,toUserId,date,message,location)values('"+fromUserId+"','"+toUserId+"','"+date+"','"+message+"','"+location+"')",function(row,error,fields){
                if(!!error){
                  }else{
                     }
               })
              }else if(message=="has a job for you"){
                 socket.emit('updateprivatechat',socket.username, data.message);
                connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+location+"')",function(row,error,fields){
                  if(!!error){
                    }else{
                    }
                 })
              }else if(message=="has applied for your job"){
                 socket.emit('updateprivatechat',socket.username, data.message);
                connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+location+"')",function(row,error,fields){
                  if(!!error){
                    }else{
                    }
                 })
              }else if(message=="commented on your post"){
                  connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+data.postId+"')",function(row,error,fields){
                    if(!!error){
                      }else{
                      }
                   })
                   socket.emit('updateprivatechat',socket.username, data.message);
              }else if(message=="shared your post"){
                     connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+data.postId+"')",function(row,error,fields){
                      if(!!error){
                        }else{
                        }
                     })
                   socket.emit('updateprivatechat',socket.username, data.message);
              }else if(message=="liked your post"){
                      connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+data.postId+"')",function(row,error,fields){
                      if(!!error){
                        }else{
                        }
                     })
                   socket.emit('updateprivatechat',socket.username, data.message);
             }else if(message=="would like to join your journey"){
                  connection.query("insert into notificationtable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+data.userIs+"')",function(row,error,fields){
                    if(!!error){
                      }else{
                      }
                   })
               socket.emit('updateprivatechat',socket.username, data.message);
             }else if(message=="toAdmin"){
                   if(data.isChanging=="adding"){
                       message=data.userFullName+" needs to travell by train";
                        connection.query("insert into admintable(fromUserId,message,timestamp,location)values('"+fromUserId+"','"+message+"','"+date+"','"+data.userIs+"')",function(row,error,fields){
                          if(!!error){
                            }else{
                            }
                         })
                   }else{
                         message=data.userFullName+" needs to travell by train. updated";
                       connection.query("update admintable SET fromUserId='"+fromUserId+"',message='"+message+"',timestamp='"+date+"',location='"+data.userIs+"'",function(row,error,fields){
                        if(!!error){
                          }else{
                          }
                       })
                   }
              }else{
                 connection.query("insert into messagetable(fromUserId,toUserId,message,timestamp,location)values('"+fromUserId+"','"+toUserId+"','"+message+"','"+date+"','"+location+"')",function(error,row,fields){
                    if(!!error){
                    }else{
                    }
                 });
              }
    });
   }
   sendPrivateMessage();
   socket.on('userSession',function(data){
     connection.query("UPDATE users SET sessionId='"+socket.id+"' where id='"+data+"'",function(error,row,fields){
       if(!!error){
       }else{
       }
    })
   })
   function getAirTravelPermission(userId,callback){
     connection.query("select users.sessionId as sessionId from users inner join permissiontable on users.id=permissiontable.userId where permissiontable.permission='travel'",function(error,row){
       if(!!error){
         console.log("error"+error)
       }else{
         callback(null,row[0].sessionId)
       }
     })
   }
   socket.on('airTravel',function(data){
     var message=data;
     var date=Date.now();
     console.log(data)
     connection.query("insert into airTravel(requestDate,message) values('"+date+"','"+message+"')",function(error,row){
       if(!!error){
        socket.emit('airTravel',error)
       }else{
         socket.emit('airTravel',"done")
       }
     })
       // getAirTravelPermission(data,function(error,result){
       //   if(result==''){
       //     socket.emit('airTravel',"no")
       //   }else{
       //     socket.emit('airTravel',"yes")
       //   }
       // })
     })
     socket.on('moneyTransfer',function(data){
       var message=data;
       var date=Date.now();
       connection.query("insert into moneyTransfer(requestDate,message) values('"+date+"','"+message+"')",function(error,row){
         if(!!error){
           socket.emit('moneyTransfer',error)
         }else{
           socket.emit('moneyTransfer',error)
         }
       })
     })
     function disconnectPrivate(){
         socket.on('disconnectPrivateUser', function (data) {
            var disconnectedUser={'userId':data.userId,'username':data.username,'room':data.room}
            var a=onlineUsers
            var b = uniqBy(a, JSON.stringify)
            var index = b.reduce(function(searchIndex, item, index){
              if(item.userId === disconnectedUser.userId) {
                searchIndex = index;
              }
              return searchIndex;
            }, null);
            b.splice(index,1);
           var memebersOfRoom = b.filter(function( obj ) {
              return obj.room == data.room;
            });
           onlineUsers.length=0;
           memebersOfRoom.forEach(function(element){
            onlineUsers.push(element)
           })
            delete privateusernames[socket.username];
            if (socket.username !== undefined) {
              var date=Date.now()
                connection.query("UPDATE users SET userroom='',lastLogin='"+date+"',sessionId='' where id='"+data.userId+"'",function(error,row,fields){
                  if(!!error){
                  }else{
                  }
               })
                socket.leave(socket.room);
                io.sockets.in(commenRoom).emit('onlineUsers',memebersOfRoom);
            }
        });
     }
   disconnectPrivate();
});
}
