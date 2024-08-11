import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setBreadcrumbs, setTags } from "../../store/general/generalSlice";

const FeedBacksComponent: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Feedbacks",
          path: "/feedbacks",
        },
      ])
    );
  }, []);
  useEffect(() => {
    dispatch(
      setTags([
        {
          label: "Feedbacks",
          key: "/feedbacks",
        },
      ])
    );
  }, []);

  return <div>FeedBacks</div>;
};

export default FeedBacksComponent;
