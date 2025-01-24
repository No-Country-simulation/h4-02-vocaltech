import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//La estructura para Typescript
interface DiagnosticFormInputs {
  companyName: string;
  leadershipEffectiveness: string;
  messageClarity: string;
  marketValidationTools: string;
  accessToTalent: string;
  additionalComments?: string;
}

const schema = yup.object({
  companyName: yup.string().required("El nombre de la empresa es obligatorio."),
  leadershipEffectiveness: yup
    .string()
    .required("Por favor, selecciona una opción."),
  messageClarity: yup.string().required("Por favor, selecciona una opción."),
  marketValidationTools: yup
    .string()
    .required("Por favor, selecciona una opción."),
  accessToTalent: yup.string().required("Por favor, selecciona una opción."),
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

  const onSubmit: SubmitHandler<DiagnosticFormInputs> = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    <div className="flex items-center justify-center ">
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
          <label>
            ¿Qué tan efectivo consideras tu liderazgo para inspirar y conectar
            con otros?
          </label>
          <select {...register("leadershipEffectiveness")}>
            <option value="">Selecciona una opción</option>
            <option value="muy_efectivo">Muy efectivo</option>
            <option value="efectivo">Efectivo</option>
            <option value="poco_efectivo">Poco efectivo</option>
          </select>
          {errors.leadershipEffectiveness && (
            <p>{errors.leadershipEffectiveness.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Qué tan claro y persuasivo es tu mensaje al hablar de tus ideas,
            proyectos o visión?
          </label>
          <select {...register("messageClarity")}>
            <option value="">Selecciona una opción</option>
            <option value="muy_claro">Muy claro</option>
            <option value="claro">Claro</option>
            <option value="poco_claro">Poco claro</option>
          </select>
          {errors.messageClarity && <p>{errors.messageClarity.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Cuentas con las herramientas necesarias para validar tus ideas o
            proyectos en el mercado?
          </label>
          <select {...register("marketValidationTools")}>
            <option value="">Selecciona una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          {errors.marketValidationTools && (
            <p>{errors.marketValidationTools.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Tienes acceso a talento o equipos que puedan ayudarte a
            materializar tus ideas o proyectos?
          </label>
          <select {...register("accessToTalent")}>
            <option value="">Selecciona una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
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
