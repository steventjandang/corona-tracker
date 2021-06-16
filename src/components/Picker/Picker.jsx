import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchProvinceName } from "../../api";

import styles from "./Picker.module.css";

const Picker = ({ handleProvinceChange }) => {
  const [fetchedProvinces, setFetchedProvinces] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedProvinces(await fetchProvinceName());
    };

    fetchAPI();
  }, [setFetchedProvinces]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleProvinceChange(e.target.value)}
      >
        <option value="">Indonesia</option>
        {fetchedProvinces.map((province, i) => (
          <option key={i} value={province}>
            {province}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Picker;
