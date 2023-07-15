import AxiosGlobal from "@/util/axios";

const CONTROLLER_NAME = 'don-dang-ky';

const create = async (data) => {
  return await AxiosGlobal.post(`http://localhost:8084/api/v1/user/${CONTROLLER_NAME}`, data);
}
const getByPhatTuId = async (phatTuId) => {
  return await AxiosGlobal.get(`http://localhost:8084/api/v1/user/${CONTROLLER_NAME}/${phatTuId}`);
}
const getAllByPhatTuId = async (phatTuId) => {
  return await AxiosGlobal.get(`http://localhost:8084/api/v1/user/${CONTROLLER_NAME}/getAll/${phatTuId}`);
}
const DangKyService = {
  create,
  getByPhatTuId,
  getAllByPhatTuId,
}
export default DangKyService;
