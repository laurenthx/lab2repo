import { error } from "console";

const style = {color:'red'};

export default function DisplayErrors (props: displayErrorsProps){
    return(
        <>

            {props.errors? <ul style={style}>
               {props.errors.map((error, index) => 
               <li key={index}>{error}</li>)} 
            </ul>:null}

        </>
    )
}

interface displayErrorsProps {
    errors?: string[];
}