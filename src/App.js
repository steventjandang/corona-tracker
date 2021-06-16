import React from "react";

import { Cards, Chart, Picker } from "./components";
import styles from "./App.module.css";

import { fetchData, fetchProvinceData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    province: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleProvinceChange = async (province) => {
    if (province) {
      const fetchedData = await fetchProvinceData(province);
      this.setState({ data: fetchedData, province: province });
    } else {
      const fetchedData = await fetchData();
      this.setState({ data: fetchedData, province: province });
    }
  };

  render() {
    const { data, province } = this.state;

    return (
      <div className={styles.container}>
        <Cards data={data} />
        <Picker handleProvinceChange={this.handleProvinceChange} />
        <Chart data={data} province={province} />
      </div>
    );
  }
}

export default App;
