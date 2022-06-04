const express = require('express');
const app = express.Router()


app.get("/results/bValue/:bValue/wsev/:workScheduleV/chrisT/:chrisT/vacaT/:vacaT/irs/:irs/other/:other/remote/:remote/communication/:communication/health/:health", async (req, res) => {
    let bValue = Number(req.params.bValue)
    let workScheduleV = Number(req.params.workScheduleV)
    let chrisT = Number(req.params.chrisT)
    let vacaT = Number(req.params.vacaT)
    let irs = (Number(req.params.irs) / 100)
    let other = Number(req.params.other)
    let remote = Number(req.params.remote)
    let communication = Number(req.params.communication)
    let health = Number(req.params.health)


    //-- DEDUCTIONS           
    let percentage = Number(0.11)
    //BASE VALUE SOCIAL SECURITY (valor = (BASE VALUE + WORK SCHEDULE EXEMPTION VALUE) * 11%)
    let BASE_VALUE_SOCIAL_SECURITY = Number((bValue + workScheduleV) * percentage)
    //CHRISTMAS ALLOWANCE TWELFTH SOCIAL SECURITY(valor = CHRISTMAS TWELFTH * 11%)
    let CHRISTMAS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY = Number(chrisT * percentage)
    //VACATIONS ALLOWANCE TWELFTH SOCIAL SECURITY(valor = VACATIONS TWELFTH * 11%)
    let VACATIONS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY = Number(vacaT * percentage)
    //BASE VALUE IRS = (valor = (BASE VALUE + WORK SCHEDULE EXEMPTION VALUE) * IRS TAX %)
    let BASE_VALUE_IRS = Number((bValue + workScheduleV) * irs)
    //CHRISTMAS ALLOWANCE TWELFTH IRS(valor = CHRISTMAS TWELFTH * IRS TAX %)
    let CHRISTMAS_ALLOWANCE_TWELFTH_IRS = Number(bValue * irs)
    //VACATIONS ALLOWANCE TWELFTH IRS(valor = VACATIONS TWELFTH * IRS TAX %)
    let VACATIONS_ALLOWANCE_TWELFTH_IRS = Number(vacaT * irs)
   
   
   
    //-- VALUES
    let months = 12
    //MONTHLY GROSS VALUE (valor = BASE VALUE + WORK SCHEDULE EXEMPTION VALUE + VACATIONS TWELFTH + CHRISTMAS TWELFTH + OTHER EXPENSES + REMOTE WORK ALLOWANCE)
    let MONTHLY_GROSS_VALUE = Number(bValue) + Number(workScheduleV) + Number(vacaT) + Number(chrisT) + Number(other) + Number(remote)
    //MONTHLY NET VALUE (valor = MONTHLY GROSS VALUE - (BASE VALUE SOCIAL SECURITY + CHRISTMAS ALLOWANCE TWELFTH SOCIAL SECURITY + VACATIONS ALLOWANCE TWELFTH SOCIAL SECURITY + BASE VALUE IRS + CHRISTMAS ALLOWANCE TWELFTH IRS + VACATIONS ALLOWANCE TWELFTH IRS) )
    let MONTHLY_NET_VALUE = Number(MONTHLY_GROSS_VALUE - (BASE_VALUE_SOCIAL_SECURITY + CHRISTMAS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY + VACATIONS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY + BASE_VALUE_IRS + CHRISTMAS_ALLOWANCE_TWELFTH_IRS + VACATIONS_ALLOWANCE_TWELFTH_IRS))
    //ANNUAL GROSS VALUE (valor = MONTHLY GROSS VALUE * 12)
    let ANNUAL_GROSS_VALUE = Number(MONTHLY_GROSS_VALUE * months)
    //ANNUAL NET VALUE (valor = MONTHLY NET VALUE * 12)
    let ANNUAL_NET_VALUE = Number(MONTHLY_NET_VALUE *  months) 
    //MONTHLY BENEFITS (valor = COMMUNICATIONS PLAFOND + HEALTH INSURANCE)
    let MONTHLY_BENEFITS = Number(communication + health) 
    //ANNUAL BENEFITS (valor = MONTHLY BENEFITS * 12)
    let ANNUAL_BENEFITS = Number(MONTHLY_BENEFITS * months)


    //-- COSTS
    
    //ANNUAL COST (= ANNUAL GROSS VALUE + ANNUAL BENEFITS)
    let ANNUAL_COST = Number(ANNUAL_GROSS_VALUE + ANNUAL_BENEFITS)
    //MONTHLY COST (= ANNUAL COST / 12)
    let MONTHLY_COST = Number(ANNUAL_COST / 12)
    //DAILY COST (= MONTHLY COST / 18)
    let DAILY_COST = Number(MONTHLY_COST / 18)

    let results = {
        BASE_VALUE_SOCIAL_SECURITY: BASE_VALUE_SOCIAL_SECURITY.toFixed(2),
        CHRISTMAS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY: CHRISTMAS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY.toFixed(2),
        VACATIONS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY: VACATIONS_ALLOWANCE_TWELFTH_SOCIAL_SECURITY.toFixed(2),
        BASE_VALUE_IRS: BASE_VALUE_IRS.toFixed(2),
        CHRISTMAS_ALLOWANCE_TWELFTH_IRS: CHRISTMAS_ALLOWANCE_TWELFTH_IRS.toFixed(2),
        VACATIONS_ALLOWANCE_TWELFTH_IRS: VACATIONS_ALLOWANCE_TWELFTH_IRS.toFixed(2),
        MONTHLY_GROSS_VALUE: MONTHLY_GROSS_VALUE.toFixed(2),
        MONTHLY_NET_VALUE: MONTHLY_NET_VALUE.toFixed(2),
        ANNUAL_GROSS_VALUE: ANNUAL_GROSS_VALUE.toFixed(2),
        ANNUAL_NET_VALUE: ANNUAL_NET_VALUE.toFixed(2),
        MONTHLY_BENEFITS: MONTHLY_BENEFITS.toFixed(2),
        ANNUAL_BENEFITS: ANNUAL_BENEFITS.toFixed(2),
        ANNUAL_COST: ANNUAL_COST.toFixed(2),
        DAILY_COST: DAILY_COST.toFixed(2),
        MONTHLY_COST: MONTHLY_COST.toFixed(2)
    }


    res.status(200).json( results );
}); 

module.exports = app