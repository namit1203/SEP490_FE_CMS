import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Upload, Image, message, Spin } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useLoading } from '@/context/LoadingContext'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const token = useLocalStorage.getLocalStorageData('token')

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface Props {
  fieldName: string
  initialImage?: string | null
  form: any
  setFileList?: (fileList: any[]) => void
}

const UploadComponent: React.FC<Props> = ({ initialImage, form, fieldName }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { isLoadingGlobal, setLoading } = useLoading()

  useEffect(() => {
    // Check if initialImage is either the string 'null', undefined, or the string 'undefined'
    if (initialImage === 'null' || initialImage == undefined || initialImage == 'undefined') {
      console.log(initialImage)
      setFileList([]) // Set empty file list when initialImage is invalid
    } else {
      console.log('ok 2')
      setFileList([
        {
          uid: '-1',
          name: 'Uploaded Image',
          status: 'done',
          url: initialImage
        }
      ])
      form.setFieldsValue({ [fieldName]: initialImage }) // Set initial value in parent form
    }
  }, [initialImage, form, fieldName])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList)

    const lastFile = newFileList[newFileList.length - 1]

    if (lastFile && lastFile?.originFileObj) {
      const formData = new FormData()
      formData.append('file', lastFile.originFileObj)

      // Start spinner
      setLoading(true)

      try {
        const response = await fetch('https://boring-wiles.202-92-7-204.plesk.page/api/UploadImage/image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        const data = await response.json()

        if (response.status === HttpStatusCode.Ok) {
          message.success(data.message)

          form.setFieldsValue({
            [fieldName]: data.url
          })
        } else if (response.status === HttpStatusCode.BadRequest) {
          message.error(data.message)
        }
      } catch (error) {
        console.log(error)
      } finally {
        // Stop spinner
        setLoading(false)
      }
    } else {
      form.setFieldsValue({
        [fieldName]: null
      })
      message.success('remove image success')
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Form.Item
      name={fieldName}
      initialValue={initialImage}
      getValueFromEvent={({ fileList }: { fileList: UploadFile[] }) => fileList}
    >
      <div>
        <Upload
          listType='picture-card'
          fileList={fileList} // Manage fileList here
          beforeUpload={() => false} // Prevent automatic upload
          onPreview={handlePreview}
          onChange={handleChange}
          disabled={isLoadingGlobal}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        {/* Spinner Overlay */}
        {isLoadingGlobal && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '110px',
              height: '110px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <Spin />
          </div>
        )}

        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage('')
            }}
            src={previewImage}
          />
        )}
      </div>
    </Form.Item>
  )
}

export default UploadComponent
