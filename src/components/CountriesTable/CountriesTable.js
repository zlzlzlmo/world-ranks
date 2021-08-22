import styles from "./CountriesTable.module.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useState } from "react";
const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownIcon color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpIcon color="inherit" />
      </div>
    );
  }
};
const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState(null);
  const [value, setValue] = useState();
  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>나라명</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>인구수</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country, idx) => (
        <div key={idx} className={styles.row}>
          <div className={styles.name}>{country.name}</div>
          <div className={styles.population}>{country.population}</div>
        </div>
      ))}
    </div>
  );
};

export default CountriesTable;
