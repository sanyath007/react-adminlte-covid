import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Modal,
  Form as BsForm,
} from 'react-bootstrap';
import { Form, Formik, ErrorMessage } from 'formik';
import moment from 'moment';

function LabResultModal({ isOpen, hideModal, onSubmit, data }) {
  const handleSubmit = (values, props) => {
    onSubmit(values);
  };

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="lg"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>ผล Lab</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Formik
              enableReinitialize={data}
              initialValues={{
                id: data?.id || '',
                lab_date: moment().format('YYYY-MM-DD'),
                lab_result: ''
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
                            <span className="input-group-text">วันที่ส่ง Lab</span>
                          </div>
                          <BsForm.Control
                            type="date"
                            name="lab_date"
                            value={formik.values.lab_date}
                            onChange={(e) => formik.setFieldValue('lab_date', e.target.value)}
                            isInvalid={formik.errors.lab_date && formik.touched.lab_date}
                            placeholder="วันที่ส่ง Lab"
                          />
                          <ErrorMessage
                            name="lab_date"
                            render={msg => <span className="invalid-feedback">{msg}</span>}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">ผลตรวจ</span>
                          </div>
                          <BsForm.Control
                            as="select"
                            name="lab_result"
                            value={formik.values.lab_result}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.lab_result && formik.touched.lab_result}
                          >
                            <option value="">-- เลือก --</option>
                            <option value="0">Negative</option>
                            <option value="1">Positive</option>
                          </BsForm.Control>
                          <ErrorMessage
                            name="lab_result"
                            render={msg => <span className="invalid-feedback">{msg}</span>}
                          />
                        </div>
                      </div>
                    </Row>

                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                      onClick={hideModal}
                    >
                      บันทึก
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

LabResultModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  data: PropTypes.object
};

export default LabResultModal;
