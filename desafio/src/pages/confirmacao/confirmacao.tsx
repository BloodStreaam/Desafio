import { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

//Interface que irá conter toda a informação do form preenchido
interface IForm {
  "nome": string
  "email": string
  "data": string
  "bValue": number
  "workScheduleP": number,
  "workScheduleV": number,
  "vacationsTwelfth": number,
  "christmasTwelfth": number,
  "otherExpenses": number,
  "remoteExpenses": number,
  "comunicationsPlafond": number,
  "healthInsurance": number,
  "checkbox": boolean,
  "irsP": number,
  "fmHealthInsurance": number
}

//Interface que irá conter as operações realizadas na API
interface IResults {
    "BASE_VALUE_SOCIAL_SECURITY": number,
    "CHRISTMAS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY": number,
    "VACATIONS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY": number,
    "BASE_VALUE_IRS": number,
    "CHRISTMAS_ALLOWANCE_TWELFTH_IRS": number,
    "VACATIONS_ALLOWANCE_TWELFTH_IRS": number,
    "MONTHLY_GROSS_VALUE": number,
    "MONTHLY_NET_VALUE": number,
    "ANNUAL_GROSS_VALUE": number,
    "ANNUAL_NET_VALUE": number,
    "MONTHLY_BENEFITS": number,
    "ANNUAL_BENEFITS": number,
    "ANNUAL_COST": number,
    "DAILY_COST": number,
    "MONTHLY_COST": number

}


const Confirmacao = () => {
  //Contém a informação da página anterior
  const location = useLocation();
  //Atribuir um tipo a variavel de forma a não dar erro de type unknown
  const state = location.state as IForm
  //Navegação entre páginas
  let history = useNavigate()
  const [results, setResult] = useState<IResults>() //Conterá os resultados das operações realizadas na API

  //HTTP get request que retorna os resultados das operações necessárias para apresentar na página
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/sendResults/results/bValue/"+ state.bValue + "/wsev/" + state.workScheduleV + "/chrisT/" + state.christmasTwelfth + "/vacaT/" 
      + state.vacationsTwelfth + "/irs/" + state.irsP + "/other/" + state.otherExpenses + "/remote/"+ state.remoteExpenses + "/communication/" + state.comunicationsPlafond 
      + "/health/" + state.healthInsurance 
    }).then((resultado: any) => { 
      //Atribui o retorno á variavel results       
      setResult(resultado.data)
    }).catch(erro => {
        console.log("ERRO", erro);
        alert("Os cálculos não foram realizados com sucesso! Preencher novamente o formulário")
    })
  }, [])
    
  
  
  //Volta ao formulário
  const voltar = () => {
    history("/")
  }

  //ENVIA EMAIL PARA O O
  const sendEmail = () => {
    let data = {
      state,
      results
      
    }
    //Envia um post com a informação necessária
    axios({
      method: "post",
      url: "http://localhost:8080/sendEmail",
      data: data
    }).then(() => {        
      alert("E-Mail enviado com sucesso!")
    }).catch(erro => {
        console.log("ERRO", erro);
      alert("Ocorreu um erro, por favor tentar novamente!")
    })
  }

  return (
    

    <>
    {/*  TABELA COM A INFORMAÇÃO DO FORMULÁRIO */}
    <h1>FORM INFO</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Result</th>
          <th scope="col">Data</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td>{state.nome}</td>
          <th scope="row">Email</th>
          <td>{state.email}</td>
        </tr>
        <tr>
          <th scope="row">Collaboration Date</th>
          <td>{state.data}</td>
          <th scope="row">Base Value</th>
          <td>{state.bValue}</td>
        </tr>
        <tr>
          <th scope="row">Work Schedule Exemption %</th>
          <td>{state.workScheduleP}</td>
          <th scope="row">Work Schedule Exemption Value</th>
          <td>{state.workScheduleV}</td>
        </tr>
        <tr>       
          <th scope="row">IRS Tax %</th>
          <td>{state.irsP}</td>
          <th scope="row">Vacation Twelfth</th>
          <td>{state.vacationsTwelfth}</td>
        </tr>
        <tr>
          <th scope="row">Christmas Twelfth</th>
          <td>{state.christmasTwelfth}</td>
          <th scope="row">Other Expenses</th>
          <td>{state.otherExpenses}</td>
        </tr>
        <tr>
          <th scope="row">Remote Work Allowance</th>
          <td>{state.remoteExpenses}</td>
          <th scope="row">Communications Plafond</th>
          <td>{state.comunicationsPlafond}</td>
        </tr>
        <tr>
          <th scope="row">Health Insurance</th>
          <td>{state.healthInsurance}</td>
          <th scope="row">Number of Family Members</th>
          <td>{state.fmHealthInsurance}</td>
        </tr>
      </tbody>
    </table>
    
     {/*  TABELA COM AS OPERAÇÕES DE DEDUÇÃO */}
    <h1>DEDUCTIONS</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Base Value Social Security</th>
          <td>{results?.BASE_VALUE_SOCIAL_SECURITY}</td>
        </tr>
        <tr>
          <th scope="row">Christmas Allowance Twelfth Social Security</th>
          <td>{results?.CHRISTMAS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY}</td>
        </tr>
        <tr>
          <th scope="row">Vacations Allowance Twelfth Social Security</th>
          <td>{results?.VACATIONS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY}</td>
        </tr>
        <tr>
          <th scope="row">Base Value IRS</th>
          <td>{results?.BASE_VALUE_IRS}</td>
        </tr>
        <tr>
          <th scope="row">Christmas Allowance Twelfth IRS</th>
          <td>{results?.CHRISTMAS_ALLOWANCE_TWELFTH_IRS}</td>
          
        </tr>
        <tr>
          <th scope="row">Vacations Allowancne Twelfth IRS</th>
          <td>{results?.VACATIONS_ALLOWANCE_TWELFTH_IRS}</td>
        </tr>

      </tbody>
    </table>
    
     {/*  TABELA COM AS OPERAÇÕES DE VALORES */}
    <h1>VALUES</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Result</th>
          <th scope='col'>Data </th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Montly Gross Value</th>
          <td>{results?.MONTHLY_GROSS_VALUE}</td>
          <th>Monthly Net Value</th>
          <td>{results?.MONTHLY_NET_VALUE}</td>
        </tr>
        <tr>
          <th scope="row">Annual Gross Value</th>
          <td>{results?.ANNUAL_GROSS_VALUE}</td>
          <th>Annual Net Value</th>
          <td>{results?.ANNUAL_NET_VALUE}</td>
        </tr>
        <tr>
        <th scope="row">Monthly Benefits</th>
          <td>{results?.MONTHLY_BENEFITS}</td>
          <th>Annual Benefits</th>
          <td>{results?.ANNUAL_BENEFITS}</td>
        </tr>
      </tbody>
    </table>

  {/*  TABELA COM AS OPERAÇÕES DE CUSTO*/} 
    <h1>COSTS</h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Annual Cost</th>
          <td>{results?.ANNUAL_COST}</td>
        </tr>
        <tr>
          <th scope="row">Montly Cost</th>
          <td>{results?.MONTHLY_COST}</td>
        </tr>
        <tr>
          <th scope="row">Daily Cost</th>
          <td>{results?.DAILY_COST}</td>
        </tr>
      </tbody>
    </table>

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <button type="button" className="btn btn-danger btn-lg btn-block" onClick={voltar}>Voltar</button>
          </div>
        <div className="col-6">
          <button type="button" className="btn btn-success btn-lg btn-block" onClick={sendEmail}>Confirmar</button>
      </div>
    </div>
    </div>
    
    </>
         
  )

}
export default Confirmacao;


