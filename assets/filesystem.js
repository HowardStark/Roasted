class FileSystem {
    
    constructor() {
        this.rootDir = new Directory("/", null);
        this.buildRoot(this.rootDir);
    }
    
    buildRoot(directory) {
        directory.addChild(new Directory("usr", directory));
        directory.getChild("usr").addChild(new Directory("bin", directory.getChild("usr")));
        directory.addChild(new Directory("home", directory));
        directory.getChild("home").addChild(new Directory("guest", directory.getChild("home")));
        var execPath = this.traverse("/usr/bin/");
        execPath.addChild(new File("pwd", execPath));
        execPath.addChild(new File("ls", execPath));
        var homePath = this.traverse("/home/guest/");
        homePath.addChild(new File("ayy", homePath));
    }
    
    getRoot() {
        return this.rootDir;
    }
    
    traverse(path) {
        if(path.charAt(0) == "/") {
            path = path.slice(1);
        }
        if(path.charAt(path.length - 1) == "/") {
            path = path.slice(0, -1);
        }
        var pathSegments = path.split("/");
        var latestStructure = this.rootDir;
        if(pathSegments[0] != "") {
            for(var i = 0; i < pathSegments.length; i++) {
                latestStructure = latestStructure.getChild(pathSegments[i]);
            }
        }
        console.info(latestStructure);
        return latestStructure;
    }
    
}

class DataStructure {
    
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
    }
    
    getName() {
        return this.name;
    }
    
    getPath() {
        if(this.parent != null) {
            return this.parent.getPath() + "/" + this.name;
        }
        return "";
    }
    
    getParent() {
        return this.parent;
    }
}

class Directory extends DataStructure {
    
    constructor(name, parent) {
        super(name, parent);
        this.children = {};
        this.children["."] = this;
        this.children[".."] = this.parent;
    }
    
    addChild(child) {
        this.children[child.getName()] = child;
    }
    
    getChild(name) {
        return this.children[name];
    }
    
    getChildren() {
        return this.children;
    }
    
    hasChild(name) {
        if(!(name in this.children)) {
            return false;
        } else {
            return true;
        }
    }
    
}

class File extends DataStructure {
    constructor(name, parent) {
        super(name, parent);
    }
}

//  Basic directory structure:
//  /.
//  /..
//  /usr/bin 
//  /home/.
//  /home/..
//  /home/guest
//  /home/guest/.
//  /home/guest/..
//  /home/guest/welcome.txt
//  /home/guest/.cshrc
//  
//  Basics:
//  csh, cat, echo, nano, cd, ls, cacao, man