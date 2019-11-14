import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let isActiveClass = '';
        if (this.props.isActive) isActiveClass = 'table__cell_active';
        return (
            <td className={'table__cell ' + isActiveClass} onClick={this.props.handleClick.bind(this, this.props.row, this.props.column)}> </td>
        )
    }
}

export default Cell;
