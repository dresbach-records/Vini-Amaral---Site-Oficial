'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Email inválido',
    required_error: 'O email é obrigatório.',
  }).email({ message: 'Endereço de email inválido.' }),
})

export async function saveEmail(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Não foi possível salvar o email.'
    }
  }

  // Simulate saving to a database
  console.log('Email salvo com sucesso:', validatedFields.data.email);

  return { 
    message: `Obrigado! Seu email (${validatedFields.data.email}) foi registrado com sucesso.`,
    errors: null,
    reset: true, // Flag to reset the form on the client
  }
}
