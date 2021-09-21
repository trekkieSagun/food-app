import React, { Component } from "react";
import AddMenu from "./AddMenu";
import FoodCalculator from "./FoodCalculator";

class MenuList extends Component {
  constructor() {
    super();
    this.state = {
      menuList: [
        {
          name: "Buger",
          price: 300,
          image: "./images/burger.jpg",
          quantity: 0,
        },
        { name: "MoMo", price: 200, image: "./images/momo.jpg", quantity: 0 },
        {
          name: "Sandwich",
          price: 200,
          image: "./images/sandwich.jfif",
          quantity: 0,
        },
      ],
      addClicked: false,
      foodname: null,
      price: null,
      image: null,
      toggleEdit: false,
      editingIndex: null,

      editingMenu: {
        foodname: null,
        price: null,
        image: null,
      },

      calculator: false,
      total: null,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newMenuList = [...this.state.menuList];
    newMenuList.push({
      name: this.state.foodname,
      price: this.state.price,
      image: this.state.image,
      quantity: 0,
    });

    this.setState({ menuList: newMenuList, addClicked: false });
  };

  handleAdd = () => {
    this.setState({
      addClicked: true,
    });
  };

  handleImage = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleDelete = (menuIndex) => {
    const confirmed = window.confirm("Do you want to delete this?");

    if (confirmed) {
      const newMenu = this.state.menuList.filter(
        (item, index) => index !== menuIndex
      );
      this.setState({ menuList: newMenu });
    }
  };

  handleEdit = (menuIndex) => {
    this.setState({
      toggleEdit: true,
      editingIndex: menuIndex,
      editingMenu: {
        foodname: this.state.menuList[menuIndex].name,
        price: this.state.menuList[menuIndex].price,
        image: this.state.menuList[menuIndex].image,
      },
    });
  };

  handleEditingData = (e) => {
    const { name, value } = e.target;
    const editingMenu = { ...this.state.editingMenu };
    editingMenu[name] = value;
    this.setState({ editingMenu });
  };

  handleImageEdit = (e) => {
    const editingMenu = {
      ...this.state.editingMenu,
      image: URL.createObjectURL(e.target.files[0]),
    };

    this.setState({ editingMenu });
  };

  submitEditting = (e, menuIndex) => {
    e.preventDefault();
    const newMenuList = [...this.state.menuList];
    newMenuList[menuIndex] = {
      name: this.state.editingMenu.foodname,
      price: this.state.editingMenu.price,
      image: this.state.editingMenu.image,
    };
    this.setState({
      menuList: newMenuList,
      toggleEdit: false,
      editingMenu: {
        foodname: null,
        price: null,
        image: null,
      },
    });
  };

  handleCalculator = () => {
    this.setState({
      calculator: true,
    });
  };

  handleIncrement = (index) => {
    const newMenu = [...this.state.menuList];

    newMenu[index] = {
      ...newMenu[index],
      quantity: newMenu[index].quantity + 1,
    };

    this.setState({
      menuList: newMenu,
    });
  };

  handleDecrement = (index) => {
    const newMenu = [...this.state.menuList];

    newMenu[index] = {
      ...newMenu[index],
      quantity: newMenu[index].quantity - 1,
    };

    this.setState({
      menuList: newMenu,
    });
  };

  handleCalculate = () => {
    let total = 0;
    this.state.menuList.forEach((item, index) => {
      total = item.price * item.quantity + total;
    });

    this.setState({
      total,
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.calculator ? (
          <FoodCalculator
            menuList={this.state.menuList}
            handleDecrement={this.handleDecrement}
            handleIncrement={this.handleIncrement}
            total={this.state.total}
            handleCalculate={this.handleCalculate}
          />
        ) : (
          <>
            <div className="calculator">
              <button
                className="btn btn-primary"
                onClick={this.handleCalculator}
              >
                Calculator
              </button>
            </div>
            <div className="button-add">
              <button className="btn btn-primary" onClick={this.handleAdd}>
                Add Menu
              </button>
            </div>

            {this.state.addClicked ? (
              <AddMenu
                menuList={this.state.menuList}
                addClicked={this.state.addClicked}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleImage={this.handleImage}
              />
            ) : null}

            <div className="menuList">
              {this.state.menuList.map((data, menuIndex) => {
                return (
                  <div className="menu-item" key={menuIndex}>
                    <ul>
                      <li>
                        <img src={data.image} alt="No preview" />{" "}
                      </li>
                      <li>
                        <span>Name: </span>
                        {data.name}{" "}
                      </li>
                      <li>
                        <span>Price: </span>
                        {data.price}{" "}
                      </li>
                      <div className="action-btn">
                        {" "}
                        <button
                          className="btn btn-info"
                          onClick={() => this.handleEdit(menuIndex)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(menuIndex)}
                        >
                          Delete
                        </button>
                      </div>

                      {this.state.toggleEdit &&
                      menuIndex === this.state.editingIndex ? (
                        <div>
                          <form
                            className="form-group"
                            onSubmit={(e) => this.submitEditting(e, menuIndex)}
                          >
                            <input
                              type="text"
                              name="foodname"
                              placeholder="Food name"
                              required
                              className="form-control"
                              value={this.state.editingMenu.foodname}
                              onChange={(e) => this.handleEditingData(e)}
                            />
                            <input
                              type="number"
                              name="price"
                              placeholder="Price"
                              className="form-control"
                              required
                              onChange={(e) => this.handleEditingData(e)}
                              value={this.state.editingMenu.price}
                            />

                            <input
                              name="image"
                              type="file"
                              onChange={(e) => this.handleImageEdit(e)}
                            />

                            <button className="btn btn-primary" type="submit" o>
                              Submit
                            </button>
                          </form>
                        </div>
                      ) : null}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MenuList;
