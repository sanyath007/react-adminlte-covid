import React from 'react';
import { Link, Route, useRouteMatch } from "react-router-dom";
import Product from "./Product";

const productData = [
  {
    id: 1,
    name: "NIKE Liteforce Blue Sneakers",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.",
    status: "Available",
  },
  {
    id: 2,
    name: "Stylised Flip Flops and Slippers",
    description:
    "Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.",
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "ADIDAS Adispree Running Shoes",
    description:
    "Maecenas condimentum porttitor auctor. Maecenas viverra fringilla felis, eu pretium.",
    status: "Available",
  },
  {
    id: 4,
    name: "ADIDAS Mid Sneakers",
    description:
    "Ut hendrerit venenatis lacus, vel lacinia ipsum fermentum vel. Cras.",
    status: "Out of Stock",
  },
];

const Products = ({ match }) => {
  const { url } = useRouteMatch();

  /* Create an array of `<li>` items for each product */
  const linkList = productData.map((product) => {
    return (
      <li key={product.id}>
        <Link to={`${url}/${product.id}`}>{product.name}</Link>
      </li>
    );
  });

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Striped Full Width Table</h3>
            </div>
            <div class="card-body p-0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: '10px' }}>#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th style={{ width: '40px' }}>Label</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Update software</td>
                    <td>
                      <div class="progress progress-xs">
                        <div class="progress-bar progress-bar-danger" style={{ width: '55%' }}></div>
                      </div>
                    </td>
                    <td><span class="badge bg-danger">55%</span></td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Clean database</td>
                    <td>
                      <div class="progress progress-xs">
                        <div class="progress-bar bg-warning" style={{ width: '70%' }}></div>
                      </div>
                    </td>
                    <td><span class="badge bg-warning">70%</span></td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Cron job running</td>
                    <td>
                      <div class="progress progress-xs progress-striped active">
                        <div class="progress-bar bg-primary" style={{ width: '30%' }}></div>
                      </div>
                    </td>
                    <td><span class="badge bg-primary">30%</span></td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Fix and squish bugs</td>
                    <td>
                      <div class="progress progress-xs progress-striped active">
                        <div class="progress-bar bg-success" style={{ width: '90%' }}></div>
                      </div>
                    </td>
                    <td><span class="badge bg-success">90%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer clearfix">
              <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;
