import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const QrDevices: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "QR Enjamlar",
          path: "/qrDevices",
        },
      ])
    );
  }, []);

  return <div>Qr Devices</div>;
};

export default QrDevices;
