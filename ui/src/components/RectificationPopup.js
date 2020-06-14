import React, { Component } from "react";
import { divIcon } from "leaflet";

import s from "./RectificationPopup.module.scss";

class RectificationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  render() {
    var display = this.props.isDisplay ? "block" : "none";

    return (
      <div className={s.popup} style={{ display: display }}>
        <p className={s.title}>Rectify potential problem</p>
        <div className={s.inputHolder}>
          <label className={s.msgLabel} for="rectificationMsg">
            Message:
            <textarea
              className={s.rectificationMsg}
              name="rectificationMsg"
              id="rectificationMsg"
            ></textarea>
          </label>
          <label for="rectificationImage" className={s.imageLabel}>
            Image:
            <img id="image" className={s.image} src={this.state.file}></img>
            <input
              className={s.rectificationInput}
              type="file"
              src="rectificationImage"
              alt=""
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button className={s.rectificationBtn} onClick={this.props.onClick}>
          Submit
        </button>
      </div>
    );
  }
}

export default RectificationPopup;
