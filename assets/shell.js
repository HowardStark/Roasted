"use strict";

class CoffeeShell {
    
    get progName() { return "csh"; }
    
    constructor(visor) {
        console.info("CSH STARTED");
        this.cursor = "▊";
        this.prompt = ["<p><span style='color: " + CoffeeColors.RED + ";'>guest</span> <span style='color: " + CoffeeColors.WHITE + ";'>at</span> <span style='color: " + CoffeeColors.YELLOW + ";'>getcoffee.io</span> <span style='color: " + CoffeeColors.WHITE + ";'>in</span> <span id='pwd' style='color: " + CoffeeColors.YELLOW + ";'>" + "</span></p>", 
                      "<p>> <span id='input'></span><span id='prompt'>" + this.cursor + "</span></p>"];
        this.cursorKey = 1;
        this.currentPrompt = null;
        this.visor = visor;
        this.newPrompt();
    }
    
    newPrompt() {
        if(this.currentPrompt != null) {
            $(this.currentPrompt[this.cursorKey]).children("span#prompt").text("");
        }
        this.currentPrompt = [];
        for(var i = 0; i < this.prompt.length; i++) {
            this.currentPrompt[i] = $.parseHTML(this.prompt[i]);
            if($(this.currentPrompt[i]).children("span#pwd") != undefined) $(this.currentPrompt[i]).children("span#pwd").text(((visor.getActiveDir() == Visor.homeDir) ? "~" : visor.getActiveDir().getPath()));
            this.visor.outputRaw(this.currentPrompt[i]);
        }
    }
    
    getInput() {
        return $(this.currentPrompt[this.cursorKey]).children("span#input").text();
    }
    
    handleKeypress(e) {
        switch(e.which) {
            case ENTER:
                if(this.getInput() != "") this.visor.execute(this.getInput());
                break;
            default:
                $(this.currentPrompt[this.cursorKey]).children('span#input').append(String.fromCharCode(e.which));
                break;
        }
    }
    
    handleKeydown(e) {
        if(e.which == 8 || e.which == 46) {
            e.preventDefault();
            if(this.getInput().length > 0) {
                $(this.currentPrompt[this.cursorKey]).children('span#input').text(this.getInput().substring(0, this.getInput().length - 1));
            }   
        }
    }
    
    handleKeyup(e) {}

}

class CoffeeColors {
    static get BLACK() { return "#252525"; }
    static get RED() { return "#FF5252"; }
    static get GREEN() { return "#C3D82C"; }
    static get YELLOW() { return "#FFD740"; }
    static get BLUE() { return "#40C4FF"; }
    static get MAGENTA() { return "#FF4081"; }
    static get CYAN() { return "#18FFFF"; }
    static get WHITE() { return "#F5F5F5"; }
    static get TEXT() { return "#A1B0B8"; }
    static get BACKGROUND() { return "#263238"; }
}