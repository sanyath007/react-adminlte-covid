import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormPatient = ({ patient, handleSubmit }) => {
  const patientSchema = Yup.object().shape({});

  const onSubmit = (values, props) => {
    handleSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        id: patient ? patient.id : '',
        code: patient ? patient.code : '',
        hn: patient ? patient.hn : '',
        name: patient ? patient.name : '',
        sex: patient ? patient.sex : '',
        age_y: patient ? patient.age_y : 0,
        tel: patient ? patient.tel : '',
        reg_date: patient ? patient.reg_date : '',
        lab_date: patient ? patient.lab_date : '',
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

            <div className="row">

              <div className="col-sm-3">
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

              <div className="col-sm-3">
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">HN</span>
                    </div>
                    <input
                      type="text"
                      name="code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      className="form-control"
                      placeholder="HN"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">ชื่อ-สกุล</span>
                    </div>
                    <input
                      type="text"
                      name="code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      className="form-control"
                      placeholder="ชื่อ-สกุล"
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
                    <select name="ward" className="form-control">
                      <option value="">-- เลือก --</option>
                      <option value="1">ชาย</option>
                      <option value="2">หญิง</option>
                    </select>
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
                      <span className="input-group-text">วันที่ Admit</span>
                    </div>
                    <input type="text" className="form-control" placeholder="วันที่ Admit" />
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

              <div className="col-sm-3">
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">วันที่ส่ง Lab</span>
                    </div>
                    <input type="text" className="form-control" placeholder="วันที่ส่ง Lab" />
                  </div>
                </div>
              </div>

              <div className="col-sm-3">
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
              
              <div className="col-sm-9">
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

              <div className="col-sm-3">
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">วันที่ D/C</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" />
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

            </div>

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