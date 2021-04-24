import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Form as BsForm } from 'react-bootstrap';
import moment from 'moment';
import api from '../../../api';
import DischargeModal from '../../Modals/DischargeModal';
import LabResultModal from '../../Modals/LabResultModal';

const regStates = ['รอผล','Covid Pos','Covid Neg','PUI','สงสัย'];

const PatientList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [pager, setPager] = useState(null);
  const [openDchModal, setOpenDchModal] = useState(false);
  const [dischargeData, setDischargeData] = useState({});
  const [openLabResultModal, setOpenLabResultModal] = useState(false);
  const [labData, setLabData] = useState({});

  const fetchRegistrations = async (qs='') => {
    let url = qs === '' ? `/patients` : `/patients?dchdate=${qs}`;
    let res = await api.get(url);
    console.log(res);

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

  const fetchIpByAn = async (reg) => {
    let res = await api.get(`/ips/${reg.an}`);

    let { dchtype, dchdate, dchtime, hanstat } = res.data;

    if (dchdate) {
      console.log('dchdate is not null!!'); 
      setDischargeData({ id: reg.id, dchtype, dchdate, dchtime, admdate: hanstat.admdate });
    } else {
      setDischargeData({});
    }
  };

  const onDischarge = async (data) => {
    let res = await api.put(`/registrations/discharge/${data.id}`, data);

    updateRegistrations(data.id, res.data.data);
  };

  const updateRegistrations = (id, res) => {
    let updated = registrations.map((reg) => {
      if (reg.id === id) {
        return res;
      }

      return reg;
    });

    setRegistrations(updated);
  };

  const onLabResultSubmit = async (data) => {
    let res = await api.put(`/registrations/lab-result/${data.id}`, data);
    console.log(res);

    updateRegistrations(data.id, res.data.data);
  };

  const renderLabResult = (id) => {
    return (
      <a
        href="#" 
        onClick={() => {
          setOpenLabResultModal(true);
          setLabData({ id });
        }}
      >
        <i className="fas fa-history"></i>
      </a>
    );
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="card">
      
      <DischargeModal
        data={dischargeData}
        isOpen={openDchModal}
        hideModal={() => setOpenDchModal(false)}
        onSubmit={onDischarge}
      />
      
      <LabResultModal
        isOpen={openLabResultModal}
        hideModal={() => setOpenLabResultModal(false)}
        onSubmit={onLabResultSubmit}
        data={labData}
      />

      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group col-md-8">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">กรองข้อมูล</span>
                </div>
                <BsForm.Control
                  as="select"
                  name="dch_type"
                  onChange={(e) => fetchRegistrations(e.target.value)}
                >
                  <option value="">แสดงทั้งหมด</option>
                  <option value="1">แสดงเฉพาะที่ยังรักษาอยู่</option>
                </BsForm.Control>
              </div>
            </div>
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
              {/* <th style={{ width: '8%', textAlign: 'center' }}>วันที่ส่ง Lab</th> */}
              {/* <th style={{ width: '6%', textAlign: 'center' }}>ผล Lab</th> */}
              <th style={{ width: '15%', textAlign: 'center' }}>วอร์ด</th>
              <th style={{ width: '6%', textAlign: 'center' }}>Lab</th>
              {/* <th style={{ width: '6%', textAlign: 'center' }}>Dx</th> */}
              {/* <th>อาการโดยรวม</th> */}
              <th style={{ width: '8%', textAlign: 'center' }}>สถานะ</th>
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
                  <td style={{ textAlign: 'center' }}>{(pager?.from + index).toString()}</td>
                  <td style={{ textAlign: 'center' }}>{reg.code}</td>
                  <td style={{ textAlign: 'center' }}>{reg.hn}</td>
                  <td style={{ fontSize: '14px' }}>{reg.patient?.name}</td>
                  <td style={{ textAlign: 'center' }}>{reg.patient?.sex ? 'ชาย' : 'หญิง'}</td>
                  <td style={{ textAlign: 'center' }}>{reg.patient?.age_y}</td>
                  <td style={{ textAlign: 'center' }}>{moment(reg.reg_date).format('DD/MM/YYYY')}</td>
                  {/* <td style={{ textAlign: 'center' }}>{moment(reg.lab_date).format('DD/MM/YYYY')}</td> */}
                  {/* <td style={{ textAlign: 'center' }}>{reg.lab_result}</td> */}
                  <td style={{ textAlign: 'center' }}>{reg.bed?.bed_name}</td>
                  <td style={{ textAlign: 'center' }}>
                    {!reg.lab_result 
                      ? renderLabResult(reg.id)
                      : reg.lab_result === '1'
                        ? <i className="fas fa-procedures text-danger"></i>
                        : <i className="fas fa-bed text-success"></i>
                    }
                  </td>
                  {/* <td style={{ fontSize: '14px' }}>{reg.symptom}</td> */}
                  <td style={{ textAlign: 'center' }}>{regStates[reg.reg_state]}</td>
                  <td style={{ textAlign: 'center' }}>
                    {reg.dch_date
                      ? moment(reg.dch_date).format('DD/MM/YYYY')
                      : (
                        <a
                          href="#"
                          className="btn btn-sm bg-danger"
                          onClick={() => {
                            fetchIpByAn(reg);
                            setOpenDchModal(true);
                          }}
                          title="จำหน่าย"
                        >
                          <i className="fas fa-sign-out-alt"></i>
                        </a>
                      )
                    }
                  </td>
                  {/* <td style={{ textAlign: 'center' }}>{reg.adm_day}</td> */}
                  {/* <td>{reg.remark}</td> */}
                  <td style={{ textAlign: 'center' }}>
                    <Link className="btn btn-sm bg-info" to="/">
                      <i className="fas fa-search"></i>
                    </Link>
                    {!reg.dch_date && (
                      <>
                        <Link className="btn btn-sm bg-warning" to={`/patients/edit/${reg.id}`}>
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Link className="btn btn-sm bg-danger" to="/">
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </>
                    )}
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
                <i className="fas fa-arrow-circle-left"></i>
              </a>
            </li>
            <li className={`page-item ${!pager.next_page_url && 'disabled'}`}>
              <a
                href="#"
                className="page-link"
                onClick={() => handlePaginationClick(pager.next_page_url)}
              >
                <i className="fas fa-arrow-circle-right"></i>
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
