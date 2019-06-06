<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="en">
<head>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta charset="UTF-8" name="google-signin-client_id"
          content="178796968342-imq5f33i7be8gplqutr2fqib887qgjkn.apps.googleusercontent.com">
    <title>Schedule-Master-2000</title>
    <link rel="stylesheet" type="text/css" href="index.css" media="all">
    <c:url value="/scripts/index.js" var="indexScriptUrl"/>
    <c:url value="/scripts/signup.js" var="signUpScriptUrl"/>
    <c:url value="/scripts/login.js" var="loginScriptUrl"/>
    <c:url value="/scripts/profile.js" var="profileScriptUrl"/>
    <c:url value="/scripts/logout.js" var="logoutScriptUrl"/>
    <c:url value="/scripts/schedule.js" var="schedulesScriptUrl"/>
    <c:url value="/scripts/table.js" var="tableScriptUrl"/>
    <c:url value="/scripts/google.js" var="googleScriptUrl"/>
    <c:url value="/scripts/display.js" var="sidenavScriptUrl"/>
    <c:url value="/scripts/task.js" var="taskScriptUrl"/>
    <script src="${taskScriptUrl}"></script>
    <script src="${sidenavScriptUrl}"></script>
    <script src="${tableScriptUrl}"></script>
    <script src="${schedulesScriptUrl}"></script>
    <script src="${profileScriptUrl}"></script>
    <script src="${indexScriptUrl}"></script>
    <script src="${signUpScriptUrl}"></script>
    <script src="${loginScriptUrl}"></script>
    <script src="${logoutScriptUrl}"></script>
    <script src="${googleScriptUrl}"></script>

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
                    <button id="profile-button">Profile</button>
                    <button id="logout-button" onclick="signOut()">Logout</button>
                </div>
            </div>
            <a>Home</a>
            <a style="float: right">Schedules</a>
        </ul>
    </div>
    <div id="schedules">
        <div id="sidenav-content" class="sidenav">
        </div>
        <div id="table-content" class="schedules">
        </div>
    </div>
    <div id="profile-content" class="hidden content modal">
        <form class="modal-content animate" action="/action_page.php">
            <div class="imgcontainer"><span style="width: 2%; float: right" id="closeProfile-button" title="Close PopUp" class="close">&times;</span>
                <p>LastName: <span id="user-lastName"></span></p>
                <p>Forename: <span id="user-forename"></span></p>
                <p>Email: <span id="user-email"></span></p>
            </div>
        </form>
    </div>
    <div id="newTask-content" class="hidden content modal">
        <form accept-charset=utf-8 id='addTask-form' onsubmit="return false;" class="modal-content animate"
              action="/action_page.php">
            <div class="imgcontainer">
                <span style="width: 2%; float: right" id="closeNewTask-button" title="Close PopUp" class="close">&times;</span>
                <input name="taskTitle" type="text" placeholder="Type here the title of the task: " required/>
                <input name="taskContent" type="text" placeholder="Type here the content of the task: " required/>
                <input name="taskLen" type="number" required/>
                <button id="newTaskButton">Add task</button>
            </div>
        </form>
    </div>
</div>

<div id="welcome-content" class="content">
    <div style="float: left; width: 50%; padding: 20% 0">
        <p>Welcome to our schedule manager apps!<br>
            You can manage daily tasks</p>
        <button style="width: 30%" id="toLogin-button">Press to Login</button>
        <button style="width: 30%" id="toSignUp-button">Press to Sign Up</button>
    </div>
    <div style="float: right; width: 50%">
        <img style="float: left; width: 93%" src="ninja_big.png">
    </div>
    <div id="login-content" class="hidden content modal">
        <form accept-charset=utf-8 id="login-form" onsubmit="return false;" class="modal-content animate"
              action="/action_page.php">
            <div class="imgcontainer"><span style="width: 2%; float: right" id="closeLogin-button" title="Close PopUp"
                                            class="close">&times;</span>
                <h4>
                    <input type="text" placeholder="Enter your email address" name="email" required>
                    <input type="password" placeholder="Enter Password" name="psw" required>
                    <p style="padding: 0 20%">
                        <button id="login-button" type="submit">Login</button>
                    </p>
                </h4>
                <p>Hit the sign up button to create a new account!</p>
                <p style="padding: 0 20%">
                    <button id="signUp-button" type="submit">SIGN UP</button>
                </p>
                <p>
                <div id="g-signin" class="g-signin2" data-onsuccess="onSignIn"></div>
                </p>
                <p>Login as guest</p>
                <p style="padding: 0 20%">
                    <button id="loginGuest-button" type="submit">I'm a guest</button>
                </p>
            </div>
        </form>
    </div>

    <div id="signUp-content" class="hidden content modal">
        <form accept-charset=utf-8 id='signUp-form' onsubmit="return false;" class="modal-content animate"
              action="/action_page.php">
            <div class="imgcontainer">
                <span style="width: 2%; float: right" id="closeSignUp-button" title="Close PopUp"
                      class="close">&times;</span>
                <h1>SIGN UP</h1>
                <div><input type="text" placeholder="Enter Last Name" name="lastName" required style="width: 39%">
                    <input type="text" placeholder="Enter Forename" name="forename" required style="width: 39%"></div>
                <p><input type="password" placeholder="Enter Password" name="psw"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
                </p>
                <p><input type="password" placeholder="Reenter Password" name="pswre"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
                </p>
                <p><input type="text" placeholder="Enter your email address" name="email" required></p>
                <p style="padding: 0 20%">
                    <button id='submitButton' type="submit">SUBMIT</button>
                </p>
            </div>
            <p style="padding: 0 20%">
                <button id="backToLoginButton" type="submit">Back to login</button>
            </p>
        </form>
    </div>
</div>

</body>
</html>