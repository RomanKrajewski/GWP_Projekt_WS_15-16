/*jslint white: true*/
/*jslint node: true */
/*jslint vars: true*/
/*jslint eqeq: true*/
/*jslint plusplus: true*/
"use strict";

window.onload = function () {
    var alleSpieler = [];
    var start = false;
    var win = false;
    var counteddown = false;
    var countdownindex = 3;
    var winning_score = 100;
    var blinkState = 0;
    var winningPlayer = -1;

    var players, i, game, p, countdownID;
    players = [];

    function generatePlayerDisplay(id) {
        var playersection = document.createElement("section");
        playersection.className = "playersection";

        var name = document.createElement("h4");
        name.innerHTML = players[id].name;
        playersection.appendChild(name);

        var score = document.createElement("p");
        score.className = "score";
        score.innerHTML = players[id].score;
        score.id = "score_player_" + id;
        playersection.appendChild(score);

        game.appendChild(playersection);
    }

    function initPlayer(player) {
        game = document.getElementById("game");
        players.push(player);
        generatePlayerDisplay(players.length - 1);
    }


    function countdownfunction(countdown) {
        countdown.innerHTML = countdownindex;
        console.log(countdownindex);
        if(countdownindex<=0)
            {
                counteddown = true;
                countdown.innerHTML = "";
                clearInterval(countdownID);
            }
        countdownindex--;
    }
    
    document.onkeydown = function (event) {
        if (!start) {
            if (event.keyCode == 32) {
                if (players.length > 0) {
                    var gamesection = document.getElementById('game');
                    var countdown = document.createElement('p');
                    countdown.className = 'countdown';
                    gamesection.appendChild(countdown);
                    countdownID = setInterval(countdownfunction, 1000, countdown);
                    start = true;
                }
            } else {


                var spielername;
                var spielertaste = event.keyCode;


                var spielstand = 0;
                var i;

                var verboteneZeichen = /\d|\W/;


                var exists = false;

                for (i = 0; i < alleSpieler.length; i++) {
                    if (alleSpieler[i].key == spielertaste) {
                        exists = true;
                        break;
                    }
                }

                if (!exists) {
                    if (!(event.keyCode >= 112 && event.keyCode <= 123)) {
                        spielername = prompt("Gib bitte deinen Namen ein");
                        while (spielername.search(verboteneZeichen) != -1 || spielername == "") {
                            if (spielername == "") {
                                alert("Dein Name darf nicht leer sein");
                            } else {
                                alert("Bitte verwende keine Zahlen oder Sonderzeichen");
                            }
                            spielername = prompt("Gib bitte deinen Namen ein");
                        }

                        var spieler = {
                            name: spielername,
                            key: spielertaste,
                            score: spielstand
                        };

                        alleSpieler.push(spieler);
                        initPlayer(spieler);

                    }

                    // alert(alleSpieler[0].taste);
                } else {
                    alert("Diese Taste ist schon belegt!");
                }
            }
        }


    };
    
    

    function blink() {
        var playerDisplay;
        playerDisplay = document.getElementById("score_player_" + winningPlayer);
        if (blinkState == 0) {
            playerDisplay.parentNode.style.background = "rgba(0, 173, 117, 0.9)";
            blinkState = 1;
        } else {
            playerDisplay.parentNode.style.background = "rgba(10,10,10,0.75)";
            blinkState = 0;
        }
    }

    function makeWin(playerId) {
        var player, playerDisplay;
        win = true;
        winningPlayer = playerId;
        setInterval(blink, 200);
    }

    document.onkeyup = function (event) {
        if (start && !win && counteddown) {
            var i, player, playerDisplay, switch_on, switch_off;
            for (i = 0; i < players.length; i++) {
                player = players[i];
                playerDisplay = document.getElementById("score_player_" + i);
                if (event.keyCode == player.key) {
                    player.score++;
                    playerDisplay.innerHTML =
                        /*player.name + ": " +*/
                        player.score;

                    if (player.score >= winning_score) {
                        makeWin(i);
                    }
                }
            }
        }
    };


    function spielStarten() {
        console.log("GAME START!!!");
        start = true;
    }




};