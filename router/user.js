
const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
router.post('/reg',function(req,res){
 var obj=req.body;
 console.log(obj);
if(!obj.uname){
res.send({code:401,msg:'uname required'});
return;
}
if(!obj.upwd){
res.send({code:402,msg:'upwd required'});
return;
}
if(!obj.phone){
res.send({code:403,msg:'phone required'});
return;
}
if(!obj.email){
res.send({code:404,msg:'email required'});
return;
}
pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
if(err) throw err;
console.log(result);
if(result.affectedRows>0){
res.send('恭喜你注册成功');
}
});
});

router.post('/login',function(req,res){
 var obj=req.body;
 console.log(obj);
 if(!obj.uname){
 res.send({code:401,msg:'uname required'});
 return;
 }
 if(!obj.upwd){
 res.send({code:402,msg:'upwd required'});
 return;
 }
 pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
 if(err) throw err;
 if(result.length>0){
 res.send('恭喜你登录成功');
 }else{
 res.send('没有登录陈宫');
 }
 });
});
 
router.get('/detail',function(req,res){
 var obj=req.query;
 console.log(obj);
 if(!obj.uid){
 res.send('没有该用户请重新输入');
 return;
 }
 pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
 if(err) throw err;
 res.send(result);
 });
});

router.post('/update',function(req,res){
 var obj=req.body;
  console.log(obj);
  var i=400;
  for(var key in obj){
  i++;
  if(!obj[key]){
  res.send({code:i,msg:key+'required'});
  return;
  }
  }
  var uid=obj.uid;
  delete obj.uid;
  pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,uid],function(err,result){
  if(err) throw err;
  console.log(result);
  if(result.affectedRows>0){
  res.send('恭喜你更改成功');
  }else{
  res.send('更改失败');
  }
  });
})

router.post('/list',function(req,res){
 var obj=req.body;
 console.log(obj);
 var count=obj.count;
 var pno=obj.pno;
 if(!count){
  count=2;
 }
 if(!pno){
 pno=1;
 }
 pno=parseInt(pno);
 count=parseInt(count);
var start=(pno-1)*count;
 pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,count],function(err,result){
 if(err) throw err;
 res.send(result);
 })
});

 router.post('/delete',function(req,res){
  var obj=req.body;
  console.log(obj);
  if(!obj.uid){
  res.send('不存在');
  return;
  }
  pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
  if(err) throw err;
  console.log(result);
  if(result.affectedRows>0){
  res.send('恭喜你删除用户成功');
  }else{
  res.send('删除失败');
  }
  })
 });
module.exports=router;