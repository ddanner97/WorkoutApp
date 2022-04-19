import React, { useState, useEffect } from "react";

/* AXIOS */
import axios from "axios";

/* REACT ROUTER */
import { Link, useParams, useHistory, useNavigate, Navigate } from 'react-router-dom';

/* COMPONENTS */
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { updateProgram } from "../redux/actions/programActions";
// import { listProgramDetails, updateProgram } from "../redux/actions/programActions";

/* ACTION TYPES */
// import { PROGRAM_UPDATE_RESET } from '../redux/constants/programConstants';

function ProductEditScreen({ }) {
    const history = useNavigate();
    const { program_id } = useParams()

    // GET id from new program
    console.log(program_id)

    // STATE variables
    const [programName, setProgramName] = useState('')

    const dispatch = useDispatch();

    /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
    // const programDetails = useSelector((state) => state.programDetails);
    // const { error, loading, program } = programDetails;

    // const programUpdate = useSelector((state) => state.programUpdate);
    // const {
    //     error: errorUpdate,
    //     loading: loadingUpdate,
    //     success: successUpdate,
    // } = programUpdate;

    // useEffect(() => {
    //     // CHECK IF PROGRAM WAS UPDATED
    //     if (successUpdate) {
    //         // If updated send to home screen
    //       dispatch({ type: PROGRAM_UPDATE_RESET });
    //       const redirect = `/`
    //       history(redirect)
    //     } else {
    //     //   if (!program.name || program._id !== Number(program_id)) {
    //     //     dispatch(listProgramDetails(program_id));
    //     //   } else {
    //     //     setProgramName(program.name);
    //     //   }

    //         setProgramName(program.name);
    //     }
    //   }, [dispatch, program, program_id, history, successUpdate]);

    //HANDLER
    const submitHandler = (e) => {
        e.preventDefault();
    
        // DISPATCH TO UPDATE PROGRAM
        // dispatch(
        //   updateProgram({
        //     id: product_id,
        //     name,
           
        //   })
        // );
      };

    return (
        <Link to='/'>Go back</Link>
    )
}

export default ProductEditScreen