import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form as BsForm,
  Button,
  Col,
  Row,
  Modal,
  Pagination
} from 'react-bootstrap';
import moment from 'moment';
import api from '../../api';
import { calcAge } from '../../utils';

function PatientModal({ isOpen, hideModal, onSelected }) {
  const [ips, setIps] = useState([]);
  const [pager, setPager] = useState(null);

  const fetchIpAll = async (dchdate='?dchdate=1', ward='') => {
    let res = await api.get(`/ips${dchdate}${ward}`);

    setIps(res.data.items);
    setPager(res.data.pager);
  };

  const fetchIpAllWithPage = async (url) => {
    let res = await api.get(url);

    setIps(res.data.items);
    setPager(res.data.pager);
  };

  const handlePaginationClick = (url) => {
    fetchIpAllWithPage(url);
  };

  useEffect(() => {
    fetchIpAll();
  }, []);

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="xl"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>กรุณาเลือกผู้ป่วย</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <div className="form-group col-md-6 pl-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">กรองข้อมูล</span>
                </div>
                <BsForm.Control
                  as="select"
                  name="dch_type"
                  onChange={(e) => {
                    let ward = e.target.value === '' ? '' : `&ward=${e.target.value}`;

                    fetchIpAll('?dchdate=1', ward);
                  }}
                >
                  <option value="">แสดงทั้งหมด</option>
                  <option value="06">วอร์ดชั้น 1</option>
                  <option value="00">วอร์ดชั้น 10</option>
                  <option value="05">วอร์ดชั้น ICU</option>
                </BsForm.Control>
              </div>
            </div>{/* /.form-group */}
          </Col>
        </Row>

        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th style={{ width: '3%', textAlign: 'center' }}>#</th>
              <th style={{ width: '10%', textAlign: 'center' }}>AN</th>
              <th style={{ width: '8%', textAlign: 'center' }}>HN</th>
              <th>ชื่อ-สกุล</th>
              <th style={{ width: '8%', textAlign: 'center' }}>อายุ (ปี)</th>
              <th style={{ width: '12%', textAlign: 'center' }}>วันที่ Admit</th>
              <th style={{ width: '20%' }}>วอร์ด</th>
              <th style={{ width: '6%' }}>Diag</th>
              <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ips && ips.map((ip, index) => (
              <tr key={ip.an}>
                <td style={{ textAlign: 'center' }}>{pager?.from + index}</td>
                <td style={{ textAlign: 'center' }}>{ip.an}</td>
                <td style={{ textAlign: 'center' }}>{ip.hn}</td>
                <td>{`${ip.hpatient?.pname}${ip.hpatient?.fname} ${ip.hpatient?.lname}`}</td>
                <td style={{ textAlign: 'center' }}>
                  {calcAge(ip.hpatient?.birthday)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {moment(ip.regdate).format('DD/MM/YYYY')}
                </td>
                <td>{ip.hward?.name}</td>
                <td style={{ textAlign: 'center' }}>
                  {ip.hanstat?.pdx}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    size="sm"
                    onClick={() => {
                      onSelected(ip);
                      hideModal();
                    }}
                  >
                    เลือก
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Row>
          <Col className="my-auto">
            <span>หน้า {pager?.current_page} / {pager?.last_page} - จำนวนทั้งหมด {pager?.total} ราย</span>
          </Col>
          <Col>
            <Pagination className="float-right mb-0">
              <Pagination.First
                onClick={() => handlePaginationClick(pager?.first_page_url)}
                disabled={pager?.current_page === 1}
              />
              <Pagination.Prev
                onClick={() => handlePaginationClick(pager?.prev_page_url)}
                disabled={pager?.current_page === 1}
              />
              <Pagination.Next
                onClick={() => handlePaginationClick(pager?.next_page_url)}
                disabled={pager?.current_page === pager?.last_page}
              />
              <Pagination.Last
                onClick={() => handlePaginationClick(pager?.last_page_url)}
                disabled={pager?.current_page === pager?.last_page}
              />
            </Pagination>
          </Col>
        </Row>

      </Modal.Body>
    </Modal>
  );
}

PatientModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSelected: PropTypes.func,
};

export default PatientModal;
