function getGame(){
    var moves = document.getElementsByClassName("cbmove");
    game = "";
    var i;
    for (i=0;i<moves.length;i++){
        game += moves[i].innerText.replace('.', '. ')+" ";
    }
    game += document.getElementsByClassName("cbgame-result")[0].innerText;

    players = document.getElementsByClassName("cbplayer");
    game = "[White \""+players[0].innerText+"\"]\n[Black \""+players[1].innerText+"\"]\n"+game;

    const el = document.createElement('textarea');
    el.value = game;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function formPost(){
    form = document.createElement("form");
    form.method = "POST";
    form.action = "/study/as";   

    gameid = document.createElement("input"); 
    gameid.name = "gameId";
    gameid.value = loc.replace("https://lichess.org/");

    orientation = document.createElement("input");
    orientation.name = "orientation";
    a = document.getElementsByClassName("eval-gauge")[0]
    c = a.getAttribute("class")
    if (c != "eval-gauge"){
        orientation.value = "black";
    }else{
        orientation.value = "white";
    }

    fen = orientation = document.createElement("input");
    fen.name = "fen";
    b = document.getElementsByClassName("pv_box")[0];
    fen.value = b.getAttribute("data-fen");

    variant = document.createElement("input"); 
    variant.name = "variant";
    variant.value = "standard";

    form.appendChild(gameid);  
    form.appendChild(orientation);  
    form.appendChild(fen);  
    form.appendChild(variant);  
    document.body.appendChild(form);

    form.submit();
}

loc = window.location.href;

if (loc == "https://database.chessbase.com/"){
    but = document.getElementById("downloadPgnId")
    n = but.cloneNode(true);
    but.parentNode.replaceChild(n, but);
    n.onclick = function(){
        getGame();
        orig = n.childNodes[0].getAttribute("src");
        n.childNodes[0].setAttribute("src", "https://image.flaticon.com/icons/svg/845/845646.svg");
        n.childNodes[0].setAttribute("height", "16px");
        n.childNodes[0].setAttribute("width", "16px");
        openInNewTab("https://lichess.org/paste");
        setTimeout(() => {n.childNodes[0].setAttribute("src", orig);}, 2000);
    }
}else if (loc == "https://lichess.org/paste"){
    area = document.getElementById("form3-pgn");
    navigator.clipboard.readText().then(function(text) {
        area.value = text;
        setTimeout(() => {document.getElementsByClassName("submit")[0].click();}, 500);
    });
}else if (loc != "https://lichess.org/study/as" && !loc.startsWith("https://lichess.org/study/")){
    setTimeout(() => {formPost();}, 200);
}
