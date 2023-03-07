function getInput(inputSet) {

    event.preventDefault();

    let msg = document.getElementById('msg');
    let form = document.getElementById('form');
    let formData = new FormData(form);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "true") {
                window.location = "menu.php";
            } else {
                msg.innerHTML = this.responseText;
            }
        }
    };
    xmlhttp.open("POST", inputSet, true);
    xmlhttp.send(formData);
}

function getValue(inputSet) {

    event.preventDefault();

    let msg = document.getElementById('msg');
    let form = document.getElementById('form');
    let formData = new FormData(form);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            msg.innerHTML = this.responseText;
        }
    };
    xmlhttp.open("POST", inputSet, true);
    xmlhttp.send(formData);
}

function loginRegister() {

    let x = document.getElementById("login");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        document.title = "Login";
        x.style.display = "block";
    }

    let y = document.getElementById("registr");
    if (y.style.display === "none") {
        document.title = "Register";
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function loginForgotPass() {

    let z = document.getElementById("login");
    if (z.style.display === "block") {
        document.title = "Forgotpass?";
        z.style.display = "none";
    } else {
        z.style.display = "block";
    }

    let i = document.getElementById("forgotPass");
    if (i.style.display === "none") {
        i.style.display = "block";
    } else {
        document.title = "Login";
        i.style.display = "none";
    }
}

function changeUsername() {

    let i = document.getElementById("showUp");
    if (i.style.display === "none") {
        i.style.display = "block";
    } else {
        i.style.display = "none";
    }
}


function strongPass(password) {
    let l = 0;
    if (password.length > 6) {
        l++;
    }
    if (password.length >= 8) {
        l++;
    }
    if (/[A-Z]/.test(password)) {
        l++;
    }
    if (/[0-9]/.test(password)) {
        l++;
    }
    if (/[^A-Za-z0-8]/.test(password)) {
        l++;
    }
    console.log(l);
    return l;
}

function paswordStrenght() {
    let strong = document.querySelector('#strong');
    document.addEventListener("keyup", function (e) {
        let password = document.querySelector('#password').value;

        let strenght = strongPass(password);
        if (strenght <= 2) {
            strong.classList.add('weak');
            strong.classList.remove('medium');
            strong.classList.remove('strong');
        } else if (strenght >= 2 && strenght <= 4) {
            strong.classList.remove('weak');
            strong.classList.add('medium');
            strong.classList.remove('strong');
        } else {
            strong.classList.remove('weak');
            strong.classList.remove('medium');
            strong.classList.add('strong');
        }
    })
}

function showHide() {
    let passwd = document.querySelector('#password');
    if (passwd.type === 'password') {
        passwd.setAttribute('type', 'text');
    } else {
        passwd.setAttribute('type', 'password');
    }
}

