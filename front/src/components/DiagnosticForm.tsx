import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import { Toaster, toast } from "sonner";

// Estructura para Typescript
interface DiagnosticFormInputs {
  companyName: string;
  companyDescription: string;
  area: string;
  leadershipEffectiveness: string;
  messageClarity: string;
  marketValidationTools: string;
  accessToTalent: string;
  additionalComments?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const onSubmit: SubmitHandler<DiagnosticFormInputs> = async (data) => {
  try {
    await api.post("/diagnostics/new", data);
    toast.success("Formulario enviado correctamente!");
  } catch (err) {
    const error = err as ApiError;
    toast.error(
      error.response?.data?.message || "Ocurrió un error al enviar el formulario."
    );
  }
};

const schema = yup.object({
  companyName: yup.string().required("El nombre de la empresa es obligatorio."),
  companyDescription: yup.string().required("El campo es obligatorio."),
  area: yup.string().required("El campo es obligatorio."),
  leadershipEffectiveness: yup.string().required("El campo es obligatorio."),
  messageClarity: yup.string().required("El campo es obligatorio"),
  marketValidationTools: yup.string().required("El campo es obligatorio"),
  accessToTalent: yup.string().required("El campo es obligatorio"),
  additionalComments: yup.string().optional(),
});

const DiagnosticForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiagnosticFormInputs>({
    resolver: yupResolver(schema), // Integrar Yup para validación
  });

  return (
    <div className="flex items-center justify-center">
      <Toaster position="bottom-right" richColors/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 justify-center items-center gap-4 p-8"
      >
        <div className="flex flex-col w-full gap-2">
          <label>Nombre de la empresa/emprendedor</label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("companyName")}
            placeholder="Ingresa el nombre de la empresa"
          />
          {errors.companyName && <p>{errors.companyName.message}</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>Descripción del proyecto </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("companyDescription")}
            placeholder="Ingresa el nombre de la empresa"
          />
          {errors.companyDescription && (
            <p>{errors.companyDescription.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>Área de trabajo </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("area")}
            placeholder="Ingresa el nombre de la área de trabajo"
          />
          {errors.area && <p>{errors.area.message}</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Qué tan efectivo consideras tu liderazgo para inspirar y conectar
            con otros?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("leadershipEffectiveness")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.leadershipEffectiveness && (
            <p>{errors.leadershipEffectiveness.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Qué tan claro y persuasivo es tu mensaje al hablar de tus ideas,
            proyectos o visión?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("messageClarity")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.messageClarity && <p>{errors.messageClarity.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Cuentas con las herramientas necesarias para validar tus ideas o
            proyectos en el mercado?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("marketValidationTools")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.marketValidationTools && (
            <p>{errors.marketValidationTools.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Tienes acceso a talento o equipos que puedan ayudarte a
            materializar tus ideas o proyectos?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("accessToTalent")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.accessToTalent && <p>{errors.accessToTalent.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>¿Necesitas agregar algo más?</label>
          <textarea
            {...register("additionalComments")}
            placeholder="Escribe tus comentarios aquí..."
          ></textarea>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default DiagnosticForm;