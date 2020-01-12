import React from 'react';

const CustomizableTable = (props) =>{

    //      Identifiers and Data validation 

    var dateFormat = existanceValidation(props.dateFormat)  ? props.dateFormat : "DD/MM/YYYY";
    var columns = existanceValidation(props.Tablecolumns)  ? props.Tablecolumns : {} ;
    var data = existanceValidation(props.TableData) ? props.TableData : [];
    var listIdentifier = existanceValidation(props.listIdentifier)  ? props.listIdentifier : "-list";
    var dropDownArrLists = existanceValidation(props.tableLists) ? listIdentAndmaker(props.tableLists) : {};
    var identName = existanceValidation(props.objPrimaryIdentificator) ? props.objPrimaryIdentificator : 'name';
    var identValue = existanceValidation(props.objSecondIdentificator)  ? props.objSecondIdentificator  : 'value';
    var tableType = existanceValidation(props.editable) ? props.editable : false;
    var searchable = existanceValidation(props.searchable) ? props.searchable : false;
    var initialSearchableCat = existanceValidation(props.searchKey) ? props.searchKey : "";  


    //      methods validation

    var BaseChange = existanceValidation(props.handleBaseChange) ? props.handleBaseChange : null;
    var FieldDelete = existanceValidation(props.handleFieldDelete) ? props.handleFieldDelete : null;
    var SaveField = existanceValidation(props.handleSaveField) ? props.handleSaveField : null; 
    var EditField = existanceValidation(props.handleEditField) ? props.handleEditField : null;

    // On Use Variables
    
    var barText = existanceValidation(props.searchBar) ? props.searchBar : "";
    var barName = existanceValidation(props.searchBarName) ? props.searchBarName : "";
    var options = existanceValidation(props.optionsChooser) ? props.optionsChooser : "";
    var optionsName = existanceValidation(props.optionsName) ? props.optionsName : "";


    function getHeaders(_obj){
        _obj = _obj !== null ? _obj : {};
        return Object.values(_obj);
    }

    function getSeparator(le_string){

        if(le_string.includes("-")){
            return "-";
        }else if(le_string.includes("/")){
            return "/";
        }else if(le_string.includes(",")){
            return ",";
        }else if(le_string.includes(".")){
            return ".";
        }else{
            return "";
        }
    }

    function validateFormDate(le_string){
            le_string = le_string !== null ? le_string : null;

            if(le_string !== null && (le_string.includes("/") || le_string.includes("-"))){
                return le_string;
            }else{
                return null;
            }
    }

    function getCompactFormatedDate(le_date){
        
        dateFormat = typeof(dateFormat) === "string" ? dateFormat : null;
        le_date = typeof(le_date) === "string" ? le_date : null;

        var dateSeparator = getSeparator(dateFormat);
        var format = validateFormDate(dateFormat);
        
        if((format.split(dateSeparator)[0] === "DD") || (format.split(dateSeparator)[0] === "DDDD") || (format.split(dateSeparator)[0] === "DDD") || (format.split(dateSeparator)[0] === "D")){
            
            if( (format.split(dateSeparator)[1] === "MM")  || (format.split(dateSeparator)[1] === "MMMM") || (format.split(dateSeparator)[1] === "MMM") || (format.split(dateSeparator)[1] === "M") ){                 
                return `${new Date(le_date).getDate()}/${new Date(le_date).getMonth() + 1}/${new Date(le_date).getFullYear()}`;
            }else{
                return `${new Date(le_date).getDate()}/${new Date(le_date).getFullYear()}/${new Date(le_date).getMonth() + 1}`;
            }

        }else if( (format.split(dateSeparator)[0] === "MM") || (format.split(dateSeparator)[0] === "MMMM") || (format.split(dateSeparator)[0] === "MMM") || (format.split(dateSeparator)[0] === "M") ){
            
            if( (format.split(dateSeparator)[1] === "DD") || (format.split(dateSeparator)[1] === "DDDD") || (format.split(dateSeparator)[1] === "DDD") || (format.split(dateSeparator)[1] === "D") ){  
                return `${new Date(le_date).getMonth() + 1}/${new Date(le_date).getDate()}/${new Date(le_date).getFullYear()}`;
            }else{
                return `${new Date(le_date).getMonth() + 1}/${new Date(le_date).getFullYear()}/${new Date(le_date).getDate()}`;
            }

        }else if( (format.split(dateSeparator)[0] === "YY") || (format.split(dateSeparator)[0] === "YYYY") || (format.split(dateSeparator)[0] === "YYY") || (format.split(dateSeparator)[0] === "Y") ){
            
            if( (format.split(dateSeparator)[1] === "DD") || (format.split(dateSeparator)[1] === "DDDD") || (format.split(dateSeparator)[1] === "DDD") || (format.split(dateSeparator)[1] === "D") ){  
                return `${new Date(le_date).getFullYear()}/${new Date(le_date).getDate()}/${new Date(le_date).getMonth() + 1}`;
            }else{
                return `${new Date(le_date).getFullYear()}/${new Date(le_date).getMonth() + 1}/${new Date(le_date).getDate()}`;
            }

        }else{
            console.log("Formato no valido");
        }

    }

    function inputTypeValidation(_tag, _key){
        var reponses = "";
        var moveArr = Object.entries(columns);

       for(var i = 0; i < moveArr.length ; i++){

           let x = moveArr[i];
           
           if(x[1] === _key){

                if(x[0].includes(listIdentifier)){
                    reponses = "List";
                }else if(!x[0].includes(listIdentifier) && _tag === ""){
                    reponses = "Text";
                }else if(!x[0].includes(listIdentifier) && isNaN(_tag) === false){
                    reponses = "Numeric";
                }else if(!x[0].includes(listIdentifier) && Date.parse(_tag)){
                    reponses = "Date";
                }else if(!x[0].includes(listIdentifier) && typeof(_tag) === 'string'){
                    reponses = "Text";
                }

            }
        }

        return reponses;

    }

    function normalFieldValidation(char){
        if(isNaN(char) === false){
            return "Number";
        }else if(Date.parse(char)){
            return "Date";
        }else{
            return "Text";
        }
    }

    function listIdentAndmaker(_obj){
        var resp = Object.keys(columns).filter((x)=> x.includes(listIdentifier));
        var  r = Object.values(_obj).map((x,c)=>{ 
            if(!x.includes(resp[c])){
                x.push(resp[c]);
            }  return x;
        });

        return r;
    }

    function getListvalues(_arrI){
        
       var l = Object.entries(columns).find( (x) =>{
            if(x[1] === _arrI)
                return x[0]      
        });
       return dropDownArrLists.filter( (x) => x.includes(l[0]) ) ;
    }

    function editableRowRender( Data, headers){
        
        return headers.map((key, index)=>{

            if(Data.editable){

                if(inputTypeValidation(Data[key], key) === "Text"){
                    return(             
                    <td key={index}>
                        <input
                        type={"text"}
                        onChange={(e) => BaseChange(e, Data)}
                        name={key} 
                        value={Data[key]} 
                        key={index}
                        ></input>
                    </td>
                    )

                }else if(inputTypeValidation(Data[key], key) === "Date"){
                    return(
                        <td>
                            <input 
                            type="date" 
                            data-date-format="YYYY MMMM DD"
                            placeholder={"00/00/0000"} 
                            name={key}
                            value={Data[key]}
                            key={index}
                            onChange={(e) => BaseChange(e, Data)}
                            ></input>
                        </td>
                    )

                }else if(inputTypeValidation(Data[key], key) === "Numeric"){
                    return(             
                        <td key={index}>
                            <input
                            type={"number"}
                            onChange={(e) => BaseChange(e, Data)}
                            name={key} 
                            value={Data[key]} 
                            key={index}
                            ></input>
                        </td>
                        )

                }else if(inputTypeValidation(Data[key], key) === "List"){
                    
                    let reference = getListvalues(key);

                    let list = reference.map( (x, i) => {
                        let ex = x.filter( (e) => typeof(e) !== 'string' )
                        return ex;
                    })

                    return(
                        <td>                            
                            <select
                            name={key}
                            value={Data[key]}
                            onChange={(e) => BaseChange(e,Data)}>
                                <option>Seleccione un valor</option>
                                {list[0].map((x) =>{ 
                                    return(<option key={x[identName]} value={x[identValue]}>{x[identName]}</option>)
                                })}
                            </select>   
                        </td>
                    )
                }

            }else{

                if(normalFieldValidation(Data[key]) === "Date"){

                    return(
                        <td key={index}>
                            {getCompactFormatedDate(Data[key])}
                        </td>
                    )

                }else if(inputTypeValidation(Data[key], key) === "List"){
                    
                    let reference = getListvalues(key);

                    let list = reference.map( (x, i) => {
                        let ex = x.filter( (e) => typeof(e) !== 'string' )
                        return ex;
                    });

                    return(
                        <td key={index}>
                            {list[0].map( (x,i) => {
                                
                                if(x[identName] === Data[key]){
                                    return x[identName];
                                }else if(x[identValue] === Data[key]){
                                    return x[identName];
                                }

                            })}
                        </td>
                    )

                }else{
                    return(
                        <td key={index}>
                            {Data[key]}
                        </td>
                    )

                } 

            }

        })
    
    }

    function EditableBuilder(){

        let headers = getHeaders(columns);
        
        var theData = data.filter( (item) => item[options === "" ? initialSearchableCat : options].includes(barText.toUpperCase()));
            
        return theData.map( ( x, i) =>{
                    return(
                        <tr key={i}>
                            {editableRowRender(x,headers)}
                        <td>
                            <button 
                            onClick={x.editable === true ? SaveField.bind(this, x)
                            : EditField.bind(this, x)}>
                                {x.editable === true ? "Guardar" : "Editar"}
                            </button>
                        </td>
                        <td>
                            <button onClick={FieldDelete.bind(this, x)}>Borrar</button>
                        </td>
                        </tr>
                    );
            })
    }

    function headBuilder(_headers){
        _headers = _headers !== undefined ? _headers : null;
        let head = getHeaders(_headers);
        
        return head.map((x, i)=>{
            return(
                <th key={i}>{x}</th>
            );
        });
    }

    function existanceValidation(_var){
        
        if(_var !== undefined && _var !== null && _var !== ""){
            return true;
        }else{
            return false;
        }

    }

    function simpleRows(data, headers){
        return headers.map((x, iterator) =>{
            if(inputTypeValidation(data[x]) === "Date"){
                return(
                <td key={iterator}>
                    {getCompactFormatedDate(data[x])}
                </td>
                )
            }else{
                return(
                    <td key={iterator}>
                        {data[x]}
                    </td>
                )
            }

        });
    }

    function Builder(){
        let headers = getHeaders(columns);
        
        var tData = data.filter( (item) => item[options === "" ? initialSearchableCat : options].includes(barText.toUpperCase()))

        return tData.map((x, i)=>{
            return(
            
                <tr key={i}>
                    {simpleRows(x,headers)}
                </tr>
            
            )
        })

    }

    if(tableType){
        let option = getHeaders(columns);
        return(
            <div>
                <div style={{width:"100%", display:searchable ? "block":"None" }}>
                    <input 
                    name={barName}
                    value={barText}
                    placeholder={"Ingrese para buscar"}
                    onChange={ (e) =>  BaseChange(e) }
                    type="text"
                    />
                    <select
                    name={optionsName} 
                    value={options}
                    onChange={ (e) => BaseChange(e) }>
                       {option.map( (e)=>(<option value={e} key={e.length}>{e}</option>) )}
                    </select>
                </div>
                <table id="Custom-Bv-Tab" className="table table-sm">
                    <thead>
                    <tr>
                        {headBuilder(columns)}
                    </tr>
                    </thead>
                    <tbody>
                        {EditableBuilder()}
                    </tbody>
                </table>
            </div>            
        );
    
    }else{
        let option = getHeaders(columns);
        return(
            <div>
                <div style={{width:"100%", display:searchable ? "block":"None" }}>
                    <input 
                    name={barName}
                    value={barText}
                    placeholder={"Ingrese para buscar"}
                    onChange={ (e) =>  BaseChange(e) }
                    type="text"
                    />
                    <select
                    name={optionsName} 
                    value={options}
                    onChange={ (e) => BaseChange(e) }>
                       {option.map( (e)=>(<option value={e} key={e.length}>{e}</option>) )}
                    </select>
                </div>
                <table id="Custom-Bv-Tab" className="table table-sm">
                    <thead>
                    <tr>
                        {headBuilder(columns)}
                    </tr>
                    </thead>
                    <tbody>
                        {Builder()}
                    </tbody>
                </table>
            </div>
        ) 
    }

}

export default CustomizableTable; 