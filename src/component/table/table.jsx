import React from 'react';

const Table = function(props){
    
    function makeTableHeaders(obj){
        let approvedObj = obj === undefined ? {failed:"null obj"} : obj;

        let keys = Object.keys(approvedObj);
       
        return keys.map((x) => <th scope="col" key={x.length - 1}>{x}</th>);
    }
    
    function makeTBody(obj){
        
        let tableBody = obj === undefined ? {status:"failed"} : obj;
            Object.seal(tableBody);
     
        let dataArray = Object.values(tableBody);

       return dataArray.map((x) => <td key={x - 1 }>{x}</td>)
    }




    let theader = makeTableHeaders(props.Table);
    let tbody = makeTBody(props.Table);



    
return(
    <div>
        <table className="table table-striped">
            <thead>
                <tr>
                {theader}
                </tr>
            </thead>
            <tbody>
            <tr>
                {tbody}
            </tr>
            </tbody>
        </table>
    </div>
);



 }


export default Table;