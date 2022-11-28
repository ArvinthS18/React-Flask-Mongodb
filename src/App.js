import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lib: "http://127.0.0.1:5000/",
      Lib2: [],
      Sort: "asc",
      De_sort: "dsc",
    };
    this.api_call(this.state.Lib);
    this.sorting_item = this.sorting_item.bind(this);
  }

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
        <button type="button" class="btn btn-dark">
          Add user
        </button>
        <div className="container">
          <table
            className="table table-striped table-dark"
            style={{ marginTop: "60px", width: "1400px" }}
          >
            <thead>
              <tr>
                <td>S.NO</td>
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

                  <td>{x.Name}</td>
                  <td>{x.Mark}</td>
                  <td>{x.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
