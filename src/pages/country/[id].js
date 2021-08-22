import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};

const Country = ({ country, id }) => {
  const [borders, setBorders] = useState([]);
  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, [id]);
  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <div className={styles.img_box}>
              <Image
                src={country.flag}
                alt={country.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population.toLocaleString()} 명
                </div>
                <div className={styles.overview_label}>인구수</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>지역 코드</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>상세 내용</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>수도</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>사용 언어</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>화폐</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>네이티브 국가명</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>지니 계수</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                이웃 나라
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders?.map(({ flag, name, alpha3Code }, idx) => (
                  <>
                    <Link href={`/country/${alpha3Code}`}>
                      <div
                        key={idx}
                        className={styles.details_panel_borders_country}
                      >
                        <img src={flag} alt={name}></img>

                        <div className={styles.details_panel_borders_name}>
                          {name}
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );
  const country = await res.json();
  return {
    props: { country, id: params.id },
  };
};
