const express = require('express')
const app = express.Router()
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));

app.post('/', async (req, res) => {

    console.log("info", req.body)
    await sendEmail(req.body)
    console.log("Email send!")
    res.status(200)
})

async function sendEmail(info){

    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'vianaonwheels@gmail.com',
            pass:'V!ana0nWh33ls'
        }
    });
    let infoCompose = await mail.sendMail({
        from: 'vianaonwheels@gmail.com',
        to: info.state.email,
        subject: `Proposta de trabalho a partir do dia ${info.state.data}`,
        html:`<p>Boa tarde, Exº/ª ${info.state.nome}
            No seguimento deste e-mail encontra-se a nossa proposta de trabalho com algumas informações que poderão ser uteis para a sua decisão</p>
            
            <ul>
                <li>Valor Base:                     ${info.state.bValue}</li>
                <li>Férias 12º:                     ${info.state.vacationsTwelfth}</li>
                <li>Natal 12º:                      ${info.state.christmasTwelfth}</li>
                <li>Natal 12º:                      ${info.state.christmasTwelfth}</li>
                <li>Seguro de Saúde:                ${info.state.healthInsurance}</li>
                <li>Valor Base Segurança Social:    ${info.state.christmasTwelfth}</li>
                <li>Valor Líquido Mensal:           ${info.results.MONTHLY_NET_VALUE}</li>
                <li>Beneficios Mensais:             ${info.results.MONTHLY_BENEFITS}</li>
                <li>Valor Líquido Anual:            ${info.results.ANNUAL_NET_VALUE}</li>
                <li>Valor Líquido Mensal:           ${info.results.ANNUAL_BENEFITS}</li>
            </ul>

            <p>Aguardamos resposta,</p>
            <p>Atenciosamente, Equipa XpandIT</p>`
      });
}

module.exports = app