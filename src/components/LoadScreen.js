import React from 'react';
import './LoadScreen.css';

class LoadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 5,
            height: 5
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className={'loadScreenContainer'}>
                <div className={'loadScreen'}>
                    <h1>Игра "Жизнь"</h1>
                    <p className={'loadScreen__inputLabel'}>Введите ширину стола в клетках <input name='width' type="text" onChange={this.handleInputChange} placeholder='Лучше не больше 100'/></p>
                    <p className={'loadScreen__inputLabel'}>Введите высоту стола в клетках <input name='height' type="text" onChange={this.handleInputChange} placeholder='Лучше не больше 100'/></p>
                    <button className={'btn'} onClick={this.props.changeSize.bind(this, +this.state.width, +this.state.height)}>Начать игру</button>
                </div>
            </div>
        );
    }
}

export default LoadScreen;
