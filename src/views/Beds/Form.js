import React, { useEffect, useState } from 'react'
import { Form as BsForm } from 'react-bootstrap';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api';

const bedTypes = [
  { id: 1, name: 'ธรรมดา'},
  { id: 2, name: 'แยกโรค'},
]
const FormBed = ({ bed, handleSubmit, ...rest }) => {
  const [wards, setWards] = useState([]);

  const bedSchema = Yup.object().shape({
    bed_no: Yup.string().required('กรุณาระบุเลขที่เตียงก่อน!!'),
    bed_name: Yup.string().required('กรุณาระบุชื่อเตียงก่อน!!'),
    bed_type: Yup.string().required('กรุณาระบุประเภทเตียงก่อน!!'),
    ward: Yup.string().required('กรุณาระบุวอร์ดก่อน!!'),
  });

  const fetchWards = async () => {
    let res = await api.get('/api/wards');

    setWards(res.data);
  };

  const onSubmit = (values, props) => {
    handleSubmit(values);

    props.resetForm();
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return (
    <Formik
      enableReinitialize={bed}
      initialValues={{
        bed_id: bed ? bed?.bed_id : '',
        bed_no: bed ? bed?.bed_no : '',
        bed_name: bed ? bed?.bed_name : '',
        description: bed ? (bed?.description ? bed?.description : '') : '',
        bed_type: bed ? bed?.bed_type : '',
        ward: bed ? bed?.ward : '',
        bed_status: bed ? (bed?.bed_status === '0' ? true : false) : false
      }}
      validationSchema={bedSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="card">

              <div className="card-body">

                <div className="row">

                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">เลขที่เตียง</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="bed_no"
                          value={formik.values.bed_no}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.bed_no && formik.touched.bed_no}
                          placeholder="เลขที่เตียง"
                        />
                        <ErrorMessage
                          name="bed_no"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-8">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ชื่อเตียง</span>
                        </div>
                        <BsForm.Control
                          type="text"
                          name="bed_name"
                          value={formik.values.bed_name}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.bed_name && formik.touched.bed_name}
                          placeholder="เลขที่เตียง"
                        />
                        <ErrorMessage
                          name="bed_name"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-6">
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
                          isInvalid={formik.errors.ward && formik.touched.ward}
                        >
                          <option value="">-- เลือก --</option>
                          {wards && wards.map(ward => (
                            <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                          ))}
                        </BsForm.Control>
                        <ErrorMessage
                          name="ward"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                  <div className="col-sm-6">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">ประเภทเตียง</span>
                        </div>
                        <BsForm.Control
                          as="select"
                          name="bed_type"
                          value={formik.values.bed_type}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.bed_type && formik.touched.bed_type}
                        >
                          <option value="">-- เลือก --</option>
                          {bedTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </BsForm.Control>
                        <ErrorMessage
                          name="bed_type"
                          render={msg => <span className="invalid-feedback">{msg}</span>}
                        />
                      </div>
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}
                  
                  <div className="col-sm-12">
                    <div className="form-group">
                      <BsForm.Control
                        as="textarea"
                        rows="4"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder="รายละเีอียด"
                      />
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}
                  
                  <div className="col-sm-12">
                    <div className="form-group">
                      <BsForm.Check
                        type="switch"
                        id="bed_status"
                        name="bed_status"
                        checked={formik.values.bed_status}
                        onChange={(e) => formik.setFieldValue('bed_status', e.target.checked)}
                        label={`สถานะเตียง (${formik.values.bed_status ? 'ว่าง' : 'ไม่ว่าง'})`}
                      />
                    </div>{/* /.form-group */}
                  </div>{/* /.col-sm-2 */}

                </div>
              </div>
            </div>{/* /.card */}

            {bed ? (
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

export default FormBed;
