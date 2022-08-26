import styles from './style.module.scss';
import { useMemo, useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Bar,
  BarChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label
} from 'recharts';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Input from '../Input'
import ReactPaginate from 'react-paginate';

const PieGraph = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className={styles.pieChart}>
      <PieChart width={250} height={300}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#0088FE"
          paddingAngle={5}
          dataKey="value"
          onClick={(e) => {
            console.log(e);
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

const BarGraph = ({ data, text, color }) => {
  return (
    <div className={styles.barGraph}>
      <ResponsiveContainer width={800} height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value={text} offset={5} position="bottom" />
          </XAxis>
          <YAxis label={{ value: "Number of students", angle: -90, position: 'insideBottomLeft' }} />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

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

const PaginatedTable = ({ itemsPerPage, data, role }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    console.log(data.length, 'abcd')
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log("current items", currentItems);

  return (
    <>
      <Table data={currentItems} role={role}/>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [higherEducationData, setHigherEducationData] = useState([]);
  const [allStudentData, setAllStudentData] = useState([]);
  const [yearWisePlacementData, setYearWisePlacementData] = useState([]);
  const [skills, setSkills] = useState([]);
  const role = useSelector(state => state.login.role);
  const roleId = useSelector(state => state.login.roleId);
  const [skillFilter, setSkillFilter] = useState(null);
  const getData = async () => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/student/getstudentcount',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        role: role,
        id: roleId
      }
    })
    setData(response.data.data);
    const higherEducationResponse = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/student/highereducationdata',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        role: role,
        id: roleId
      }
    })
    setHigherEducationData(higherEducationResponse.data.data);

    

    const yearWisePlacementDataResponse = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/student/yearwiseplacementdata',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        role: role,
        id: roleId
      }
    })
    setYearWisePlacementData(yearWisePlacementDataResponse.data.data);
  }

  const getAllStudentData = async () => {
    const allStudentDataResponse = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/student/allstudents',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        role: role,
        id: roleId,
        skillFilter: skillFilter
      }
    })
    console.log(allStudentDataResponse.data.data);
    setAllStudentData(allStudentDataResponse.data.data);
  }
  useEffect(() => {
    getAllStudentData()
  }, [])

  const getSkills = async () => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/student/allskills',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setSkills(response.data.data);
  }

  useEffect(() => {
    getSkills();
  }, [])


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {
        role === 'institution' ? (
          <div className={styles.graphWrapper}>
            {/* </ResponsiveContainer> */}
            <PieGraph data={data} />
            <BarGraph data={higherEducationData} text="Higher Education Data" color="#eedeae" />
            <BarGraph data={yearWisePlacementData} text="Year Wise Placement Data" color="#dfec34" />

            {/*
        <table className={styles.table}>
          <caption>STUDENT DATA {role === 'institution' ? 'OF THIS INSTITUTION' : 'OF ALL INSTITUTION'}</caption>
          <thead>
            <tr>
              <th></th>
              <th>S.no</th>
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
            {allStudentData.map((item, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{index+1}</td>
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
        */}
          </div>
        ) : ''
      }

      {
        role === 'corporate' ? (
          <div className={styles.graphWrapper}>
            <Input
              type="dropdown"
              label={'Filter By'}
              placeholder={'Skill'}
              options={skills}
              onOptionClick={(option) => {
                setSkillFilter(option)
              }}
            />
            {
            allStudentData.length > 0 && 
            <PaginatedTable itemsPerPage={5} data={allStudentData} role={role}/>
            }
          </div>
        ) : ''
      }

      {
        role === 'government' ? (
          <div className={styles.graphWrapper}>
            {/* </ResponsiveContainer> */}
            <PieGraph data={data} />
            <BarGraph data={higherEducationData} text="Higher Education Data" color="#eedeae" />
            <BarGraph data={yearWisePlacementData} text="Year Wise Placement Data" color="#dfec34" />
          </div>
        ) : ''
      }
    </div>
  );
};

export default Dashboard;
