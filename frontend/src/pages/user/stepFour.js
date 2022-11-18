import React from "react";
import { Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Progressbar from "../../utils/progressbar";
import Footer from "../../pages/Footer/index";
import * as Yup from "yup";
const StepFour = (props) => {
    const { user } = props;
    const validationSchema = Yup.object().shape({
        find_in: Yup.string()
            .oneOf(["male", "female", "prefernottosay"])
            .required("required"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({ defaultValues: user, resolver: yupResolver(validationSchema) });

    let navigate = useNavigate();


    const handleSubmitData = (data) => {
        props.updateUserdata(data);
        console.log(data);
        navigate("/user/stepFive");

    };
    console.log(props)
    return (
        <div className="choose-gender">
            <Container>
                <Row>
                    <div className="col-lg-6 offset-lg-3">
                        <div className="step-header d-flex flex-column align-items-center justify-content-center">
                            <Progressbar />
                            <h4 className="py-3">What are you Looking for </h4>
                        </div>
                        <Form onSubmit={handleSubmit(handleSubmitData)}>
                            <div className="form-control my-3 py-2">
                                <input
                                    type="radio"
                                    name="find_in"
                                    value="male"
                                    {...register("find_in", { required: true })}
                                    style={{ marginRight: "10px" }}
                                />
                                <label htmlFor="">Male</label>
                            </div>
                            <div className="form-control my-3 py-2">
                                <input
                                    type="radio"
                                    name="find_in"
                                    value="female"
                                    {...register("find_in", { required: true })}
                                    style={{ marginRight: "10px" }}
                                />
                                <label htmlFor="">Female</label>
                            </div>
                            <div className="form-control my-3 py-2">
                                <input
                                    type="radio"
                                    name="find_in"
                                    value="prefernottosay"
                                    {...register("find_in", { required: true })}
                                    style={{ marginRight: "10px" }}
                                />
                                <label htmlFor="">Prefer not to say</label>
                            </div>
                            <div className="errorMsg">
                                {errors.gender?.type === "required" && "Please choose one"}
                            </div>
                            <div className="submit-message my-2">
                                <button type="submit" className="rounded px-5 btn-home">
                                    Next
                                </button>
                            </div>
                        </Form>
                    </div>
                </Row>
            </Container>
            <div className="footer-home">
                <Footer />
            </div>
        </div>
    );
};
export default StepFour;
