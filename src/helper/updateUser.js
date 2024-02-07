import { toast } from "react-hot-toast";
export const updateUser = (values) => {
    switch (values) {
        case "feature add sucessfully":
            return toast.success("Feature add successfully");
        case "update feature successfully":
            return toast.success("Feature update successfully");
        case "Feature deleted successfully":
            return toast.success("Feature deleted successfully");
        case "Error in feature api":
            return toast.error("Something went wrong Try agin later");
        default:
            break;
    }
}
