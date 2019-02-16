import React from 'react';
import { ButtonBase, Button } from '@material-ui/core';
import TileView from './TileView';

interface IRowViewProps {
    board: number[][],
    rowIndex: number,
    onMoveTile: Function
}

interface IRowViewStates {
}


export class RowView extends React.Component<IRowViewProps, IRowViewStates> {

    constructor(props: any) {
        super(props)
    }

    getTileColumns = () => {
        return this.props.board[this.props.rowIndex].map((tile, index)=>(
            <TileView 
                board={this.props.board}
                tile={ {
                    colIndex : index,
                    rowIndex: this.props.rowIndex
                }}
                onMoveTile={this.props.onMoveTile}
            />
        ))
    }

    render() {
        let tileColumns = this.getTileColumns()

        return (
            <React.Fragment>
                <div className="layout-row">
                    {tileColumns}
                </div>

            </React.Fragment>
        )
    }
}

export default RowView;