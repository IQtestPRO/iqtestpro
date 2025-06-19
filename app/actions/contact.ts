"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  category: z.string(),
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      category: formData.get("category") as string,
    }

    // Validação dos dados
    const validatedData = contactSchema.parse(data)

    // Simular envio de email (substitua por sua lógica de email real)
    console.log("Dados do formulário:", validatedData)

    // Aqui você integraria com um serviço de email como:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - EmailJS

    // Simular delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Mensagem enviada com sucesso! Responderemos em até 24 horas.",
    }
  } catch (error) {
    console.error("Erro ao enviar formulário:", error)
    return {
      success: false,
      message: "Erro ao enviar mensagem. Tente novamente.",
    }
  }
}
