import AxiosGlobal from "@/util/axios";

const CONTROLLER_NAME = 'dao-trang';

// admin
const create = async (data) => {
  return await AxiosGlobal.post(`http://localhost:8084/api/v1/admin/${CONTROLLER_NAME}`, data);
}
const update = async (id,data) => {
  return await AxiosGlobal.put(`http://localhost:8084/api/v1/admin/${CONTROLLER_NAME}/${id}`, data);
}

const deleteById = async (id) => {
  const res = await AxiosGlobal.delete(`http://localhost:8084/api/v1/admin/${CONTROLLER_NAME}/${id}`)
  return res.data;
}

const getAll = async () => {
  const res = await AxiosGlobal.get(`http://localhost:8084/api/v1/admin/${CONTROLLER_NAME}`)
  return res.data;
}

const getNguoiChuTri = async () => {
  return await AxiosGlobal.get(`http://localhost:8084/api/v1/admin/${CONTROLLER_NAME}/get-data/nguoiChuTri`)
}
//user
const getAllByUser =async () => {
    return await AxiosGlobal.get(`http://localhost:8084/api/v1/user/${CONTROLLER_NAME}`)
}
const DaoTrangService = {
  create,
  update,
  deleteById,
  getAll,
  getNguoiChuTri,
  getAllByUser,
}

export default DaoTrangService;
