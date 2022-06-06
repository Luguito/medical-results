// const apiUrl = new URL("https://huninorte.herokuapp.com/api/result")
const apiUrl = new URL("http://172.23.0.10:4000/api/result")

export const get = (url: string, options: RequestInit, params?: {}): Promise<any> => {
    return fetch(`${apiUrl}${url.length == 0 ? '?' + new URLSearchParams(params) : `/${url}`}`, { method: 'GET',  headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'}, ...options }).then(response => response.json());
}

export const post = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', ...options?.headers }, ...options }).then(response => response.json());
}

export const put = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, ...options }).then(response => response.json());
}

export const result = () => {
    return [
        {
        "HISCKEY": "17841942",
        "HISTIPDOC": "CC",
        "HISCSEC": "4",
        "HCPRCCOD": "902043",
        "HCPRCCNS": "1",
        "HCCONRES": "1",
        "HCDESATR": "HCResult  ",
        "HCDSCRATR": "Tiempo de Coagulacion .............: :6 minutos 39 segundos     \r\nV.Ref:5 - 15 :     \r\n :",
        "MPCEDU": "17841942",
        "MPTDOC": "CC ",
        "MPNOMC": "FELIX ANTONIO  REALES OLIVERO",
        "MPFCHN": "1952-03-25 00:00:00.000000",
        "MPSEXO": "M",
        "MPDIRE": "ARROYO HONDO",
        "MPTELE": "3016882645",
        "MPTELE2": "",
        "AGE": "70",
        "SEDE": "Sede Principal Hospital",
        "MMNOMM": "Ignacion Luis Murfol",
        "HCFECHRES": "2022-03-09 15:27:07.000"
        },
        {
        "HISCKEY": "17841942",
        "HISTIPDOC": "CC",
        "HISCSEC": "4",
        "HCPRCCOD": "902047",
        "HCPRCCNS": "1",
        "HCCONRES": "1",
        "HCDESATR": "HCResult  ",
        "HCDSCRATR": "Tiempo de Sangria .................: :1 minuto 22 segundos     \r\nV.R.         : 1 - 3  minutos :     \r\n :",
        "MPCEDU": "17841942",
        "MPTDOC": "CC ",
        "MPNOMC": "FELIX ANTONIO  REALES OLIVERO",
        "MPFCHN": "1952-03-25 00:00:00.000000",
        "MPSEXO": "M",
        "MPDIRE": "ARROYO HONDO",
        "MPTELE": "3016882645",
        "MPTELE2": "",
        "AGE": "70",
        "SEDE": "Sede Principal Hospital",
        "MMNOMM": "Ignacion Luis Murfol",
        "HCFECHRES": "2022-03-09 15:27:07.000"
        },
        {
        "HISCKEY": "17841942",
        "HISTIPDOC": "CC",
        "HISCSEC": "4",
        "HCPRCCOD": "902210",
        "HCPRCCNS": "1",
        "HCCONRES": "1",
        "HCDESATR": "HCResult  ",
        "HCDSCRATR": "CUADRO HEMATICO :     \r\n :     \r\nRecuento de Globulos Blancos :5.52 x10.e3 /uL     VR 5.0 - 10.0\r\nRecuento de Globulos Rojos :5.04 x10.e6 /uL     VR 4.0 - 5.0\r\nHemoglobina :14.9 g/dL     VR 12.0 - 16.0\r\nHematocrito :47.4 %     VR 36 - 48\r\nVolumen Corpuscular Medio (VCM) :93.9 fL     VR 76 - 96\r\nHemoglobina Corpuscular Media (HCM) :29.6 pg     VR 27.0 - 32.0\r\nConC. Hemoglobina Corpuscular Media (CHCM) :31.5 g/dL     VR 30 - 35\r\nCHMC :31.8 g/dL     VR 33 - 37\r\nCH :29.7 pg     VR 0 - 100\r\nRDW :12.9 %     VR 11.5 - 14.5\r\nHDW :2.30 g/dL     VR 2.2 - 3.2\r\nRecuento Plaquetas :232 x10.e3 /uL     VR 150 - 450\r\nVolumen Medio de Plaquetas (MPV) :8.9 fL     VR 7.2 - 11.1\r\n :     \r\n%Neutrofilos :58.8 %     VR 50.0 - 75.0\r\n%Linfocitos :28.4 %     VR 25.0 - 40.0\r\n%Monocitos :5.1 %     VR 3.4 - 9\r\n%Eosinofilos :3.2 %     VR 0 - 7\r\n�sofilos :1.9 %     VR 0 - 1.5\r\n%LUC :2.7 %     VR 0 - 9\r\n#NEUT :3.24 x10.e3 /uL     VR 1.9 - 8\r\n#LYMPH :1.57 x10.e3 /uL     VR 0.9 - 5.2\r\n#MONO :0.28 x10.e3 /uL     VR 0.16 - 1\r\n#EOS :0.18 x10.e3 /uL     VR 0 - 0.8\r\n#BASO :0.10 x10.e3 /uL     VR 0 - 0.2\r\n#LUC :0.15 x10.e3 /uL     VR 0 - 0.4\r\n :",
        "MPCEDU": "17841942",
        "MPTDOC": "CC ",
        "MPNOMC": "FELIX ANTONIO  REALES OLIVERO",
        "MPFCHN": "1952-03-25 00:00:00.000000",
        "MPSEXO": "M",
        "MPDIRE": "ARROYO HONDO",
        "MPTELE": "3016882645",
        "MPTELE2": "",
        "AGE": "70",
        "SEDE": "Sede Principal Hospital",
        "MMNOMM": "Ignacion Luis Murfol",
        "HCFECHRES": "2022-03-09 15:27:07.000"
        },
        {
        "HISCKEY": "17841942",
        "HISTIPDOC": "CC",
        "HISCSEC": "4",
        "HCPRCCOD": "903841",
        "HCPRCCNS": "1",
        "HCCONRES": "1",
        "HCDESATR": "HCResult  ",
        "HCDSCRATR": "Glicemia...........................: :105.6 mg/dl     \r\nV.Ref:  60  - 110 mg/dl :     \r\nNeonatos: :     \r\n[De 1 día: 40 - 60] :     \r\n[Menor de 1 dia: 40 - 60] :     \r\n[Mayor de 1 día: 50 - 60] :     \r\n :",
        "MPCEDU": "17841942",
        "MPTDOC": "CC ",
        "MPNOMC": "FELIX ANTONIO  REALES OLIVERO",
        "MPFCHN": "1952-03-25 00:00:00.000000",
        "MPSEXO": "M",
        "MPDIRE": "ARROYO HONDO",
        "MPTELE": "3016882645",
        "MPTELE2": "",
        "AGE": "70",
        "SEDE": "Sede Principal Hospital",
        "MMNOMM": "Ignacion Luis Murfol",
        "HCFECHRES": "2022-03-09 15:27:07.000"
        }
    ]
}


export default {
    get,
    post,
    put,
    result
}