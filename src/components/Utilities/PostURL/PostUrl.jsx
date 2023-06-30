import axios from "axios";
import config from "../../../config";

export const postURL = async (slug, type) => {
    const response = await axios.get(
        `${config.BACKEND_URL}/api/${type}?populate=*&filters[PostURL][$eq]=${slug}`
    );
    return response;
};
