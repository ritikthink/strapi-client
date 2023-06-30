import Placeholder from "./../../../assets/images/placeholder-thumbnail.png";

export const imagePlaceholder = (error) => {
    error.target.src = `${Placeholder}`;
};
