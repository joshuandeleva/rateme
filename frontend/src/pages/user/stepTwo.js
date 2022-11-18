import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Progressbar from "../../utils/progressbar";
import Footer from "../../pages/Footer/index";
import * as Yup from "yup";
const StepTwo = (props) => {
    const { user } = props;

    //validate form fields
    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required("Enter your fullname"),
        prefered_name: Yup.string().required("UserName is required"),
        D_O_B: Yup.string().required("Enter your date of birth"),
    });

    //handle submit form and navigate to next page
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: validationSchema.cast(user),
        resolver: yupResolver(validationSchema),
    });

    let navigate = useNavigate();
    const onSubmit = (data) => {
        props.updateUserdata(data);
        console.log(data);
        navigate("/user/stepThree");
    };
    console.log(props)
    return (
        <div>
            <div className="Container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="step-header d-flex flex-column align-items-center justify-content-center">
                            <Progressbar />
                            <h4 className="py-1"> Set up your Profile </h4>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group my-2">
                                <label htmlFor="" className="my-2">
                                    Full Names
                                </label>
                                <input
                                    type="text"
                                    className={`form-control py-2 my-2 ${errors.full_name ? "input-error" : ""
                                        }`}
                                    name="full_name"
                                    placeholder="Enter your prefered name"
                                    {...register("full_name")}
                                />
                                {errors.fullname && (
                                    <span className="errorMsg"> {errors.full_name.message} </span>
                                )}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="" className="my-2">
                                    Prefered Username
                                </label>
                                <input
                                    type="text"
                                    name="prefered_name"
                                    {...register("prefered_name")}
                                    className={`form-control ${errors.prefered_name ? "input-error" : ""
                                        }`}
                                    style={{ outline: "none" }}
                                    placeholder="Enter your prefered username"
                                />
                                {errors.username && (
                                    <span className="errorMsg">
                                        {" "}
                                        {errors.preferred_name.message}{" "}
                                    </span>
                                )}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor=""> Date of Birth </label>
                                <input
                                    type="date"
                                    {...register("D_O_B")}
                                    placeholder="DD/MM/YYYY"
                                    name="D_O_B"
                                    className={`form-control ${errors.D_O_B ? "input-error" : ""}`}
                                    style={{ outline: "none" }}
                                />
                                {errors.date && (
                                    <span className="errorMsg"> {errors.D_O_B.message} </span>
                                )}
                            </div>
                            <div className="submit-message my-2">
                                <button type="submit" className="rounded px-5 btn-home">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-home">
                <Footer />
            </div>
        </div>
    );
};

export default StepTwo;
