import React, { useState } from 'react'
import { Button, message, Table } from 'antd'

import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { useAddVehiclesFromExcelMutation, useImportExcel } from '@/queries/vehicle'
import { HttpStatusCode } from 'axios'
import { useNavigate } from 'react-router-dom'

interface DownloadExcelProps {
  exportedFile: boolean
  setExportedFile: (value: boolean) => void
}

const DownloadExcel: React.FC<DownloadExcelProps> = ({ exportedFile, setExportedFile }) => {
  const token = useLocalStorage.getLocalStorageData('token')

  const downloadFile = async () => {
    try {
      const response = await fetch('https://boring-wiles.202-92-7-204.plesk.page/api/Vehicle/export_template_vehicel', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'template_vehicle.xlsx'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setExportedFile(true)
    } catch (error) {
      console.error('Error downloading the file:', error)
    }
  }

  return (
    <Button style={{ marginRight: 20 }} disabled={exportedFile} onClick={downloadFile}>
      Download Template Vehicle
    </Button>
  )
}

const ExcelTripPage = () => {
  const [exportedFile, setExportedFile] = useState(false)
  const [fileName, setFileName] = useState('')
  const [data, setData] = useState({ validEntries: [], invalidEntries: [], hasData: false })
  const addMutation = useImportExcel()
  const importVehicleFromExcelMutation = useAddVehiclesFromExcelMutation()
  const navigate = useNavigate()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('fileExcleVehicel', file)

    event.target.value = ''

    setFileName(file.name)

    try {
      const response = await addMutation.mutateAsync(formData)
      if (response.status === HttpStatusCode.Ok) {
        message.success('File uploaded successfully')
        setData({
          hasData: true,
          validEntries: response.data.validEntries.map((item: any, index: any) => ({
            ...item,
            key: index
          })),
          invalidEntries: response.data.invalidEntries.map((item: any, index: any) => ({
            ...item,
            key: index
          }))
        })
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
      const values = data.validEntries

      const response = await importVehicleFromExcelMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        navigate('/vehicles')
      } else {
        message.error('Add failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  const columns = [
    {
      title: 'Number Seat',
      dataIndex: 'numberSeat',
      key: 'numberSeat'
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  return (
    <div>
      <DownloadExcel exportedFile={exportedFile} setExportedFile={setExportedFile} />
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
            <Table columns={columns} dataSource={data.validEntries} bordered pagination={{ pageSize: 5 }} />
          </>
        )}

        {data.invalidEntries.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, marginBottom: 20 }}>Invalid Data</h2>
            <Table columns={columns} dataSource={data.invalidEntries} bordered pagination={{ pageSize: 5 }} />
            <div>
              {data.invalidEntries.map((entry: any, index) =>
                entry.errors.length > 0 ? (
                  <p style={{ marginBottom: 20 }} key={index}>
                    {entry.errors}
                  </p>
                ) : null
              )}
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
