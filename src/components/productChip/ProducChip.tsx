import React from "react";
import defaultImage from "../../assets/images/default.png";
import { Tag, Avatar } from "antd";
import { backendUrl } from "../../plugins/axios";
// import { handleProductDelete } from "../../../functions";
import brokenImage from "../../assets/images/brokenImage.png";
import "./productChip.scss";

interface ProductChipProps {
  item: {
    uuid: string;
    name: string;
    code: string;
    smallImg?: string;
  };
}

const ProductChip: React.FC<ProductChipProps> = ({ item }) => {
  const onErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = brokenImage;
  };

  return (
    <div className="product-chip" style={{}}>
      <Tag
        className="chip"
        closable
        color="magenta"
        // onClose={() => handleProductDelete(item.uuid)}
      >
        <div className="product-chip-inside">
          <div className="product-image">
            <Avatar
              src={
                item.smallImg
                  ? `${backendUrl}/images/items/${item.smallImg}`
                  : defaultImage
              }
              onError={onErrorHandler}
              alt="doorhandle"
              shape="square"
              size={64}
              className="card-medium-photo"
            />
          </div>
          <div className="product-info">
            <div className="name">{item.name}</div>
            <div className="code">{item.code}</div>
          </div>
        </div>
      </Tag>
    </div>
  );
};

export default ProductChip;
