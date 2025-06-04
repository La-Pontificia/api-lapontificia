import { Context } from 'elysia'
import { z } from 'zod'
import { db } from '../db'
import { JobPontisis } from '../schema'
import { getPerson } from '../utils/get-person'
import ExcelJS from 'exceljs'
import { eq } from 'drizzle-orm'

export async function cc_bitrix_jaguar(ctx: Context) {
  const { query, status } = ctx

  try {
    const v = z
      .object({
        dni: z.string().min(8).max(11),
        un: z.enum(['ilp', 'elp'])
      })
      .safeParse(query)

    if (!v.success) {
      return status(400, {
        message: 'Invalid query parameters',
        errors: v.error.errors
      })
    }

    const personByReniec = await getPerson(query.dni)

    // delete all doc where c_numdoc is the same
    await db.delete(JobPontisis).where(eq(JobPontisis.c_numdoc, query.dni))

    const program = getProgramCode(query.pestudio)

    const email = query.email ?? `${query.dni}@${v.data.un}.edu.pe`

    const res = await db
      .insert(JobPontisis)
      .values({
        id_fase: 4,
        status: 'processing',
        id_mod_ing: 'B',
        c_apepat: personByReniec?.paternalLastName ?? query.apaterno ?? '',
        c_apemat: personByReniec?.maternalLastName ?? query.amaterno ?? '',
        c_nombres: personByReniec?.names ?? query.nombres ?? '',
        c_tipdoc: 'DNI',
        c_numdoc: query.dni || '',
        c_email: email,
        c_codfac1: 'G', // Assuming '01' is the default faculty code,
        c_codesp1: program,
        c_sedcod: '1', // Assuming '01' is the default campus code,
        c_codmod: '1',
        id_proceso: query.periodo || '',
        id_user: '0',
        convertir_alumno: '1'
      })
      .$returningId()

    void createExcel(res[0].id)

    console.log(query)

    return status(200, query)
  } catch (error) {
    console.log(error)
    status(500, {
      message: 'Error processing request',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function createExcel(id_job: string) {
  try {
    const job = await db.query.JobPontisis.findFirst({
      where: (table, { eq }) => eq(table.id, id_job)
    })
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile('files/pontisis/template_create_student.xlsx')
    const worksheet = workbook.getWorksheet(1)
    if (!worksheet) {
      throw new Error('Worksheet not found')
    }
    const row = worksheet.getRow(2)

    row.getCell('A').value = job?.id_fase || ''
    row.getCell('B').value = job?.id_mod_ing || ''
    row.getCell('C').value = job?.c_apepat || ''
    row.getCell('D').value = job?.c_apemat || ''
    row.getCell('E').value = job?.c_nombres || ''
    row.getCell('F').value = job?.c_tipdoc || ''
    row.getCell('G').value = job?.c_numdoc || ''
    row.getCell('H').value = job?.c_email || ''
    row.getCell('I').value = job?.c_codfac1 || ''
    row.getCell('J').value = job?.c_codesp1 || ''
    row.getCell('K').value = job?.c_sedcod || ''
    row.getCell('L').value = job?.c_codmod || ''
    row.getCell('M').value = job?.id_proceso || ''
    row.getCell('N').value = job?.id_user || ''
    row.getCell('O').value = job?.convertir_alumno || ''

    row.commit()

    await workbook.xlsx.writeFile(`files/pontisis/create-${job?.c_numdoc}.xlsx`)
  } catch (error) {
    console.error('Error creating Excel file:', error)
  }
}

const PROGRAMS = {
  AE: 'ADMINISTRACIÓN DE EMPRESAS',
  CT: 'CONTABILIDAD',
  SI: 'Ingeniería de Sistemas de Información',
  ET: 'ENFERMERIA TÉCNICA'
}

function getProgramCode(program: string): string {
  const programCode = Object.entries(PROGRAMS).find(
    ([key, name]) =>
      key.toUpperCase().includes(program.toUpperCase()) ||
      name.toUpperCase().includes(program.toUpperCase())
  )
  return programCode?.[0] || ''
}
