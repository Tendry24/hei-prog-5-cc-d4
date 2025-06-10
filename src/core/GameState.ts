import { Game } from "../Game";
import * as term from 'terminal-kit';

export interface GameState {
  update(game: Game): void;
  handleInput(game: Game, key: string): void;
  render(game: Game, terminal: term.Terminal): void;
}

export class MenuState implements GameState {
  update(game: Game): void {}

  handleInput(game: Game, key: string): void {
    if (key === 'ENTER') {
      game.startGame();
    }
  }

  render(game: Game, terminal: term.Terminal): void {
    terminal.clear();
    terminal.bold.green('SNAKE GAME\n\n');
    terminal.cyan('Press ENTER to start\n');
    terminal.cyan('Z, S, Q, D to move\n');
  }
}

export class RunningState implements GameState {
  update(game: Game): void {
    game.updateGame();
  }

  handleInput(game: Game, key: string): void {
    switch (key.toLowerCase()) {
      case "z":
        game.changeDirection(0); 
        break;
      case "s":
        game.changeDirection(1); 
        break;
      case "q":
        game.changeDirection(2); 
        break;
      case "d":
        game.changeDirection(3); 
        break;
      case "p":
        game.pauseGame();
        break;
    }
  }

  render(game: Game, terminal: term.Terminal): void {
    game.renderGame(terminal);
  }
}

export class GameOverState implements GameState {
  update(game: Game): void {}

  handleInput(game: Game, key: string): void {
    if (key === 'ENTER') {
      game.resetGame();
    }
  }

  render(game: Game, terminal: term.Terminal): void {
    terminal.clear();
    terminal.bold.red('GAME OVER\n\n');
    terminal.yellow(`Score: ${game.getScore()}\n\n`);
    terminal.cyan('Press ENTER to restart\n');
  }
}