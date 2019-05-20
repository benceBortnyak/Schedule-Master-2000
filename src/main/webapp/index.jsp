<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Schedule-Master-2000</title>
    <link rel="stylesheet" type="text/css" href="index.css" media="all">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<section class="home">
    <div class="datas">
        <div class="dropdown">
            <button class="dropbtn" onclick="myFunction()">Name
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content" id="myDropdown">
                <a>Name</a>
                <a href="profile">Profile</a>
                <a href="logout">Logout</a>
            </div>
        </div>
    </div>
    <div class="topnav">
        <ul>
            <a>Home</a>
            <a>Shedules</a>
        </ul>
    </div>
    <div class="sidenav">
        <a>Login first</a>
    </div>
    <div class="content">
        <p></p>
    </div>
</section>

<section id="login" class="login" style="display: none">
    <div class="login">
        <form action="login" method="post">
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
        <form action="register" method="get">
            <h4><p>Hit the sign up button to create a new account!</p></h4>
            <p>
                <button type="submit">SIGN UP</button>
            </p>
        </form>
        <h4><p>Login as guest</p></h4>
        <p>
            <button type="submit">I'm a guest</button>
        </p>
    </div>
</section>

<section id="signUp" class="login">
    <form action="signup" method="post">
        <div>
            <p>
            <h1>SignUp</h1></p>
            <div id="div2"><input type="text" placeholder="Enter last name" name="lastName" required></div>
            <div id="div1"><input type="text" placeholder="Enter forename" name="forename" required></div>
            <p><input type="password" placeholder="Enter Password" name="psw"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
            </p>
            <p><input type="password" placeholder="Reenter Password" name="pswre"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
            </p>
            <p><input type="text" placeholder="Enter your email address" name="email" required></p>
            <p>
                <button type="submit">SignUp</button>
            </p>
        </div>
    </form>
    <form action="login" method="get">
        <div>
            <p>
                <button type="submit">Back to login</button>
            </p>
        </div>
    </form>
</section>

<script>
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