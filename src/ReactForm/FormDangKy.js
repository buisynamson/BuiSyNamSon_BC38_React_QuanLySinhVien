import React, { Component } from "react";
import { connect } from "react-redux";
class FormDangKy extends Component {
  state = {
    values: {
      //Thông tin người dùng nhập
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    errors: {
      //Thông tin lỗi
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
  };

  handleChangeInput = (event) => {
    //Dựa vào biến event sẽ có thể truy xuất được đến các thông tin của thẻ
    let { id, name, value } = event.target;
    //Mỗi lần nhập liệu sẽ xử lý 2 phần
    //Phần 1 values
    let newValues = { ...this.state.values };
    newValues[name] = value;
    //Phần 2 errors
    let newErrors = { ...this.state.errors };
    let messError = "";
    //Khi người dùng nhập bỏ trống
    if (value.trim() === "") {
      messError = name + " không được bỏ trống !";
    }
    if (event.target.type === "email") {
      let regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(value)) {
        messError = "Email không đúng định dạng";
      }
    }

    newErrors[name] = messError;

    this.setState({
      values: newValues,
      errors: newErrors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault(); //Cản sự kiện reload browser
    //validation trước khi submit
    let { values, errors } = this.state;

    let valid = true; //valid = true là form hợp lệ
    //Kiểm tra tất cả các giá trị {maSV,matKhau,...} trong values xem có hợp lệ không
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
        break;
      }
    }
    //Kiểm tra tất cả các giá trị {maSV,matKhau,...} trong error xem có lỗi không
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
        break;
      }
    }
    if (!valid) {
      alert("Dữ liệu nhập không hợp lệ !");
      return;
    }

    //Gửi giá trị người dùng nhập vào lên redux
    const action = {
      type: "THEM_SINH_VIEN",
      sinhVien: this.state.values,
    };
    this.props.dispatch(action);

    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
      },
    });
  };
  //Xử lý cách 1 : Can thiệp vào quá trình render component khi thay đổi props
  // static getDerivedStateFromProps(newProps, currentState) {
  //     //Chọn thời điểm trước khi render props mới từ redux trả về edit vào state và return về state => component render => render state ra
  //     //Cần phân định được người dùng bấm chỉnh sửa hay handle change
  //     // + Nếu bấm chỉnh sửa thì tài khoản sẽ thay đổi
  //     // + handle change thì tài khoản không thay đổi
  //     if(newProps.nguoiDungChinhSua.maSV !== currentState.values.maSV) {
  //         currentState.values = {...newProps.nguoiDungChinhSua}
  //     }
  //     return {...currentState};
  // }
  //Cách 2 dùng lifecycle cũ chỉ chạy khi props thay đổi trước khi render
  componentWillReceiveProps(newProps) {
    //Chỉ chạy khi props thay đổi
    this.setState({
      values: newProps.sinhVienChinhSua,
    });
  }
  //Cách 3: Không dùng lifecycle tất cả state đều đẩy lên redux

  render() {
    let { maSV, hoTen, email, soDienThoai } = this.state.values;
    console.log(this.props);
    return (
      <form onSubmit={this.handleSubmit} className="card mb-5">
        <div className="card-header bg-dark text-white">
          <h3>Thông tin sinh viên</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Mã SV</p>
                <input
                  className="form-control"
                  id="maSV"
                  name="maSV"
                  onChange={this.handleChangeInput}
                  value={maSV}
                />
                <p className="text text-danger">{this.state.errors.maSV}</p>
              </div>
              <div className="form-group">
                <p>Email</p>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  onChange={this.handleChangeInput}
                  value={email}
                />
                <p className="text text-danger">{this.state.errors.email}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Họ tên</p>
                <input
                  className="form-control"
                  id="hoTen"
                  name="hoTen"
                  onChange={this.handleChangeInput}
                  value={hoTen}
                />
                <p className="text text-danger">{this.state.errors.hoTen}</p>
              </div>
              <div className="form-group">
                <p>Số điện thoại</p>
                <input
                  className="form-control"
                  id="soDienThoai"
                  name="soDienThoai"
                  onChange={this.handleChangeInput}
                  value={soDienThoai}
                />
                <p className="text text-danger">
                  {this.state.errors.soDienThoai}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Đăng ký
            </button>
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={() => {
                const action = {
                  type: "CAP_NHAT_SINH_VIEN",
                  sinhVien: this.state.values,
                };

                //Đưa dữ liệu cập nhật người dùng lên redux
                this.props.dispatch(action);

                this.setState({
                  values: {
                    maSV: "",
                    hoTen: "",
                    email: "",
                    soDienThoai: "",
                  },
                });
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    sinhVienChinhSua: rootReducer.BTQuanLySVReducer.sinhVienChinhSua,
  };
};

export default connect(mapStateToProps)(FormDangKy);
