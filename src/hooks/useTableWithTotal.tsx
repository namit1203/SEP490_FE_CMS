import { TableProps } from 'antd'
import { useState, useMemo, useEffect } from 'react'

interface UseTableWithTotalProps<DataType> {
  data: DataType[]
  columns: TableProps<DataType>['columns']
  priceKey: keyof DataType // Key for price field (e.g., 'vehiclePrice')
}

export function useTableWithTotal<DataType>({ data, columns, priceKey }: UseTableWithTotalProps<DataType>) {
  const [filteredData, setFilteredData] = useState<DataType[]>(data || [])

  useEffect(() => {
    if (data) {
      setFilteredData(data)
    }
  }, [data])

  // Dynamic total price calculation
  const totalPrice = useMemo(
    () =>
      filteredData.reduce((total, item) => {
        return total + ((item[priceKey] as unknown as number) || 0)
      }, 0),
    [filteredData, priceKey]
  )

  // Table props with onChange to update filtered data
  const tableProps = {
    columns,
    dataSource: data?.map((item, index) => ({ ...item, key: index })),
    onChange: (_pagination: any, _filters: any, _sorter: any, extra: any) => {
      setFilteredData(extra.currentDataSource || [])
    }
  }

  return { totalPrice, tableProps, filteredData }
}
