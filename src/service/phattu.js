import AxiosGlobal from "@/util/axios";

const CONTROLLER_NAME = 'user';

const getAll = async (params) => {
  const res = await AxiosGlobal.get(`http://localhost:8084/api/v1/${CONTROLLER_NAME}`, {params: params})
  return res.data;
}

const deleteById = async (id) => {
  const res = await AxiosGlobal.delete(`http://localhost:8084/api/v1/${CONTROLLER_NAME}/${id}`)
  return res.data;
}

const updateById = async (id, formData) => {
  return await AxiosGlobal.put(`http://localhost:8084/api/v1/${CONTROLLER_NAME}/${id}/edit`, formData, {});
}
const PhatTuService = {
  getAll,
  deleteById,
  updateById,
}

export default PhatTuService;
