import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";

export default function Home({ countries }) {
  console.log(countries);
  return (
    <Layout>
      <div>총 {countries.length}개의 나라를 검색했어요</div>
      <SearchInput placeholder="나라를 입력하세요" />
      <CountriesTable countries={countries} />
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
