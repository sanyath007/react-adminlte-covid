import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import api from '../../../api';

const PatientList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [pager, setPager] = useState([]);

  const fetchRegistrations = async () => {
    let res = await api.get(`/patients`);
    console.log(res.data);

    setRegistrations(res.data.items);
    setPager(res.data.pager);
  };

  const fetchRegistrationsWithPage = async (url) => {
    let res = await api.get(url);

    setRegistrations(res.data.items);
    setPager(res.data.pager);
  };

  const handlePaginationClick = (url) => {
    fetchRegistrationsWithPage(url);
  };

  useEffect(() => {
    fetchRegistrations();
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
              {/* <th style={{ width: '6%', textAlign: 'center' }}>จน.วันนอน</th> */}
              {/* <th>หมายเหตุ</th> */}
              <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations && registrations.map((reg, index) => {
              return (
                <tr key={reg.hn}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>{reg.code}</td>
                  <td style={{ textAlign: 'center' }}>{reg.hn}</td>
                  <td style={{ fontSize: '14px' }}>{reg.patient?.name}</td>
                  <td style={{ textAlign: 'center' }}>{reg.patient?.sex ? 'ชาย' : 'หญิง'}</td>
                  <td style={{ textAlign: 'center' }}>{reg.patient?.age_y}</td>
                  <td style={{ textAlign: 'center' }}>{moment(reg.reg_date).format('DD/MM/YYYY')}</td>
                  <td style={{ textAlign: 'center' }}>{moment(reg.lab_date).format('DD/MM/YYYY')}</td>
                  <td style={{ textAlign: 'center' }}>{reg.lab_result}</td>
                  <td style={{ textAlign: 'center' }}>{reg.dx}</td>
                  {/* <td style={{ fontSize: '14px' }}>{reg.symptom}</td> */}
                  <td style={{ textAlign: 'center' }}>
                    {reg.dch_date
                      ? moment(reg.dch_date).format('DD/MM/YYYY')
                      : (
                        <Link className="btn btn-sm bg-danger" to="/" title="จำหน่าย">
                          <i className="fas fa-sign-out-alt"></i>
                        </Link>
                      )
                    }
                  </td>
                  {/* <td style={{ textAlign: 'center' }}>{reg.adm_day}</td> */}
                  {/* <td>{reg.remark}</td> */}
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
        {pager && (
          <ul className="pagination pagination-md m-0 float-right">
            <li className={`page-item ${pager.current_page === 1 && 'disabled'}`}>
              <a
                href="#"
                className="page-link"
                onClick={() => handlePaginationClick(pager.first_page_url)}
              >&laquo;</a>
            </li>
            <li className={`page-item ${!pager.prev_page_url && 'disabled'}`}>
              <a
                href="#"
                className="page-link"
                onClick={() => handlePaginationClick(pager.prev_page_url)}
              >
                <i class="fas fa-arrow-circle-left"></i>
              </a>
            </li>
            <li className={`page-item ${!pager.next_page_url && 'disabled'}`}>
              <a
                href="#"
                className="page-link"
                onClick={() => handlePaginationClick(pager.next_page_url)}
              >
                <i class="fas fa-arrow-circle-right"></i>
              </a>
            </li>
            <li className={`page-item ${pager.current_page === pager.last_page && 'disabled'}`}>
              <a
                href="#"
                className="page-link"
                onClick={() => handlePaginationClick(pager.last_page_url)}
              >&raquo;</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientList;
