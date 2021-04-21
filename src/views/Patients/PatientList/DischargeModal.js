import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Modal,
  Form as BsForm,
} from 'react-bootstrap';
import { Form, Formik, ErrorMessage } from 'formik';
import api from '../../../api';

function DischargeModal({ isOpen, hideModal, onSubmit, data }) {
  const [ip, setIp] = useState(null);

  const handleSubmit = (values, props) => {
    const { id } = data;
    const { dch_type, dch_date, dch_time, adm_date } = values;

    onSubmit({ id, dch_type, dch_date, dch_time, adm_date });
  };

  const fetchIpByAn = async (an) => {
    let res = await api.get(`/ips/${an}`);
    console.log(res);

    setIp(res.data);
  };

  useEffect(() => {
    fetchIpByAn(data?.an);
  }, [data]);

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="lg"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>จำหน่ายผู้ป่วย</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Formik
              initialValues={{
                dch_type: ip?.dchtype || '',
                dch_date: ip?.dchdate || '',
                dch_time: ip?.dchtime || '',
                adm_date: ip?.hanstat?.admdate || '',
              }}
              onSubmit={handleSubmit}
            >
              {formik => {
                return (
                  <Form>
                    <Row>
                      <div className="form-group col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">วันที่จำหน่าย</span>
                          </div>
                          <BsForm.Control
                            type="text"
                            className="form-control"
                            name="dch_date"
                            value={formik.values.dch_date}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.dch_date && formik.touched.dch_date}
                          />
                          <ErrorMessage
                            name="dch_date"
                            render={msg => <span className="invalid-feedback">{msg}</span>}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">เวลาจำหน่าย</span>
                          </div>
                          <BsForm.Control
                            type="text"
                            className="form-control"
                            name="dch_time"
                            value={formik.values.dch_time}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.dch_time && formik.touched.dch_time}
                          />
                          <ErrorMessage
                            name="dch_time"
                            render={msg => <span className="invalid-feedback">{msg}</span>}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">สถานะการจำหน่าย</span>
                          </div>
                          <BsForm.Control
                            as="select"
                            name="dch_type"
                            value={formik.values.dch_type}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.dch_type && formik.touched.dch_type}
                          >
                            <option value="">-- เลือก --</option>
                            <option value="1">หาย</option>
                            <option value="2">หนี</option>
                            <option value="3">ส่งต่อ</option>
                            <option value="4">เสียชีวิต</option>
                            <option value="9">อื่นๆ</option>
                          </BsForm.Control>
                          <ErrorMessage
                            name="dch_type"
                            render={msg => <span className="invalid-feedback">{msg}</span>}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">จำนวนวันนอน (วัน)</span>
                          </div>
                          <BsForm.Control
                            type="text"
                            className="form-control"
                            name="adm_date"
                            value={formik.values.adm_date}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.adm_date && formik.touched.adm_date}
                          />
                          <ErrorMessage
                            name="adm_date"
                            render={msg => <span className="invalid-feedback">{msg}</span>}
                          />
                        </div>
                      </div>
                    </Row>

                    <button type="submit" className="btn btn-danger float-right" onClick={hideModal}>
                      จำหน่าย
                    </button>

                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

DischargeModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSelected: PropTypes.func,
};

export default DischargeModal;
