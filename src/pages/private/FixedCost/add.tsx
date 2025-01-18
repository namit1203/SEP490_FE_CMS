import { HttpStatusCode } from '@/constants/httpStatusCode.enum';
import { useQueryCostType } from '@/queries/cost-type';
import { useAddLossCostMutation, useQueryLossCost } from '@/queries/fixed-cost';
import { useQueryVehicles } from '@/queries/vehicle';
import { DataTypeCost } from '@/types/DataType';
import { Button, Col, DatePicker, Form, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TableData {
  key: string;
  label: JSX.Element | string;
  value: JSX.Element | string | undefined;
}

const AddFixedCostPage: React.FC = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addMutation = useAddLossCostMutation();

  const navigate = useNavigate();

  const { refetch } = useQueryLossCost({
    startDate: '',
    endDate: '',
    vehicleId: ''
  });

  const { data: vehicleData } = useQueryVehicles();

  const { data: costTypeData } = useQueryCostType();

  const tableData: TableData[] = [
    {
      key: 'description',
      label: (
        <span>
       Mô tả
        </span>
      ),
      value: (
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <TextArea style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'price',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Giá chi phí
        </span>
      ),
      value: (
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá chi phí!' }]}
        >
          <InputNumber style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'vehicleId',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Biển số xe
        </span>
      ),
      value: (
        <Form.Item
          name="vehicleId"
          rules={[{ required: true, message: 'Vui lòng chọn biển số xe!' }]}
        >
          <Select placeholder="Chọn xe" style={{ width: '30%' }}>
            {vehicleData?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.licensePlate}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'lossCostTypeId',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Loại chi phí
        </span>
      ),
      value: (
        <Form.Item
          name="lossCostTypeId"
          rules={[{ required: true, message: 'Vui lòng chọn loại chi phí!' }]}
        >
          <Select placeholder="Chọn loại chi phí" style={{ width: '30%' }}>
            {costTypeData?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'dateIncurred',
      label: (
        <span>
          <span style={{ color: 'red' }}>*</span> Ngày phát sinh
        </span>
      ),
      value: (
        <Form.Item
          name="dateIncurred"
          rules={[{ required: true, message: 'Vui lòng chọn ngày phát sinh!' }]}
        >
          <DatePicker
            showTime={{
              format: 'HH:mm:ss'
            }}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '30%' }}
          />
        </Form.Item>
      )
    }
  ];

  const columns: TableColumnsType<TableData> = [
    {
      title: 'Key',
      dataIndex: 'label',
      key: 'label',
      width: '30%'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
      render: (_, record) => <>{record.value}</>
    }
  ];

  const handleFormSubmit = async (values: DataTypeCost) => {
    setIsLoading(true);
    try {
      const response = await addMutation.mutateAsync(values);
      if (response.status === HttpStatusCode.Ok) {
        message.success('Thêm thành công!');
        refetch();
        navigate('/fixed-cost');
      } else {
        message.error('Thêm thất bại!');
      }
    } catch (error) {
      console.error('Error values:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onFinish={handleFormSubmit} form={form} layout="vertical">
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey="key" />
      <Row justify="start" gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '10px' }}
            loading={isLoading}
            disabled={isLoading}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddFixedCostPage;
