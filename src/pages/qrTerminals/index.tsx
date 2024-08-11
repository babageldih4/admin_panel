import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";

const QRTerminals: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "QR Terminallar",
          path: "/qrTerminals",
        },
      ])
    );
  }, []);

  return <div>QR Terminals</div>;
};

export default QRTerminals;
