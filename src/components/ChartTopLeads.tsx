import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatMoneyCompact } from '@/lib/format'

type Datum = {
  name: string
  value: number
}

type Props = {
  data: Datum[]
  locale: string
}

export default function ChartTopLeads({ data, locale }: Props) {
  if (data.length === 0) {
    return <div className="ix-empty">No data / adjust filters</div>
  }

  return (
    <div className="ix-card ix-chart-card">
      <h3>Top Leads by Exposure</h3>
      <div className="ix-chart-body">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip formatter={(value: number) => formatMoneyCompact(value, locale)} />
            <Bar dataKey="value" fill="var(--ix-chart-1)" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
