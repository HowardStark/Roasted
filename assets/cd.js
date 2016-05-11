"use strict";

class Cd extends Command {
    static call(context, args) {
        var totalArgs = [];
        for(var i = 0; i < args.length; i++) {
            if(args[i].charAt(args[i].length - 1) == "/") args[i] = args[i].slice(0, -1);
            var seperate = args[i].split("/");
            totalArgs = totalArgs.concat(seperate);
        }
        for(var i = 0; i < totalArgs.length; i++) {
            var currArg = totalArgs.pop();
            console.info(currArg);
            if(context.getActiveDir().hasChild(currArg)) {
                context.setActiveDir(context.getActiveDir().getChild(currArg));
            }
        }
        console.info(context.getActiveDir());
    }
}