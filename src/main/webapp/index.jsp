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
    <c:url value="/scripts/profile.js" var="profileScriptUrl"/>
    <script src="${profileScriptUrl}"></script>
    <script src="${indexScriptUrl}"></script>
    <script src="${signUpScriptUrl}"></script>
    <script src="${loginScriptUrl}"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="main-content" class="hidden content">
    <div class="topnav">
        <ul>
            <div class="dropdown">
                <input type="image" class="dropbtn" onclick="showDropdown()" src="ninja.png">
                <i class="fa fa-caret-down"></i>
                </input>
                <div class="dropdown-content" id="myDropdown">
                    <a>Name</a>
                    <button id="profile-button">Profile</button>
                    <button id="logout-button">Logout</button>
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
        <div id="schedules-content" class="schedules">
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

<div id="login-content" class="content">
    <form accept-charset=utf-8 id="login-form" onsubmit="return false;">
        <h4><p><label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter your email address" name="email" required></p>
            <p><label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></p>
            <p>
                <button id="login-button" type="submit">Login</button>
            </p>
        </h4>
    </form>
    <h4><p>Hit the sign up button to create a new account!</p></h4>
    <button id="signUp-button" type="submit">SIGN UP</button>
    <h4><p>Login as guest</p></h4>
    <p>
        <button id="loginGuest-button" type="submit">I'm a guest</button>
    </p>
</div>

<div id="signUp-content" class="hidden content">
    <form accept-charset=utf-8 id='signUp-form' onsubmit="return false;">
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
                <button id='submitButton' type="submit">SUBMIT</button>
            </p>
        </div>
    </form>
    <button id="backToLoginButton" type="submit">Back to login</button>
</div>

<div id="profile-content" class="hidden content">
    <p>LastName: <span id="user-lastName"></span></p>
    <p>Forename: <span id="user-forename"></span></p>
    <p>Email: <span id="user-email"></span></p>
</div>

</body>
</html>