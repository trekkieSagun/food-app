import React, { Component } from "react";

class FoodCalculator extends Component {
  render() {
    return (
      <div>
        <h1>Bill Calculator</h1>
        <div className="menu-lists">
          <table>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price</th>
              </tr>
            </thead>
            {this.props.menuList.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-action"
                        onClick={() => this.props.handleIncrement(index)}
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-danger btn-action"
                        onClick={() => this.props.handleDecrement(index)}
                        disabled={item.quantity === 0}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
            <br />{" "}
            <tfoot>
              <tr>
                <td>
                  {" "}
                  <button
                    className="btn btn-primary btn-calculate"
                    onClick={this.props.handleCalculate}
                  >
                    Calculate
                  </button>
                </td>
                <td>Total</td>
                <td>
                  <h4>Rs. {this.props.total} /-</h4>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default FoodCalculator;
