import React, { useEffect, useState } from 'react';
import { Form as BsForm } from 'react-bootstrap';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api';

const FormWard = ({ ward, handleSubmit }) => {
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);

  const fetchBuildings = async () => {
    let res = await api.get('/api/buildings');

    setBuildings(res.data);
  };

  const onSubmit = (values, props) => {
    handleSubmit(values);
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <Formik
      initialValues={{
        ward_no: '',
        ward_name: '',
        ward_tel: '',
        ward_head_name: '',
        ward_head_tel: '',
        building: '',
        floor: 1,
        bed_max: 20,
      }}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="card">

              <div className="card-body">

                <div className="row">

                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เลขที่วอร์ด</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="ward_no"
                          value={formik.values.ward_no}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.ward_no && formik.touched.ward_no}
                          placeholder="เลขที่วอร์ด"
                        />
                        <ErrorMessage
                          name="ward_no"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}
                  
                  <div className="col-sm-6 col-md-6">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ชื่อวอร์ด</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="ward_name"
                          value={formik.values.ward_name}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.ward_name && formik.touched.ward_name}
                          placeholder="ชื่อวอร์ด"
                        />
                        <ErrorMessage
                          name="ward_name"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}
                  
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เบอร์ภายใน</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="ward_tel"
                          value={formik.values.ward_tel}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.ward_tel && formik.touched.ward_tel}
                          placeholder="เบอร์ภายใน"
                        />
                        <ErrorMessage
                          name="ward_tel"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-6 col-md-8">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">หัวหน้าวอร์ด</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="ward_head_name"
                          value={formik.values.ward_head_name}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.ward_head_name && formik.touched.ward_head_name}
                          placeholder="หัวหน้าวอร์ด"
                        />
                        <ErrorMessage
                          name="ward_head_name"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เบอร์ติดต่อ</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="ward_head_tel"
                          value={formik.values.ward_head_tel}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.ward_head_tel && formik.touched.ward_head_tel}
                          placeholder="เบอร์ติดต่อ"
                        />
                        <ErrorMessage
                          name="ward_head_tel"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}
                  
                  <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">อาคาร</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="building"
                          value={formik.values.building}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.building && formik.touched.building}
                        >
                          <option value="">-- เลือก --</option>
                          {buildings && buildings.map(building => (
                            <option key={building.id} value={building.id}>{building.building_name}</option>
                          ))}
                        </BsForm.Control>
                        <ErrorMessage
                          name="building"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ชั้น</span>
                        </div>
                        <BsForm.Control
                          type="number"
                          name="floor"
                          value={formik.values.floor}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.floor && formik.touched.floor}
                          placeholder="ชั้น"
                        />
                        <ErrorMessage
                          name="floor"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">จำนวนเตียง</span>
                        </div>
                        <BsForm.Control
                          type="number"
                          name="bed_max"
                          value={formik.values.bed_max}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.bed_max && formik.touched.bed_max}
                          placeholder="จำนวนเตียง"
                        />
                        <ErrorMessage
                          name="bed_max"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                </div>
              </div>
            </div>

            {ward ? (
              <button type="submit" className="btn btn-warning float-right">
                แก้ไข
              </button>
            ) : (
              <button type="submit" className="btn btn-primary float-right">
                บันทึก
              </button>
            )}

          </Form>
        );
      }}
    </Formik>
  );
};

export default FormWard;
