import TemplateTripConvenience from '@/assets/Template_Trip_Convenience.xlsx'
import TemplateInterProvincial from '@/assets/Template_Inter_Provincial.xlsx'

import { Button, Select } from 'antd'
import { useState } from 'react'

interface DownloadExcelProps {
  exportedFile: boolean
  setExportedFile: (value: boolean) => void
  selectedOption: string
  setSelectedOption: (value: string) => void
}

const DownloadExcel: React.FC<DownloadExcelProps> = ({
  selectedOption,
  setSelectedOption,
  exportedFile,
  setExportedFile
}) => {
  const [open, setOpen] = useState(false)
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
    setOpen(true)
  }

  return (
    <div>
      <Select style={{ width: 200, marginRight: 20 }} placeholder='Choose an option' onChange={handleSelectChange}>
        <Option value='1'>Template Trip Inter Provincial</Option>
        <Option value='2'>Template Trip Convenience</Option>
      </Select>

      {open && (
        <Button style={{ marginRight: 20 }} disabled={exportedFile} onClick={downloadFile}>
          Download Template Trip
        </Button>
      )}
    </div>
  )
}

export default DownloadExcel
