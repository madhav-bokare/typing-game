const words = ["fire", "jump", "fast", "ghost", "magic", "blast", "ninja"];
    const game = document.getElementById("game");
    const input = document.getElementById("input");
    const scoreEl = document.getElementById("score");
    const healthEl = document.getElementById("health");
    const over = document.getElementById("over");

    let active = [];
    let score = 0;
    let health = 100;
    let speed = 0.5;

    function makeWord() {
      const text = words[Math.floor(Math.random() * words.length)];
      const div = document.createElement("div");
      div.className = "word";
      div.innerText = text;
      div.style.left = Math.random() * (window.innerWidth - 100) + "px";
      div.style.top = "0px";
      game.appendChild(div);
      active.push({ el: div, text: text, y: 0 });
    }

    function moveWords() {
      active.forEach((w, i) => {
        w.y += speed;
        w.el.style.top = w.y + "px";
        if (w.y > window.innerHeight - 50) {
          game.removeChild(w.el);
          active.splice(i, 1);
          health -= 10;
          healthEl.innerText = health;
          if (health <= 0) endGame();
        }
      });
    }
  
    function endGame() {
      clearInterval(spawner);
      clearInterval(mover);
      over.style.display = "block";
      input.disabled = true;
    }

    input.addEventListener("input", () => {
      const typed = input.value.trim().toLowerCase();
      const index = active.findIndex(w => w.text === typed);
      if (index !== -1) {
        game.removeChild(active[index].el);
        active.splice(index, 1);
        score += 10;
        scoreEl.innerText = score;
        speed += 0.1;
        input.value = "";
      }
    });

    const spawner = setInterval(makeWord, 2500);
    const mover = setInterval(moveWords, 30);