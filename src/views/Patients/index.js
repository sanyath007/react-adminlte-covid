import React from 'react';
import { Link } from "react-router-dom";

const patientData = [
  {
    code: '10884A080421CD0002',
    name: 'นายชัชวาลย์ คงสันเทียะ',
    hn: '33394',
    sex: '1',
    age_y: 19,
    bed: '',
    reg_date: '2021-04-09',
    lab_date: '2021-04-08',
    lab_result: 'Positive',
    dx: 'Covid19',
    symptom: 'ไม่มีไข้ ไม่ไอ ไม่มีอาการหอบเหนื่อย O2 sat RA=97-98%',
    dch_date: '',
    adm_date: 0,
    remark: ''
  },
  {
    code: '10884A090421PJ0015',
    name: 'นายปฏิหารย์ จันทร์พลงาม',
    hn: '96202',
    sex: '1',
    age_y: 18,
    bed: '',
    reg_date: '2021-04-10',
    lab_date: '2021-04-09',
    lab_result: 'Positive',
    dx: 'Covid19',
    symptom: 'ไม่มีน้ำมูล ไม่ไอ ไม่ไข้ ไม่มีหอบ',
    dch_date: '',
    adm_date: 0,
    remark: ''
  },
  {
    code: '10884A010421TS0010',
    name: 'นายธนโชติ สุขจิตร์',
    hn: '104950',
    sex: '1',
    age_y: 19,
    bed: '',
    reg_date: '2021-04-11',
    lab_date: '2021-04-10',
    lab_result: 'Positive',
    dx: 'Covid19',
    symptom: 'ไม่ไข้ ไม่ไอ ไม่หอบ',
    dch_date: '',
    adm_date: 0,
    remark: ''
  }
];

const Patients = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Striped Full Width Table</h3>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: '10px' }}>#</th>
                    <th>Code</th>
                    <th>HN</th>
                    <th>ชื่อ-สกุล</th>
                    <th>เพศ</th>
                    <th>อายุ (ปี)</th>
                    <th>วันที่ Admit</th>
                    <th>วันที่ส่ง Lab</th>
                    <th>ผล Lab</th>
                    <th>Dx</th>
                    <th>อาการโดยรวม</th>
                    <th>วันที่ D/C</th>
                    <th>จำนวนวันนอน รพ.</th>
                    <th>หมายเหตุ</th>
                    <th style={{ width: '40px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.map((patient, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{patient.code}</td>
                        <td>{patient.hn}</td>
                        <td>{patient.name}</td>
                        <td>{patient.sex ? 'ชาย' : 'หญิง'}</td>
                        <td>{patient.age_y}</td>
                        <td>{patient.reg_date}</td>
                        <td>{patient.lab_date}</td>
                        <td>{patient.lab_result}</td>
                        <td>{patient.dx}</td>
                        <td>{patient.symptom}</td>
                        <td>{patient.dch_date}</td>
                        <td>{patient.adm_date}</td>
                        <td>{patient.remark}</td>
                        <td><span className="badge bg-danger">55%</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
                <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Patients;
