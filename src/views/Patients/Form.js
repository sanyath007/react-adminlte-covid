import React, { useEffect, useState } from "react";
import { Form as BSForm } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import PatientModal from './PatientModal';

const FormPatient = ({ patient, handleSubmit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [ip, setIp] = useState(null);

  const patientSchema = Yup.object().shape({});

  const handleAnOnFocus = (e) => {
    e.preventDefault();

    setOpenModal(true);
  };

  const handleOnHideModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (values, props) => {
    handleSubmit(values);
  };

  {/* // TODO: function handle when search patient btn have been clicked and show modal popup */}

  return (
    <Formik
      initialValues={{
        id: patient ? patient.id : '',
        code: patient ? patient.code : '',
        hn: patient ? patient.hn : '',
        an: patient ? patient.an : '',
        cid: patient ? patient.cid : '',
        name: patient ? patient.name : '',
        sex: patient ? patient.sex : '',
        age_y: patient ? patient.age_y : 0,
        birthdate: patient ? patient.birthdate : moment().format('YYYY-MM-DD'),
        tel: patient ? patient.tel : '',
        reg_date: patient ? patient.reg_date : moment().format('YYYY-MM-DD'),
        lab_date: patient ? patient.lab_date : moment().format('YYYY-MM-DD'),
        lab_result: patient ? patient.lab_result : '',
        dx: patient ? patient.dx : '',
        symptom: patient ? patient.symptom : '',
        dch_date: patient ? patient.dch_date : '',
        adm_day: patient ? patient.adm_day : '',
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
              hideModal={handleOnHideModal}
              onSelected={(an) => formik.setFieldValue('an', an)}
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
                        <input
                          type="text"
                          name="hn"
                          value={formik.values.hn}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="HN"
                        />
                        <div className="input-group-append">
                          {/* // TODO: handle on search patient btn have been clicked */}
                          <a
                            href="#"
                            className="btn btn-primary"
                            onClick={() => setOpenModal(true)}
                          >
                            <i className="fas fa-search"></i>
                          </a>
                        </div>
                      </div>{/* /.input-group */}
                    </div>
                  </div>
                  
                  <div className="col-sm-7">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ชื่อ-สกุล</span>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="ชื่อ-สกุล"
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
                        <input
                          type="text"
                          name="cid"
                          value={formik.values.cid}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="CID"
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
                        <select name="ward" className="form-control select2">
                          <option value="">-- เลือก --</option>
                          <option value="1">ชาย</option>
                          <option value="2">หญิง</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">วันเกิด</span>
                        </div>
                        <BSForm.Control
                          type="date"
                          name="birthdate"
                          value={formik.values.birthdate}
                          onChange={(e) => formik.setFieldValue('birthdate', e.target.value)}
                          placeholder="วันเกิด"
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
                        <input
                          type="text"
                          name="age_y"
                          value={formik.values.age_y}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="อายุ"
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
                        <input
                          type="text"
                          name="tel"
                          value={formik.values.tel}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="เบอร์ติดต่อ"
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
                        <input
                          type="text"
                          name="an"
                          value={formik.values.an}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="AN"
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
                        <BSForm.Control
                          type="date"
                          name="reg_date"
                          value={formik.values.reg_date}
                          onChange={(e) => formik.setFieldValue('reg_date', e.target.value)}
                          placeholder="วันเกิด"
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
                        <select name="ward" className="form-control">
                          <option value="">-- เลือก --</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เตียง</span>
                        </div>
                        <select name="ward" className="form-control">
                          <option value="">-- เลือก --</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">วันส่ง Lab</span>
                        </div>
                        <BSForm.Control
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
                        <input
                          type="text"
                          name="lab_result"
                          value={formik.values.lab_result}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="ผล Lab"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-sm-8">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Diag</span>
                        </div>
                        <input
                          type="text"
                          name="dx"
                          value={formik.values.dx}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="Diag"
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
                        <input
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
                      <label>อาการ</label>
                      <textarea
                        name="symptom"
                        value={formik.values.symptom}
                        onChange={formik.handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="อาการ"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>หมายเหตุ</label>
                      <textarea
                        name="remark"
                        value={formik.values.remark}
                        onChange={formik.handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="หมายเหตุ"
                      ></textarea>
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