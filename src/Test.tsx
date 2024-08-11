import React, { Component } from "react";
import Upload from "antd/lib/upload";
import Icon from "antd/lib/icon";
import Modal from "antd/lib/modal";
import { BaseField, connectField } from "uniforms";

class UploadImage extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    // [{
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  uploadFile = (file) => {
    const uploader = new Slingshot.Upload(Session.get("lowerCaseContext"));
    const image = file;
    uploader.send(image, function (error, url) {
      if (error) {
        throw new Meteor.Error("upload-file-fail", error);
      } else {
        var urlFirstPart = url.substring(0, url.lastIndexOf("/") + 1);
        var urlLastPart = url.substr(url.lastIndexOf("/") + 1);
        url = urlFirstPart + encodeURIComponent(urlLastPart);
        const file = {
          url: url,
          // fileName: image.name,
        };

        return file;
      }
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <section>
        <Upload
          name="uploadFile"
          data={this.uploadFile}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </section>
    );
  }
}

export default connectField(UploadImage);
