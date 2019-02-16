import React from 'react';
import { ButtonBase, Button, Card } from '@material-ui/core';
import { styles } from './Style';
import RowView from './RowView';
import { direction } from '../contract/directions';
import { tile } from '../contract/tile';

interface IMainProps {
}

interface IMainStates {
    board: number[][]
}

function getHomeStyle() {
    return {
        minHeight: "-webkit-fill-available",
        backgroundColor: "#252121"
    }
}

export class Main extends React.Component<IMainProps, IMainStates> {

    constructor(props: any) {
        super(props)
        let newboard = [[1, 2, 5, 3], [4, 0, 6, 7], [8, 9, 11, 10], [13, 12, 15, 14]]
        newboard = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 0, 15]]
        this.state = { board: newboard }
    }

    onMoveTile = (tile: tile, directionToMove: direction) => {
        let newBoard = [...this.state.board]
        let tileValue = newBoard[tile.rowIndex][tile.colIndex]
        newBoard[tile.rowIndex][tile.colIndex] = 0

        switch (directionToMove) {
            case direction.up:
                newBoard[tile.rowIndex - 1][tile.colIndex] = tileValue
                break;

            case direction.left:
                newBoard[tile.rowIndex][tile.colIndex - 1] = tileValue
                break;

            case direction.down:
                newBoard[tile.rowIndex + 1][tile.colIndex] = tileValue
                break;

            case direction.right:
                newBoard[tile.rowIndex][tile.colIndex + 1] = tileValue
                break;

            default:
                break;
        }

        this.setState({ board: newBoard })

    }

    getRows = () => {
        return this.state.board.map((row, index) => (
            <RowView
                board={this.state.board}
                rowIndex={index}
                onMoveTile={this.onMoveTile}
            />
        ))
    }

    newBoard = () => {
        let allBoards = require('../contract/PlayBoard.json')
        let min = 0
        let max = 5
        let boardIndex = Math.floor(Math.random() * (+max - +min)) + +min
        this.setState({ board: allBoards[boardIndex] })
    }

    isBoardComplete = () => {
        let finalBoard = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]

        for(let row=0; row<4; row++){
            for(let col=0; col<4; col++){
                if( this.state.board[row][col] !== finalBoard[row][col]) return false
            }
        }

        return true
    }

    render() {
        let rows = this.getRows()

        let winBadge;
        if (this.isBoardComplete()) {
            winBadge = (
                <Card style={styles.WinCard}>
                    <span>You Win !!!</span>
                </Card>
            )
        }

        return (
            <React.Fragment>
                <div className="layout-row" style={getHomeStyle()}>
                    <div className="flex-20" ></div>
                    <div className="flex-60 layout-column layout-align-center-center" >
                        <span style={styles.PageHeader}>15 Puzzle Challange</span>
                        {rows}
                    </div>
                    <div className="flex-20" >
                        <Button onClick={this.newBoard}
                            color="primary">
                            <span style={styles.ButtonText}>New Board</span>
                        </Button>

                        {winBadge}
                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default Main;