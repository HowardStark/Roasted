class CoffeeShell {
    
    constructor() {
        this.fileSystem = new FileSystem()
        this.activeDir = this.fileSystem.getRoot().getChild("home").getChild("guest");
    }
    
    execute(command) {
        var output = CommandParser.parse(command, true);
        
    }
    
}

// http://krasimirtsonev.com/blog/article/Simple-command-line-parser-in-JavaScript
var CommandParser = (function() {
    var parse = function(str, lookForQuotes) {
        var args = [];
        var readingPart = false;
        var part = '';
        for(var i=0; i            if(str.charAt(i) === ' ' && !readingPart) {
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