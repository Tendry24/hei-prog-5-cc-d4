import { Game } from "./Game";
import * as term from 'terminal-kit';

const terminal = term.terminal;
terminal.clear();
terminal.hideCursor(true);

const game = new Game();

terminal.grabInput(true);
terminal.on('key', (name: string) => {
  if (name === 'CTRL_C') {
    terminal.clear();
    terminal.hideCursor(false);
    setTimeout(() => process.exit(0), 100);
    return;
  }
  game.handleInput(name);
});

let isRunning = true;
let lastRenderTime = Date.now();

const gameLoop = () => {
  if (!isRunning) return;
  
  const currentTime = Date.now();
  if (currentTime - lastRenderTime >= 200) {
    game.update();
    game.render(terminal);
    lastRenderTime = currentTime;
  }
  
  setTimeout(gameLoop, 50);
};

game.render(terminal);
gameLoop(); 