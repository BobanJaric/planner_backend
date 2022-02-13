module.exports =  ({ origin, destination,
    fullname1,fullname2, fullname3,
   values, captCorr,foCorr,acmCorr ,aircraftCorr, destinationCorr, originCorr,
   aircraft,startDate
  }) => {

  let pax1rank=' ';let pax2rank=' ';let pax3rank=' ';let pax4rank=' ';let pax5rank=' ';let pax6rank=' ';let pax7rank=' ';let pax8rank=' ';
  let pax1dob=' ';
  let pax1name=' ';
  let pax1nationality=' ';
  let pax1passport=' ';
  let pax2dob=' ';
  let pax2name=' ';
  let pax2nationality=' ';
  let pax2passport=' '; 
  let pax3dob=' ';
  let pax3name=' ';
  let pax3nationality=' ';
  let pax3passport=' '; 
  let pax4dob=' ';
  let pax4name=' ';
  let pax4nationality=' ';
  let pax4passport=' '; 
  let pax5dob=' ';
  let pax5name=' ';
  let pax5nationality=' ';
  let pax5passport=' '; 
  let pax6dob=' ';
  let pax6name=' ';
  let pax6nationality=' ';
  let pax6passport=' '; 
  let pax7dob=' ';
  let pax7name=' ';
  let pax7nationality=' ';
  let pax7passport=' '; 
  let pax8dob=' ';
  let pax8name=' ';
  let pax8nationality=' ';
  let pax8passport=' '; 

  let paxnbr=' ';
  let thrusameflt=' ';

     if(values.pax1name !== undefined && values.pax1name !=='' ){
      pax1rank ='PAX';
      pax1name =values.pax1name;
      pax1dob=values.pax1dob;
      pax1nationality=values.pax1nationality;
      pax1passport=values.pax1passport;
      paxnbr = 1;
      thrusameflt = 0;
    }

    if(values.pax2name !== undefined && values.pax2name !==''){
      pax2rank='PAX';
      pax2name =values.pax2name;
      pax2dob=values.pax2dob;
      pax2nationality=values.pax2nationality;
      pax2passport=values.pax2passport;
      paxnbr = 2;
    }
    if(values.pax3name !== undefined && values.pax3name !==''){
      pax3rank='PAX';
      pax3dob=values.pax3dob;
      pax3name =values.pax3name;
      pax3nationality=values.pax3nationality;
      pax3passport=values.pax3passport;
      paxnbr = 3;
    }
    if(values.pax4name !== undefined && values.pax4name !==''){
      pax4rank='PAX';
      pax4dob=values.pax4dob;
      pax4name =values.pax4name;
      pax4nationality=values.pax4nationality;
      pax4passport=values.pax4passport;
      paxnbr = 4;
    }
    if(values.pax5name !== undefined && values.pax5name !==''){
      pax5rank='PAX';
      pax5dob=values.pax5dob;
      pax5name =values.pax5name;
      pax5nationality=values.pax5nationality;
      pax5passport=values.pax5passport;
      paxnbr = 5;
    }
    if(values.pax6name !== undefined && values.pax6name !==''){
      pax6rank='PAX';
      pax6dob=values.pax6dob;
      pax6name =values.pax6name;
      pax6nationality=values.pax6nationality;
      pax6passport=values.pax6passport;
      paxnbr = 6;
    }
    if(values.pax7name !== undefined && values.pax7name !==''){
      pax7rank='PAX';
      pax7dob=values.pax7dob;
      pax7name =values.pax7name;
      pax7nationality=values.pax7nationality;
      pax7passport=values.pax7passport;
      paxnbr = 7;
    }
    if(values.pax8name !== undefined && values.pax8name !==''){
      pax8rank='PAX';
      pax8dob=values.pax8dob;
      pax8name =values.pax8name;
      pax8nationality=values.pax8nationality;
      pax8passport=values.pax8passport;
      paxnbr = 8;
    }
  

if(acmCorr[0]===undefined){
  acmCorr=[{
    rank: '',
    rankNbr: '',
    fullname: '',
    dob: '',
    nationality: '',
    passport: '',
    passportValidity: '',
  }]
}


 if(fullname3.value ==='No stw'){
  fullname3.value='';
 }


 date = new Date(startDate.value);

 const validDate = date.getDate() +'.' + (date.getMonth()+1) + '.'+ date.getFullYear();


return `
<!doctype html>
<html>
 <head>
    <meta charset="utf-8">
    <title>General declaration</title>
    <style>
    * {box-sizing: border-box;}

    .main {

      margin: auto;
      padding: 30px;


      font-size: 16px;
      line-height: 24px;
      font-family: 'Helvetica Neue', 'Helvetica';

    }

    .main-header {
      max-width: 780px;
      height: 200px; /* visinu vratiti na max-width */
      border: solid 1.5px black;
      margin: 0;
    }
    .container-header {
      display: flex;
      flex-direction: column;
    }
    .row-item {
      _outline:dotted 1px green;
      flex:
      margin: 0;
      _width: 100%;
    }

    h1 {
      text-transform: uppercase;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      line-height: 1;
      margin: 10px 0 0;
    }
    h2 {
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      line-height: 1;
      margin: 5px 0 26px;
    }

    .box-3, .box-4, .box-5 {
      margin-bottom: 17px;
    }

    .header {

      margin: 0;
      padding-left: 15px;
      line-height: 1;
      font-size: 12px;
    }
    .empty {
      flex: 1;
      border-bottom: dotted 1px;
      margin-left: 5px;
      margin-right: 15px;
    }
    .box-4 {
      display: flex;
    }
    .box-5 {
      display: flex;
      margin-bottom: 4px;
    }
    .box-6 {
      display: flex;
      justify-content: space-evenly;
    }
    .box-6 p.header:last-child {
      transform: translateX(50%);
    }
    .box-7 {
      border: solid 1.5px black;
      _border-top: none;
      width:100%;
      margin: 5px 0;
      height:45px;
    }
    .box-7-1 {
      text-transform: uppercase;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      line-height: 1.6;
      margin: 0;
      padding-top: 5px;
    }
      .box-7-2 {
      font-size: 10px;
      text-align: center;
      line-height: 1.6;
      margin: 0;
      }

      /***************************
            TABLE CSS
      ****************************/

      .tg  {
        border-collapse:collapse;
        border-spacing:0;
        max-width: 780px;
        width: 100%;
        margin:5px auto 0;
      }

        .tg td{
          border-color:black;
          border-style:solid;
          border-width:1px;
          font-size:12px;
          overflow:hidden;
          padding:10px 8px;
          word-break:normal;
        }
        .tg th{
         border-color:black;
         border-style:solid;
         border-width:1px;

         overflow:hidden;
         padding:8px 3px;
         word-break:normal;
        }
             .tg .tg-baqh{text-align:center;vertical-align:top; width: 10%}
             .tg .tg-0lax{text-align:left;vertical-align:top; width: 20%; padding:0 0 0 10px}

             .tg .tg-col1 {
               text-align: center;
               vertical-align: middle;
               width: 6%;
             }
             .tg .tg-col2 {
              text-align: center;
              vertical-align: middle;
              width: 38%;
             }

             .tg .tg-col3 {
              text-align: center;
              vertical-align: middle;
              width: 13%;
             }
             .tg .tg-col4 {
              text-align: center;
              vertical-align: middle;
              width: 15%;
             }
             .tg .tg-col5 {
              text-align: center;
              vertical-align: middle;
              width: 27%;
             }
             .row1 {
              margin: 0;
              text-transform: uppercase;
              font-weight: bold;
              line-height: 1.4;
              border-top: none;
              font-size: 12px;
            }
            .row1 .tg-col5 {
              font-size: 10px;
            }

            .container-table {

              font-size: 9px;
              line-height: 20px;
            }
            .table-box {
              margin-bottom: 18px;
            }
            .table-row {
              display: flex;
              justify-content: flex-start;
              margin: 0;
              padding-top: 10px;
            }
            p.sidebar {
              margin:0;
              line-height: 1;
              font-size: 10px;
              padding-right: 5px;
            }
            p.sidebar-italic {
              font-style: italic;
              font-size: 10px;
              line-height: 1;
              margin:0;
            }


            .table-row .empty {
              flex: 1;
              border-bottom: dotted 1px;
              margin: 0;
            }
            /***************************
            FOOTER STYLE
            ***************************/

            .main-footer {
              max-width: 780px;
              height: 380px; /* visinu vratiti na max-width */
              _border: solid 1.5px black;
              margin: 5px auto 0;
            }
            .container-header {
              display: flex;
              flex-direction: column;

            }
            .footer {
              margin: 0;
              padding-left: 15px;
              line-height: 1;
              font-size: 10px;
            }
            .f-row-1 {
              display: flex;
              _height: 220px; /* izmeniti u procente?*/
              margin: 0;
              border: solid 1.5px black;
              _padding: 0;
            }
            .f-col-1 {
              display: flex;
              flex-direction: column;
              width: 570px; /*izmeniti u max-width?*/
              border-right: solid 1.5px black;
              margin: 0;
              padding: 0;
            }
            .f-col-2 {
              width: 200px; /*izmeniti u max-width?*/
              text-align: center;
              vertical-align: text-top;
              margin: 0;
            }
            .f-col-1 .footer {
              padding: 10px 15px 10px;
              text-align: justify;
              line-height: 1.4;
            }
            .f-col-2 .footer {
              padding: 10px 15px 0;
              text-transform: uppercase;
              text-decoration: underline;
              font-weight: bold;
              line-height: 1.4;
              position:fixed;
              top:670px;
              right:34px;
            }
            .row-box-1, .row-box-2, .row-box-3  {
              border-bottom: solid 1.5px black;
            }
            .row-box-1 h3 {
              font-size: 12px;
              text-transform: uppercase;
              _text-decoration: underline;
              font-weight: bold;
              line-height: 1.4;
              text-align: center;
              _padding: 10px 15px;
              margin: 5px 5px 0;
            }
            .span-footer {
              display: inline-block;
              font-weight: bold;
              float: right;
            }

            .row-box-4 p.footer:first-child {
              padding-top: 20px;
              padding-bottom: 0;
            }
            .row-box-4 p.footer:last-child {
              padding: 0;
              transform: translateX(130px);

            }
            .f-row-2 {
              height: 215px; /* izmeniti u procente?*/
              margin: 0;
              border: solid 1.5px black;
              border-top: none;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            p.footer {
              padding-top: 10px ;

            }
            .f-row-2 .signature-row {
              _flex:1;
              padding-top: 80px;
              padding-right: 30px;
              text-align: right;
            }
            .f-row-2 .signature-underline-row p.footer {
              padding-right: 50px;
              padding-top: 3px;
              text-align: right;
            }
            .f-row-2 .note-footer {
              padding-bottom: 10px;
            }
            .clearfix::after {
                  content: "";
                  clear: both;
                  display: table;
            }
    </style>
 </head>
 <body>
    <div class="main" >
       <!--MAIN HEADER-->
       <header class="main-header">
          <div class="container-header">
             <div class="row-item box-1">
                <h1>General Declaration</h1>
             </div>
             <div class="row-item box-2">
                <h2>(Outward/Inward)</h2>
             </div>
             <div class="row-item box-3">
              <div class="clearfix" style="width:100%; margin:0; box-sizing: border-box">
                <div style="float:left; padding:0 10px; width:10%;">
                  <p style="margin:0; text-align: left; font-size:12px; line-height:1.6;">Operator</p>
                </div>
                <div style="float:left; padding:0 10px; width:90%;">
                  <div style="border-bottom: dotted 1px; height: 12px; padding-left:15px; padding-bottom:20px; line-height:1; color:#555;">Aviation</div>
                </div>
              </div>
             </div>
             <div class="row-item box-4 ">
                <div class="clearfix" style="width:100%; margin:0; box-sizing: border-box">
                 <div style="float:left; padding:0 10px; width:32%;">
                   <p style="margin:0; text-align: left; font-size:12px; line-height:2;">Marks of Nationality and Registration</p>
                 </div>
                 <div style="float:left; padding:0 10px; width:17%;">
                   <div style="border-bottom: dotted 1px; height: 12px; padding-left:15px; padding-bottom:25px; color:#555;">${aircraft.value}</div>
                 </div>
                 <div style="float:left; padding:0 10px; width:11%;">
                   <p style="margin:0; font-size:12px; line-height:2;">Flight No.</p>
                 </div>
                 <div style="float:left; padding:0 10px; width:17%;">
                   <div style="border-bottom:dotted 1px; height: 12px; padding-left:15px; padding-bottom:25px; color:#555; ">${aircraftCorr[0].callsign}</div>
                 </div>
                 <div style="float:left; padding:0 10px; width:6%;">
                   <p style="margin:0; font-size:12px; line-height:2;">Date</p>
                 </div>
                 <div style="float:left; padding:0 10px; width:17%;">
                   <div style="border-bottom:dotted 1px; height: 12px; padding-left:15px; padding-bottom:25px; color:#555; ">${validDate}</div>
                 </div>
                </div>
             </div>
              <div class="row-item box-5 ">
                <div class="clearfix" style="width:100%; margin:0; box-sizing: border-box">
                  <div style="float:left; padding:0 10px; width:15%;">
                    <p style="margin:0; text-align: left; font-size:12px; line-height:2;">Deaprture from</p>
                  </div>
                  <div style="float:left; padding:0 10px; width:37%;">
                    <div style="border-bottom: dotted 1px; height: 12px; padding-left:15px; padding-bottom:25px; color:#555;">${originCorr[0].city}, ${originCorr[0].country}</div>
                  </div>

                  <div style="float:left; padding:0 10px; width:11%;">
                    <p style="margin:0; font-size:12px; line-height:2;">Arrival to.</p>
                  </div>
                  <div style="float:left; padding:0 10px; width:37%;">
                    <div style="border-bottom:dotted 1px; height: 12px; padding-left:15px; padding-bottom:25px; color:#555; ">${destinationCorr[0].city}, ${destinationCorr[0].country}</div>
                  </div>

              </div>
             </div>
             <div class="row-item box-6">
             <div class="clearfix" style="width:100%; margin:0; box-sizing: border-box">
               <div style="float:left; padding:0 10px; width:25%;">
                  <div style="height: 10px;"></div>
               </div>
               <div style="float:left; padding:0 10px; width:20%;">
                 <p style="margin:0; text-align: left; font-size:10px; line-height:1;">(Place and Country)</p>
               </div>
               <div style="float:left; padding:0 10px; width:28%;">
                 <div style="height: 10px;"></div>
               </div>

               <div style="float:left; padding:0 10px; width:20%;">
                 <p style="margin:0; font-size:10px; line-height:1;">(Place and Country)</p>
               </div>
               <div style="float:left; padding:0 10px; width:7%;">
                 <div style="height: 10px; "></div>
               </div>
             </div>
          </div>
       </header>

    <!--MAIN HEADER END-->
             <div class="box-7">
                <p class="box-7-1">Flight Routing </p>
                <p class="box-7-2">(“Place” column always to list origin, every en-route stop and destination)<p>
             </div>

    <!--TABLE-->

     <table class="tg">
       <thead>
         <tr class="row1">
           <th class="tg-col1">Rank</th>
           <th class="tg-col2">Name</th>
           <th class="tg-col3">Date of birth</th>
           <th class="tg-col4">Passport #</th>
           <th class="tg-col5">Number of passengers<br>On this stage*</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td class="tg-baqh" style="padding:0">${captCorr[0].rank}</td>
           <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left; height:28px; vertical-align:middle;">${fullname1.value}</td>
           <td class="tg-baqh" style="padding:0;">${captCorr[0].dob}</td>
           <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;">${captCorr[0].nationality}  ${captCorr[0].passport}</td>
           <td class="tg-0lax" rowspan="12">
              <div class="container-table" style="margin-top:10px;">
                <div class="table-box">
                   <p class="sidebar-italic">Departure place: ${origin.value}</p>
                   <div class="table-row">
                      <p class="sidebar">Embarking:${paxnbr}</p>
                      <div class="empty"></div>
                   </div>
                   <div class="table-row">
                      <p class="sidebar">Through on same flight:${thrusameflt}</p>
                      <div class="empty"></div>
                   </div>
                </div>
                <div class="table-box">
                   <p class="sidebar-italic">Arrival place:${destination.value}</p>
                   <div class="table-row">
                      <p class="sidebar">Disembarking:${paxnbr}</p>
                      <div class="empty"></div>
                   </div>
                   <div class="table-row">
                      <p class="sidebar">Through on same flight:${thrusameflt}</p>
                      <div class="empty"></div>
                   </div>
                </div>
              </div>
           </td>
         </tr>
         <tr>
         <td class="tg-baqh" style="padding:0">${foCorr[0].rank}</td>
         <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px; vertical-align:middle;">${fullname2.value}</td>
         <td class="tg-baqh" style="padding:0;">${foCorr[0].dob}</td>
         <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;">${foCorr[0].nationality}  ${foCorr[0].passport}</td>
         </tr>
         <tr>
         <td class="tg-baqh" style="padding:0" >${acmCorr[0].rank}</td>
         <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px; ">${fullname3.value}</td>
         <td class="tg-baqh" style="padding:0;">${acmCorr[0].dob}</td>
         <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;">${acmCorr[0].nationality}  ${acmCorr[0].passport}</td>
        </tr>
         <tr >
          <td class="tg-baqh" style="padding:0;height:28px;">${pax1rank}</td>
          <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px;vertical-align:middle;">${pax1name}</td>
          <td class="tg-baqh" style="padding:0;height:28px;">${pax1dob}</td>
          <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;height:28px;">${pax1nationality}  ${pax1passport}</td>
        </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax2rank}</td>
          <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px;vertical-align:middle;">${pax2name}</td>
          <td class="tg-baqh" style="padding:0;height:28px;">${pax2dob}</td>
          <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;height:28px;">${pax2nationality}  ${pax2passport}</td>
        </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax3rank}</td>
          <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px;vertical-align:middle;">${pax3name}</td>
          <td class="tg-baqh" style="padding:0;height:28px;">${pax3dob}</td>
          <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;height:28px;">${pax3nationality}  ${pax3passport}</td>
        </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax4rank}</td>
          <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px;vertical-align:middle;">${pax4name}</td>
          <td class="tg-baqh" style="padding:0;height:28px;">${pax4dob}</td>
          <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;height:28px;">${pax4nationality}  ${pax4passport}</td>
        </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax5rank}</td>
         <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;height:28px;vertical-align:middle;">${pax5name}</td>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax5dob}</td>
         <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;height:28px;">${pax5nationality}  ${pax5passport}</td>
        </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax6rank}</td>
         <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;vertical-align:middle;">${pax6name}</td>
         <td class="tg-baqh" style="padding:0">${pax6dob}</td>
         <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;">${pax6nationality}  ${pax6passport}</td>
         </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax7rank}</td>
         <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;vertical-align:middle;">${pax7name}</td>
         <td class="tg-baqh" style="padding:0">${pax7dob}</td>
         <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;">${pax7nationality}  ${pax7passport}</td>
         </tr>
         <tr>
         <td class="tg-baqh" style="padding:0;height:28px;">${pax8rank}</td>
         <td class="tg-0lax" style="padding:0 0 0 15px;text-align:left;vertical-align:middle;">${pax8name}</td>
         <td class="tg-baqh" style="padding:0">${pax8dob}</td>
         <td class="tg-baqh" style="padding:0 0 0 10px; text-align:left;">${pax8nationality}  ${pax8passport}</td>
         </tr>

       </tbody>
       </table>
    <!--TABLE END-->

    <!--FOOTER-->
  <footer class="main-footer">
       <div class="container-footer">
              <div class="f-row-1">
                  <div class="f-col-1">
                      <div class="row-box-1">
                      <h3>Declaration of health</h3>
                      <p class="footer">Persons on board with illness other then sickness of the effects of accidents (including persons with symptoms or signs of illness such as rash, fever, chills, and diarrhea) as those cases of illness disembarked during the flight: <span class="span-footer">NIL</span></p>
                      </div>
                      <div class="row-box-2">
                        <p class="footer">Any other condition on board which may lead t spread of disease:<span class="span-footer">NIL</span></p>
                      </div>
                      <div class="row-box-3">
                        <p class="footer">Details of each disinfecting or sanitary treatment (place, date, time, method) during the flight. If no disinfecting has been carried out during the flight, give details of most recent disinfecting:<span class="span-footer">NIL</span>
                          </p>
                      </div>
                      <div class="row-box-4">
                        <p class="footer">Signed, if required: ................................................................</p>
                        <p class="footer" style="padding-left:120px;">&nbsp&nbsp&nbsp&nbsp&nbspCrew member concerned</p>
                      </div>
                  </div>
                  <div class="f-col-2">
                      <p class="footer">For official use only</p>
                  </div>
                </div>
            <div class="f-row-2">
              <p class="footer">I declare that all statements and particulars contained in this General Declaration and any supplementary forms required to be presented with this General Declaration, are complete, exact and true to the best of my knowledge and that all though passengers will continue/have continued on the flight.</p>
              <div class="signature-row">
                <div class="empty-signature"></div>
                <p class="footer">.............................................................................</p>
              </div>
              <div class="signature-underline-row">
                <p class="footer">Authorized Agent or Pilot in Command</p>
              </div>
              <div class="note-footer">
                  <p class="footer">*Not to be completed when passenger manifests are presented and to be completed only when required by the State.</p>
              </div>
            </div>   
       </div>
  </footer>
    <!--FOOTER END-->

</body>
</html>

  `;
};
