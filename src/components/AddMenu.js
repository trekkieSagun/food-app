import React, { Component } from "react";

class AddMenu extends Component {
  render() {
    return (
      <div>
        <h1>Add Item</h1>
        <div className="add-menu">
          <form className="form-group" onSubmit={this.props.handleSubmit}>
            <input
              type="text"
              name="foodname"
              placeholder="Food name"
              onChange={this.props.handleChange}
              required
              className="form-control"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={this.props.handleChange}
              className="form-control"
              required
            />
            <input type="file" onChange={this.props.handleImage} />

            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default AddMenu;
