import { useState, useEffect } from "react";
import styles from './style.module.scss';
import { useSelector } from 'react-redux';

import axios from 'axios';

const Table = ({ data, role }) => {
    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <caption>STUDENT DATA {role === 'institution' ? 'OF THIS INSTITUTION' : 'OF ALL INSTITUTION'}</caption>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Degree</th>
              <th>Institution Name</th>
              <th>Is Pursuing Higher Education</th>
              <th>Passing Year</th>
              <th>Comapany</th>
              <th>Skills</th>
              <th>CGPA</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.branch}</td>
                <td>{item.degree}</td>
                <td>{item.institution.institutionname}</td>
                <td>{item.ishighereducationopted}</td>
                <td>{item.passingyear}</td>
                <td>{item.companyname}</td>
                <td>{item.skills.reduce(
                  (acc, curr) => acc + ', ' + curr
                )}</td>
                <td>{item.cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

const AllData = () => {
  const [allStudentData, setAllStudentData] = useState([]);
  const role = useSelector(state => state.login.role);
  const roleId = useSelector(state => state.login.roleId);


  const getAllStudentData = async () => {
    const allStudentDataResponse = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/student/allstudents',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        role: role,
        id: roleId
      }
    })
    console.log(allStudentDataResponse.data.data);
    setAllStudentData(allStudentDataResponse.data.data);
  }
  useEffect(() => {
    getAllStudentData()
  }, [])

    return (
        <div>
            <h1>All Data</h1>
            <Table data={allStudentData} role={role} />
        </div>
    );
}
export default AllData;