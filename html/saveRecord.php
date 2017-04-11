<?php
$link=mysql_connect("localhost","wanching","wanching") or die ("連線失敗");
mysql_select_db("wanching");
mysql_set_charset('utf8',$link);

$userid  = $_POST["userid"];
$info = $_POST["info"];
$time    = $_POST["time"];
$sql    = "INSERT INTO log (USER,INFO,TIME) VALUES ('$userid','$info','$time')";
$result = mysql_query($sql);
mysql_close($link);
?>
