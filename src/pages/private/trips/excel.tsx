/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Button, message, Select, Table } from 'antd'

// import { useAddVehiclesFromExcelMutation, useImportExcel } from '@/queries/vehicle'

import { HttpStatusCode } from 'axios'
import { useNavigate } from 'react-router-dom'

import TemplateTripConvenience from '@/assets/Template_Trip_Convenience.xlsx'
import TemplateInterProvincial from '@/assets/Template_Inter_Provincial.xlsx'
import { useImportExcel } from '@/queries/trip'

interface DownloadExcelProps {
  exportedFile: boolean
  setExportedFile: (value: boolean) => void
  selectedOption: string
  setSelectedOption: (value: string) => void
}

export const processValidEntriesAndColumns = (responseData: any) => {
  const entries = responseData.map((item: any) => {
    // Extract and flatten pointStartDetail
    const pointStartDetail = item.pointStartDetail || {}
    const flattenedDetails = Object.entries(pointStartDetail).reduce(
      (acc, [key, value], detailIndex) => ({
        ...acc,
        [`point_start_${detailIndex}`]: key,
        [`start_time_${detailIndex}`]: value
      }),
      {}
    )

    // Exclude unwanted keys and include flattened details
    const filteredItem = Object.fromEntries(
      Object.entries(item).filter(
        ([key]) =>
          ![
            'id',
            'status',
            'typeOfTrip',
            'pointStartDetail',
            'pointEndDetail',
            'createdAt',
            'createdBy',
            'errorMessages'
          ].includes(key)
      )
    )

    return {
      ...filteredItem,
      ...flattenedDetails
    }
  })

  // Dynamically create columns
  const dynamicColumns = entries.length
    ? [
        // Static columns
        ...Object.keys(entries[0])
          .filter((key) => !key.startsWith('point_start_') && !key.startsWith('start_time_'))
          .map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key,
            width: '550px'
          })),

        // Dynamic columns for point_start and start_time
        ...Array.from(
          new Set(
            Object.keys(entries[0])
              .filter((key) => key.startsWith('point_start_') || key.startsWith('start_time_'))
              .map((key) => key.match(/\d+$/)?.[0]) // Extract the index
          )
        )
          .sort((a, b) => Number(a) - Number(b)) // Sort indices numerically
          .flatMap((index) => [
            {
              title: `Point Start (${Number(index) + 1})`,
              dataIndex: `point_start_${index}`,
              key: `point_start_${index}`,
              width: '550px'
            },
            {
              title: `Start Time (${Number(index) + 1})`,
              dataIndex: `start_time_${index}`,
              key: `start_time_${index}`,
              width: '550px'
            }
          ])
      ]
    : []

  return { entries, dynamicColumns }
}

const DownloadExcel: React.FC<DownloadExcelProps> = ({
  selectedOption,
  setSelectedOption,
  exportedFile,
  setExportedFile
}) => {
  const { Option } = Select

  const downloadFile = async () => {
    try {
      const fileUrl = selectedOption === '1' ? TemplateInterProvincial : TemplateTripConvenience
      const fileName = selectedOption === '1' ? 'Template_Inter_Provincial.xlsx' : 'Template_Trip_Convenience.xlsx'
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      setExportedFile(true)
    } catch (error) {
      console.error('Error downloading the file:', error)
    }
  }

  const handleSelectChange = (value: string) => {
    setSelectedOption(value)
  }

  return (
    <div>
      <Select
        disabled={exportedFile}
        style={{ width: 200, marginRight: 20 }}
        placeholder='Choose an option'
        onChange={handleSelectChange}
      >
        <Option value='1'>Template Trip Inter Provincial</Option>
        <Option value='2'>Template Trip Convenience</Option>
      </Select>

      {selectedOption && (
        <Button style={{ marginRight: 20 }} disabled={exportedFile} onClick={downloadFile}>
          Download Template Trip
        </Button>
      )}
    </div>
  )
}

const ExcelTripPage = () => {
  const [selectedOption, setSelectedOption] = useState('1')
  const [exportedFile, setExportedFile] = useState(true)
  const [fileName, setFileName] = useState('')
  const [data, setData] = useState({ validEntries: [], invalidEntries: [], hasData: false })
  const addMutation = useImportExcel()
  // const importVehicleFromExcelMutation = useAddVehiclesFromExcelMutation()
  const navigate = useNavigate()

  const [columns, setColumns] = useState<any[]>([])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('fileExcelTrip', file)

    event.target.value = ''

    setFileName(file.name)

    try {
      const response = await addMutation.mutateAsync({ id: selectedOption, body: formData })
      if (response.status === HttpStatusCode.Ok) {
        message.success('File uploaded successfully')

        const validData = processValidEntriesAndColumns(response.data.validEntries)
        const inValidData = processValidEntriesAndColumns(response.data.invalidEntries)

        setData({
          hasData: true,
          validEntries: validData.entries,
          invalidEntries: inValidData.entries
          // invalidEntries: response.data.invalidEntries.map((item: any, index: any) => ({
          //   ...item,
          //   key: index
          // }))
        })
        setColumns(validData.dynamicColumns)
      } else {
        message.error(response)
      }
    } catch (error) {
      console.error('Error:', error)
      message.error('Upload failed')
    }
  }

  const handleImportToVehicleList = async () => {
    // console.log(data.validEntries)
    try {
      // const values = data.validEntries

      // const response = await importVehicleFromExcelMutation.mutateAsync(values)
      // if (response.status === HttpStatusCode.Ok) {
      //   message.success('Add successfully')
      //   navigate('/vehicles')
      // } else {
      //   message.error('Add failed')
      // }
      console.log('ok')
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <div>
      <DownloadExcel
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        exportedFile={exportedFile}
        setExportedFile={setExportedFile}
      />
      {/* File Upload */}
      {exportedFile && (
        <>
          <input
            type='file'
            id='file-input'
            style={{ display: 'none' }} // Hide the input
            onChange={handleFileUpload}
            accept='.xlsx, .xls'
          />
          <label
            htmlFor='file-input'
            style={{
              cursor: 'pointer',
              padding: '10px',
              background: '#4CAF50',
              color: 'white',
              borderRadius: '5px',
              marginBottom: '10px',
              display: 'inline-block'
            }}
          >
            {fileName ? fileName : 'Choose a file'}
          </label>
        </>
      )}

      <div style={{ marginTop: 20 }}>
        {data.validEntries.length > 0 && (
          <>
            <h2 style={{ marginBottom: 20 }}>Valid Data</h2>
            <Table
              columns={columns}
              dataSource={data.validEntries}
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: 400 }}
            />
          </>
        )}

        {data.invalidEntries.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, marginBottom: 20 }}>Invalid Data</h2>
            <Table columns={columns} dataSource={data.invalidEntries} bordered pagination={{ pageSize: 5 }} />
            <div>
              {/* {data.invalidEntries.map((entry: any, index) =>
                entry.errors.length > 0 ? (
                  <p style={{ marginBottom: 20 }} key={index}>
                    {entry.errors}
                  </p>
                ) : null
              )} */}
            </div>
          </>
        )}
      </div>

      {data.hasData && data.invalidEntries.length === 0 && (
        <Button onClick={() => handleImportToVehicleList()}>Import to Vehicle List</Button>
      )}
    </div>
  )
}

export default ExcelTripPage
