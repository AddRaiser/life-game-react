import React from 'react';
import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'menu'}>
                <button className={'menu__btn menu__btn_start'} onClick={this.props.toggleIterations}>{this.props.isIterating ? 'Stop' : 'Start'}</button>
                <button className={'menu__btn menu__btn_step'} disabled={this.props.isIterating} onClick={this.props.nextStep}>Next step</button>
                <button className={'menu__btn menu__btn_step'} onClick={this.props.clear}>Clear</button>
                <button className={'menu__btn menu__btn_step'} onClick={this.props.save}>Save</button>
                <button className={'menu__btn menu__btn_step'} onClick={this.props.load}>Load</button>
            </div>
        )
    }
}

export default Menu;
