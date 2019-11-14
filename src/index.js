import React from 'react';
import ReactDOM from 'react-dom';
import Table from "./components/Table";
import './index.css';

function MyInfo() {
    return (
        <Table />
    );
}

ReactDOM.render(<MyInfo />, document.getElementById('root'));
