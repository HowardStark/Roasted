package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Starting the roast...")
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
	defer fmt.Println("The roast has finished...")
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "views/main.html")
}
