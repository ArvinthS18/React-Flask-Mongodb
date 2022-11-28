import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import $ from "jquery";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lib: "http://127.0.0.1:5000/",
      Lib2: [],
      Sort: "asc",
      De_sort: "dsc",
      show: false,
    };
    this.api_call(this.state.Lib);
    this.sorting_item = this.sorting_item.bind(this);
  }
  // show123() {
  //   this.setState({ show: true });
  // }
  // handleShow() {
  //   this.setState({ show: false });
  // }

  api_call(lib1) {
    axios({
      method: "GET",
      url: lib1,
    }).then((response) => {
      this.setState({ Lib2: response.data });
    });
    console.log(this.state.Lib2, "sadasasasasasasaasas");
  }

  sorting_item(e) {
    if (this.state.Sort == "asc") {
      this.api_call("http://127.0.0.1:5000/?sort=sortbyasc");
      this.setState({ Sort: "dsc" });
    }
    if (this.state.Sort == "dsc") {
      this.api_call("http://127.0.0.1:5000/?sort=sortbydsc");
      this.setState({ Sort: "asc" });
    }
  }
  filtered_item(item, e) {
    if (item.length > 0) {
      if (this.state.Sort == "asc") {
        this.api_call(
          "http://127.0.0.1:5000/?sort=sortbyasc" + "&filter=" + item
        );
      }
      if (this.state.Sort == "dsc") {
        this.api_call(
          "http://127.0.0.1:5000/?sort=sortbydsc" + "&filter=" + item
        );
      }
    }
  }

  add_new_ele(e) {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/api/adduser",
      contentType: "application/json",
      data: JSON.stringify({
        Mark: document.getElementById("form4Example2").value,
        Name: document.getElementById("form4Example4").value,
        Rollno: document.getElementById("form4Example6").value,
        class: document.getElementById("form4Example8").value,
      }),
      dataType: "json",
    });
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <br></br>
        <h2 className="normal" align="center">
          <b>Data Search using Flask and React</b>
        </h2>
        <h3 align="center">
          <b>Students Data</b>
        </h3>

        <br></br>
        <center>
          <input type="text" id="form1" />
          <button
            type="button"
            onClick={(e) =>
              this.filtered_item(document.getElementById("form1").value)
            }
            className="btn btn-success"
          >
            Search
          </button>
        </center>
        <button
          type="button"
          class="btn btn-lg btn-link"
          style={{ marginLeft: "900px" }}
          data-mdb-toggle="modal"
          data-mdb-target="#exampleModal"
        >
          Add Students
        </button>

        <div className="container">
          <table
            className="table table-striped table-dark"
            style={{ marginTop: "60px", width: "1400px" }}
          >
            <thead>
              <tr>
                <td>S.NO</td>
                <td>Roll NO</td>
                <td>
                  Name
                  <i
                    onClick={(e) => this.sorting_item(e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </td>
                <td>Mark</td>
                <td>Class</td>
              </tr>
            </thead>
            <tbody>
              {this.state.Lib2.map((x, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{x.Rollno}</td>
                  <td>{x.Name}</td>
                  <td>{x.Mark}</td>
                  <td>{x.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <Button
          variant="primary"
          onClick={() => {
            this.show123();
          }}
        >
          Launch demo modal
        </Button>

        <Modal show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add New Student Details
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card-body">
                  <div className="container d-flex ">
                    <form>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          Mark{" "}
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="form4Example2"
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                        />
                      </div>
                      <br />
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          Name{" "}
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="form4Example4"
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                        />
                      </div>
                      <br />
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          Rollno{" "}
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="form4Example6"
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                        />
                      </div>
                      <br />
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          class{" "}
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="form4Example8"
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-mdb-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  data-mdb-dismiss="modal"
                  onClick={(e) => this.add_new_ele(e)}
                  class="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
