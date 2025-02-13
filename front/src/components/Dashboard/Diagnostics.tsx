import DiagnosticTable from "./DiagnosticTable"


const Diagnostics = () => {
  return (
    <div>
      <p className='font-bold px-2 ml-6 text-black'>Diagnósticos</p>
      <div className='p-6'>
        <DiagnosticTable />
      </div>
    </div>
  )
}

export default Diagnostics
