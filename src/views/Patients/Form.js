import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Form as BsForm } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import PatientModal from './PatientModal';
import { calcAge } from '../../utils';
import api from '../../api';

const regFroms = [
  { id: 1, name: 'ER' },
  { id: 2, name: 'OPD' },
  { id: 3, name: 'รพ.มหาราช' },
  { id: 4, name: 'สสจ.นม.' },
  { id: 5, name: 'คร.Swap' },
  { id: 6, name: 'ARI คลินิก' },
  { id: 7, name: 'PUI คลินิก' },
  { id: 9, name: 'อื่นๆ' },
];

const regStates = [
  { id: 0, name: 'รอผล' },
  { id: 1, name: 'Covid Pos' },
  { id: 2, name: 'Covid Neg' },
  { id: 3, name: 'PUI' },
  { id: 4, name: 'สงสัย' },
];

const FormPatient = ({ patient, handleSubmit }) => {
  const patientSchema = Yup.object().shape({
    hn: Yup.string().required('กรุณาระบุ HN ผู้ป่วยก่อน !!!'),
    name: Yup.string().required('กรุณาระบุชื่อ-สกุลผู้ป่วยก่อน !!!'),
    cid: Yup.string().required('กรุณาระบุเลขบัตรประชาชนผู้ป่วยก่อน !!!'),
    sex: Yup.string().required('กรุณาระบุเพศผู้ป่วยก่อน !!!'),
    birthdate: Yup.string().required('กรุณาระบุวันที่เกิดผู้ป่วยก่อน !!!'),
    age_y: Yup.string().required('กรุณาระบุอายุผู้ป่วยก่อน !!!'),
    tel: Yup.string().required('กรุณาระบุเบอร์โทรศัพท์ผู้ป่วยก่อน !!!'),

    an: Yup.string().required('กรุณาระบุ AN !!!'),
    reg_date: Yup.string().required('กรุณาระบุวันที่ Admit !!!'),
    bed: Yup.string().required('กรุณาระบุเตียงก่อน !!!'),
    // lab_result: Yup.string().required('กรุณาระบุผล Lab ก่อน !!!'),
    dx: Yup.string().required('กรุณาระบุผลการวินิจฉัย (Diag) ก่อน !!!'),
    symptom: Yup.string().required('กรุณาระบุอาการก่อน !!!'),
  });

  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const onHideModal = () => {
    setOpenModal(false);
  };

  const mapHWardToWard = (ward) => {
    switch (ward) {
      case '00':
        return '2';    
      case '05':
        return '3'    
      case '06':
        return '1'
      default:
        break;
    }
  };

  const handleModalSelectedData = (ip, setFieldValue) => {
    /** Patient info */
    setFieldValue('hn', ip.hn);
    setFieldValue('cid', ip.hpatient?.cid);
    setFieldValue('name', `${ip.hpatient?.pname}${ip.hpatient?.fname} ${ip.hpatient?.lname}`);
    setFieldValue('birthdate', ip.hpatient?.birthday);
    setFieldValue('age_y', calcAge(ip.hpatient?.birthday));
    setFieldValue('sex', ip.hpatient?.sex);
    setFieldValue('tel', ip.hpatient?.hometel);
    /** Admit info */
    setFieldValue('an', ip.an);
    setFieldValue('reg_date', ip.regdate);
    /** Set ward data and fetch bed by ward */
    let ward = mapHWardToWard(ip.ward);
    setFieldValue('ward', ward);
    fetchBedsByWard(ward);
  };

  const fetchWards = async () => {
    let res = await api.get('/wards');

    setWards(res.data);
  };

  const fetchBedsByWard = async (ward) => {
    let res = await api.get(`/beds/ward/${ward}/1`);

    setBeds(res.data);
  };

  const onSubmit = (values, props) => {
    handleSubmit(values);
  };

  useEffect(() => {
    fetchWards();
  }, [patient]);

  return (
    <Formik
      initialValues={{
        id: patient ? patient.id : '',
        code: patient ? patient.code : '',
        hn: patient ? patient.hn : '',
        cid: patient ? patient.cid : '',
        name: patient ? patient.name : '',
        sex: patient ? patient.sex : '',
        age_y: patient ? patient.age_y : '',
        birthdate: patient ? patient.birthdate : moment().format('YYYY-MM-DD'),
        tel: patient ? patient.tel : '',
        an: patient ? patient.an : '',
        reg_date: patient ? patient.reg_date : moment().format('YYYY-MM-DD'),
        ward: patient ? patient.ward : '',
        bed: patient ? patient.bed : '',
        // lab_date: patient ? patient.lab_date : moment().format('YYYY-MM-DD'),
        // lab_result: patient ? patient.lab_result : '',
        dx: patient ? patient.dx : '',
        symptom: patient ? patient.symptom : '',
        dch_date: patient ? patient.dch_date : '',
        adm_day: patient ? patient.adm_day : '',
        reg_from: patient ? patient.reg_from : '',
        reg_state: patient ? patient.reg_state : '',
        remark: patient ? patient.remark : ''
      }}
      validationSchema={patientSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>

            <PatientModal
              isOpen={openModal}
              hideModal={onHideModal}
              onSelected={(ip) => handleModalSelectedData(ip, formik.setFieldValue)}
            />

            <div className="card">

              <div className="card-body">

                <div className="row">
                  <div className="col-sm-2">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">HN</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="hn"
                          value={formik.values.hn}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="HN"
                          isInvalid={formik.errors.hn && formik.touched.hn}
                        />                        
                        <div className="input-group-append">
                          <a
                            href="#"
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenModal(true)
                            }}
                          >
                            <i className="fas fa-search"></i>
                          </a>
                        </div>
                        <ErrorMessage
                          name="hn"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>{/* /.input-group */}
                    </div>
                  </div>
                  
                  <div className="col-sm-7">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ชื่อ-สกุล</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="ชื่อ-สกุล"
                          isInvalid={formik.errors.name && formik.touched.name}
                        />
                        <ErrorMessage
                          name="name"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">CID</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="cid"
                          value={formik.values.cid}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="CID"
                          isInvalid={formik.errors.cid && formik.touched.cid}
                        />
                        <ErrorMessage
                          name="cid"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-sm-2">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เพศ</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="sex"
                          value={formik.values.sex}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.sex && formik.touched.sex}
                        >
                          <option value="">-- เลือก --</option>
                          <option value="1">ชาย</option>
                          <option value="2">หญิง</option>
                        </BsForm.Control>
                        <ErrorMessage
                          name="sex"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">วันเกิด</span>
                        </div>
                        <BsForm.Control
                          type="date"
                          name="birthdate"
                          value={formik.values.birthdate}
                          onChange={(e) => formik.setFieldValue('birthdate', e.target.value)}
                          placeholder="วันเกิด"
                          isInvalid={formik.errors.birthdate && formik.touched.birthdate}
                        />
                        <ErrorMessage
                          name="birthdate"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">อายุ</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="age_y"
                          value={formik.values.age_y}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="อายุ"
                          isInvalid={formik.errors.age_y && formik.touched.age_y}
                        />
                        <ErrorMessage
                          name="age_y"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เบอร์ติดต่อ</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="tel"
                          value={formik.values.tel}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="เบอร์ติดต่อ"
                          isInvalid={formik.errors.tel && formik.touched.tel}
                        />
                        <ErrorMessage
                          name="tel"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>
                </div>{/* /.row */}

              </div>{/* /.card-body */}
            </div>{/* /.card */}

            <div className="card">
              <div className="card-body">

                <div className="row">
                  <div className="col-sm-2">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">AN</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="an"
                          value={formik.values.an}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="AN"
                          isInvalid={formik.errors.an && formik.touched.an}
                        />
                        <ErrorMessage
                          name="an"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">วัน Admit</span>
                        </div>
                        <BsForm.Control
                          type="date"
                          name="reg_date"
                          value={formik.values.reg_date}
                          onChange={(e) => formik.setFieldValue('reg_date', e.target.value)}
                          placeholder="วัน Admit"
                          isInvalid={formik.errors.reg_date && formik.touched.reg_date}
                        />
                        <ErrorMessage
                          name="reg_date"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">วอร์ด</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="ward"
                          value={formik.values.ward}
                          onChange={formik.handleChange}
                          onChange={(e) => fetchBedsByWard(e.target.value)}
                          isInvalid={formik.errors.ward && formik.touched.ward}
                        >
                          <option value="">-- เลือก --</option>
                          {wards && wards.map(ward => {
                            return <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                          })}
                        </BsForm.Control>
                        <ErrorMessage
                          name="ward"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เตียง</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="bed"
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.bed && formik.touched.bed}
                        >
                          <option value="">-- เลือก --</option>
                          {beds && beds.map(bed => {
                            return <option key={bed.bed_id} value={bed.bed_id}>{bed.bed_name}</option>
                          })}
                        </BsForm.Control>
                        <ErrorMessage
                          name="bed"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">วันส่ง Lab</span>
                        </div>
                        <BsForm.Control
                          type="date"
                          name="lab_date"
                          value={formik.values.lab_date}
                          onChange={(e) => formik.setFieldValue('lab_date', e.target.value)}
                          placeholder="วันส่ง Lab"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-8">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ผล Lab</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="lab_result"
                          value={formik.values.lab_result}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="ผล Lab"
                          isInvalid={formik.errors.lab_result && formik.touched.lab_result}
                        />                        
                        <ErrorMessage
                          name="lab_result"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div> */}
                  
                  <div className="col-sm-8">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Diag</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="dx"
                          value={formik.values.dx}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="Diag"
                          isInvalid={formik.errors.dx && formik.touched.dx}
                        />
                        <ErrorMessage
                          name="dx"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Code</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="code"
                          value={formik.values.code}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="Code"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-sm-6">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">รับจาก</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="reg_from"
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.reg_from && formik.touched.reg_from}
                        >
                          <option value="">-- เลือก --</option>
                          {regFroms && regFroms.map(from => {
                            return <option key={from.id} value={from.id}>{from.name}</option>
                          })}
                        </BsForm.Control>
                        <ErrorMessage
                          name="reg_from"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">สถานะ</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="reg_state"
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.reg_state && formik.touched.reg_state}
                        >
                          <option value="">-- เลือก --</option>
                          {regStates && regStates.map(state => {
                            return <option key={state.id} value={state.id}>{state.name}</option>
                          })}
                        </BsForm.Control>
                        <ErrorMessage
                          name="reg_state"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>อาการ</label>
                      <BsForm.Control
                        as="textarea"
                        rows="4"
                        name="symptom"
                        value={formik.values.symptom}
                        onChange={formik.handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="อาการ"
                        isInvalid={formik.errors.symptom && formik.touched.symptom}
                      />
                      <ErrorMessage
                        name="symptom"
                        render={msg => <span className="invalid-feedback">{msg}</span>}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>หมายเหตุ</label>
                      <BsForm.Control
                        as="textarea"
                        rows="4"
                        name="remark"
                        value={formik.values.remark}
                        onChange={formik.handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="หมายเหตุ"
                      />
                    </div>
                  </div>
                </div>{/* /.row */}

              </div>{/* /.card-body */}
            </div>{/* /.card */}

            {patient ? (
              <button type="submit" className="btn btn-warning float-right">
                แก้ไข
              </button>
            ) : (
              <button type="submit" className="btn btn-primary float-right">
                บันทึก
              </button>
            )}

          </Form>
        )
      }}
    </Formik>
  );
};

export default FormPatient;