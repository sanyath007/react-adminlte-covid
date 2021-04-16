import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../../api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    let res = await api.get(`/patients`);

    setPatients(res.data.items);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            {/* <h3 className="card-title">Striped Full Width Table</h3> */}
          </div>
          <div className="col-md-6">
            <Link to="/patients/new" className="btn btn-md bg-primary float-right">เพิ่มผู้ป่วย</Link>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table table-striped">
          <thead>
            <tr style={{ fontSize: '14px' }}>
              <th style={{ width: '4%', textAlign: 'center' }}>#</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Code</th>
              <th style={{ width: '8%', textAlign: 'center' }}>HN</th>
              <th>ชื่อ-สกุล</th>
              <th style={{ width: '5%', textAlign: 'center' }}>เพศ</th>
              <th style={{ width: '5%', textAlign: 'center' }}>อายุ (ปี)</th>
              <th style={{ width: '8%', textAlign: 'center' }}>วันที่ Admit</th>
              <th style={{ width: '8%', textAlign: 'center' }}>วันที่ส่ง Lab</th>
              <th style={{ width: '6%', textAlign: 'center' }}>ผล Lab</th>
              <th style={{ width: '6%', textAlign: 'center' }}>Dx</th>
              {/* <th>อาการโดยรวม</th> */}
              <th style={{ width: '8%', textAlign: 'center' }}>วันที่ D/C</th>
              <th style={{ width: '6%', textAlign: 'center' }}>จน.วันนอน</th>
              {/* <th>หมายเหตุ</th> */}
              <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => {
              return (
                <tr key={patient.hn}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>{patient.code}</td>
                  <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                  <td style={{ fontSize: '14px' }}>{patient.name}</td>
                  <td style={{ textAlign: 'center' }}>{patient.sex ? 'ชาย' : 'หญิง'}</td>
                  <td style={{ textAlign: 'center' }}>{patient.age_y}</td>
                  <td style={{ textAlign: 'center' }}>{patient.reg_date}</td>
                  <td style={{ textAlign: 'center' }}>{patient.lab_date}</td>
                  <td style={{ textAlign: 'center' }}>{patient.lab_result}</td>
                  <td style={{ textAlign: 'center' }}>{patient.dx}</td>
                  {/* <td style={{ fontSize: '14px' }}>{patient.symptom}</td> */}
                  <td style={{ textAlign: 'center' }}>{patient.dch_date}</td>
                  <td style={{ textAlign: 'center' }}>{patient.adm_date}</td>
                  {/* <td>{patient.remark}</td> */}
                  <td style={{ textAlign: 'center' }}>
                    <Link className="btn btn-sm bg-info" to="/">
                      <i className="fas fa-search"></i>
                    </Link>
                    <Link className="btn btn-sm bg-warning" to="/">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <Link className="btn btn-sm bg-danger" to="/">
                      <i className="fas fa-trash-alt"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card-footer clearfix">
        <ul className="pagination pagination-md m-0 float-right">
          <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
        </ul>
      </div>
    </div>
  );
};

export default PatientList;
