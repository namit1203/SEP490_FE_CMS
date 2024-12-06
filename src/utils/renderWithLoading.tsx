// src/utils/renderWithLoading.tsx

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

interface RenderWithLoadingProps {
  isLoading: boolean
  content: React.ReactNode
}

const renderWithLoading = ({ isLoading, content }: RenderWithLoadingProps) => {
  return isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%' // Full viewport height
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  ) : (
    content
  )
}

export default renderWithLoading
