import AxiosGlobal from "@/util/axios";

const CONTROLLER_NAME = 'thong-ke';

const thongKePhatTu = async () => {
  const res = await AxiosGlobal.get(`http://localhost:8084/api/v1/admin/${CONTROLLER_NAME}`)
  return res.data;
}

const thongKeService = {
  thongKePhatTu,
}
export default thongKeService;
