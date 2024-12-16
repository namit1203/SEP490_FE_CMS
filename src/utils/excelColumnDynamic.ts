// Helper function to flatten pointStartDetail
const flattenPointStartDetail = (pointStartDetail = {}) => {
  return Object.entries(pointStartDetail).reduce(
    (acc, [key, value], detailIndex) => ({
      ...acc,
      [`point_start_${detailIndex}`]: key,
      [`start_time_${detailIndex}`]: value
    }),
    {}
  )
}

// Helper function to flatten pointEndDetail (handles single key-value pair)
const flattenPointEndDetail = (pointEndDetail = {}) => {
  const [key, value] = Object.entries(pointEndDetail)[0] || []
  return key && value
    ? {
        point_end: key,
        end_time: value
      }
    : {}
}

// Helper function to filter item keys
const filterItemKeys = (item: any) => {
  const excludedKeys = [
    'id',
    'status',
    'typeOfTrip',
    'pointStartDetail',
    'pointEndDetail',
    'createdAt',
    'createdBy',
    'errorMessages'
  ]

  return Object.fromEntries(Object.entries(item).filter(([key]) => !excludedKeys.includes(key)))
}

// Helper function to create dynamic columns
const createDynamicColumns = (entries: any) => {
  if (!entries.length) return []

  // Generate static columns
  const staticColumns = Object.keys(entries[0])
    .filter((key) => !key.startsWith('point_start_') && !key.startsWith('start_time_'))
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key,
      width: '550px'
    }))

  // Generate dynamic columns for point_start and start_time
  const dynamicColumns = Array.from(
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

  // Combine columns with Point End and End Time at the end
  return [...staticColumns, ...dynamicColumns]
}

function moveToLast(array: any, keysToMove: any) {
  // Filter out the elements to be moved and the rest of the array
  const itemsToMove = array.filter((item: any) => keysToMove.includes(item.title))
  const remainingItems = array.filter((item: any) => !keysToMove.includes(item.title))

  // Concatenate the remaining items with the items to be moved
  return [...remainingItems, ...itemsToMove]
}

// Main function
export const processResponseData = (responseData: any) => {
  const entries = responseData.map((item: any, index: number) => {
    const flattenedStartDetails = flattenPointStartDetail(item.pointStartDetail)
    const flattenedEndDetails = flattenPointEndDetail(item.pointEndDetail)

    const filteredItem = filterItemKeys(item)

    return {
      key: item.id || index,
      ...filteredItem,
      ...flattenedStartDetails,
      ...flattenedEndDetails
    }
  })

  const dynamicColumns = createDynamicColumns(entries)

  const keysToMove = ['Point_end', 'End_time']
  const updatedColumns = moveToLast(dynamicColumns, keysToMove)

  return { entries, updatedColumns }
}
