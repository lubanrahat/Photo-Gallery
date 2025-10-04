import React from "react";
import "./createPage.css";
import Image from "../../components/image/image";

const createPage = () => {
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="createBottom">
        <div className="uplode">
          <div className="uploadTitle">
            <Image path="/general/upload.svg" alt="" />
            <span>Choose a file</span>
          </div>
          <div className="uploadInfo">
            we recommend using high quality .jpg file less then 20 files less
            then 200 MB.
          </div>
        </div>
        <form className="createForm">
          <div className="createFormItem">
            <label htmlFor="title">Tilte</label>
            <input
              type="text"
              placeholder="Add a title"
              name="title"
              id="title"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="D\description">Description</label>
            <textarea
              rows={6}
              type="text"
              placeholder="Add a detaile description"
              name="description"
              id="description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="link">Link</label>
            <input type="text" placeholder="Add a link" name="link" id="link" />
          </div>
          <div className="createFormItem">
            <label htmlFor="bord">Board</label>
            <select name="board" id="board">
              <option value="1">Board 1</option>
              <option value="2">Board 2</option>
              <option value="3">Board 3</option>
              <option value="4">Board 4</option>
            </select>
          </div>
          <div className="createFormItem">
            <label htmlFor="tags">Tagged topics</label>
            <input type="text" placeholder="Add tags" name="tags" id="tags" />
            <small>Don't worry, people won't see your tags</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createPage;
