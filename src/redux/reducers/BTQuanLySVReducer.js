import { XOA_SINH_VIEN } from "../actions/types/BTQuanLySinhVienTypes";

const stateDefault = {
    mangSV: [
        
    ],
    sinhVienChinhSua: {
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
    }
}
export const BTQuanLySVReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case 'THEM_SINH_VIEN': {

                state.mangSV = [...state.mangSV, action.sinhVien];
                return { ...state }


            // return {...state,mangSV:[...state.mangSV,action.sinhVien]}
        }
        case XOA_SINH_VIEN: {
            state.mangSV = [...state.mangSV.filter(sinhVien => sinhVien.maSV !== action.maSV)];

            return { ...state };
        }

        case 'CHINH_SUA_SINH_VIEN':{
            state.sinhVienChinhSua = action.sinhVien;
            
            return {...state}
        }

        case 'CAP_NHAT_SINH_VIEN':{

            //Lấy dữ liệu người dùng trong mảng ra 
            let sinhVien = state.mangSV.find(sinhVien => sinhVien.maSV === action.sinhVien.maSV);
            if(sinhVien) {
                // sinhVien.hoTen = action.sinhVien.hoTen;
                for(let key in action.sinhVien) {
                    sinhVien[key] = action.sinhVien[key];
                }
            }
            
            state.mangSV = [...state.mangSV];

            return {...state};
        }

        default: return state;
    }
}