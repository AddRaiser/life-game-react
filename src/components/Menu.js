import React from 'react';
import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'menuContainer'}>
                <div className={'menu'}>
                    <button className={`btn ${this.props.isIterating ? 'menu__btn_stop' : 'menu__btn_start'}`} onClick={this.props.toggleIterations}>{this.props.isIterating ? 'Stop' : 'Start'}</button>
                    <button className={'btn menu__btn_step'} disabled={this.props.isIterating} onClick={this.props.nextStep}>Next step</button>
                    <button className={'btn menu__btn_clear'} onClick={this.props.clear}>Clear</button>
                    <button className={'btn menu__btn_save'} onClick={this.props.save}>Save</button>
                    <button className={'btn menu__btn_load'} onClick={this.props.load}>Load</button>
                </div>
            </div>
        )
    }
}

export default Menu;
