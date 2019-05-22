<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Schedule-Master-2000</title>
    <link rel="stylesheet" type="text/css" href="index.css" media="all">
    <c:url value="/scripts/index.js" var="indexScriptUrl"/>
    <c:url value="/scripts/signup.js" var="signUpScriptUrl"/>
    <c:url value="/scripts/login.js" var="loginScriptUrl"/>
    <script src="${loginScriptUrl}"></script>
    <script src="${indexScriptUrl}"></script>
    <script src="${signUpScriptUrl}"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="main-content" class="home">
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
            <a style="float: right">Schedules</a>
        </ul>
    </div>
    <div>
        <div class="sidenav">
            <a>Login first</a>
        </div>
        <div id="schedules-content" class="content">
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
    <form action="login-content" method="post">
        <h4><p><label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter your email address" name="email" required></p>
            <p><label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></p>
            <p>
                <button id="login-button">Login</button>
            </p>
        </h4>
    </form>
    <h4><p>Hit the sign up button to create a new account!</p></h4>
    <button id="signUp-button" type="submit">SIGN UP</button>

    <form action="loginGuest-content" method="post">
        <h4><p>Login as guest</p></h4>
        <p>
            <button id="loginGuest-button" type="submit">I'm a guest</button>
        </p>
    </form>
</div>

<div id="signUp-content" class="login">
    <form accept-charset=utf-8 id ='signUp-form' onsubmit="return false;">
        <div>
            <p>
            <h1>SIGN UP</h1></p>
            <div id="div2"><input type="text" placeholder="Enter Last Name" name="lastName" required></div>
            <div id="div1"><input type="text" placeholder="Enter Forename" name="forename" required></div>
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
                <button id = 'submitButton' type="submit">SUBMIT</button>
            </p>
        </div>
    </form>

    <button id="backToLoginButton" type="submit">Back to login</button>

</div>

<div id="profile-content" class="profile">

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