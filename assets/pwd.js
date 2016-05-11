"use strict";

class Pwd extends Command {
    static call(context, args) {
        console.log(context.getActiveDir().getPath());
    }
}