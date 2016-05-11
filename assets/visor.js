"use strict";

class Visor {
    
    get enabled() { return Visor.enabled; }
    set enabled(status) { Visor.enabled = status; }
    
    constructor() {
        this._enabled = false;
        this.fileSystem = new FileSystem()
        this.activeDir = this.fileSystem.getRoot().getChild("home").getChild("guest");
    }
    
    initialize() {
        this.shell = new CoffeeShell(this);
        this.setRunning(this.shell);
    }
    
    execute(command) {
        var argput = parseCommand(command);
        console.info(argput);
        if(this.fileSystem.traverse("/usr/bin/").hasChild(argput[0])) {
            eval(argput[0].charAt(0).toUpperCase() + argput[0].slice(1).toLowerCase() + ".call(this, argput.slice(1))");
            this.shell.newPrompt();
        } else {
            console.error("command not found: " + argput[0]);
            this.shell.newPrompt();
        }
    }
    
    output(message) {
        this.outputRaw($.parseHTML("<p>" + message + "</p>"));
    }
    
    outputRaw(message) {
        $('#visor').append(message);
        $('#visor').scrollTop($('#visor').height());
    }
    
    getActiveDir() {
        return this.activeDir;
    }
    
    getFileSystem() { return this.fileSystem; }
    
    getRunning() {
        return Visor.progRunning;
    }
    
    setRunning(nowRunning) {
        Visor.progRunning = nowRunning;
    }
    
    stdout(message) {
        this.output(message);
    }    
    
    stderr(message) {
        this.output(this.getRunning().progName + ": " + message);
    }
    
    toggle() {
        if(Visor.enabled) {
            this.disable();
        } else {
            this.enable();
        }
    }
    
    enable() {
        Visor.enabled = true;
        $("#visor").show();
        $(document).keypress(function (e) {
            Visor.progRunning.handleKeypress(e);
        });
        
        $(document).keydown(function (e) {
            Visor.progRunning.handleKeydown(e);
        });    
    }
    
    disable() {
        Visor.enabled = false;
        $("#visor").hide();
        $(document).unbind("keypress");
        $(document).unbind("keydown");
    }
    
}

// http://krasimirtsonev.com/blog/article/Simple-command-line-parser-in-JavaScript
var CommandParser = (function() {
    var parse = function(str, lookForQuotes) {
        var args = [];
        var readingPart = false;
        var part = '';
        for(var i=0; i < part.length; i++) {
            if(str.charAt(i) === ' ' && !readingPart) {
                args.push(part);
                part = '';
            } else {
                if(str.charAt(i) === '\"' && lookForQuotes) {
                    readingPart = !readingPart;
                } else {
                    part += str.charAt(i);
                }
            }
        }
        args.push(part);
        return args;
    }
    return {
        parse: parse
    }
})();
Visor.progRunning = null;
Visor.enabled = false;
