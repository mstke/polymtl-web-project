import { expect } from "chai";

import { VerticalWordValidator } from "./vertical-word-validator";

import { Letter } from "../../models/letter";
import { Player } from "../../models/player";
import { Board } from "../../models/board/board";
import { IValidationRequest } from "./validation-request.interface";

let verticalWordValidator: VerticalWordValidator;
let board = new Board();
let fakeSocketId = "fakeId@33md401";
let fakename = "jul";
let player = new Player(fakename, 1, fakeSocketId);
let letters = [new Letter("A", 1, 1), new Letter("S", 2, 1)];
player.easel.addLetters(letters);


describe("verticalWordValidator should", () => {
    beforeEach(() => {
        verticalWordValidator = new VerticalWordValidator();
    });

    it("detect if a word doesn't cross the middle of the board when the board is empty (word below)", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 8,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });

    it("detect if a word doesn't cross the middle of the board when the board is empty (not the middle column)", () => {
        let request: IValidationRequest = {
            _columnIndex: 8,
            _firstRowNumber: 8,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });

    it("detect if a word doesn't cross the middle of the board when the board is empty (word too short)", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 4,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });

    it("detect if a word crosses the middle of the board when the board is empty (middle square)", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 7,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect if a word crosses the middle of the board when the board is empty", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 6,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect if the user wants to use any letter he doesn't have.", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 7,
            _letters: [new Letter("A", 1, 1), new Letter("S", 2, 1), new Letter("E", 1, 1)],
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });

    it("detect the word to be placed doesn't fit on the board (letter already present and not matching).", () => {
        board.squares[7][7].letter = new Letter("A", 1, 1);
        board.squares[7][7].isBusy = true;
        board.isEmpty = false;
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 6,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });

    it("detect the word to be placed fits on the board (letter already present and matching).", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 7,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect the word to be placed fits on the board (above letter is touched).", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 8,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect the word to be placed fits on the board (below letter is touched).", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 5,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect the word to be placed fits on the board (left letter is touched).", () => {
        let request: IValidationRequest = {
            _columnIndex: 8,
            _firstRowNumber: 7,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect the word to be placed fits on the board (right letter is touched).", () => {
        let request: IValidationRequest = {
            _columnIndex: 6,
            _firstRowNumber: 7,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.true;
    });

    it("detect the word to be placed doesn't fit on the board (no letter is touched).", () => {
        let request: IValidationRequest = {
            _columnIndex: 9,
            _firstRowNumber: 7,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });

    it("detect if a row index is invalid", () => {
        let request: IValidationRequest = {
            _columnIndex: 7,
            _firstRowNumber: 14,
            _letters: letters,
            _player: player
        };
        let isWordFit = verticalWordValidator.matchVerticalPlacementRules(request, board);
        expect(isWordFit).to.be.false;
    });
});
