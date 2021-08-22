import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(keyword)
  );
  return (
    <Layout>
      <div>총 {countries.length}개의 나라를 검색했어요</div>
      <SearchInput
        placeholder="나라를 입력하세요"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`);
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
