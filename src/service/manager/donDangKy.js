import AxiosGlobal from "@/util/axios";

const CONTROLLER_NAME = 'don-dang-ky';

const getAll = async () => {
  const res = await AxiosGlobal.get(`http://localhost:8084/api/v1/manager/${CONTROLLER_NAME}`)
  return res.data;
}

const getAllDaoTrang = async (params) => {
  const res = await AxiosGlobal.get(`http://localhost:8084/api/v1/manager/${CONTROLLER_NAME}/getAllDaoTrang`,{params: params});
  return res;
}
const getAllByDaoTrangId = async (daoTrangId) => {
  const res = await AxiosGlobal.get(`http://localhost:8084/api/v1/manager/${CONTROLLER_NAME}/getDonDangKyByDaoTRangId/${daoTrangId}`);
  return res;
}
const update = async (data,id) => {
  const res = await AxiosGlobal.put(`http://localhost:8084/api/v1/manager/${CONTROLLER_NAME}/${id}`,data);
  return res;
}
const DonDangKyService = {
  getAll,
  getAllDaoTrang,
  getAllByDaoTrangId,
  update,
}
export default DonDangKyService;
