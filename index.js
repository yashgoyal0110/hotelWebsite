//slider part of the code ye image vali slide ki class active kar dega active ka code css me hai
const firstTab = $(".slider__tab:first-child");
var tabId = firstTab.attr("id");
var imgId = tabId + "__img";
var conId = tabId + "__content";

$("#" + tabId).addClass("active");
$("#" + imgId).addClass("active");
$("#" + conId).addClass("active");

$(".slider__tab").click(function () {
    $(".slider__tab, .slider__img, .slider__content").removeClass("active");

    tabId = $(this).attr("id");
    imgId = tabId + "__img";
    conId = tabId + "__content";

    $(this).addClass("active");
    $("#" + imgId).addClass("active");
    $("#" + conId).addClass("active");
});



//js for the form fill up 


$(".form__select").on("click", function () {
    $(this).toggleClass("open");
});

$(".form__option").on("click", function () {
    $(".form__option").removeClass("selected");
    $(this).addClass("selected");
    const selected = $(this).text();
    $(this).parent().siblings(".form__select-trigger").children("span").text(selected);
    $(this).parent().siblings(".form__select-input").val(selected);
});

// no of booking vala counter || the counter used for no of booking
var peopleCount = 4;
$("#people").val(peopleCount);
$("#people-count").text(peopleCount + " people");

$("#decrement").click(function () {
    if (peopleCount > 1) {
        peopleCount--;
        $("#people").val(peopleCount);
    }

    $("#people-count").text(peopleCount + (peopleCount > 1 ? " people" : " person"));
});

$("#increment").click(function () {
    peopleCount++;
    $("#people").val(peopleCount);
    $("#people-count").text(peopleCount + " people");
});


// form submission and sucess msg vala section
$(".form").on("submit", function (event) {
    event.preventDefault();

    const nameValid = validateName($("#name").val());
    const emailValid = validateEmail($("#email").val());
    const dateValid = validateDate($("#day").val(), $("#month").val(), $("#year").val());
    const timeValid = validateTime($("#hour").val(), $("#minute").val(), $("#day").val(), $("#month").val(), $("#year").val());

    const formValid = nameValid && emailValid && dateValid && timeValid;

    if (formValid) {
        event.target.reset();
        $(".success").addClass("active");
    }
});

$(".success__close").on("click", function () {
    $(this).parent().parent().removeClass("active");
});


// check that the name is valid or not//
function isNumeric(input) {
    return (input - 0) == input && input.length > 0;
}

function validateName(name) {
    const nameField = $("#name-container, #name");

    if (name === "") {
        nameField.addClass("error");
        return false;
    } else {
        nameField.removeClass("error");
        return true;
    }
}


//got it from chat GPT it is used to validate email which comes as input

// \S+: Matches one or more non-whitespace characters (the username part of the email).
// @: Matches the at symbol.
// \S+: Matches one or more non-whitespace characters (the domain name).
// \.: Matches the dot (.) symbol.
// \S+: Matches one or more non-whitespace characters (the top-level domain).
function isEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


//this is email validation part of the js code.
function validateEmail(email) {
    const emailField = $("#email-container, #email");

    if (email === "") {
        emailField.addClass("error").removeClass("invalid");
        return false;
    } else {
        if (isEmail(email)) {
            emailField.removeClass("error").removeClass("invalid");
            return true;
        } else {
            emailField.addClass("error").addClass("invalid");
            return false;
        }
    }
}


//Ye part date or time validate ke liye hai || this part is for date and time validation//
function daysInMonth(month, year) {
    switch (month) {
        case 1:
            return (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;
        case 8:
        case 3:
        case 5:
        case 10:
            return 30;
        default:
            return 31;
    }
}

function isValidDate(day, month, year) {
    month = parseInt(month, 10) - 1;
    return month >= 0 && month < 12 && day > 0 && day <= daysInMonth(month, year);
}

function validateDate(day, month, year) {
    const dateField = $("#date-label, #day, #month, #year");
    const dateValid = isValidDate(day, month, year);

    const inputDate = new Date(moment(new Date(year, month - 1, day)).format("LL"));
    const currentDate = new Date(moment(new Date()).format("LL"));
    const datePassed = inputDate.getTime() < currentDate.getTime();

    if (day === "" || month === "" || year === "") {
        dateField.addClass("error").removeClass("invalid");
        return false;
    } else {
        if (!dateValid || datePassed) {
            dateField.addClass("error").addClass("invalid");
            return false;
        } else {
            dateField.removeClass("error").removeClass("invalid");
            return true;
        }
    }
}

function validateTime(hour, minute, day, month, year) {
    const timeField = $("#time-label, #hour, #minute");
    const timeValid = validateHour(hour) && validateMinute(minute);
    const timePassed = new Date(year, month - 1, day, hour, minute).getTime() <= Date.now();

    if (hour === "" || minute === "") {
        timeField.addClass("error").removeClass("invalid");
        return false;
    } else {
        if (!timeValid || timePassed) {
            timeField.addClass("error").addClass("invalid");
            return false;
        } else {
            timeField.removeClass("error").removeClass("invalid");
            return true;
        }
    }
}

function validateHour(hour) {
    if (hour !== "" && (hour < 1 || hour > 12)) {
        return false;
    } else {
        return true;
    }
}

function validateMinute(minute) {
    if (minute !== "" && (minute < 0 || minute > 59)) {
        return false;
    } else {
        return true;
    }
}

// custmize footer js//
$("#send1").on("click",check__name__and__email__of__footer);
function check__name__and__email__of__footer(){
    var name__1 = $("#name1");
    var email__1 = $("#email1");
    if (!validateEmail(email__1.val())){
        alert("Please enter valid Email!");
    }
    if (!validateName(name__1.val())){
        alert("Please enter valid Name!");
    }
    if (validateEmail(email__1.val()) && validateName(name__1.val()) ){
        alert("YOUR RESPONSE HAS BEEN SUBMITED...");
        $("#name1").val("");
        $("#email1").val("");
    }
}

