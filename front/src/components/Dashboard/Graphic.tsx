import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import 'chart.js/auto'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LeadsChart = () => {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://h4-02-vocaltech.onrender.com/api/airtable/leads'
        )
        const leads = response.data
        const leadsByMonth: { [key: string]: number } = {}
        leads.forEach((lead: any) => {
          if (lead.fields.TimeStart) {
            const date = new Date(lead.fields.TimeStart)
            const year = date.getFullYear()
            const month = date.getMonth()
            const key = `${year}-${month + 1}`

            leadsByMonth[key] = (leadsByMonth[key] || 0) + 1
          }
        })

        const months = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ]

        const labels = []
        const data = []
        const currentYear = new Date().getFullYear()

        for (let i = 0; i < 12; i++) {
          const key = `${currentYear}-${i + 1}`
          labels.push(months[i])
          data.push(leadsByMonth[key] || 0)
        }

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Leads por mes',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.1
            }
          ]
        })
      } catch (error) {
        console.error('Error al obtener los leads:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='p-4 bg-white rounded-lg shadow-md mx-10 lg:mb-20'>
      <h2>Movimiento de Leads por mes</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            scales: {
              y: {
                min: 0,
                ticks: {
                  stepSize: 10
                }
              }
            }
          }}
        />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  )
}

export default LeadsChart
