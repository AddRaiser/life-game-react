import React from 'react';
import Cell from "./Cell";
import Menu from "./Menu";
import LoadScreen from "./LoadScreen"
import './Table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 300,
      height: 300,
      showLoadScreen: true,
      isIterating: false,
      savedTables: new Map()
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.toggleIterations = this.toggleIterations.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.saveTable = this.saveTable.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }

  componentDidMount() {
    let tableArray = this.CreateTableArray();
    this.setState({tableArray});
  }

  CreateTableArray() {
    let tableArray = [];
    for (let i = 0; i < this.state.height; i++) {
      tableArray[i] = [];
      for (let j = 0; j < this.state.width; j++) {
        tableArray[i][j] = false;
      }
    }
    return tableArray;
  }

  handleClick(row, column) {
    let newTableArray = this.state.tableArray;
    newTableArray[row][column] = !newTableArray[row][column];
    this.setState( {
      tableArray: newTableArray
    });
  }

  nextStep() {
    let newTableArray = this.state.tableArray;

    newTableArray = newTableArray.map((row, rowID) => {
      return row.map((elem, columnID) => {
        let lifeNearbyCount = 0;
        if (rowID > 0) {
          if (columnID > 0 && this.state.tableArray[rowID - 1][columnID - 1]) lifeNearbyCount += 1;
          if (this.state.tableArray[rowID - 1][columnID]) lifeNearbyCount += 1;
          if (columnID < this.state.width && this.state.tableArray[rowID - 1][columnID + 1]) lifeNearbyCount += 1;
        }
        if (rowID < this.state.height - 1) {
          if (columnID > 0 && this.state.tableArray[rowID + 1][columnID - 1]) lifeNearbyCount += 1;
          if (this.state.tableArray[rowID + 1][columnID]) lifeNearbyCount += 1;
          if (columnID < this.state.width && this.state.tableArray[rowID + 1][columnID + 1]) lifeNearbyCount += 1;
        }
        if (columnID > 0 && this.state.tableArray[rowID][columnID - 1]) lifeNearbyCount += 1;
        if (columnID < this.state.width - 1 && this.state.tableArray[rowID][columnID + 1]) lifeNearbyCount += 1;

        if (elem === false && lifeNearbyCount === 3) return !elem;
        if (elem === true && (lifeNearbyCount < 2 || lifeNearbyCount > 3)) return !elem;
        return elem;
      })
    });

    this.setState( {
      tableArray: newTableArray
    });
  }

  toggleIterations() {
    if (!this.state.isIterating) {
      this.setState({
        isIterating: true,
        interval: setInterval(() => {this.nextStep()}, 200)
      });
    }
    if (this.state.isIterating) {
      clearInterval(this.state.interval);
      this.setState({isIterating: false})
    }
  }

  clearTable() {
    if (this.state.isIterating) this.toggleIterations();
    let tableArray = this.CreateTableArray();
    this.setState({tableArray});
  }

  saveTable() {
    if (this.state.isIterating) this.toggleIterations();
    let tableName = prompt('Введите имя сохранения:', '');
    // Легкий способ скопировать многомерный массив
    let tableCopy = JSON.parse(JSON.stringify(this.state.tableArray));
    this.setState((state) => ({
      savedTables: state.savedTables.set(tableName, tableCopy)
    }))
  }

  loadTable() {
    if (this.state.isIterating) this.toggleIterations();
    let savedTables = '';
    for (let name of this.state.savedTables.keys()) {
      savedTables += name + ', '
    }
    savedTables = savedTables.trim();
    savedTables = savedTables.replace(/,\s*$/, "");
    let saveName = prompt(
        `Сохраненния:
        ${savedTables}`, '');
    if (!this.state.savedTables.has(saveName)) {
      alert('Сохранение не найдено!');
      return;
    }
    let tableArray = this.state.savedTables.get(saveName);
    this.setState({tableArray});
  }

  changeSize(width, height) {
    console.log(width, height);
    this.setState({width, height});
    this.setState({showLoadScreen: false});
    console.log(this.state.width, this.state.height, this.state.showLoadScreen);
  }

  render() {
    if (!this.state.tableArray) return null;
    let table = [];
    for (let i = 0; i < this.state.height; i++) {
      let cells = [];
      for (let j = 0; j < this.state.width; j++) {
        cells.push(<Cell row={i} column={j} isActive={this.state.tableArray[i][j]} key={j} handleClick={this.handleClick} />)
      }
      let newRow = <tr key={i}>{cells}</tr>;
      table.push(newRow);
    }

    const showLoadScreen = this.state.showLoadScreen;
    let loadScreen;
    loadScreen = showLoadScreen ? <LoadScreen changeSize={this.changeSize} /> : null;
    table = !showLoadScreen ? <table className={'table'}><tbody>{table}</tbody></table> : null;

    return (
      <div>
        {loadScreen}
        <Menu
            isIterating={this.state.isIterating}
            nextStep={this.nextStep}
            toggleIterations={this.toggleIterations}
            clear={this.clearTable}
            save={this.saveTable}
            load={this.loadTable}
        />
        {table}
      </div>
    )
  }
}

export default Table;
