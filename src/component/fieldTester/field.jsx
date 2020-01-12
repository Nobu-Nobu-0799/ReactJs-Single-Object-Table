import React from 'react';

function FieldValidation (){

function ChangeValidation(...event){

    console.log(event)

}


return(
    <div>
        <input
        onChange={ChangeValidation}
        />
    </div>
);


}


export default FieldValidation;