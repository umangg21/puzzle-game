import React from 'react';
import { ButtonBase, Button, Card } from '@material-ui/core';
import { tile } from '../contract/tile';
import { direction } from '../contract/directions';
import { styles } from './Style';

interface ITileViewProps {
    board: number[][],
    tile: tile,
    onMoveTile: Function,
}

interface ITileViewStates {
}

export class TileView extends React.Component<ITileViewProps, ITileViewStates> {

    constructor(props: any) {
        super(props)
    }

    handleClickButton = (directionToMove: direction) => {
        this.props.onMoveTile(this.props.tile, directionToMove)
    }

    shouldDownDisable = () => {
        let rowIndex = this.props.tile.rowIndex
        let colIndex = this.props.tile.colIndex

        return rowIndex === this.props.board.length - 1 || this.props.board[rowIndex + 1][colIndex] !== 0
    }

    shouldUpDisable = () => {
        let rowIndex = this.props.tile.rowIndex
        let colIndex = this.props.tile.colIndex

        return rowIndex === 0 || this.props.board[rowIndex - 1][colIndex] !== 0
    }

    shouldLeftDisable = () => {
        let rowIndex = this.props.tile.rowIndex
        let colIndex = this.props.tile.colIndex

        return colIndex === 0 || this.props.board[rowIndex][colIndex - 1] !== 0
    }

    shouldRightDisable = () => {
        let rowIndex = this.props.tile.rowIndex
        let colIndex = this.props.tile.colIndex

        return colIndex === this.props.board[0].length - 1 || this.props.board[rowIndex][colIndex + 1] !== 0
    }



    render() {
        let row = this.props.tile.rowIndex
        let col = this.props.tile.colIndex

        if (this.props.board[row][col] !== 0) {
            return (
                <React.Fragment>
                    <Card style={styles.tileView}>
                        <div className="layout-column">
                            <Button disabled={this.shouldUpDisable()}
                                onClick={event => this.handleClickButton(direction.up)}
                            >
                                <span style={styles.ButtonText}>Up</span>
                            </Button>
                            <div className="layout-row">
                                <Button disabled={this.shouldLeftDisable()}
                                    onClick={event => this.handleClickButton(direction.left)}
                                >
                                    <span style={styles.ButtonText}>Left</span>
                                </Button>
                                <div>{`${this.props.board[row][col]}`}</div>
                                <Button disabled={this.shouldRightDisable()}
                                    onClick={event => this.handleClickButton(direction.right)}
                                >
                                    <span style={styles.ButtonText}>Right</span>
                                </Button>
                            </div>
                            <Button disabled={this.shouldDownDisable()}
                                onClick={event => this.handleClickButton(direction.down)}
                            >
                                <span style={styles.ButtonText}>Down</span>
                            </Button>

                        </div>
                    </Card>

                </React.Fragment>
            )
        }
        return (
            <div style={styles.EmptyTileView}>
            </div>
        );
    }
}

export default TileView;