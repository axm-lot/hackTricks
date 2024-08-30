import React,{useEffect, useState} from 'react'
function Fordi({nbInput,FO}){
    const [numberOfInputs, setNumberOfInputs] = useState('');
    const [val,setVal] = useState(Array.from({ length: numberOfInputs }, () => ''));
    const [val1,setVal1] = useState(Array.from({ length: numberOfInputs }, () => ''));
    useEffect(()=>{
        if(FO===true){
            const generateInputs=()=>{
                const len = nbInput-1;
                setNumberOfInputs(len);
                setVal(Array.from({ length: len }, () => ''));
            }
        }
    })
    const handleInputValueChange1= (index, value) => {
        const newInputValues = [...val];
        newInputValues[index] = value;
        setVal(newInputValues);
    }
    return(
      <>
        {/* <div style={{ marginLeft: '150px' }}>
          {Array.from({ length: numberOfInputs }, (_, index) => (
            <input
              key={index}
              type="text"
              value={val[index]}
              onChange={(e) => handleInputValueChange1(index, e.target.value)}
              style={{ width: '50px', height: '30px',textAlign: 'center'}}
            />
          ))}
        </div> */}
        <div style={{ marginLeft: '150px' }}>
          {Array.from({ length: numberOfInputs }, (_, index) => (
            <input
              key={index}
              type="text"
              value={val1[index]}
              onChange={(e) => handleInputValueChange1(index, e.target.value)}
              style={{ width: '50px', height: '30px',textAlign: 'center'}}
            />
          ))}
        </div>
        </>
                    {FO && <><div style={{ marginLeft: '150px' }}>
                    {Array.from({ length: numberOfInputs }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={inputValues1[index]}
                        onChange={(e) => handleInputValueChange(index, e.target.value)}
                        style={{ width: '50px', height: '30px', textAlign: 'center' }}
                      />
                    ))}
                  </div><div style={{ marginLeft: '150px' }}>
                    {Array.from({ length: numberOfInputs }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={index === 0 ? inputValues1[1] : val[index]}
                        //value={}
                        onChange={(e) => handleInputValueChange(index, e.target.value)}
                        style={{ width: '50px', height: '30px', textAlign: 'center' }}
                      />
                    ))}
                  </div><div style={{ marginLeft: '150px' }}>
                    {Array.from({ length: numberOfInputs }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={index === 0 ? inputValues1[2] : val[index]}
                        onChange={(e) => handleInputValueChange(index, e.target.value)}
                        style={{ width: '50px', height: '30px', textAlign: 'center' }}
                      />
                    ))}
                  </div><div style={{ marginLeft: '150px' }}>
                    {Array.from({ length: numberOfInputs }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={index === 0 ? inputValues1[3] : val[index]}
                        onChange={(e) => handleInputValueChange(index, e.target.value)}
                        style={{ width: '50px', height: '30px', textAlign: 'center' }}
                      />
                    ))}
                  </div><div style={{ marginLeft: '150px' }}>
                    {Array.from({ length: numberOfInputs }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={index === 0 ? inputValues1[4] : val[index]}
                        onChange={(e) => handleInputValueChange(index, e.target.value)}
                        style={{ width: '50px', height: '30px', textAlign: 'center' }}
                      />
                    ))}
                  </div><div style={{ marginLeft: '150px' }}>
                    {Array.from({ length: numberOfInputs }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        value={index === 0 ? inputValues1[5] : val[index]}
                        onChange={(e) => handleInputValueChange(index, e.target.value)}
                        style={{ width: '50px', height: '30px', textAlign: 'center' }}
                      />
                    ))}
                  </div></>}
    )
}
export default Fordi;