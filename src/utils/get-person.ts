import axios from 'axios'

type ResponsePerson = {
  documentID: string
  surnames: string
  names: string
  fullName: string
  paternalLastName: string
  maternalLastName: string
}

export async function getPerson(dni: string): Promise<ResponsePerson | null> {
  const res = await axios.get<ResponsePerson>(
    `https://graphperu.daustinn.com/api/query/${dni}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'application/json'
      }
    }
  )

  if (res.status !== 200 && res.status !== 304) {
    return null
  }

  const data: ResponsePerson = {
    documentID: res.data.documentID,
    surnames: uppercase(res.data.surnames),
    names: uppercase(res.data.names),
    fullName: uppercase(res.data.fullName),
    paternalLastName: uppercase(res.data.paternalLastName),
    maternalLastName: uppercase(res.data.maternalLastName)
  }
  return data
}

const uppercase = (str: string): string => {
  return str.toUpperCase()
}
