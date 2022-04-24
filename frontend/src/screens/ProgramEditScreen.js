import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link, useParams, useNavigate, } from 'react-router-dom';

/* COMPONENTS */
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProgramDetails, updateProgram } from "../redux/actions/programActions";

/* ACTION TYPES */
import { PROGRAM_UPDATE_RESET } from '../redux/constants/programConstants';

function ProgramEditScreen({ }) {
    const history = useNavigate();

    //Get id passed - program id which is then passed into action and used in axios call
    const { id } = useParams()
    const program_id = id

    // STATE variables
    const [programName, setProgramName] = useState("")

    const dispatch = useDispatch();

    /* PULLING A PART OF STATE FROM THE REDUX STORE */
    const programDetails = useSelector((state) => state.programDetails);
    const { error, loading, program } = programDetails;

    const programUpdate = useSelector((state) => state.programUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = programUpdate;

    useEffect(() => {
        // CHECK IF PROGRAM WAS UPDATED
        if (successUpdate) {

            // If updated send to home screen
            dispatch({ type: PROGRAM_UPDATE_RESET });
            const redirect = `/`
            history(redirect)

        } else {

            if (program.id !== Number(program_id)) {
                dispatch(listProgramDetails(program_id));
            } else {
                setProgramName(program.name);
            }

        }
      }, [dispatch, program, program_id, history, successUpdate]);

    //HANDLER
    const submitHandler = (e) => {
        e.preventDefault();

        if (programName == ""){
            alert("Program name must be filled out")
            return false
        }
    
        // UPDATE PROGRAM -> Send data to action
        dispatch(
          updateProgram({
            id,
            programName,
          })
        );
    };

    return (
        <div>

            <FormContainer>

                <h1>Edit Program Name</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <ErrorMessage variant="danger">{errorUpdate}</ErrorMessage>}

                <form onSubmit={submitHandler}>
                    <div className="param--name-container">
                        <label>Program Name
                            <input
                                type="text"
                                placeholder="Enter Program Name"
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                            />
                        </label>
                    </div>

                    <button type="submit" variant="primary" className="">
                        Update
                    </button>
                </form>

            </FormContainer>

            <Link to='/'>Go back</Link>

        </div>
    )
}

export default ProgramEditScreen