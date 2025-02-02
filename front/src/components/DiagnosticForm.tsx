import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import { Toaster, toast } from "sonner";
import { useAuth } from "../context/AuthContext";

// Estructura para Typescript
interface DiagnosticFormInputs {
  Type: string;
  DescripCorp: string;
  SelectArea: string;
  Question1: string;
  Question2: string;
  Question3: string;
  Question4: string;
  Question5?: string;
  IdProduct: string[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const schema = yup.object({
  Type: yup.string().required("El campo es obligatorio"),
  DescripCorp: yup.string().required("El campo es obligatorio."),
  SelectArea: yup.string().required("El campo es obligatorio."),
  Question1: yup.string().required("El campo es obligatorio."),
  Question2: yup.string().required("El campo es obligatorio"),
  Question3: yup.string().required("El campo es obligatorio"),
  Question4: yup.string().required("El campo es obligatorio"),
  Question5: yup.string().optional(),
  IdProduct: yup.array().of(yup.string()).required("El campo es obligatorio"),
});

const DiagnosticForm: React.FC = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiagnosticFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<DiagnosticFormInputs> = async (data) => {
    console.log("Enviando datos:", data);
    try {
      await api.post("/diagnostics/new", data);
      toast.success("Formulario enviado correctamente!");
    } catch (err) {
      console.error("Error en la petición:", err);
      const error = err as ApiError;
      toast.error(
        error.response?.data?.message ||
          "Ocurrió un error al enviar el formulario."
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Toaster position="bottom-right" richColors />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 justify-center items-center gap-4 p-8"
      >
        <div className="flex flex-col w-full gap-2">
          <label>¿Eres empresa o emprendedor?</label>
          <select
            className="border-sky-50 border-2 rounded-lg p-1"
            {...register("Type")}
          >
            <option value="EMPRENDEDOR">Emprendedor</option>
            <option value="EMPRESA">Empresa</option>
          </select>
          {errors.Type && <p>{errors.Type.message}</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>Descripción del proyecto </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("DescripCorp")}
            placeholder="Ingresa el nombre de la empresa"
          />
          {errors.DescripCorp && <p>{errors.DescripCorp.message}</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>Área de trabajo </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("SelectArea")}
            placeholder="Ingresa el nombre de la área de trabajo"
          />
          {errors.SelectArea && <p>{errors.SelectArea.message}</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Qué tan efectivo consideras tu liderazgo para inspirar y conectar
            con otros?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("Question1")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.Question1 && <p>{errors.Question1.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Qué tan claro y persuasivo es tu mensaje al hablar de tus ideas,
            proyectos o visión?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("Question2")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.Question2 && <p>{errors.Question2.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Cuentas con las herramientas necesarias para validar tus ideas o
            proyectos en el mercado?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("Question3")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.Question3 && <p>{errors.Question3.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label>
            ¿Tienes acceso a talento o equipos que puedan ayudarte a
            materializar tus ideas o proyectos?
          </label>
          <input
            className="border-sky-50 border-2 rounded-lg p-1"
            type="text"
            {...register("Question4")}
            placeholder="Escribe tu respuesta aquí..."
          />
          {errors.Question4 && <p>{errors.Question4.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-2">

          <label>¿Necesitas agregar algo más?</label>
          <textarea
            {...register("Question5")}
            placeholder="Escribe tus comentarios aquí..."
          ></textarea>
        </div>
        <div className="flex flex-col w-full gap-2 items-start">
          <label>¿En qué servicios estás interesado?</label>
          <div>
            <input
              type="checkbox"
              value="Servicio 1"
              {...register("IdProduct")}
            />
            <label className="ml-2">Servicio 1</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Servicio 2"
              {...register("IdProduct")}
            />
            <label className="ml-2">Servicio 2</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Servicio 3"
              {...register("IdProduct")}
            />
            <label className="ml-2">Servicio 3</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Servicio 4"
              {...register("IdProduct")}
            />
            <label className="ml-2">Servicio 4</label>
          </div>
          {errors.IdProduct && (
            <p>{errors.IdProduct.message}</p>
          )}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default DiagnosticForm;
