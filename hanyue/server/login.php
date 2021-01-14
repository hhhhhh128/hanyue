<?php

//接收前端的数据
$username = $_POST['username'];
$password = $_POST['password'];

// echo json_encode($username)
//到数据库中查询
//准备sql数据库
$sql =" SELECT * FROM `name` WHERE `username` = '$username' AND `password` = '$password'";
// //连接
$link = mysqli_connect('127.0.0.1','root','root','users');
// //执行
$res = mysqli_query($link,$sql);
// //解析
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
// //关闭之前打开的
mysqli_close($link);



if(count($data)){
    $arr = array(
        "message" => "登录成功",
        "code" => 1,
        "nickname" => $data[0]['nickname']
      );
}else{
    $arr = array(
        "message" => "登录失败",
        "code" => 0
    );
};
    
//输出 并转换为json格式
echo json_encode ($arr)






?>

