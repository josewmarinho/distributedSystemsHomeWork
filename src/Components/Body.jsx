
import { useState } from 'react';
import styles from './Body.module.css';

import imgTemp from '../../public/Temperatura2.png';

export function Body() {
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [umi, setUmi] = useState('');

  function submitCep(){
   const value = cep.replace(/[^0-9]/g, '');
    if(value?.length !== 8){
      return
    }
    fetch(`https://viacep.com.br/ws/${value}/json`)
    .then((res) => res.json())
    .then((data) => {
      setCity(data.localidade);
      searchTemp(data.ibge)
    });
  }

  function searchTemp(ibge){
    fetch(`https://apiprevmet3.inmet.gov.br/estacao/proxima/${ibge}`)
    .then((res) => res.json())
    .then((data) => {
      setTemp(data.dados.TEM_INS)
      setUmi(data.dados.UMD_INS)
    });
  }

  return (
    <>
    <div className={styles.container}>
      <header className={styles.title}>sistemas distribuídos</header>
    </div>
    <div className={styles.containerInput}>
      <input className={styles.input} type="number" id="cep" value={cep}
            placeholder="Digite seu CEP" onChange={(e) => {setCep(e.target.value)}} />
    </div>
    <button className={styles.button} onClick={submitCep}>
      <p>Pesquisar</p>
    </button>
    <div className={styles.containerBody}>
      <p className={styles.city}>Cidade: {city}</p>
      <img src={imgTemp} alt="temp"/>
      <div className={styles.separator}>
        <p className={styles.temp}>Temperatura Instantânea:</p>
        <p className={styles.result}>{temp} C</p>
      </div>
      <div className={styles.separator}>
        <p className={styles.temp}>Umidade Relativa Instantânea:</p>
        <p className={styles.result}>{umi} C</p>
      </div>
      

    </div>
    </>
  );
}