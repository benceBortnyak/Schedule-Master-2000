<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:useBean id="now" class="java.util.Date"/>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Schedule-Master-2000</title>
    <link rel="stylesheet" type="text/css" href="index.css" media="all">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="home" class="home">
    <div class="topnav">
        <ul>
            <div class="dropdown">
                <input type="image" class="dropbtn" onclick="myFunction()" src="ninja.png">
                <i class="fa fa-caret-down"></i>
                </input>
                <div class="dropdown-content" id="myDropdown">
                    <a>Name</a>
                    <a href="profile">Profile</a>
                    <a href="logout">Logout</a>
                </div>
            </div>
            <a>Home</a>
            <a style="float: right">Shedules</a>
        </ul>
    </div>
    <div>
        <div class="sidenav">
            <a>Login first</a>
        </div>
        <div id="schedules" class="content">
            <table>
                <th></th>
                <tbody>
                <tr>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div id="login-content" class="login">
    <div class="login">
        <form action="login-content" method="post">
            <h4><p><label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required></p>
                <p><label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required></p>
                <p><label><input type="checkbox" checked="checked" name="remember"> Remember me</label></p>
                <p>
                    <button type="submit">Login</button>
                </p>
            </h4>
        </form>
        <form action="signUp-content" method="get">
            <h4><p>Hit the sign up button to create a new account!</p></h4>
            <p>
                <button type="submit">SIGN UP</button>
            </p>
        </form>
        <form action="loginGuest-content" method="post">
            <h4><p>Login as guest</p></h4>
            <p>
                <button type="submit">I'm a guest</button>
            </p>
        </form>
    </div>
</div>

<div id="signUp-content" class="login">
    <form action="signUp" method="post">
        <div>
            <p>
            <h1>Register</h1></p>
            <div id="div2"><input type="text" placeholder="Enter Lastname" name="lastname" required></div>
            <div id="div1"><input type="text" placeholder="Enter Forename" name="forename" required></div>
            <p><input type="password" placeholder="Enter Password" name="psw"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
            </p>
            <p><input type="password" placeholder="Reenter Password" name="pswre"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
            </p>
            <p><input type="text" placeholder="Enter your email adress" name="email" required></p>
            <p>
                <button type="submit">Register</button>
            </p>
        </div>
    </form>
    <form action="login-content" method="get">
        <div>
            <p>
                <button type="submit">Back to login</button>
            </p>
        </div>
    </form>
</div>

<script>
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = function (e) {
        if (!e.target.matches('.dropbtn')) {
            var myDropdown = document.getElementById("myDropdown");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }
</script>
</body>
</html>