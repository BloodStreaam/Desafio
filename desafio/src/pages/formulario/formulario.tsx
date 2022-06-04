import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/appStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario: React.FC  = () => {
  const [nome, setNome] = useState("");                                 //NOME DO CANDIDATO
  const [email, setEmail] = useState("");                               //EMAIL DO CANDIDATO
  const [data, setData] = useState("");                                 //DATA DE INICIO DA COLABORAÇÃO
  const [bValue, setBValue] = useState(0);                              //VALOR BASE
  const [workScheduleP, setWorkScheduleP] = useState(25)                //PERCENTAGEM WORK SCHEDULE
  const [workScheduleV, setWorkScheduleV] = useState(0)                 //VALOR WORK SCHEDULE
  const [vacationsTwelfth, setVacationTwelfth] = useState(0)            //FERIAS 12º
  const [christmasTwelfth, setChristmasTwelfth] = useState(0)           //NATAL 12º
  const [otherExpenses, setOtherExpenses] = useState(0)                 //OUTRAS DESPESAS
  const [remoteExpenses, setRemoteExpenses] = useState(15)              //DESPESAS REMOTAS
  const [comunicationsPlafond, setComunicationsPlafond] = useState(25)  //PLAFOND DE COMUNICAÇÃO
  const [healthInsurance, setHealthInsurance] = useState(30)            //SEGURO DE SAÚDE
  const [checkbox, setCheckbox] = useState(false)                       //VALOR DA CHECKBOX
  const [irsP, setIRS] = useState(0)                                    //PERCENTAGEM DE IRS
  const [fmHealthInsurance, setFMHealthInsurance] = useState(0)         //SEGURO DE SAUDE DE MEMBROS DA FAMILIA
  let history = useNavigate()                                           //PERMITE NAVEGAÇÃO ENTRE PÁGINAS
  

  //Atualiza os valores sempre que o valor base, a percentagem do work schedule e o valor work schedule forem alterados
    useEffect(() => {    
      setWorkScheduleV(Number((bValue * (workScheduleP/100)).toFixed(2)))
      setVacationTwelfth(Number(((bValue + workScheduleV)/12).toFixed(2)))
      setChristmasTwelfth(Number(((bValue + workScheduleV)/12).toFixed(2)))
      //Só altera o seguro de saúde se houver mais que um membro de familia
      if(fmHealthInsurance > 0){
        setHealthInsurance(Number((fmHealthInsurance * 30).toFixed(2)))
      }
      //Sempre que o checkbox for falso o numero de elementos de familia é 0
      if(checkbox == false){
          setFMHealthInsurance(0)
      }
     },[workScheduleP, bValue, workScheduleV, fmHealthInsurance, checkbox]);
    

    
  //É ativado uma vez que é submetido o formulário
  const handleSubmit = (event: any) => {
    history("/confirmacao", {state:{nome:nome, email:email, data:data, bValue: bValue,
         workScheduleP: workScheduleP, workScheduleV: workScheduleV, vacationsTwelfth: vacationsTwelfth,
          christmasTwelfth: christmasTwelfth, otherExpenses: otherExpenses, remoteExpenses: remoteExpenses, 
          comunicationsPlafond: comunicationsPlafond, healthInsurance: healthInsurance, irsP: irsP, 
          fmHealthInsurance: fmHealthInsurance }, replace: false});
  }

   



  return (
    <>
   

    {/* INFORMAÇÃO GERAL DO UTILIZADOR*/}
    <h1>General</h1>
        <form onSubmit={handleSubmit}>
        <div className="container">
            <div className="row">
                <div className="col-4 text-center" >
                    <div className="form-group">
                        <label htmlFor="name">Enter name:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="form-control" id="name"/>
                    </div>

                </div>
                <div className="col-4 text-center">
                <div className="form-group">
                        <label htmlFor="email">Enter e-mail:</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" />
                    </div>

                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="date">Enter Collaboration Date:</label>
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required className="form-control" id="date"/>
                    </div>
                </div>
            </div>
        </div>
            
            
                                                 <h1>Financial</h1>

        <div className="container">
            <div className="row">
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="bValue">Base Value:</label>
                        <input type="number"  onChange={(e) => setBValue(Number(e.target.value))} required className="form-control" id="bValue"/>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="workScheduleP">WORK SCHEDULE EXEMPTION %:</label>
                        <input type="number" value={workScheduleP} onChange={(e) => setWorkScheduleP(Number(e.target.value))} required className="form-control" id="workScheduleP"/>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                            <label htmlFor="workScheduleP">WORK SCHEDULE EXEMPTION VALUE:</label>
                            <input type="number" value={workScheduleV} onChange={(e) => setWorkScheduleV(Number(e.target.value))} required className="form-control" id="workScheduleV" disabled/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="irs">IRS Tax %:</label>
                        <input type="number" onChange={(e) => setIRS(Number(e.target.value))} required className="form-control" id="irs"/>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="vacations">VACATIONS TWELFTH:</label>
                        <input type="number" value={vacationsTwelfth} onChange={(e) => setVacationTwelfth(Number(e.target.value))}  className="form-control" id="vacations" disabled/>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="christmas">CHRISTMAS TWELFTH:</label>
                        <input type="number" value={christmasTwelfth} onChange={(e) => setChristmasTwelfth(Number(e.target.value))} className="form-control" id="christmas" disabled/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="other">OTHER EXPENSES:</label>
                        <input type="number" onChange={(e) => setOtherExpenses(Number(e.target.value))} className="form-control" id="other" />
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="remote">REMOTE WORK ALLOWANCE:</label>
                        <input type="number" value={remoteExpenses} onChange={(e) => setRemoteExpenses(Number(e.target.value))} className="form-control" id="remote" required/>
                    </div>
                </div>
            </div>
            
        </div>
  

                                                        <h1>Benefits</h1>


        <div className="container">
            <div className="row">
                <div className="col-4 text-center">

                    <div className="form-group">
                        <label htmlFor="communications">COMMUNICATIONS PLAFOND:</label>
                        <input type="number" value={comunicationsPlafond} onChange={(e) => setComunicationsPlafond(Number(e.target.value))} className="form-control" id="communications" required/>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-group">
                        <label htmlFor="communications">HEALTH INSURANCE:</label>
                        <input type="number" value={healthInsurance} onChange={(e) => setHealthInsurance(Number(e.target.value))} className="form-control" id="communications" required/>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="form-check">
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                           Include Family Members in Health Insurance?
                        </label>
                        <input  type="checkbox" value="" id="flexCheckChecked" checked={checkbox}  onChange={(e) => setCheckbox(e.target.checked)}/>
                       
                    </div>
                </div>
                <div className="col text-center">
                    {checkbox &&     
                        <div className="col-4 text-center align-self-center">
                            <div className="form-group">
                                <label htmlFor="communications">Number of Family Members:</label>
                                <input type="number" value={fmHealthInsurance} onChange={(e) => setFMHealthInsurance(Number(e.target.value))} className="form-control" id="communications" required/>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary">Submeter Pedido</button>
            </div>
        </div>

                    
        </form></>
  )
}

export default Formulario;

