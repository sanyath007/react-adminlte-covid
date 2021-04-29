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
  const [showWard, setShowWard] = useState('');
  const [showAll, setShowAll] = useState(false);

  const fetchRegistrations = async (ward='', showall='1') => {
    let res = await api.get(`/api/patients?dchdate=${showall}&ward=${ward}`);

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
    let res = await api.get(`/api/ips/${reg.an}`);

    let { dchtype, dchdate, dchtime, hanstat } = res.data;

    if (dchdate) {
      console.log('dchdate is not null!!'); 
      setDischargeData({ id: reg.id, dchtype, dchdate, dchtime, admdate: hanstat.admdate });
    } else {
      setDischargeData({});
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    // TODO: to delete registrations data
  };

  const onDischarge = async (data) => {
    let res = await api.put(`/api/registrations/discharge/${data.id}`, data);

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
    let res = await api.put(`/api/registrations/lab-result/${data.id}`, data);
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
          {/* // TODO: move filter tool to separated component */}
          <div className="col-md-8">
            {/* // TODO: use css class to define style to wrapper div tag */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="form-group col-md-6 mb-0 pl-0">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">วอร์ด</span>
                  </div>
                  {/* // TODO: get ward data from db */}
                  <BsForm.Control
                    as="select"
                    name="ward"
                    value={showWard}
                    onChange={(e) => {
                      let checked = showAll ? 0 : 1;
                      setShowWard(e.target.value)
                      fetchRegistrations(e.target.value, checked)
                    }}
                  >
                    <option value="">-- เลือก --</option>
                    <option value="1">วอร์ดพิเศษชั้น 1</option>
                    <option value="2">วอร์ดชั้น 10</option>
                    <option value="3">วอร์ด ICU</option>
                  </BsForm.Control>
                </div>
              </div>{/* /.form-group */}

              <div className="form-group col-md-6 my-auto">
                <BsForm.Check
                  type="checkbox"
                  id="showAll"
                  label="แสดงผู้ป่วยที่ D/C แล้ว"
                  checked={showAll}
                  onChange={(e) => {
                    let checked = e.target.checked ? 0 : 1;
                    setShowAll(e.target.checked);
                    fetchRegistrations(showWard, checked);
                  }}
                />
              </div>
            </div>

          </div>{/* /.col */}

          <div className="col-md-4">
            <Link to="/patients/new" className="btn btn-md bg-primary float-right">เพิ่มผู้ป่วย</Link>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table table-bordered table-striped">
          <thead>
            <tr style={{ fontSize: '14px' }}>
              <th style={{ width: '3%', textAlign: 'center' }}>#</th>
              <th style={{ width: '10%', textAlign: 'center' }}>SAT Code</th>
              <th style={{ width: '6%', textAlign: 'center' }}>AN</th>
              <th style={{ width: '5%', textAlign: 'center' }}>HN</th>
              <th>ชื่อ-สกุล</th>
              <th style={{ width: '4%', textAlign: 'center' }}>เพศ</th>
              <th style={{ width: '4%', textAlign: 'center' }}>อายุ (ปี)</th>
              <th style={{ width: '8%', textAlign: 'center' }}>วันที่ Admit</th>
              {/* <th style={{ width: '8%', textAlign: 'center' }}>วันที่ส่ง Lab</th> */}
              {/* <th style={{ width: '6%', textAlign: 'center' }}>ผล Lab</th> */}
              <th style={{ width: '12%', textAlign: 'center' }}>วอร์ด</th>
              <th style={{ width: '3%', textAlign: 'center' }}>Lab</th>
              {/* <th style={{ width: '6%', textAlign: 'center' }}>Dx</th> */}
              {/* <th>อาการโดยรวม</th> */}
              <th style={{ width: '8%', textAlign: 'center' }}>สถานะ</th>
              <th style={{ width: '8%', textAlign: 'center' }}>D/C</th>
              {/* <th style={{ width: '6%', textAlign: 'center' }}>จน.วันนอน</th> */}
              {/* <th>หมายเหตุ</th> */}
              <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations && registrations.map((reg, index) => {
              return (
                <tr key={reg.hn}>
                  <td style={{ textAlign: 'center' }}>{(pager?.from + index).toString()}</td>
                  <td style={{ textAlign: 'center' }}>{reg.code}</td>
                  <td style={{ textAlign: 'center' }}>{reg.an}</td>
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
                    {/* <Link className="btn btn-sm bg-info" to="/">
                      <i className="fas fa-search"></i>
                    </Link> */}
                    {!reg.dch_date && (
                      <>
                        <Link className="btn btn-sm bg-warning" to={`/patients/edit/${reg.id}`}>
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Link className="btn btn-sm bg-danger mx-1" to="/">
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
        <div className="row">
          <div className="col-md-6 my-auto">
            {pager && (
              <span>หน้า {pager.current_page} / {pager.last_page} - จำนวนทั้งหมด {pager.total} รายการ</span>
            )}
          </div>
          <div className="col-md-6">
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
      </div>
    </div>
  );
};

export default PatientList;
