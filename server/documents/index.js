module.exports = ({
    evaluationMaturaElective1,
    evaluationMaturaElective2,
    evaluationMaturaElective3,
    percentagesTotal,
    totalGradePoints,
    pointsMaturaCroatian,
    pointsMaturaMathematics,
    pointsMaturaEnglish,
    pointsMaturaElective1,
    pointsMaturaElective2,
    pointsMaturaElective3,
    pointsExtraField1,
    pointsExtraField2,
    pointsExtraField3,
    evaluationExtraField1,
    evaluationExtraField2,
    evaluationExtraField3,
    totalMaturaPoints,
    universityName,
    evaluationMaturaElective1Name,
    evaluationMaturaElective2Name,
    evaluationMaturaElective3Name,
}) => {
    const today = new Date();
    return `
    <!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>PDF Result Template</title>
    <style>
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }

        .margin-top {
            margin-top: 50px;
        }

        .justify-center {
            text-align: center;
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }

        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }

        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
            border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }

            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title"><img src="https://i.imgur.com/8rR1ydy.jpg"
                                    style="width:100%; max-width:156px;"></td>
                            <td>
                                Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                Kalkulator bodova za maturu
                                <br>kalkulatorzamaturu.com
                            </td>
                            <td>
                                Fakultet koji ste odabrali:
                                <br>${universityName}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="heading">
                <td>Prosjek ocjena srednje škole</td>
                <td>Prosjek i broj bodova</td>
            </tr>
            <tr class="item">
                <td>Prosjek ocjena srednje škole: </td>
                <td>${(percentagesTotal / 4).toFixed(2)}</td>
            </tr>
            <tr class="item">
                <td>Broj bodova od prosjeka ocjena: </td>
                <td>${totalGradePoints}</td>
            </tr>
            <br />
            <tr class="heading">
                <td>Rezultati državne mature</td>
                <td>Broj bodova</td>
            </tr>
            <tr class="item">
                <td>Broj bodova od mature iz Hrvatskog jezika:</td>
                <td>${pointsMaturaCroatian}</td>
            </tr>
            <tr class="item">
                <td>Broj bodova od mature iz Matematike:</td>
                <td>${pointsMaturaMathematics}</td>
            </tr>
            <tr class="item">
                <td>Broj bodova od mature iz Engleskog jezika:</td>
                <td>${pointsMaturaEnglish}</td>
            </tr>
            ${evaluationMaturaElective1 ? (
                `<tr class="item">
                    <td>Broj bodova od mature - ${evaluationMaturaElective1Name}:</td>
                    <td>${pointsMaturaElective1}</td>
                </tr>`
                ) : '<span />'}
            ${evaluationMaturaElective2 ? (
                `<tr class="item">
                    <td>Broj bodova od mature - ${evaluationMaturaElective2Name}:</td>
                    <td>${pointsMaturaElective2}</td>
                </tr>`
            ) : '<span />'}
            ${evaluationMaturaElective3 ? (
                `<tr class="item">
                    <td>Broj bodova od mature - ${evaluationMaturaElective3Name}:</td>
                    <td>${pointsMaturaElective3}</td>
                </tr>`
            ) : '<span />'}
            ${evaluationExtraField1 ? (
                `<tr class="item">
                                <td>Broj bodova od 1. dodatne provjere</td>
                                <td>${pointsExtraField1}</td>
                            </tr>`
            ) : '<span />'}
            ${evaluationExtraField2 ? (
                `<tr class="item">
                                    <td>Broj bodova od 2. dodatne provjere: </td>
                                    <td>${pointsExtraField2}</td>
                                </tr>`
            ) : '<span />'}
            ${evaluationExtraField3 ? (
                `<tr class="item">
                                    <td>Broj bodova od 3. dodatne provjere:</td>
                                    <td>${pointsExtraField3}</td>
                                </tr>`
            ) : '<span />'}
        </table>
        <hr class="margin-top" />
        <h1 class="justify-center">Ukupan broj bodova: ${totalMaturaPoints + totalGradePoints}/1000</h1>
    </div>
</body>

</html>`;
};