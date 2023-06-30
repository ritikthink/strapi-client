import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./LetsTalk.module.css";
import { Modal } from "react-bootstrap";
// import ProfileImg from "./../../../assets/images/princepal-img2.jpg";
import axios from "axios";
import config from "../../../config";
import parser from "html-react-parser";
import Files from "react-files";
import { Link } from "react-router-dom";
import Icons from "../Icons/Icons";
import iconPDF from "./../../../assets/images/pdf.png";
import iconPPT from "./../../../assets/images/ppt.png";
import iconDOC from "./../../../assets/images/doc.png";

const LetsTalk = ({ show, onHide }) => {
    const [formImage, setFormImage] = useState([]);
    const [formTitle, setFormTitle] = useState([]);
    const [formDescription, setFormDescription] = useState([]);
    const [formData, setFormData] = useState([]);
    const [formButton, setFormButton] = useState([]);
    const [formMultiItems, setFormMultiItems] = useState([]);

    const [uploadImage, setUploadImage] = useState([]);
    const [uploadImageName, setUploadImageName] = useState([]);
    const [uploadImageError, setUploadImageError] = useState("");

    const [uploadFile, setUploadFile] = useState([]);
    const [uploadFileName, setUploadFileName] = useState("");
    const [uploadFileIcon, setUploadFileIcon] = useState("");
    const [uploadFileError, setUploadFileError] = useState("");

    useEffect(() => {
        async function getFooterData() {
            try {
                const formAPI = await axios.get(
                    `${config.BACKEND_URL}/api/contact-forms?populate[Form][populate]populate=*`
                );
                setFormImage(formAPI.data.data[0].Form.FormImage);
                setFormTitle(formAPI.data.data[0].Form.FormTitle);
                setFormDescription(formAPI.data.data[0].Form.FormDescription);
                setFormData(formAPI.data.data[0].Form.Field);
                setFormButton(formAPI.data.data[0].Form.Button.Title);

                const formMultiItemsAPI = await axios.get(
                    `${config.BACKEND_URL}/api/contact-forms?populate[Form][populate]populate=MultiItems.MultiItem`
                );
                setFormMultiItems(
                    formMultiItemsAPI.data.data[0].Form.MultiItems
                );
            } catch (error) {
                console.error(error);
            }
        }

        getFooterData();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        reset();
        handleClearImage();
        handleClearFile();
        onHide();
        console.log("data ---> ", data);
    };

    // image upload
    const handleImageChange = (images) => {
        if (images[0] !== undefined && images[0].name) {
            setUploadImage(images[0].preview.url);
            setUploadImageName(images[0].name);
            setUploadImageError("");
            setValue("upload_image", images);
        }
    };

    const handleImageError = (error, file) => {
        setUploadImage([]);
        setUploadImageName("");
        setUploadImageError(error.message);
        // console.log("error code " + error.code + ": " + error.message);
        // console.log("error code " + error.code + ": " + error.message);
    };

    const handleClearImage = () => {
        setUploadImage([]);
        setUploadImageName("");
        setUploadImageError("");
        setValue("upload_image", "");
    };

    // =====================================

    // file upload
    const handleFileChange = (files) => {
        if (files[0] !== undefined && files[0].name) {
            setValue("upload_file", files);
            setUploadFile(files[0].preview.type);
            setUploadFileName(files[0].name);
            setUploadFileIcon(files[0].extension);
            // setUploadPdfFile(files[0]);
            setUploadFileError("");
        }
    };

    const handleFileError = (error, file) => {
        setUploadFile([]);
        setUploadFileName("");
        setUploadFileError(error.message);
    };

    const handleClearFile = () => {
        setUploadFile([]);
        setUploadFileName("");
        setUploadFileError("");
        setValue("upload_file", "");
    };

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="md"
                centered
                className={`overflow-hidden111 ${style.letstalk_modal}`}
            >
                <div className="row111 d-flex flex-wrap">
                    {/* <div className="col-sm-5">
                        <img
                            src={`${config.BACKEND_URL}${formImage.url}`}
                            alt={formImage.alternativeText}
                            title={formImage.caption}
                            loading="lazy"
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                    <div className="col-sm-7 p-4"> */}
                    <div className="col-sm-12 p-4">
                        <Modal.Header
                            closeButton
                            className="align-items-start p-0 mb-2 border-0"
                        >
                            <Modal.Title className="fs-3 fw-bold lh-body mb-0 w-100">
                                {formTitle}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-0">
                            {parser(`${formDescription}`)}

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="-mb-3"
                            >
                                {formData.map((field, index) => {
                                    return (
                                        <div
                                            key={field.id}
                                            className="form-group mb-3"
                                        >
                                            {field.Type !== "textarea" ? (
                                                <input
                                                    className="form-control"
                                                    {...register(field.Name, {
                                                        required:
                                                            field.Required,
                                                    })}
                                                    placeholder={
                                                        field.Placeholder
                                                    }
                                                />
                                            ) : (
                                                <textarea
                                                    className="form-control"
                                                    {...register(field.Name, {
                                                        required:
                                                            field.Required,
                                                    })}
                                                    placeholder={
                                                        field.Placeholder
                                                    }
                                                ></textarea>
                                            )}
                                            {errors[field.Name] && (
                                                <div className="form-error">
                                                    This field is required
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {formMultiItems.map((item, index) => {
                                    return (
                                        <div key={item.id} className="mb-3">
                                            <div className="form-group d-flex flex-wrap -mb-3">
                                                <label className="form-label w-100">
                                                    {item.Label}
                                                </label>

                                                {item.MultiItem.map(
                                                    (label, index) => {
                                                        return (
                                                            <div
                                                                key={label.id}
                                                                className={`d-flex flex-wrap align-items-center ps-0 me-3 mb-3 ${
                                                                    item.Type ===
                                                                    "Radio"
                                                                        ? "form-radio"
                                                                        : "form-check"
                                                                }`}
                                                            >
                                                                <input
                                                                    className={`m-0 me-2 ${
                                                                        item.Type ===
                                                                        "Radio"
                                                                            ? "form-radio-input"
                                                                            : "form-check-input"
                                                                    }`}
                                                                    type={`${
                                                                        item.Type ===
                                                                        "Radio"
                                                                            ? "radio"
                                                                            : "checkbox"
                                                                    }`}
                                                                    name={
                                                                        item.Label
                                                                    }
                                                                    value={
                                                                        label.Item
                                                                    }
                                                                    id={`flex${label.Item}${label.Item}`}
                                                                    {...register(
                                                                        item.Label,
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                                <label
                                                                    className="form-radio-label form-control111 text-muted fs-small"
                                                                    htmlFor={`flex${label.Item}${label.Item}`}
                                                                >
                                                                    {label.Item}
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            {errors[item.Label] && (
                                                <div className="form-error">
                                                    This field is required
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* upload image */}

                                <div className="form-group mb-3">
                                    <label className="form-label">
                                        Upload Image
                                    </label>
                                    <div className="images">
                                        <Files
                                            className="files-dropzone form-control text-truncate"
                                            onChange={handleImageChange}
                                            onError={handleImageError}
                                            accepts={[
                                                "image/png",
                                                "image/jpg",
                                                "image/jpeg",
                                                // ".pdf",
                                                // "audio/*",
                                            ]}
                                            multiple
                                            maxFileSize={1000000}
                                            minFileSize={0}
                                            clickable
                                        >
                                            {uploadImageName.length > 0
                                                ? uploadImageName
                                                : "Drop files here or click to upload"}
                                        </Files>
                                        <div className="fs-xsmall text-muted mt-1">
                                            Supported file types:{" "}
                                            <span className="fst-italic">
                                                .png, .jpg, .jpeg
                                            </span>
                                        </div>

                                        {uploadImage.length > 0 && (
                                            <div className="img-thumb d-table mt-3 position-relative">
                                                <img
                                                    className="rounded-1"
                                                    style={{
                                                        maxWidth: "100px",
                                                        maxHeight: "80px",
                                                    }}
                                                    src={uploadImage}
                                                    alt=""
                                                />
                                                <Link
                                                    className="d-flex flex-wrap position-absolute top-0 start-100"
                                                    style={{
                                                        marginTop: "-4px",
                                                    }}
                                                    onClick={handleClearImage}
                                                >
                                                    <Icons
                                                        family="BsReactIcons"
                                                        name="BsX"
                                                    />
                                                </Link>
                                            </div>
                                        )}
                                        {uploadImageError && (
                                            <div className="form-error">
                                                {uploadImageError}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* upload file */}

                                <div className="form-group mb-3">
                                    <label className="form-label">
                                        Upload File
                                    </label>
                                    <div className="files">
                                        <Files
                                            className="files-dropzone2 form-control text-truncate"
                                            onChange={handleFileChange}
                                            onError={handleFileError}
                                            accepts={[".pdf", ".ppt", ".doc"]}
                                            multiple
                                            maxFileSize={1000000}
                                            minFileSize={0}
                                            clickable
                                        >
                                            {uploadFileName.length > 0
                                                ? uploadFileName
                                                : "Drop files here or click to upload"}
                                        </Files>
                                        <div className="fs-xsmall text-muted mt-1">
                                            Supported file types:{" "}
                                            <span className="fst-italic">
                                                .pdf, .ppt, .doc
                                            </span>
                                        </div>

                                        {uploadFile.length > 0 && (
                                            <div className="file-thumb d-table mt-3 position-relative">
                                                <img
                                                    className="rounded-1"
                                                    style={{
                                                        maxWidth: "100px",
                                                        maxHeight: "50px",
                                                    }}
                                                    src={
                                                        uploadFileIcon === "pdf"
                                                            ? iconPDF
                                                            : uploadFileIcon ===
                                                              "ppt"
                                                            ? iconPPT
                                                            : iconDOC
                                                    }
                                                    alt=""
                                                />
                                                <Link
                                                    className="d-flex flex-wrap position-absolute top-0 start-100"
                                                    style={{
                                                        marginTop: "-4px",
                                                    }}
                                                    onClick={handleClearFile}
                                                >
                                                    <Icons
                                                        family="BsReactIcons"
                                                        name="BsX"
                                                    />
                                                </Link>
                                            </div>
                                        )}
                                        {uploadFileError && (
                                            <div className="form-error">
                                                {uploadFileError}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <button
                                        className="btn btn-secondary btn-sm w-100"
                                        type="submit"
                                    >
                                        {formButton}
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LetsTalk;
