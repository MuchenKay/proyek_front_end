import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Button from 'react-bootstrap/Button';
import ModalCreate from '../components/ModalCreate';

function Home() {
  const [SisaUang, setSisaUang] = useState(0);
  const [persentaseUang, setPersentaseUang] = useState(0);
  const [pemasukkanUang, setPemasukkanUang] = useState(0);
  const [pengeluaranuang, setPengeluaranuang] = useState(0);
  const [transaksiIN, setTransaksiIN] = useState(0);
  const [transaksiOUT, setTransaksiOUT] = useState(0);
  const [summary, setSummary] = useState([]);

  const tambahItem = (objek) => {
    let newData = [...summary, objek];
    let dataUangIN = newData.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIn = nominalUang.reduce((total, num) => total + num, 0);

    let dataUangOUT = newData.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    setPemasukkanUang(jumlahUangIn);
    setTransaksiIN(nominalUang.length);
    setPengeluaranuang(jumlahUangOUT);
    setTransaksiOUT(nominalUangOUT.length);
    setSisaUang(jumlahUangIn - jumlahUangOUT);
    setPersentaseUang(((jumlahUangIn - jumlahUangOUT) / jumlahUangIn) * 100);
    setSummary(newData);
  };

  const fnHitung = () => {
    let dataUangIN = summary.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIn = nominalUang.reduce((total, num) => total + num, 0);

    let dataUangOUT = summary.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    setPemasukkanUang(jumlahUangIn);
    setTransaksiIN(nominalUang.length);
    setPengeluaranuang(jumlahUangOUT);
    setTransaksiOUT(nominalUangOUT.length);
    setSisaUang(jumlahUangIn - jumlahUangOUT);
    setPersentaseUang(((jumlahUangIn - jumlahUangOUT) / jumlahUangIn) * 100);
  };

  useEffect(() => {
    if (summary.length < 1) {
      console.log('ok');
    } else {
      fnHitung();
    }
  }, [summary]);

  return (
    <>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1 className='fw-bold'> Kos Cash Flow </h1>
            <hr className='w-75 mx-auto' />
            <h2 className='fw-bold'>Rp.{SisaUang},-</h2>
            <span className='title-md'>Uang kamu tersisa {persentaseUang}% lagi</span>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-6'>
            <div className='card-wrapper p-4'>
              <div className='icon-wrapper mb-1'>
                <i className='bi bi-wallet2'></i>
              </div>
              <span className='title-sm '>Pemasukkan</span>
              <h3 className='fw-bold'>Rp.{pemasukkanUang},-</h3>
              <div>
                <span className='title-sm text-ungu fw-bold'>{transaksiIN}</span>
                <span className='title-sm'> Transaksi</span>
              </div>
            </div>
          </div>

          <div className='col-6'>
            <div className='card-wrapper p-4'>
              <div className='icon-wrapper mb-1'>
                <i className='bi bi-cash-coin'></i>
              </div>
              <span className='title-sm '>Pengeluaran</span>
              <h3 className='fw-bold'>Rp.{pengeluaranuang},-</h3>
              <div>
                <span className='title-sm text-ungu fw-bold'>{transaksiOUT}</span>
                <span className='title-sm'> Transaksi</span>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-12 d-flex justify-content-between align-items-center'>
            <h4 className='ringkasan'> Ringkasan Transaksi </h4>
            <div className='wrapper-button d-flex'>
              <ModalCreate
                action={tambahItem}
                category='IN'
                variant='button btn-ungu px-3 py-2 me-1'
                text='Pemasukkan'
                icon='bi bi-patch-plus-fill'
                modalheading='Tambahkan Pemasukkan'
              />
              <ModalCreate
                action={tambahItem}
                category='OUT'
                variant='button btn-pink px-3 py-2'
                text='Pengeluaran'
                icon='bi bi-patch-minus-fill'
                modalheading='Tambahkan Pengeluaran'
              />
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          {summary.length < 1 && <Alert />}
          {summary.map((sum, index) => {
            return (
              <div key={index} className='mb-3 col-12 d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <div className={sum.category === 'IN' ? 'icon-wrapper-IN' : 'icon-wrapper-OUT'}>
                    <i className={sum.category === 'IN' ? 'bi bi-bag-plus-fill' : '<bi bi-bag-dash-fill'}></i>
                  </div>
                  <div className='transaction ms-3 d-flex flex-column'>
                    <h6>{sum.deskripsi}</h6>
                    <span className='title-sm'>{sum.tanggal}</span>
                  </div>
                </div>
                <h5 className={sum.category === 'IN' ? 'text-money-in' : 'text-money-out'}>Rp.{sum.nominal} </h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Alert() {
  return <h1>Data Masih Kosong</h1>;
}

export default Home;
