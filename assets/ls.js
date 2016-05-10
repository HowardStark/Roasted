class Ls extends Command {
    static call(context, args) {
        
        var flags = {"l": false, "a": false}
        var toList = [];
        
        console.info(args);
        
        for(var i = 0; i < args.length; i++) {
            var flag = args[i];
            if(flag.startsWith("-")) {
                flag = flag.slice(1);
                for(var j = 0; j < flag.length; j++) {
                    switch(flag.charAt(j)) {
                        case "l":
                            flags["l"] = true;
                            break;
                        case "a":
                            flags["a"] = true;
                            break;
                    }
                }
            } else {
                toList.push(flag);
            }
        }
        
        if(toList.length < 1) {
            toList.push(".");
        }

        console.info(flags);
        var output = [""];
        
        for(var i = 0; i < toList.length; i++) {
            var location = toList[0];
            if(location.startsWith("/")) {
                for(var child in context.getFileSystem().traverse(location).getChildren()) {
                    console.info(child);
                    if(flags["a"]) {
                        if(flags["l"]) {
                            output.push(child);
                        } else {
                            output[0] = output[0] + child + "&nbsp;&nbsp;&nbsp;&nbsp;";
                        }
                    } else {
                        if(!child.startsWith(".")) {
                            if(flags["l"]) {
                                output.push(child);
                            } else {
                                output[0] = output[0] + child + "&nbsp;&nbsp;&nbsp;&nbsp;";
                            }
                        }
                    }
                }
            } else {
                for(var child in context.getFileSystem().traverse(context.getActiveDir().getPath() + "/" + location).getChildren()) {
                    if(flags["a"]) {
                        if(flags["l"]) {
                            output.push(child);
                        } else {
                            output[0] = output[0] + child + "&nbsp;&nbsp;&nbsp;&nbsp;";
                        }
                    } else {
                        if(!child.startsWith(".")) {
                            if(flags["l"]) {
                                output.push(child);
                            } else {
                                output[0] = output[0] + child + "&nbsp;&nbsp;&nbsp;&nbsp;";
                            }
                        }
                    }
                }
            }
        }
        
        console.info(output);
        for(var i = 0; i < output.length; i++) {
            console.log(output[i]);
        }
    }
}