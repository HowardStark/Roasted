var BLACK      = "#252525"
var RED        = "#FF5252"
var GREEN      = "#C3D82C"
var YELLOW     = "#FFD740"
var BLUE       = "#40C4FF"
var MAGENTA    = "#FF4081"
var CYAN       = "#18FFFF"
var WHITE      = "#F5F5F5"
var TEXT       = "#A1B0B8"
var BACKGROUND = "#263238"

var ENTER = 13;
var ESC   = 27;

var COMMAND_ERR = "<p> csh: command not found: </p>";

var cursor = "▊";
var prompt = ["<p><span style='color: " + RED + ";'>guest</span> <span style='color: " + WHITE + ";'>at</span> <span style='color: " + YELLOW + ";'>getcoffee.io</span> <span style='color: " + WHITE + ";'>in</span> <span style='color: " + YELLOW + ";'>~</span></p>", 
              "<p>> <span id='input'></span><span id='prompt'>" + cursor + "</span></p>"];
var cursorKey = 1;

var isEnabled = false;

var currentPrompt;

function initializeVisor() {
    newPrompt();
}

function toggleVisor() {
    console.log("ESCAPE");
    $('#visor').toggle();
    if($('#visor').is(":visible")) {
        visorEnabled();
    } else {
        visorDisabled();
    }
}

function visorEnabled() {
    $(document).keypress(function (e) {
        switch(e.which) {
            case ENTER:
                if (getInput() != "") execute(getInput());
                newPrompt();
                break;
            default:
                $(currentPrompt[cursorKey]).children('span#input').append(String.fromCharCode(e.which));
                break;
        }
    });
}

function visorDisabled() {
    $(document).unbind("keypress");
}

function newPrompt() {
    console.log("New prompt! Previous: " + currentPrompt);
    if(currentPrompt != null) {
        $(currentPrompt[cursorKey]).children("span#prompt").text("");
    }
    currentPrompt = [];
    for(i = 0; i < prompt.length; i++) {
        currentPrompt[i] = $.parseHTML(prompt[i]);
        $('#visor').append(currentPrompt[i]);
    }
    $('#visor').scrollTop($('#visor').height());
}

function addOutput(output) {
    $('#visor').append(output);
    $('#visor').scrollTop($('#visor').height());
}

function execute(command) {
    if(!getFile(command)) {
        var cmdNotFound = $.parseHTML(COMMAND_ERR);
        $(cmdNotFound).append(command);
        addOutput(cmdNotFound);
    }
}

function getInput() {
    return $(currentPrompt[cursorKey]).children("span#input").text();
}
