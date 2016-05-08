class FileSystem {
     
     constructor() {
         this.rootDir = new Directory("/", ".");
         buildRoot(this.rootDir);
     }

     buildRoot(directory) {
         directory.addChild(new Directory("usr", directory));
         directory.getChild("usr").addChild(new Directory("bin", directory.getChild("usr")));
         directory.addChild(new Directory("home", directory));
         directory.getChild("home").addChild(new Directory("guest", directory.getChild("home")));
     }
     
     getRoot() {
         return this.rootDir;
     }
     
     traverse(path) {
         var pathSegments = path.split("/");
         var latestStructure = this.rootDir;
         for(i = 0; i < pathSegments.length; i++) {
             latestStructure = latestStructure.getChild(pathSegments[i]);
         }
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
    
    getParent() {
        return this.parent;
    }
}

class Directory extends DataStructure {
    
    constructor(name, parent) {
        super(name, parent);
        this.children = {};
        addChild(new Directory(".", this.parent));
        addChild(new Directory("..", this.parent.parent));
    }
    
    addChild(child) {
        this.children[child.getName()] = child;
    }
    
    getChild(name) {
        return children[name];
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
//  cat, echo, nano, cd, ls, cacao, man