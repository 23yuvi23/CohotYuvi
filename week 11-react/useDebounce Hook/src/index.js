import { useEffect } from "react";


let currentClock;

function seachBackend () {
    console.log("req send to backend");

}

function debounceSearchBackend(){

    clearTimeout(currentClock);  // stop old clock and start new clock and put new clock in currentClock
    currentClock = setTimeout(seachBackend,30) ;  // start a clock

}

debounceSearchBackend()
debounceSearchBackend()
debounceSearchBackend()
debounceSearchBackend()
debounceSearchBackend()
debounceSearchBackend()
debounceSearchBackend()
debounceSearchBackend()