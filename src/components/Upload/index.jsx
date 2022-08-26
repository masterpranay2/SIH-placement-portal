import styles from './style.module.scss';
import excelIcon from '../../assets/excel-icon.png';
import { useState, useMemo } from 'react';
import Button from '../../components/Button';

import { useDropzone } from 'react-dropzone';
import { read, utils } from "xlsx";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Upload = () => {
  const [isProceedClicked, setIsProceedClicked] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [errorIndex, setErrorIndex] = useState([]);
  const roleId = useSelector(state => state.login.roleId);

  useEffect(() => {
    console.log(rows)
    console.log(columns);

    if (rows.length > 0 && columns.length > 0) {
      rows[0].aadharnumber = String(rows[0].aadharnumber)
      console.log(typeof rows[0].aadharNumber)
      setIsProceedClicked(true)
    }
  }, [rows, columns]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      if (acceptedFiles[0].size > 2000000) {
        alert("File size is too big. Please upload a file less than 2MB")
      } else {
        const filereader = new FileReader();
        filereader.readAsBinaryString(acceptedFiles[0]);
        filereader.onload = function (e) {
          const wb = read(e.target.result, { type: 'binary' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = utils.sheet_to_json(ws, { header: 1 });
          setColumns(data[0].map((r) => ({ key: r, name: r })));
          setRows(data.slice(1).map((r) => r.reduce((acc, x, i) => {
            acc[data[0][i]] = x;
            return acc;
          }, {})));
        }
      }
    }
  }, [acceptedFiles])

  const handleRegisterStudent = async () => {
    const data = rows.map((row) => {
      return {
        institution: roleId,
        aadharnumber: String(row.aadharnumber),
        ...row
      }
    })


    const res = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/institution/uploadStudentData',
      data: {
        students : data
      },
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      }
    })
    console.log(res)
    const numErr = res.data.errorIndex.length
    setErrorIndex(res.data.errorIndex)
    alert('Students registered successfully ' + numErr + ' students failed to register')
  }

  return (
    <div className={styles.upload}>
      {/* <h1>Upload Student Data</h1> */}
      <main>
        <header>
          <div className={styles.circleWrapper}>
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
          {
            <div
              className={styles.proceedButton}
              onClick={() => {
                setIsProceedClicked(!isProceedClicked);
              }}
            >
              {!isProceedClicked ? 'Proceed' : 'Return'}
            </div>
          }
        </header>
        {!isProceedClicked ? (
          <div className={styles.uploadWrapper}>
            <h2>Upload your file</h2>
            <div {...getRootProps({ className: `${styles.uploadArea}` })}>
              <input {...getInputProps()} />
              <p>Drag a file or Browse for a file to upload</p>
              <img src={excelIcon} alt="excelIcon" />
              <small>( Supported Formats : xls, xlsx ) ( Max Size : 2mb ) </small>
            </div>
            <p>Please Use this format
              <a href='/Sample.xlsx' download className='highlight'> Click to download</a>
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  {columns.map((c, index) => (
                    <th key={index}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, index) => (
                  <tr key={index} className={errorIndex.includes(index) ? styles.rowError : ''}>
                    {Object.keys(r).map((k, index) => (
                      <td key={index}>{r[k]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {
              rows && rows.length > 0 ? (
                <Button className={styles.saveButton} onclick={handleRegisterStudent} text="Save" normal notLink unInvertOnHover />
              ) : ''
            }
          </div>
        )}
      </main>
    </div>
  );
};

export default Upload;
